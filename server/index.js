const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github');
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next) {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {

  github.getReposByUsername(req.body.user, function(repos) {
    // for each repo
    repos.forEach(function(repo) {
      // save to database
      db.save(repo.name, repo.url, repo.forks, repo.owner.login, repo.owner.html_url);
    });
  });
  res.sendStatus(201);
  res.end()
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.query(function(err, topRepos) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      res.end()
    } else {
      res.send(topRepos);
      res.end()
    }
  });

});

app.get('/all', function(req, res) {
  // This get is for the counter to list all repos
  db.grab(function(err, repos) {
    if (err) {
      console.log(err);
      res.sendStatus(404);
      res.end();
    } else {
      console.log(repos);
      res.send(repos);
      res.end()
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

