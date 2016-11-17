/*globals require, module */

const request = require('request');

function getRepos(user) {
    var userInfo = [];

    let options = {
        url: `https://api.github.com/users/${user}/repos`,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36"
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
        }, this);

    });
}

getRepos("tpopov94");

module.exports = {
    getRepos: getRepos
}