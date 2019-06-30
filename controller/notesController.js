const store = require("../services/notesStore.js");


module.exports.showIndex = function(req, res){
    res.redirect('/index.html');
};

module.exports.createNote = function(req, res)
{
    let note = req.body;
    note.createdate = new Date().valueOf(); // add create date

    console.log("note = "+ note.title + note.description);
    store.add(note, function(err, note) {
        res.format({
            'application/json': function(){
                res.json(note);
            }
        });
    });
};

module.exports.editNote = function(req, res)
{
    store.update(req.params.id, req.body, function(err, order) {
//     let order = store.update({_id: req.params.id}, { $set: { system: 'solar system' } }, { multi: false }, function(err, order) {
        console.log("edit notes");
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.showNotes = function(req, res)
{
    console.log("aa22211");
    store.all(req.query, function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.showNote = function(req, res)
{
    console.log("show note");
    store.get(req.params.id, function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};

module.exports.deleteNote =  function (req, res)
{
    store.delete(req.params.id, 'duedate', function(err, order) {
        res.format({
            'application/json': function(){
                res.json(order);
            }
        });
    });
};
