const Datastore = require('nedb');
const db = new Datastore({
    filename: './data/notes.db',
    autoload: true
});

function Notes(note) {
    const {
        title,
        description,
        importance,
        duedate,
        createdate,
        done
    } = note;
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.duedate = duedate;
    this.createdate = createdate;
    this.done = done;
}

function publicAddNotes(entry, callback) {
    let note = new Notes(entry);
    db.insert(note, function (err, newDoc) {
        if (callback) {
            callback(err, newDoc);
        }
    });
}

function publicRemove(id, callback) {
    db.remove({
        _id: id
    }, function (err, numDeleted) {
        callback(err, numDeleted);
    });
}

function publicUpdate(id, update, callback) {
    db.update({
        _id: id
    }, {
        $set: update
    }, {}, function (err, count) {
        if (callback) {
            callback(err, count);
        }
    });
}

function publicGet(id, callback) {
    db.findOne({
        _id: id
    }, function (err, doc) {
        callback(err, doc);
    });
}

function publicAll(query, callback) {
    let order;
    switch (query.order) {
        case "duedate":
            order = {
                duedate: 1
            };
            break;
        case "createdate":
            order = {
                createdate: 1
            };
            break;
        case "importance":
            order = {
                importance: -1
            };
            break;
        default:
            order = {
                duedate: 1
            };
    }

    let filter;
    if (query.finishedfilter == 'true') {
        // filterfinished = true -> show all items
        filter = {};
    } else {
        filter = {
            done: false
        };
    }

    db.find(filter).sort(order).exec(function (err, docs) {
        callback(err, docs);
    });
}

module.exports = {
    add: publicAddNotes,
    delete: publicRemove,
    get: publicGet,
    all: publicAll,
    update: publicUpdate
};