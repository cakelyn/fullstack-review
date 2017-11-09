const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {

  let options = {
    url: 'https://api.github.com/users/' + user + '/repos?per_page=100',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(err, res, data) {
    if (err) {
      console.log('Error requesting user repos: ', err);
    }
    console.log(JSON.parse(data));
    callback(JSON.parse(data));
  });


}

module.exports.getReposByUsername = getReposByUsername;