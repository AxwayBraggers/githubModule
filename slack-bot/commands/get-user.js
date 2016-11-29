/*globals require, module */

var slackUtils = require('../utils/slack');
var githubRepoInfo = require('../../utils/getGithubInfo/getRepos');
var githubInfo = require('../../utils/getGithubInfo/getUserInfo');
var userUtils = require('../utils/collectInfoUtils');
var requestUtils = require('../utils/requestUtils');

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

    for (var i = 0; i < len; i += 1) {
        if (currentUser[i] !== '<' && currentUser[i] !== '@' && currentUser[i] !== '>') {
            parsedUser += currentUser[i];
        }
    }

    slackUtils.getUserInfo(parsedUser, function(user) {
        slackUtils.postMessage(params.channel, 'User: ' + user.real_name + ' with email: ' + user.profile.email + ' information extracted !');

        // if github username is passed to slack bot
        if (githubUserName) {
            slackUserInfo = {
                firstName: user.profile.first_name,
                lastName: user.profile.last_name,
                email: user.profile.email,
                githubUser: githubUserName
            };

            githubRepoInfo.getRepos(githubUserName.trim(), function(info) {
                slackUserInfo.repos = info;
                githubInfo.getGitInfo(githubUserName.trim(), function(info) {
                    slackUserInfo.gitInfo = info;

                    //userUtils.userInfo(slackUserInfo); // Send collected info to another module
                   
                    requestUtils.notifyServer({
                        url: "http://localhost:2705/",
                        data: slackUserInfo
                    });
                });
            });

        } else {
            slackUserInfo = {
                firstName: user.profile.first_name,
                lastName: user.profile.last_name,
                email: user.profile.email,
                githubUser: githubUserName
            };

            //userUtils.userInfo(slackUserInfo);
                    requestUtils.notifyServer({
                        url: "http://localhost:2705/",
                        data: slackUserInfo
                    });
        }
    });
};