const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  //owner.login
  id: Number, //repo ID
  username: String, //username
  //repo full name example : akshajmody/toy_problems
  full_name: String, //repo full name
  forks_count: Number //number of forks
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (err, repo) => {

}

//function for get top 25 based on forks

module.exports.save = save;