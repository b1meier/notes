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
        $("#items").on("click", bubbledItemEvent);


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

    function bubbledItemEvent(event){
        let itemid = event.target.getAttribute("data-id");
        if (event.target.id == "btnEdit") {
            window.location.replace("edit.html#" + itemid);
        }
        else if (event.target.id == "state") {
            mystorage.toggleState(itemid, event.target.checked, renderItems); // render Items callback after updated
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