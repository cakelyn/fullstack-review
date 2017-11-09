const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next) {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {

  github.getReposByUsername(req.body.user, function(repos) {
    // for each repo
    repos.forEach(function(repo) {
      // save to database
      db.save(repo.name, repo.url, repo.forks, repo.owner.login, repo.owner.html_url);
    });
    // for (var i = 0; i < repos.length; i++) {
    //   // save to database
    //   console.log('-----------> REPO URL', repos[i].url);
    //   db.save(repos[i].name, repos[i].url, repos[i].forks, repos[i].owner.login, repos[i].owner.html_url);
    // }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.query(function(err, topRepos) {
    if (err) {
      console.log(err);
    } else {
      console.log(topRepos);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

