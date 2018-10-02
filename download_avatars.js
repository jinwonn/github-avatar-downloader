args = process.argv.slice (2); // takes in paramaters from command line
account = args[0];
repo = args[1];
var request = require('request');
var GITHUB_TOKEN = require('./secret'); //token stored in file not in githut
var fs = require('fs');

//error if no paramaters inpoutted into command line
if (args.length !== 2 ) {
  console.log("ERROR: Please input github account and repo")
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
    //parse incoming data
    result = JSON.parse(body)
    cb(err, result);
    //calls downloadimageurl with the url and login as paramaters
    result.forEach((result =>{
      downloadImageByURL(result.avatar_url,result.login)
    }))
  });
  
}

getRepoContributors(args[0], args[1], function(err, result) {
 //makes destination directory for avatar images 
  if (!fs.existsSync('./avatars/')) {
    fs.mkdirSync('./avatars/');
  console.log("Errors:", err);
  console.log("Result:", result);
}
});

//downloads and saves images
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', ((err) => {
    throw err;
  }))
  .on('end', function () {
  console.log("DONE.");
  });

  .pipe(fs.createWriteStream('./avatars/' + filePath + '.jpg'));

};

