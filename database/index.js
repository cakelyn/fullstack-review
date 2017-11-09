const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  url: { type: String, unique: true },
  forks: Number,
  owner_login: String,
  owner_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (name, url, forks, owner_login, owner_url) => {
  // TODO: Your code here
  // This function will save the relevant data from the Github API in the mongo database.
  // Ensure there are no duplicate repos.
  // If you happen to import the same repo twice,
  // it should only show up once in your database.
  // UNIQUE COLUMNS

  new Repo({
    name: name,
    url: url,
    forks: forks,
    owner_login: owner_login,
    owner_url: owner_url
  }).save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('saved to database');
    }
  });


}

module.exports.save = save;