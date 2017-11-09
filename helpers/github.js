const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user) => {

  let options = {
    url: 'https://api.github.com/users/' + user + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    console.log('Response: ', res.body);
    console.log('Body: ', body);
    console.log('Error: ', err);
  });

}

module.exports.getReposByUsername = getReposByUsername;