var request = require('request');
var GITHUB_TOKEN = require('./secret');
var fs = require('fs');


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

getRepoContributors("jquery", "jquery", function(err, result) {
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

  // .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));
  // if (!fs.existsSync('./avatars/')) {
  //   fs.mkdirSync('./avatars/');
  // } else {
  .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));
// }
};

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani.jpg")
// function getRepoContributors(repoOwner, repoName, cb) {
//   // ...
//   var options = {
//     url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
//     headers: {
//       'User-Agent': 'request',
//       'Authorization': GITHUB_TOKEN
//     }
//   };

//   request(options, function(err, res, body) {
    
//     // var parsed = 
//     cb(err, body) 
//   });
// }

// console.log('Welcome to the GitHub Avatar Downloader!');

// getRepoContributors("jquery", "jquery", function(err, result) {
//   // urlresults = result.map(function(item) {
//   //   return item['avatar_url'];
//   // });
//   if (err){
//     throw err;
//   }
  // parsed = JSON.parse(result)
//   console.log("Errors:", err);
//   console.log("Result:", parsed);
// });

// function downloadImageByURL(url, filePath) {
//   // ...
// }