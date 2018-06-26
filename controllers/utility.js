var twitter = require('twitter');
var request=require("request");
var moment = require('moment');

module.exports={
    tweetGetFullText: function(id_str,cb){
        var client = new twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY, // keys.twitter.consumer_key,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET, // keys.twitter.consumer_secret,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, // keys.twitter.access_token_key,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET // keys.twitter.access_token_secret
        });
        client.get('https://api.twitter.com/1.1/statuses/show/'+id_str+'.json?tweet_mode=extended',function(error,tweet,response){
            if (!error) {
            }
            else{
                console.log(error);
            }
            cb(tweet.full_text);
           })
    },
    tweetFunction: function(screenName,callback) {
       var tweetsArr=[];
        var client = new twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY, // keys.twitter.consumer_key,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET, // keys.twitter.consumer_secret,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, // keys.twitter.access_token_key,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET // keys.twitter.access_token_secret
        });
        
        var params = {screen_name: screenName,count:200,trim_user:true,exclude_replies:true,include_rts:false};
        //client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?tweet_mode=extended',params ,function (error, tweets, response) 
        client.get('statuses/user_timeline',params ,function (error, tweets, response) 
        {
            if (!error) {
                console.log(tweets.length);
                for (var i = 0; i < tweets.length; i++) {
                    // calculation, methods, cleaning, formatting come here below is an example
                    var createdDate= tweets[i].created_at;
                     // development purpose to switch between extended mode
                    var isExtended=false;
                    var url=tweets[i].entities.urls.length!=0 ? tweets[i].entities.urls[0].url : "";
                    var text=isExtended ? tweets[i].full_text.replace(url,"") : tweets[i].text.replace(url,"");
                    // this is not accurate needs a method and cleaning
                    var count=text.split(" ").length; 
                    // 
                    tweetsArr.push({
                        "id_str":tweets[i].id_str,
                        "created_at":createdDate,
                        "text":text,
                        "truncated":tweets[i].truncated,
                        "id":tweets[i].user.id,
                        "retweet_count":tweets[i].retweet_count,
                        "favorite_count":tweets[i].favorite_count,
                        "url":url,
                        "name":tweets[i].user.screen_name,
                        "words_count":count,
                    })
                }
                callback(tweetsArr);
            }
        });
    }
}