var express = require("express");
var utility = require("./utility.js");
var tweets = require("../models/tweets.js");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("index");
});

router.post("/api/twitters", function (req, res) {
    console.log(req.body.twitterId);
    var screenName = req.body.twitterId;
    utility.tweetFunction(screenName, function (aTweets) {
        tweets = aTweets;
        res.json(tweets);
    });
  /*  utility.tweetGetFullText("1009062167956598786",function(text){
        console.log(text);
    })*/
});

router.get("/api/twitters", function (req, res) {
    res.json(tweets);
});

module.exports = router;