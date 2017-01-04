/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill'
import lzString from 'lz-string'
import underscore from 'underscore'
import Backbone from 'backbone'
import $ from 'jquery'
import View from './view'
import { setAppId } from '../common/appId'
import { bot } from './bot'
import { load as loadLang } from '../common/lang'

loadLang()
window._ = underscore
window.Backbone = Backbone
window.$ = $

require('tourist/tourist')
require('notifyjs-browser')
require('./view/draggable')

setAppId()
$.ajaxSetup({
  cache: false,
})

window._trackJs = { // eslint-disable-line no-underscore-dangle
  token: '346262e7ffef497d85874322fff3bbf8',
  application: 'binary-bot',
  enabled: window.location.hostname !== 'localhost',
  console: {
    display: false,
  },
}

require('trackjs')

class BotPage {
  constructor() {
    bot.initPromise.then(() => {
      this.view = new View()
      trackJs.configure({
        onError: (payload, error) => {
          if (error && error.message && error.message.indexOf('The play() request was'
              + ' interrupted by a call to pause()') >= 0) {
            return false
          }
          payload.console.push({
            message: lzString.compressToBase64(this.view.blockly.generatedJs),
            severity: 'log',
            timestamp: new Date().toISOString(),
          })
          payload.console.push({
            message: lzString.compressToBase64(this.view.blockly.blocksXmlStr),
            severity: 'log',
            timestamp: new Date().toISOString(),
          })
          payload.console.push({
            message: lzString.compressToBase64(
              Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace))),
            severity: 'log',
            timestamp: new Date().toISOString(),
          })
          return true
        },
      })
      this.view.initPromise.then(() => {
        trackJs.configure({
          userId: $('.account-id').first().text(),
        })
        $('.barspinner').hide()
        this.view.activeTour = this.view.tours.welcome
        this.view.activeTour.welcome(() => {
          this.view.activeTour = null
        })
      })
    })
  }
}

export default new BotPage()
