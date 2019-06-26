const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

function Notes(note)
{
    const { title, details, importance, duedate, createdate, done} = note;
    this.title = title;
    this.details = details;
    this.importance = importance;
    this.duedate = duedate;
    this.createdate = createdate; // einfach stringify? in console idetnisch:
    /*
     duedate: '2017-06-30T10:00:00.000Z',
     createdate: '2017-06-27T19:54:53.044Z',
     */
    this.done = done;
}


function publicAddNotes(entry, callback)
{
    let note = new Notes(entry);
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, currentUser, callback) {
    db.update({_id: id, orderedBy : currentUser}, {$set: {"state": "DELETED"}}, {}, function (err, count) {
        publicGet(id, currentUser, callback);
    });
}

function publicUpdate(id, update, callback) {
    db.update({_id: id}, {$set: update}, {}, function (err, count){
        if(callback){
            callback(err, count);
        }
    });
}

function publicGet(id, callback)
{
    db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(query, callback)
{
    let order;
    switch (query.order) {
        case "duedate":
            order = { duedate: 1 };
            break;
        case "createdate":
            order = { createdate: 1 };
            break;
        case "importance":
            order = { importance: -1 };
            break;
        default:
            order = { duedate: 1 };
    }

    let filter;
    if (query.finishedfilter == 'true') {
        // filterfinished = true -> show all items
        filter = {};
    }
    else {
        filter = {done: false};
    }

    db.find(filter).sort(order).exec( function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAddNotes, delete : publicRemove, get : publicGet, all : publicAll, update : publicUpdate};