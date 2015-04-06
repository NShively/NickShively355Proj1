// Author: Nick Shively
// Class: CS355


// Module dependencies

var express    = require('express'),
    mysql      = require('mysql');

// Application initialization

var connection = mysql.createConnection({
        host     : 'cwolf.cs.sonoma.edu',
        user     : 'nshively',
        password : '4005435'
    });
    
var app = module.exports = express.createServer();

// Database setup

connection.query('USE nshively', function (err) {
    if (err) throw err;
});

// Configuration

app.use(express.bodyParser());

var htmlHeader ='<html><head><title>Mediocre Media Database</title></head><body>';
var htmlFooter ='</body></html>';
function handleError(res, error){
	console.log(error);
	res.send(error.toString());
}

function buildMovieView(result){
	var responseHTML = htmlHeader + '<h1>Mediocre Movie Information</h1>';
	for (var i=0; i < result.length; i++){
		responseHTML='<ul><li>Title: ' + result[i].Title + '</li>' +
		'<li>Rating: ' + result[i].Rating + '</li>' +
		'<li>Rated by: ' + result[i].UserPosted + '</li></ul>'
	}
	responseHTML += htmlFooter;
	return responseHTML;
}

function buildMovieGenreView(result){
    var responseHTML = htmlHeader + '<h1>Mediocre Movie Genre Information</h1>';
    for (var i=0; i < result.length; i++){
        responseHTML='<ul><li>Title: ' + result[i].Title + '</li>' +
        '<li>Genre: ' + result[i].Genre + '</li></ul>'
    }
    responseHTML += htmlFooter;
    return responseHTML;
}

function buildUserView(result){
    var responseHTML = htmlHeader + '<h1>User Information</h1>';
    for (var i=0; i < result.length; i++){
        responseHTML='<ul><li>Username: ' + result[i].Username + '</li>' +
        '<li>UserID: ' + result[i].UserID + '</li></ul>'
    }
    responseHTML += htmlFooter;
    return responseHTML;
}

function buildMusicView(result){
    var responseHTML = htmlHeader + '<h1>Mediocre Music Information</h1>';
    for (var i=0; i < result.length; i++){
        responseHTML='<ul><li>Title: ' + result[i].Title + '</li>' +
        '<li>Rating: ' + result[i].Rating + '</li>' +
        '<li>Rated by: ' + result[i].UserPosted + '</li></ul>'
    }
    responseHTML += htmlFooter;
    return responseHTML;
}

function buildGamesView(result){
    var responseHTML = htmlHeader + '<h1>Mediocre Games Information</h1>';
    for (var i=0; i < result.length; i++){
        responseHTML='<ul><li>Title: ' + result[i].Title + '</li>' +
        '<li>Rating: ' + result[i].Rating + '</li>' +
        '<li>Rated by: ' + result[i].UserPosted + '</li></ul>'
    }
    responseHTML += htmlFooter;
    return responseHTML;
}


// Main page with two links to view the table and drop down menu

app.get('/', function(req, res) {
    req.query.name
    res.send('<html><head><title>MediocreMedia Database</title></head><body>' +
                 '<a href="/users/view/table">View User HTML Table</a>' +
                 '<br />' +
                 '<a href="/movie/view/table">View Movies Table</a>' +
   '<br />'+ '<a href="/games/view/table">View Games Table</a>'+
	'<br />'+
	'<a href="/music/view/table">View Music Table</a>'+
     '<br />' + '<a href="/movieGenres/view/table">View Movie Genres</a>'+
     '<br />' + '<a href="/all">View All Items</a>'+
     '<br />' + '<a href="/showUsernameOfMovieRaters">View usernames of movie raters</a>'
	 +   
         '</body></html>'
    );
});


