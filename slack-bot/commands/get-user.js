/*globals require, module */

var slackUtils = require('../utils/slack');
var githubInfo = require('../../utils/getGithubInfo/getRepos');

module.exports = function(params) {
    var currentUser = params.args[0];
    var githubUserName = params.args[1] || ''; // github username is not mandatory

    var len = currentUser.length;
    var parsedUser = '';

    // If received username is not in the format <@...> the params is not valid slack user
    if (!/^<@(.+)>$/.test(currentUser)) {
        slackUtils.postMessage(params.channel, 'Wrong username');
    }

    // Could not do it with regex properly
    for (var i = 0; i < len; i += 1) {
        if (currentUser[i] !== '<' && currentUser[i] !== '@' && currentUser[i] !== '>') {
            parsedUser += currentUser[i];
        }
    }

    slackUtils.getUserInfo(parsedUser, function(user) {
            var slackUserInfo = {};
            slackUtils.postMessage(params.channel, 'User: ' + user.real_name + ' with email: ' + user.profile.email + ' information extracted');

            if (githubUserName) {
                console.log(3);
                var gitInfo = githubInfo.getRepos(githubUserName.trim());
            }

            slackUserInfo = {
                firstName: user.profile.first_name,
                lastName: user.profile.last_name,
                email: user.profile.email,
                githubUser: githubUserName,
                gitInfo: gitInfo
            };

            console.log(slackUserInfo);
        },
        function(err) {
            slackUtils.postMessage(params.channel, 'Something went wrong');
            return console.dir(err);
        });
};