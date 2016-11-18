/*globals require, module */

const request = require('request');

function getRepos(user) {
    var userInfo = [];

    let options = {
        url: `https://api.github.com/users/${user}/repos`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
        }
    }

    request(options, function(resp, err, body) {
        var githubInfo = JSON.parse(body);
        githubInfo.forEach(function(element) {
            userInfo.push({
                name: element.name,
                owner: element.owner.login,
                description: element.description,
                url: element.html_url,
                stars: element.stargazers_count,
                language: element.language
            });
            //console.log(userInfo);
            //return userInfo;
        }, this);
        console.log(userInfo); // When I log it everything is ok
        return userInfo; // but when I try to return the object in the slack bot I receive undefined
    });

    // return userInfo;
}

module.exports = {
    getRepos: getRepos
}