app.get('/movie/view/table', function (req, res) {

    var myQry = 'SELECT * FROM TerribleMovies';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;
                res.send('An error occured');

            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>Terrible Movies</h1>';
                responseHTML+='<td><a href="/movie/add">add new movie</a>';
                responseHTML += '<table border=1>'+
                '<tr><th>Title</th>' +
                '<th>Rating</th>' +
                '<th>' +
                '<th>' +
                '<th>' +
                '<th>' +
                '<tr>'
                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Title + '</td>' +
                    '<td>' + result[i].Rating + '</td>' +
                    '<td><a href="/movie/?Title=' + result[i].Title + '">more info</a>' +
                    '<td><a href="/movie/edit?Title='+result[i].Title+'">edit</a>'+
                    '<td><a href="/movie/delete?Title='+result[i].Title+'">delete</a>'+

                    '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

app.get('/movieGenres/view/table', function (req, res) {

    var myQry = 'SELECT * FROM MovieGenre';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;
                res.send('An error occured');

            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>Movie Genres</h1>';
                responseHTML+='<td><a href="/movieGenres/add">add new movie genre</a>';
                responseHTML += '<table border=1>'+
                '<tr><th>Title</th>' +
                '<th>Genre</th>' +
                '<th>' +
                '<th>' +
                '<th>' +
                '<th>' +
                '<tr>'
                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Title + '</td>' +
                    '<td>' + result[i].Genre + '</td>' +
                    '<td><a href="/movieGenres/?Title=' + result[i].Title + '">more info</a>' +
                    '<td><a href="/movieGenres/edit?Title='+result[i].Title+'">edit</a>'+
                    '<td><a href="/movieGenres/delete?Title='+result[i].Title+'">delete</a>'+

                    '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});


app.get('/games/view/table', function (req, res) {

    var myQry = 'SELECT * FROM TerribleGames';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;
                res.send('An error occured');

            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>Terrible Games</h1>';
                responseHTML+='<td><a href="/games/add">add new game</a>';
                responseHTML += '<table border=1>'+
                '<tr><th>Title</th>' +
                '<th>Rating</th>' +
                '<th>' +
                '<th>' +
                '<th>' +
                '<th>' +
                '<tr>'
                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Title + '</td>' +
                    '<td>' + result[i].Rating + '</td>' +
                    '<td><a href="/games/?Title=' + result[i].Title + '">more info</a>' +
                    '<td><a href="/games/edit?Title='+result[i].Title+'">edit</a>'+
                    '<td><a href="/games/delete?Title='+result[i].Title+'">delete</a>'+

                    '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

app.get('/music/view/table', function (req, res) {

    var myQry = 'SELECT * FROM TerribleMusic';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;
                res.send('An error occured');

            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>Terrible Music</h1>';
                responseHTML+='<td><a href="/music/add">add new music</a>';
                responseHTML += '<table border=1>'+
                '<tr><th>Title</th>' +
                '<th>Rating</th>' +
                '<th>' +
                '<th>' +
                '<th>' +
                '<th>' +
                '<tr>'
                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Title + '</td>' +
                    '<td>' + result[i].Rating + '</td>' +
                    '<td><a href="/music/?Title=' + result[i].Title + '">more info</a>' +
                    '<td><a href="/music/edit?Title='+result[i].Title+'">edit</a>'+
                    '<td><a href="/music/delete?Title='+result[i].Title+'">delete</a>'+

                    '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});



app.get('/users/view/table', function (req, res) {

    var myQry = 'SELECT * FROM MUsers';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;
                res.send('An error occured');

            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>Users</h1>';
                responseHTML += '<a href="/users/add">Add new user</a>';
                responseHTML += '<table border=1>'+
                '<tr><th>UserID</th>' +
                '<th>Username</th>' +
                '<th>' +
                '<th>' +
                '<th>' +
                '<th>' +
                '<tr>'
                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].UserID + '</td>' +
                    '<td>' + result[i].Username + '</td>' +
                    '<td><a href="/users/?UserID=' + result[i].UserID + '">more info</a>' +
                    '<td><a href="/users/edit?UserID='+result[i].UserID +'">edit</a>'+
                    '<td><a href="/users/delete?UserID='+result[i].UserID +'">delete</a>'+
                    '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});



app.get('/movie/', function (req, res) {

    var myQry = 'SELECT * FROM TerribleMovies WHERE Title=\'' + req.query.Title+'\'';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;
                res.send('An error occured');

            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>Movie Information</h1>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<ul><li>Title: ' + result[i].Title + '</li>' +
                    '<li>Director: ' + result[i].Director +'</li>'+
                    '<li>Rated by: ' + result[i].UserPosted +'</li>'+
                    '<li>Rating: ' + result[i].Rating + '</li></ul>'


                }

                res.send(responseHTML);
            }
        }
    );
});


app.get('/movieGenres/', function (req, res) {

    var myQry = 'SELECT * FROM MovieGenre WHERE Title=\'' + req.query.Title+'\'';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;
                res.send('An error occured');

            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>Movie Genre Information</h1>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<ul><li>Title: ' + result[i].Title + '</li>' +
                    '<li>Genre: ' + result[i].Genre + '</li></ul>'
                }

                res.send(responseHTML);
            }
        }
    );
});

app.get('/games/', function (req, res) {

    var myQry = 'SELECT * FROM TerribleGames WHERE Title=\'' + req.query.Title + '\'';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;
                res.send('An error occured');

            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>Games Information</h1>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<ul><li>Title: ' + result[i].Title +
                    '<li>Company: ' + result[i].Company +'</li>'+
                    '<li>Rated by: ' + result[i].UserPosted +'</li>'+
                    '</li><li>Rating: ' + result[i].Rating + '</li></ul>'
                }

                res.send(responseHTML);
            }
        }
    );
});

