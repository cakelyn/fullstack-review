const request = require('request');
const config = require('../config.js');

let getReposByUsername = (user) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // use the npm request module to fetch a user's Github repositories from the Github API.

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + user,
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