'use strict';

    class Storage {
        constructor() {

        }

        getNoteById(id, callback) {
            let result = ajax("GET", "/note/"+id, undefined, undefined);
            console.log("result = " + result);
            result.done(callback);
        }

        getNotesList(callback) {
            let filter = JSON.parse(localStorage.getItem("finishedfilter")); // true: show finished items
            let order = JSON.parse(localStorage.getItem("order"));
            let result = ajax("GET", `/notes?finishedfilter=${filter}&order=${order}`, undefined, undefined); // do not send JSON object with GET
            //var result = ajax("POST", "/notes", {finishedfilter: filter, order: order}, undefined);
            console.log("aaabb");
            console.log(filter);
            console.log(order);
            console.log(result);
            result.done(callback);
        };


        addNote (entry) {
            ajax("POST", "/note", entry);
        };

        deleteNote (id) {
            console.log("ajax delete id = " + id)
            ajax("DELETE", "/note/" + id);
        };

        updateNote (entry) {
            console.log("storage.js " + entry)
            ajax("PUT", "/note/" + entry._id, entry);
        };

        toggleState(id, done, callback) {
            let result = ajax("PATCH", "/note/" + id, {done: done}, undefined);
            result.done(callback);
        }

        updateDescription(id, descr, callback) {
            let result = ajax("PATCH", "/note/" + id, {description: descr}, undefined);
            result.done(callback);
        }

        updateImportance(id, imp, callback) {
            let result = ajax("PATCH", "/note/" + id, {importance: imp}, undefined);
            result.done(callback);
        }

        setOrderBy (orderBy) {
            localStorage.setItem("order", JSON.stringify(orderBy));
        };

        setFinishedFilter (finishedFilter) {
            let filter = Boolean(finishedFilter);
            localStorage.setItem("finishedfilter", JSON.stringify(filter));
        };

        toggleFinishedFilter () {
            let filter = JSON.parse(localStorage.getItem("finishedfilter"));
            filter = !filter; // invert flag
            localStorage.setItem("finishedfilter", JSON.stringify(filter));
        };

        getStyle () {
            return JSON.parse(localStorage.getItem("style"));
        };

        setStyle (style) {
            localStorage.setItem("style", JSON.stringify(style));
        };

    }

    class ImportanceContainer {

        constructor() {
            // constant
            this.MIN_IMPORTANCE = 0;
            this.MAX_IMPORTANCE = 5;

            // properties
            this.importance = 0;

        }

        set(importance) {
            if (importance >= this.MIN_IMPORTANCE && importance <= this.MAX_IMPORTANCE) {
                this.importance = importance;
            }
        }

        inc() {
            if (this.importance < this.MAX_IMPORTANCE) {
                this.importance += 1;
            }
        }

        dec() {
            if (this.importance > this.MIN_IMPORTANCE) {
                this.importance -= 1;
            }
        }

        get() {
            return this.importance;
        }


    }

// Private
/*
function compareEntry (s1, s2) {
    switch(localStorage.getItem("order")) {
        case "finish":
            return new Date(s1.duedate).getTime() > new Date(s2.duedate).getTime();
            break;
        case "created":
            return new Date(s1.createdate).getTime() > new Date(s2.createdate).getTime();
            break;
        case "importance":
            return s1.importance < s2.importance;
            break;
        default:
            return s1.duedate < s2.duedate;
    }

};*/

function ajax(metod, url, data, headers) {
    return $.ajax({
        dataType: "json",
        contentType: "application/json",
        headers: headers,
        method: metod,
        url: url,
        data: JSON.stringify(data),
    });
}