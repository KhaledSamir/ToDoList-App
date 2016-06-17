var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var client = require('./MongoManager');
var ObjectId = client.ObjectId;
var port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/public', express.static(__dirname + '/public')); /* let Express knows about the public folder so, it can acces its resources */

app.get('/Todos', function (req, res) {
    client.GetTodos(function () {
        res.send(client.result);
    });
});

app.post('/Todos/PostData', function (req, res) {

    // console.log('Request Body is : ' + req.body); // Debug Purpose 

    client.PostTodo(req.body);
    res.end();
});

app.delete('/:id', function (req, res) {

    client.DeleteTodo({_id: ObjectId(req.params.id.toString())});
    res.end();
    
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(port, function () {
    console.log('Server started at ' + port + ' successfully!');
});