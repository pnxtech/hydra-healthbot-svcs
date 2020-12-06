// https://api.slack.com/incoming-webhooks

const hydraExpress = require('hydra-express');
const Utils = hydraExpress.getHydra().getUtilsHelper();
const request = require('request');

/**
* @name Slack
* @summary Slack poster
* @return {undefined}
*/
class Slack {
  /**
  * @name constructor
  * @summary Slack constructor
  * @param {object} config - configuration object
  * @return {undefined}
  */
  constructor(config) {
    this.config = config;
  }

  /**
  * @name post
  * @summary Post a string message or JSON formatted object to Slack
  * @param {object} message - message to send
  * @returns {undefined}- no return
  */
  post(message) {
    let text = (typeof message === 'string') ? message : `\`\`\`${JSON.stringify(message, null, 2)}\`\`\``;
    text = text.trim();
    if (text.length > 1) {
      const payload = Utils.safeJSONStringify({
        'username': 'hydra-healthbot',
        'icon_emoji': ':nerd_face:',
        'text': text
      });
      const options = {
        headers: {
          'Content-type': 'application/json'
        },
        url: `${this.config.slackWebHookUrl}`,
        body: payload
      };
      request.post(options);
    }
  }
}

module.exports = Slack;
