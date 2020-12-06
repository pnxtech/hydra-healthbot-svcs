const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const taskr = require('../lib/taskr');
const dispatcher = require('../lib/dispatcher');
const request = require('request');

/**
* @name HydraMonTask
* @summary Task to monitor hydra services
* @return {undefined}
*/
class HydraMonTask {
  /**
  * @name constructor
  * @summary HydraMonTask constructor
  * @param {object} config - configuration object
  * @return {undefined}
  */
  constructor(config) {
    this.config = config.taskr.modules.hydramon;
    this.run = this.run.bind(this);
  }

  /**
  * @name run
  * @summary execution entry point
  * @return {undefined}
  */
  async run() {
    try {
      const serviceList = await hydra.getServiceNodes();
      const results = taskr.executeRules('hydramon', serviceList);
      if (results && results.length > 0) {
        const module = results[0].module;
        const messages = [];
        results.forEach((e) => {
          let exclude = false;
          this.config.silenceInSlack.forEach((serviceName) => {
            if (e.message.includes(serviceName)) {
              exclude = true;
            }
          });
          if (!exclude) {
            messages.push(`• ${e.message}\n`);
          }
        });
        if (messages.length > 0) {
          dispatcher.send(`${messages.join(' ')}`);
          (module.trigger) && request.get(module.trigger);
        }
      }
    } catch (e) {
      hydraExpress.appLogger.error(e);
    }
  }
}

module.exports = HydraMonTask;
