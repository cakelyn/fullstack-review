const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}`, { useMongoClient: true });

let repoSchema = mongoose.Schema({
  name: String,
  url: { type: String, unique: true },
  forks: Number,
  owner_login: String,
  owner_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (name, url, forks, owner_login, owner_url) => {

  new Repo({
    name: name,
    url: url,
    forks: forks,
    owner_login: owner_login,
    owner_url: owner_url
  }).save(function(err) {
    if (err) {
      console.log('user already added');
    } else {
      console.log('saved to database');
    }
  });

}

let query = (callback) => {

  Repo
    .find({})
    .limit(25)
    .sort('-forks')
    .exec(callback);

}

let grab = (callback) =>{
  return Repo
    .find({})
    .exec(callback);
}
module.exports.save = save;
module.exports.query = query;
module.exports.grab = grab;