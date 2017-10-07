//Twitter Keys
var tKeys = require("./keys.js");
//Twitter NPM
var Twitter = require("twitter");
//Spotify NPM
var Spotify = require("node-spotify-api");
//omdb NPM
var request = require("request");
//fs package
var fs = require('fs');
// Takes in all of the command line arguments
var inputString = process.argv;
var command = inputString[2];
//index three input
var m ="";


		//for loop for input string
		for (var i=3; i<inputString.length; i++){
		  if(i>3 && i<inputString.length){
		    m = m + ""+"" + inputString[i];
		  } else{
		    m = m + inputString[i];

		  }
		}
// ***************************DO WHAT IT SAYS************************************************
			function doWhat(){
			  fs.readFile('random.txt', "utf8", function(error, data){
			  	 if (error) {
    			return console.log(error);
  				}
			    var txt = data.split(',');
			    spotify(txt[1]);

			  });

			}

			doWhat();


//****************************switch case**************************************************
		switch(command){

		  case "my-tweets":
		    twitter();
		  break;

		  case "spotify-this-song":
		    if(m){
		      spotify(m);
		    } else{
		      spotify("\"The Sign\" by Ace of Base");
		    }
		  break;

		  case "movie-this":
		    if(m){
		      omdb(m);
		    } else{
		      omdb("Mr. Nobody");//not working
		    }
		  break;

		  case "do-what-it-says":
		    if(m){
		      doWhat(m);
		    } else{
		      doWhat("error");
		    }	    
		  break;
		}

// ***************************TWITTER****************************************************
        //Twitter Keys
		function twitter(){
		var client = new Twitter({
		  consumer_key: tKeys.consumer_key,
		  consumer_secret: tKeys.consumer_secret,
		  access_token_key: tKeys.access_token_key,
		  access_token_secret: tKeys.access_token_secret
		});
		 //Parameters
		var params = {screen_name: 'deslesno', count: 20};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if(error) throw error;
		  //loop through the tweets
		  for (var i = 0; i < tweets.length; i++){
		  //display date and tweet
		     console.log("----------------------------------------------------------------------------");
		     console.log("\nName: " + "Deslesno");
		     console.log("\nDate and Time: " + tweets[i].created_at);
		     console.log("\nTweet: " + tweets[i].text);

		     fs.appendFileSync('log.txt', "\nDate and Time: " + tweets[i].created_at);
		     fs.appendFileSync('log.txt', "\nTweet: " + tweets[i].text);
             fs.appendFileSync('log.txt', "\n---------------------------------------------------------------------------------------------------------------------------\n");
		  }


		});
	};

// ***************************SPOTIFY************************************************

		function spotify(song){
			var spotify = new Spotify({
		    id: "860ea86e6246496a988f937952cc13e1",
		    secret: "7a92cc533df146b5a05eede19cf4aa9e"
		});

			spotify.search({ type: 'track', query: song}, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		   for (var i = 0; i < data.tracks.items.length; i++){
		  	    var songsInfo = data.tracks.items[i];

		  	    //artist
		        console.log("Artist: " + songsInfo.artists[0].name);
		        //song name
		        console.log("Song: " + songsInfo.name);
		        //spotify preview link
		        console.log("Preview URL: " + songsInfo.preview_url);
		        //album name
		        console.log("Album: " + songsInfo.album.name);
		        console.log("-----------------------");

		         //Append to log.txt file
		        fs.appendFileSync('log.txt', songsInfo.artists[0].name);
		        fs.appendFileSync('log.txt', songsInfo.name);
		        fs.appendFileSync('log.txt', songsInfo.preview_url);
		        fs.appendFileSync('log.txt', songsInfo.album.name);
		        fs.appendFileSync('log.txt', "\n---------------------------------------------------------------------------------------------------------------------------\n");
		  }
		  

		});

	};

// ***************************OMDB************************************************

		function omdb(movie){
		  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&apikey=40e9cece';
		  request(omdbURL, function (error, response, body){
		    if(!error && response.statusCode == 200){
		      var body = JSON.parse(body);
		      console.log("Title: " + body.Title);
		      console.log("Year Released: " + body.Year);
		      console.log("IMDB Rating of Movie: " + body.imdbRating);
		      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
		      console.log("Country Produced in: " + body.Country);
		      console.log("Language: " + body.Language);
		      console.log("Plot: " + body.Plot);
		      console.log("Actors: " + body.Actors);
		      
		     
		      //Append to log.txt file
		      fs.appendFileSync('log.txt', "\nTitle: " + body.Title);
		      fs.appendFileSync('log.txt', "\nYear Released: " + body.Year);
		      fs.appendFileSync('log.txt', "\nIMDB Rating of Movie: " + body.imdbRating);
		      fs.appendFileSync('log.txt', "\nRotten Tomatoes Rating: " + body.tomatoRating);
		      fs.appendFileSync('log.txt', "\nCountry Produced in: " + body.Country);
		      fs.appendFileSync('log.txt', "\nLanguage: " + body.Language);
		      fs.appendFileSync('log.txt', "\nPlot: " + body.Plot);
		      fs.appendFileSync('log.txt', "\nActors: " + body.Actors);
		      fs.appendFileSync('log.txt', "\n---------------------------------------------------------------------------------------------------------------------------\n");
		    
		    
		    if(error) throw error;
		    //this is not working, I cant get it to display the console log below
		    if(movie === "Mr. Nobody"){
		      console.log("-----------------------");
		      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
		      console.log("It's on Netflix!");
		      //Append to log.txt file
		      fs.appendFileSync('log.txt', "-----------------------");
		      fs.appendFileSync('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
		      fs.appendFileSync('log.txt', "It's on Netflix!");
		  }
    }
  });
}






