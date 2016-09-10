// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Star Wars Characters (DATA)
// =============================================================
var characters = [
]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'view.html'));
})



app.get('/add', function(req, res){
	res.sendFile(path.join(__dirname, 'add.html'));
})

app.get('/all', function(req, res){
	res.sendFile(path.join(__dirname, 'all.html'));
})

// Search for Specific Character (or all characters) - provides JSON
app.get('/api/:characters?', function(req, res){

	var chosen = req.params.characters;

	if(chosen){

		for (var i=0; i <characters.length; i++){

			if (chosen == characters[i].routeName){
				res.json(characters[i]);
				return;
			}
		}

		res.json(false);
	}

	else{
		res.json(characters);
	}
})

app.delete('/api/:characters?', function(req, res){
    var deletedCharacter = req.params.characters.replace(/\s+/g, '').toLowerCase();
    console.log(deletedCharacter);

    for (var i = 0; i < characters.length; i++) {
        if (characters[i].routeName == deletedCharacter) {
            console.log(deletedCharacter);
            characters.splice(i, 1);
        }
    }
    // console.log(req.params.characters)
});


// Create New Characters - takes in JSON input
// app.post('/api/new', function(req, res){

// 	var newcharacter = req.body;
// 	newcharacter.routeName = newcharacter.name.replace(/\s+/g, '').toLowerCase()

// 	// console.log(newcharacter);

// 	characters.push(newcharacter);

// 	res.json(newcharacter);
// })


//This is an alternative for posting a new movie with no duplicates
app.post('/api/new', function(req, res){

	var newcharacter = req.body;
	newcharacter.routeName = newcharacter.name.replace(/\s+/g, '').toLowerCase()

	console.log(newcharacter);

	characters.push(newcharacter);

	res.json(newcharacter);
})

// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})