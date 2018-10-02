args = process.argv.slice (2)
account = args[0]
repo = args[1]
var request = require('request');
var GITHUB_TOKEN = require('./secret');
var fs = require('fs');

if (args.length !== 2 ) {
  console.log("please input github account and repo")
  return
}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };

  request(options, function(err, res, body) {
    
    result = JSON.parse(body)
    cb(err, result);
    result.forEach((result =>{
      downloadImageByURL(result.avatar_url,result.login)
    }))
  });
  
}

getRepoContributors(args[0], args[1], function(err, result) {
  
  if (!fs.existsSync('./avatars/')) {
    fs.mkdirSync('./avatars/');
  console.log("Errors:", err);
  console.log("Result:", result);
}
});

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', ((err) => {
    throw err;
  }))
  .on('end', function () {
  console.log("DONE.")
  })

  .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));

};

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani.jpg")
