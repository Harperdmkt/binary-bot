import Interpreter from 'js-interpreter'
import { observer } from 'binary-common-utils/lib/observer'
import { bot } from '../bot'
import { notifyError } from './logger'
import expect from '../../common/expect'
import math from '../../common/math'

const intervals = []
const timeouts = []

export const BotApi = {
  expect,
  math,
  addBlockByMagic: (blockType) => {
    const dp = Blockly.mainWorkspace.newBlock(blockType)
    dp.initSvg()
    dp.render()
  },
  start: (...args) => {
    bot.start(...args,
      afterPurchaseInfo => observer.emit('global.afterPurchaseInfo', afterPurchaseInfo),
      ticks => observer.emit('global.ticks', ticks))
  },
  shouldRestartOnError: bot.shouldRestartOnError.bind(bot),
  restartOnError: bot.restartOnError.bind(bot),
  stop: () => {
    for (const i of intervals) {
      clearInterval(i)
    }
    for (const i of timeouts) {
      clearTimeout(i)
    }
    timeouts.length = intervals.length = 0
    bot.stop()
  },
  showCode: () => {
    console.log(this.view.blockly.generatedJs); // eslint-disable-line no-console
    console.log(this.view.blockly.blocksXmlStr); // eslint-disable-line no-console
  },
  log: (message, type) => {
    observer.emit(`ui.log.${type}.left`, message)
  },
  getTotalRuns: () => bot.totalRuns,
  getTotalProfit: () => bot.totalProfit,
  getBalance: (balanceType) => (balanceType === 'STR' ? bot.balanceStr : bot.balance),
  notifyError,
  setInterval: (f, n) => intervals.push(setInterval(f, n)),
  setTimeout: (f, n) => timeouts.push(setTimeout(f, n)),
  select: id => Blockly.mainWorkspace.highlightBlock(id),
}

export default class BotMiddleWare {
  constructor(code) {
    const initFunc = (interpreter, scope) => {
      interpreter.setProperty(scope, 'getAfterPurchaseInfo',
        interpreter.createAsyncFunction((callback) => {
          observer.register('global.afterPurchaseInfo', afterPurchaseInfo =>
            callback(interpreter.nativeToPseudo(afterPurchaseInfo)), true)
        }))
      interpreter.setProperty(scope, 'getNewTicks',
        interpreter.createAsyncFunction((callback) => {
          observer.register('global.ticks', ticks =>
            callback(interpreter.nativeToPseudo(ticks)), true)
        }))
      interpreter.setProperty(scope, 'console',
        interpreter.nativeToPseudo(console))
      interpreter.setProperty(scope, 'Bot',
        interpreter.nativeToPseudo(BotApi))
    }
    this.interpreter = new Interpreter(code, initFunc)
  }
  run() {
    const interpreterLoop = setInterval(() => {
      if (!this.interpreter.step()) {
        clearInterval(interpreterLoop)
      }
    }, 10)
  }
}
