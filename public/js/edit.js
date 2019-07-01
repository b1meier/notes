'use strict';

(function() {
    // closure scope

    let mystorage = new Storage();
    const entryHtml = Handlebars.compile(document.getElementById("form-template").innerText);

    $(document).ready(function () {
        //$("#title").val('Initialwerte Titel falls noetig');
        console.log("aaa");
        renderStyle();
        console.log("bbb");
        let id =window.location.hash.substring(1); // $_GET[#id]
        if (id.length > 0) {
            console.log("ccc");
            mystorage.getNoteById(id, createEditForm);
            console.log("ccc3");
        }
        else {
            console.log("ddd");
            let item = {
                importance: 1, // default importance new form
                state: "open"
            };
            createEditForm(item);
        }

    });

    function createEditForm(item) {
        console.log("eee");
        //Importance.set(item.importance);
        $("#form-container").html(entryHtml(item)); // innerHTML=entryHtml(songs.sort(compareSongs));
        console.log("fff");
        //showImportance();
        console.log("ggg");
        $("#btnSave").on("click", save);
        $("#btnCancel").on("click", cancel);
        /*$("#dueDate").datepicker({
            dateFormat: "DD, dd.mm.yy" //"dd.mm.yy"
        }); */
    }

    function save(){
        let entry = new Object();
        entry._id = $("#_id").val();
        entry.title = $("#title").val();
        console.log("abc " + entry.title);
        entry.description = $("#description").val();
        // entry.importance = Importance.get();
        // entry.importance = $("#importance").val();
        entry.importance = $("input[name='rating']:checked").val();
        console.log("date " + $("#dueDate").val());
        entry.duedate = createTimeStamp($("#dueDate").val());
        console.log(entry.duedate);
        //entry.createdate = new Date().valueOf(); // set create date at server: local timezone doesn't matter for createdate
        

            if (entry._id.length > 0) {
                // id is set -> update entry
                mystorage.updateNote(entry);
                window.location.href = "index.html";
            }
            else {
                // id is empty -> add new note
                entry.done = false;
                console.log("entry = " + entry);
               mystorage.addNote(entry);
               window.location.href = "index.html";
            }
        
    }

    function createTimeStamp(datestring) {
        // create TimeStamp (Date) from date field string: Thursday, 15.06.2017
        let date = datestring.split("-"); // separate day, Date
        //let date = timedaysplit[1].split("."); // use Date only [1] for calculation
        //console.log(date);
        let duedate = new Date(date[0], date[1]-1, date[2]); // JS special: month starts with zero: January = 0
        duedate.setHours(12); // Save timestamp at 12:00 at actual timezone (if user changes timezone to +/-12h (showed date is not the same, but the moment is still the same!)
        return duedate.valueOf();
    }

    function cancel(){
        window.location.href = "index.html";
    }

    function renderStyle() {
        let cssStyle = mystorage.getStyle();
        if (cssStyle) {
            $("#styleselect").val(cssStyle);
            document.getElementById("style").href = "css/" + cssStyle + ".css";
        }
    }

} ());