app.get('/music/', function (req, res) {

    var myQry = 'SELECT * FROM TerribleMusic WHERE Title=\'' + req.query.Title+'\'';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;
                res.send('An error occured');

            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>Music Information</h1>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<ul><li>Title: ' + result[i].Title +
                    '<li>Composer: ' + result[i].Composer +'</li>'+
                    '<li>Rated by: ' + result[i].UserPosted +'</li>'+
                    '</li><li>Rating: ' + result[i].Rating + '</li></ul>'
                }

                res.send(responseHTML);
            }
        }
    );
});

app.get('/users/', function (req, res) {

    var myQry = 'SELECT * FROM MUsers WHERE UserID=' + req.query.UserID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                console.log(err);
                throw err;
                res.send('An error occured');

            }
            else {
                // Build the HTML table from the data in the Student table
                var responseHTML = '<h1>User Information</h1>';

                //Dynamic populating rows from the records returned
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<ul><li>UserID: ' + result[i].UserID + '</li><li>Username: ' + result[i].Username + '</li></ul>'
                }

                res.send(responseHTML);
            }
        }
    );
});

app.get('/movie/edit', function(req, res){
    var myQry = 'SELECT * FROM TerribleMovies WHERE Title =\'' +req.query.Title + '\'';

    console.log(myQry);

    connection.query(myQry, function(err, result){
            if (err){
                handleError(res, err);
            }
            else{
                var responseHTML = htmlHeader + '<h1>Edit Movie information</h1>';
                responseHTML += '<form action="/movie/update" method="GET">';
                if (result.length==1){
                    var location =(result[0].UserPosted == null) ? '':result[0].UserPosted;
                    responseHTML += 'Rating: <input type="text" name="Rating" id="Rating" value="'+result[0].Rating
                    +'"/><br />' + 'Director: <input type="text" name="Director" id="Director" value="' +result[0].Director +
                    '" /><br />' + 'UserPosted: <br /><textarea name="UserPosted" id="UserPosted">' + location + '</textarea><br />' + '<input type="hidden" name="Title" id="Title" value="'+result[0].Title+'" />' +'<input type="submit" />'+ '</form>' + htmlFooter;
                    res.send(responseHTML);
                }
                else{
                    res.send('More than one record returned.')
                }
            }
        }
    );
});

app.get('/movieGenres/edit', function(req, res){
    var myQry = 'SELECT * FROM MovieGenre WHERE Title =\'' +req.query.Title + '\'';

    console.log(myQry);

    connection.query(myQry, function(err, result){
            if (err){
                handleError(res, err);
            }
            else{
                var responseHTML = htmlHeader + '<h1>Edit Movie Genre information</h1>';
                responseHTML += '<form action="/movieGenres/update" method="GET">';
                if (result.length==1){

                    responseHTML +='Genre: <input type="text" name="Genre" id="Genre" value=\'' +result[0].Genre +
                    '\' /><br />' + '<input type="hidden" name="Title" id="Title" value=\''+result[0].Title+'\' />'
                    +'<input type="submit" />'+ '</form>' + htmlFooter;
                    res.send(responseHTML);
                }
                else{
                    res.send('More than one record returned.')
                }
            }
        }
    );
});

