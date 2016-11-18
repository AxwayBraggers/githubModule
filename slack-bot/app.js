var slackTerminal = require('slack-terminalize');

// to run in cmd set SLACK_TOKEN=xxxx
slackTerminal.init(process.env.SLACK_TOKEN, {}, {
    CONFIG_DIR: __dirname + '/config',
    COMMAND_DIR: __dirname + '/commands'
});