const request = require('request');
const config = require('../config.js');
require('dotenv').config({ silent: true });

let getReposByUsername = (user, callback) => {

  let options = {
    url: 'https://api.github.com/users/' + user + '/repos?per_page=100',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.SUCH_SECRET}`
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