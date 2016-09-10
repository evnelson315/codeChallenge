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

//===========================This is the the start of the code for no repeat posts=======================
// Create New Characters - takes in JSON input
app.post('/api/new', function(req, res){

	var newcharacter = req.body;
	newcharacter.routeName = newcharacter.name.replace(/\s+/g, '').toLowerCase()
	console.log(newcharacter.routeName);


	for (var i = 0; i < characters.length; i++) {
       		 if ( newcharacter.routeName === characters[i].routeName ) {
           		// console.log(newcharacter.routeName + "" + "is in your database");
           		throw "exit";
         			}
			else {
				// console.log("gets entered in your database");
				};
			};

		characters.push(newcharacter);
		res.json(newcharacter);
})
//========================This the end of the code for no repeat posts ===================================


// //=========================This is safe code for add/post function===============================
// app.post('/api/new', function(req, res){

// 	var newcharacter = req.body;
// 	newcharacter.routeName = newcharacter.name.replace(/\s+/g, '').toLowerCase()

// 	console.log(newcharacter);

// 	characters.push(newcharacter);

// 	res.json(newcharacter);
// })
//=============================End safe code for add/post function============================
// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})