app.get('/games/edit', function(req, res){
    var myQry = 'SELECT * FROM TerribleGames WHERE Title =\'' +req.query.Title + '\'';

    console.log(myQry);

    connection.query(myQry, function(err, result){
            if (err){
                handleError(res, err);
            }
            else{
                var responseHTML = htmlHeader + '<h1>Edit Movie information</h1>';
                responseHTML += '<form action="/games/update" method="GET">';
                if (result.length==1){
                    responseHTML += 'Rating: <input type="text" name="Rating" id="Rating" value="'+result[0].Rating
                    +'"/><br />' + 'Company: <input type="text" name="Company" id="Company" value=\'' +result[0].Company + '\''+
                    ' /><br />' + 'Posted by: <input type="text" name="UserPosted" id="UserPosted" value='+result[0].Rating+ ' /><br />' +
                    '<input type="hidden" name="Title" id="Title" value="'+result[0].Title+'" />' +
                    '<input type="submit" />'+ '</form>' + htmlFooter;
                    res.send(responseHTML);
                }
                else{
                    res.send('More than one record returned.')
                }
            }
        }
    );
});

app.get('/music/edit', function(req, res){
    var myQry = 'SELECT * FROM TerribleMovies WHERE Title =\'' +req.query.Title+'\'';

    console.log(myQry);

    connection.query(myQry, function(err, result){
            if (err){
                handleError(res, err);
            }
            else{
                var responseHTML = htmlHeader + '<h1>Edit Movie information</h1>';
                responseHTML += '<form action="/music/update" method="GET">';
                if (result.length==1){
                    var location =(result[0].UserPosted == null) ? '':result[0].UserPosted;
                    responseHTML += 'Rating: <input type="text" name="Rating" id="Rating" value="'+result[0].Rating
                    +'"/><br />' + 'Composer: <input type="text" name="Composer" id="Composer" value="' +result[0].Composer +
                    '" /><br />' + 'UserPosted: <br /><textarea name="UserPosted" id="UserPosted">' + location + '</textarea><br />' + '<input type="hidden" name="Title" id="Title" value="'+result[0].Title+'" />' +'<input type="submit" />'+ '</form>' + htmlFooter;
                    res.send(responseHTML);
                }
                else{
                    res.send('More than one record returned.')
                }
            }
        }
    );
});

app.get('/users/edit', function(req, res){
    var myQry = 'SELECT * FROM MUsers WHERE UserID=' + req.query.UserID;

    console.log(myQry);

    connection.query(myQry, function(err, result){
            if (err){
                handleError(res, err);
            }
            else{
                var responseHTML = htmlHeader + '<h1>Edit User information</h1>';
                responseHTML += '<form action="/users/update" method="GET">';
                if (result.length==1){
                    responseHTML += 'Username: <input type="text" name="Username" id="Username" value=\''+result[0].Username +'\''
                    +'/><br />' + '<input type="hidden" name="UserID" id="UserID" value='+result[0].UserID+' />' +'<input type="submit" />'+ '</form>' + htmlFooter;
                    res.send(responseHTML);
                }
                else{
                    res.send('More than one record returned.')
                }
            }
        }
    );
});


