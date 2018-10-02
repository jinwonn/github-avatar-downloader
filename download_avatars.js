var request = require('request');
var GITHUB_TOKEN = require('./secret');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    parsed = JSON.parse(body)
    // var parsed = 
    cb(err, parsed) 
  });
}

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors("jquery", "jquery", function(err, result) {
  urlresults = result.map(function(item) {
    return item['avatar_url'];
  });
  console.log("Errors:", err);
  console.log("Result:", urlresults);
});