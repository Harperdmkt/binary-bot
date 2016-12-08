import { observer } from 'binary-common-utils/lib/observer'
import { bot } from './bot'
import { notifyError } from './view/logger'
import expect from '../common/expect'
import math from '../common/math'

const intervals = []
const timeouts = []

window.Bot = {
  expect,
  math,
  addBlockByMagic: (blockType) => {
    const dp = Blockly.mainWorkspace.newBlock(blockType)
    dp.initSvg()
    dp.render()
  },
  start: bot.start.bind(bot),
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
}

export { bot } from './bot'