app.get('/users/add', function(req,res){
    var responseHTML = htmlHeader;
    responseHTML+='<h1>Insert a User</h1>' +
    '<form action="/users/insert" method="GET">' +
    '<label for="Username">Username</label><input type = "text" name="Username" id="Username" /><br />' +
    '<input type="submit"/>' + '<input type="submit" />' +
    '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

app.get('/movie/add', function(req,res){
    var responseHTML = htmlHeader;
    responseHTML+='<h1>Insert a Movie</h1>' +
    '<form action="/movie/insert" method="GET">' +
    '<label for="Title">Title</label><input type="text" name ="Title" id="Title" />' + '<br />' +
    '<label for="Director">Director</label><input type = "text" name="Director" id="Director" /><br />' +
    '<label for="Rating">Rating</label><input type = "text" name="Rating" id="Rating />'+ '<br />' +
    '<label for="UserPosted">UserPosted</label><input type = "text" name="UserPosted" id="UserPosted /><br />' +
    '<input type="submit"/>' +
    '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

app.get('/movieGenres/add', function(req,res){
    var responseHTML = htmlHeader;
    responseHTML+='<h1>Insert a Movie Genre</h1>' +
    '<form action="/movieGenres/insert" method="GET">' +
    '<label for="Title">Title</label><input type="text" name ="Title" id="Title" />' + '<br />' +
    '<label for="Genre">Genre</label><input type = "text" name="Genre" id="Genre" />'+'<br />' +
    '<input type="submit"/>' +
    '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

app.get('/games/add', function(req,res){
    var responseHTML = htmlHeader;
    responseHTML+='<h1>Insert a Game</h1>' +
    '<form action="/games/insert" method="GET">' +
    '<label for="Title">Title</label><input type="text" name ="Title" id="Title" />' + '<br />' +
    '<label for="Company">Company</label><input type = "text" name="Company" id="Company" /><br />' +
    '<label for="Rating">Rating</label><input type = "text" name="Rating" id="Rating /><br />' +
    '<label for="UserPosted">UserPosted</label><input type = "text" name="UserPosted" id="UserPosted /><br />' +
    '<input type="submit"/>' +
    '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

app.get('/music/add', function(req,res){
    var responseHTML = htmlHeader;
    responseHTML+='<h1>Insert a Music</h1>' +
    '<form action="/music/insert" method="GET">' +
    '<label for="Title">Title</label><input type="text" name ="Title" id="Title" />' + '<br />' +
    '<label for="Composer">Composer</label><input type = "text" name="Composer" id="Composer" /><br />' +
    '<label for="Rating">Rating</label><input type = "text" name="Rating" id="Rating /><br />' +
    '<label for="UserPosted">UserPosted</label><input type = "text" name="UserPosted" id="UserPosted /><br />' +
    '<input type="submit"/>' + '<input type="submit" />' +
    '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

app.get('/users/insert', function(req,res){
    var myQry = 'INSERT INTO MUsers (Username) VALUES (\''+
        req.query.Username
        '\')';

    console.log(myQry);
    connection.query(myQry,
        function (err,result){
            if (err){
                handleError(res, error);
            }
            else{
                connection.query('SELECT * FROM MUsers WHERE UserID = ' + result.insertId,
                    function(err, result){
                        if (err){
                            handleError(res,error);
                        }
                        else if(result.length == 1){
                            res.send(buildUserView(result));
                        }
                        else{
                            res.send('Inserted.');

                        }
                    });
            }
        });
});

app.get('/movieGenres/insert', function(req,res){
    var myQry = 'INSERT INTO MovieGenre(Title, Genre) VALUES (\''+
        req.query.Title+'\','+
        '\''+ req.query.Genre+'\'' +
        ')';

    console.log(myQry);
    connection.query(myQry,
        function (err,result){
            if (err){
                handleError(res, error);
            }
            else{
                connection.query('SELECT * FROM MovieGenre WHERE Title  = \'' + result.insertId +'\'',
                    function(err, result){
                        if (err){
                            handleError(res,error);
                        }
                        else if(result.length == 1){
                            res.send(buildMovieView(result));
                        }
                        else{
                            res.send('Inserted.');

                        }
                    });
            }
        });
});

app.get('/movie/insert', function(req,res){
    var myQry = 'INSERT INTO TerribleMovies (Title, Director, Rating, UserPosted) VALUES (\''+
        req.query.Title+'\','+
        '\''+ req.query.Director+'\', '+
        + req.query.Rating+', '+
        req.query.UserPosted +
        ')';

    console.log(myQry);
    connection.query(myQry,
        function (err,result){
            if (err){
                handleError(res, error);
            }
            else{
                connection.query('SELECT * FROM TerribleMovies WHERE Title  = \'' + result.insertId +'\'',
                    function(err, result){
                        if (err){
                            handleError(res,error);
                        }
                        else if(result.length == 1){
                            res.send(buildMovieView(result));
                        }
                        else{
                            res.send('Inserted.');

                        }
                    });
            }
        });
});

app.get('/games/insert', function(req,res){
    var myQry = 'INSERT INTO TerribleGames (Title, Company, Rating, UserPosted) VALUES (\''+
        req.query.Title+'\','+
        '\''+ req.query.Company+'\', '+
        '\''+ req.query.Rating+'\', '+
        req.query.UserPosted +
        ')';

    console.log(myQry);
    connection.query(myQry,
        function (err,result){
            if (err){
                handleError(res, error);
            }
            else{
                connection.query('SELECT * FROM TerribleGames WHERE Title  = "' + result.insertId +'"',
                    function(err, result){
                        if (err){
                            handleError(res,error);
                        }
                        else if(result.length == 1){
                            res.send(buildGamesView(result));
                        }
                        else{
                            res.send('Inserted.');

                        }
                    });
            }
        });
});

app.get('/music/insert', function(req,res){
    var myQry = 'INSERT INTO TerribleMusic (Title, Composer, Rating, UserPosted) VALUES (\''+
        req.query.Title+'\','+
        '\''+ req.query.Composer+'\', '+
        '\''+ req.query.Rating+'\', '+
        req.query.UserPosted +
        ')';

    console.log(myQry);
    connection.query(myQry,
        function (err,result){
            if (err){
                handleError(res, error);
            }
            else{
                connection.query('SELECT * FROM TerribleMusic WHERE Title  = \'' + result.insertId +'\'',
                    function(err, result){
                        if (err){
                            handleError(res,error);
                        }
                        else if(result.length == 1){
                            res.send(buildMusicView(result));
                        }
                        else{
                            res.send('Inserted.');

                        }
                    });
            }
        });
});


app.get('/users/update', function (req,res){
    var myQry = 'UPDATE MUsers SET Username=\''+req.query.Username+'\' WHERE UserID =' + req.query.UserID;
    console.log(myQry);
    connection.query(myQry,
        function(err,result){
            if (err){
                handleError(res, err);
            }
            else{
                connection.query('SELECT * FROM MUsers WHERE Username = \'' +req.query.Username + '\'', function(err,result){
                    if(err){
                        console.log(err);
                        res.send('an error occurred');}
                    if(result.length==1){
                        res.send(buildUserView(result));
                    }
                    else{
                        res.send('That username has not been inserted.');
                    }
                });
            }}
    );
});

app.get('/movie/update', function (req,res){
    var myQry = 'UPDATE TerribleMovies SET Rating='+req.query.Rating+', Director=\''+req.query.Director+'\', UserPosted=' +req.query.UserPosted + ' WHERE Title=\''+req.query.Title+'\'';
    console.log(myQry);
    connection.query(myQry,
        function(err,result){
            if (err){
                handleError(res, err);
            }
            else{
                connection.query('SELECT * FROM TerribleMovies WHERE Title = \'' +req.query.Title+'\'', function(err,result){
                    if(err){
                        console.log(err);
                        res.send('an error occurred');}
                    if(result.length==1){
                        res.send(buildMovieView(result));
                    }
                    else{
                        res.send('No such title.');
                    }
                });
            }}
    );
});

app.get('/movieGenres/update', function (req,res){
    var myQry = 'UPDATE MovieGenre SET Genre=\''+req.query.Genre+'\' WHERE Title=\''+req.query.Title+'\'';
    console.log(myQry);
    connection.query(myQry,
        function(err,result){
            if (err){
                handleError(res, err);
            }
            else{
                connection.query('SELECT * FROM MovieGenre WHERE Title = \'' +req.query.Title+'\'', function(err,result){
                    if(err){
                        console.log(err);
                        res.send('an error occurred');}
                    if(result.length==1){
                        res.send(buildMovieGenreView(result));
                    }
                    else{
                        res.send('No such title.');
                    }
                });
            }}
    );
});

app.get('/games/update', function (req,res){
    var myQry = 'UPDATE TerribleGames SET Rating='+req.query.Rating+', Company=\''+req.query.Company+'\', UserPosted=' +req.query.UserPosted + ' WHERE Title=\''+req.query.Title+'\'';
    console.log(myQry);
    connection.query(myQry,
        function(err,result){
            if (err){
                handleError(res, err);
            }
            else{
                connection.query('SELECT * FROM TerribleGames WHERE Title = \'' +req.query.Title+'\'', function(err,result){
                    if(err){
                        console.log(err);
                        res.send('an error occurred');}
                    if(result.length==1){
                        res.send(buildGamesView(result));
                    }
                    else{
                        res.send('No such title.');
                    }
                });
            }}
    );
});

app.get('/music/update', function (req,res){
    var myQry = 'UPDATE TerribleMusic SET Rating='+req.query.Rating+', Composer=\''+req.query.Composer+'\', UserPosted=\'"' +req.query.UserPosted + '\' WHERE Title=\''+req.query.Title+'\'';
    console.log(myQry);
    connection.query(myQry,
        function(err,result){
            if (err){
                handleError(res, err);
            }
            else{
                connection.query('SELECT * FROM TerribleMusic WHERE Title = "' +req.query.Title+'"', function(err,result){
                    if(err){
                        console.log(err);
                        res.send('an error occurred');}
                    if(result.length==1){
                        res.send(buildMusicView(result));
                    }
                    else{
                        res.send('No such title.');
                    }
                });
            }}
    );
});




app.get('/users/delete', function(req,res){
    var myQry = 'DELETE FROM MUsers WHERE UserID='+req.query.UserID;

    console.log(myQry);
    connection.query(myQry,
        function(err,result){
            if (err){
                handleError(res,error);
            }
            else{
                res.send('User ' + req.query.UserID+' successfully deleted.');
            }
        }
    );
});

app.get('/movie/delete', function(req,res){
    var myQry = 'DELETE FROM TerribleMovies WHERE Title=\''+req.query.Title+'\'';

    console.log(myQry);
    connection.query(myQry,
        function(err,result){
            if (err){
                handleError(res,error);
            }
            else{
                res.send('Movie "' + req.query.Title+'" successfully deleted.');
            }
        }
    );
});

app.get('/movieGenres/delete', function(req,res){
    var myQry = 'DELETE FROM MovieGenre WHERE Title=\''+req.query.Title+'\'';

    console.log(myQry);
    connection.query(myQry,
        function(err,result){
            if (err){
                handleError(res,error);
            }
            else{
                res.send('MovieGenre "' + req.query.Title+'" successfully deleted.');
            }
        }
    );
});

app.get('/games/delete', function(req,res){
    var myQry = 'DELETE FROM TerribleGames WHERE Title=\''+req.query.Title+'\'';

    console.log(myQry);
    connection.query(myQry,
        function(err,result){
            if (err){
                handleError(res,error);
            }
            else{
                res.send('Game "' + req.query.Title+'" successfully deleted.');
            }
        }
    );
});

app.get('/music/delete', function(req,res){
    var myQry = 'DELETE FROM TerribleMusic WHERE Title=\''+req.query.Title+'\'';

    console.log(myQry);
    connection.query(myQry,
        function(err,result){
            if (err){
                handleError(res,error);
            }
            else{
                res.send('Music "' + req.query.Title+'" successfully deleted.');
            }
        }
    );
});

app.get('/all', function(req,res){
    var myQry = 'SELECT * FROM TerribleMovies UNION ALL SELECT * FROM TerribleMusic UNION ALL SELECT * FROM TerribleGames';
    connection.query(myQry, function(err, result){
        if(err){
            console.log(err);
            res.send(err.toString());
        }
        if(result.length==0){
            res.send('No items in database.')
        }
        else{
            var responseHTML = htmlHeader +
                    '<h1>All Items!</h1>'+
                    '<table border="1">' +
                    '<tr><th>Title</th><th>Rating</th><th>Rated by</th>';
                    for (var i = 0; i < result.length;i++){
                        responseHTML+='<tr>' +
                        '<td>' + result[i].Title + '</td>' +
                        '<td>' + result[i].Rating + '</td>' +
                        '<td>' + result[i].UserPosted + '</td>' +
                        '</tr>'
                    }
            responseHTML+='</table>' + '<p><a href="/"> back </a></p>'
            + htmlFooter;

            res.send(responseHTML);

        }
    });
});

app.get('/showUsernameOfMovieRaters', function(req,res){
    var myQry = 'SELECT * FROM TerribleMovies TM JOIN MUsers MU ON TM.UserPosted=MU.UserID';
    connection.query(myQry, function(err, result){
        if(err){
            console.log(err);
            res.send(err.toString());
        }
        if(result.length==0){
            res.send('No items in database.')
        }
        else{
            var responseHTML = htmlHeader +
                '<h1>Show Username of Movie Raters!</h1>'+
                '<table border="1">' +
                '<tr><th>Title</th><th>Director</th><th>Rating</th><th>Rated by</th><th>Username</th>';
            for (var i = 0; i < result.length;i++){
                responseHTML+='<tr>' +
                '<td>' + result[i].Title + '</td>' +
                '<td>' + result[i].Director + '</td>' +
                '<td>' + result[i].Rating + '</td>' +
                '<td>' + result[i].UserPosted + '</td>' +
                '<td>' + result[i].Username + '</td>' +
                '</tr>'
            }
            responseHTML+='</table>' + '<p><a href="/"> back </a></p>'
            + htmlFooter;

            res.send(responseHTML);

        }
    });
});

// Begin listening

app.listen(8007);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
