/*globals require, module */

var slackUtils = require('../utils/slack');
var githubInfo = require('../../utils/getGithubInfo/getRepos');
var userUtils = require('../utils/collectInfoUtils');

module.exports = function(params) {
    var currentUser = params.args[0];
    var githubUserName = params.args[1] || ''; // github username is not mandatory

    var len = currentUser.length;
    var parsedUser = '';
    var slackUserInfo = {};

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
        slackUtils.postMessage(params.channel, 'User: ' + user.real_name + ' with email: ' + user.profile.email + ' information extracted');

        // if github username is passed to slack bot
        if (githubUserName) {
            slackUserInfo = {
                firstName: user.profile.first_name,
                lastName: user.profile.last_name,
                email: user.profile.email,
                githubUser: githubUserName
            };
            githubInfo.getRepos(githubUserName.trim(), function(info) {
                slackUserInfo.repos = info;

                userUtils.userInfo(slackUserInfo);
            });

        } else {
            slackUserInfo = {
                firstName: user.profile.first_name,
                lastName: user.profile.last_name,
                email: user.profile.email
            };

            userUtils.userInfo(slackUserInfo);
        }
    });
};