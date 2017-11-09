const request = require('request');
// const config = require('../config.js');
const aws = require('aws-sdk');

let s3 = new aws.S3({
  accessKeyId: process.env.SUCH_SECRET,
  secretAccessKey: process.env.SUCH_SECRET
});

let getReposByUsername = (user, callback) => {

  let options = {
    url: 'https://api.github.com/users/' + user + '/repos?per_page=100',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${s3.accessKeyId}`
    }
  };

  request(options, function(err, res, data) {
    if (err) {
      console.log('Error requesting user repos: ', err);
    }
    callback(JSON.parse(data));
  });


}

module.exports.getReposByUsername = getReposByUsername;