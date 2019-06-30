;( function() {
    // closure scope
    'use strict';

    $(document).ready(function () {
        $("#btnNew").on("click", createNew);
        $("#styleselect").on("change", saveStyle);
        $("#btnFinishDate").on("click", orderByFinish);
        $("#btnCreatedDate").on("click", orderByCreated);
        $("#btnImportance").on("click", orderByImportance);

        $("#btnFinished").on("click", showFinished);

        // append listener over complete item list to prevent listener memory leaks while dom changes
        $("#container").on("click", bubbledItemEventOnClick);
        $("#container").on("change", bubbledItemEventOnChange);

        renderStyle();
        renderItems();
    });

    let mystorage = new Storage();
    const entryHtml = Handlebars.compile(document.getElementById("entry-template").innerText);

    function renderItems() {
        console.log("bbb222");
        // since storage is rest interface from server (give asynch callback function)
        mystorage.getNotesList(function( data ) {
            $("#container").html(entryHtml(data));
        });
    }

    function createNew(){
        window.location.replace("edit.html");
    }

    function bubbledItemEventOnClick(event){
        console.log("bubbled");
        let itemid = event.target.getAttribute("data-id");
        console.log(itemid);
        console.log("klass = " + event.target.getAttribute("class") + ", " + event.target.id);
        console.log(event.target.getAttribute("data-id"));
        if (event.target.id == "btnEdit") {
            window.location.href = "edit.html#" + itemid;
        }
        if (event.target.id == "btnDelete") {
            mystorage.deleteNote(itemid);
        }
        else if (event.target.id == "finished") {
            console.log("toggle " + event.target.checked);
            mystorage.toggleState(itemid, event.target.checked, renderItems); // render Items callback after updated
        }
        else if (event.target.getAttribute("class") == "importance_input") {
            itemid = event.target.name;
            console.log(itemid);
                console.log("change priority" + event.target.value);
                mystorage.updateImportance(itemid, event.target.value, renderItems);
        }
    }

    function bubbledItemEventOnChange(event){
        console.log("bubbled on change");
        let itemid = event.target.getAttribute("data-id");
        console.log(itemid);
        if (event.target.id == "description") {
            console.log("change description");
            mystorage.updateDescription(itemid, event.target.value, renderItems);
        }
    }

    function saveStyle(e) {
        mystorage.setStyle($("#styleselect").val());
        renderStyle();
    }

    function orderByFinish() {
        mystorage.setOrderBy("duedate");
        renderItems();
    }

    function orderByCreated() {
        mystorage.setOrderBy("createdate");
        renderItems();
    }

    function orderByImportance() {
        mystorage.setOrderBy("importance");
        renderItems();
    }

    function showFinished() {
        mystorage.toggleFinishedFilter();
        renderItems();
    }

    function renderStyle() {
        let cssStyle = mystorage.getStyle();
        if (cssStyle) {
            $("#styleselect").val(cssStyle);
            document.getElementById("style").href = "css/" + cssStyle + ".css";
        }
    }

} ());