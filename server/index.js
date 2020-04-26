const express = require('express');
const bodyParser=require('body-parser');
const cors = require('cors');
const path=require('path');
const getTopTwentyFive=require(path.join(__dirname,'..','database','index.js')).getTopTwentyFive;
const save=require(path.join(__dirname,'..','database','index.js')).save;
const getReposByUsername=require(path.join(__dirname,'..','helpers','github.js')).getReposByUsername;
let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  console.log(`POST REQUEST FOR ${req.body.term}`);
  getReposByUsername(req, res, (err, response, body) => {
    console.log('GET REPOS FOR ' + req.body.term);
    const info = JSON.parse(body);
    if(err || info.message === 'Not Found') {
      console.log("API error: " + err)
      res.sendStatus(404)
    } else {
      console.log(response.statusCode,'from Github API');
      console.log(response.headers['x-ratelimit-remaining'], ' requests remaining')
      save(info, (err, data) => {
        if(err) {
          console.log("SAVING error" + err);
          res.sentStatus(500);
        } else {
          console.log('SAVED TO DATABASE!')
          res.sendStatus(200);
        }
      })
    }
  })
});

app.get('/repos', function (req, res) {

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

