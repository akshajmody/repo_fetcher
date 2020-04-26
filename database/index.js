const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true,useUnifiedTopology: true});

var db = mongoose.connection;
db.once('open', function() {
console.log('connected to server')
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  //owner.login
  repoId: Number, //repo ID
  username: String, //username
  //TESTING UNIQUE ENTRIES ONLY
  full_name: {type: String, unique: true, dropDups: true},
  //repo full name example : akshajmody/toy_problems
  html_url: String, //repo URL
  forks_count: Number //number of forks
});

let Repo = mongoose.model('Repo', repoSchema);


let save = (repoData, callback) => {
  for(var i=0; i<repoData.length; i++) {
    var oneRepo = {};
    oneRepo = {
      "repoId": repoData[i].id,
      "username": repoData[i].owner.login,
      "full_name": repoData[i].full_name,
      "html_url": repoData[i].html_url,
      "forks_count": repoData[i].forks_count
    };
    var newDoc = new Repo(oneRepo);
    newDoc.save()
    console.log(newDoc)
  };
  callback();
}

let getTopTwentyFive = () => {

}


module.exports = {
  save: save,
  getTopTwentyFive: getTopTwentyFive
}


// db.repositories.find().sort({forks: -1}).limit(25)
// db.repositories.find().forEach(function(doc){print('Blog Posts: ' + doc.title)})


//function for get top 25 based on forks
//LOOK AT WHAT REQ AND REQ.BODY ARE IN ITS ENTIRETY


//SORT AND LIMIT
// db.repositories.find().sort({forks: 1}).limit(25)
// db.repositories.find().forEach(function(doc){print('Blog Posts: ' + doc.title)})


