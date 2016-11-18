var slackTerminal = require('slack-terminalize');

// to run in cmd set SLACK_TOKEN=xxxx
slackTerminal.init('xoxb-101507473398-yAKV7apcl1qVnKAXZFncCB7D', {}, {
    CONFIG_DIR: __dirname + '/config',
    COMMAND_DIR: __dirname + '/commands'
});