/*globals require, module */

const request = require('request');

function getInfo(user, cb) {
    var userInfo = [];

    let options = {
        url: `https://api.github.com/users/${user}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
        }
    }

    request(options, function(resp, err, body) {

        var githubInfo = JSON.parse(body);
        userInfo = {
            location: githubInfo.location,
            bio: githubInfo.bio,
            company: githubInfo.company,
            numberOfFollowers: githubInfo.followers,
            numberOfFollowing: githubInfo.following,
            imageUrl: githubInfo.avatar_url
        };

        cb(userInfo);
    });
}

module.exports = {
    getGitInfo: getInfo
}