
var MongoClient = require('mongodb').MongoClient;
MongoClient.ObjectId = require('mongodb').ObjectId;
MongoClient.result = {};

var url = 'mongodb://localhost/test';

MongoClient.GetTodos = function (fn) {

    MongoClient.connect(url, function (err, db) {
        if (err) console.log(err);
        else {

            // console.log("connection Established!"); Debug Purpose

            var collection = db.collection('todos');

            collection.find({}).toArray(function (err, result) {

                /* console.log(result.length) Debug purpose */

                if (err) console.log(err)

                else if (result.length > 0) {

                    module.exports.result = result;

                }

                else {
                    
                    module.exports.result = {}; /* In case there is no document , we need to clear the data! */

                   // console.log('no document there!') Debug Purpose
                }

                fn();
                db.close();
            });
        }
    });
}

MongoClient.PostTodo = function (value) {

    MongoClient.connect(url, function (err, db) {

        var collection = db.collection('todos');

        /*  console.log(value);  Debug Purpose */

        collection.insert(value);
    });
}

MongoClient.DeleteTodo = function (obj) {

    MongoClient.connect(url, function (err, db) {

        var collection = db.collection('todos');
        
        // // console.log(obj.text + 'has been deleted!'); /// Debug Purpose
        // console.log(obj._id);                           /// Debug Purpose

        // console.log('remove function returned : ' + collection.remove(obj)); /// Debug Purpose
        
        collection.remove(obj);
    });
}

module.exports = MongoClient;
