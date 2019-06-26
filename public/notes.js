const notes_orig = [
    {"id": "01", "due": "2019-09-23", "created": "2019-06-19", "title": "Selbststudium", "description": "bla blaaf<br />a dsflak <br />a sfd", "priority": 3, "finished": "1"},
    {"id": "02", "due": "2019-08-23", "created": "2019-06-18", "title": "Einkaufen", "description": "bla bla", "priority": 2, "finished": "1"},
    {"id": "03", "due": "2019-07-23", "created": "2019-06-19", "title": "Bier bestellen", "description": "bla bla", "priority": 1, "finished": "0"},
    {"id": "04", "due": "2019-10-23", "created": "2019-06-19", "title": "Aufräumen", "description": "bla bla", "priority": 0, "finished": "0"},
    {"id": "05", "due": "2019-09-22", "created": "2019-06-19", "title": "Fenster putzen", "description": "bla bla", "priority": 0, "finished": "1"},
    {"id": "06", "due": "2019-09-05", "created": "2019-06-17", "title": "Harmonium üben", "description": "bla bla", "priority": 0, "finished": "0"},
    {"id": "07", "due": "2019-09-17", "created": "2019-06-17", "title": "Kinder erziehen", "description": "bla bla", "priority": 0, "finished": "0"}
];

const notes = getFromLocalStorage();

function loadDefaultData() {
    let notes = notes_orig;
	localStorage.setItem("notes.items", JSON.stringify(notes));
	location.reload();
}

function getFromLocalStorage() {
        let retrievedObject = localStorage.getItem("notes.items");
		console.log(retrievedObject);
        return JSON.parse(retrievedObject);
}

function compareNotes(n1, n2) {
    return n2.priority - n1.priority;
}

function notesSorted1(){
    return [...notes].sort(compareNotes);
}

function notesSorted(){
//	let notes = getFromLocalStorage();
//	console.log(notes);
	//console.log([...notes].sort(compareNotes));
    return [...notes].sort(compareNotes);
}

function findNote(id) {
    return notes.find(notes => parseInt(id) === parseInt(notes.id));
}

function rateNote(noteId, delta) {
    let notes = findNote(noteId);

    if(notes) {
        notes.priority += delta;
        return true;
    }
    return false;
}

function updateField(noteId, field, value) {
    let notes = findNote(noteId);

    if(notes) {
		console.log("bbbbbbb");
		console.log(field);
		console.log(notes[field]);
        notes[field] = value;
		console.log(value);
		console.log(notes[field]);
        return true;
    }
    return false;
}