'use strict';

    class Storage {
        constructor() {

        }

        getNoteById(id, callback) {
            let result = ajax("GET", "/note/"+id, undefined, undefined);
            console.log("id = " + id);
            result.done(callback);
        }

        getNotesList(callback) {
            let filter = JSON.parse(localStorage.getItem("finishedfilter")); // true: show finished items
            let order = JSON.parse(localStorage.getItem("order"));
            let result = ajax("GET", `/notes?finishedfilter=${filter}&order=${order}`, undefined, undefined); // do not send JSON object with GET
            //var result = ajax("POST", "/notes", {finishedfilter: filter, order: order}, undefined);
            result.done(callback);
        };

        addNote (entry) {
            ajax("POST", "/note", entry);
        };

        deleteNote (id) {
            ajax("DELETE", "/note/" + id);
        };

        updateNote (entry) {
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