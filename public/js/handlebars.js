'use strict';

Handlebars.registerHelper('formatDate', function(date) {
    return moment(date).format("dddd, DD.MM.YYYY");
});

Handlebars.registerHelper('formatDateForm', function(date) {
    return moment(date).format("YYYY-MM-DD");
});

Handlebars.registerHelper('formatState', function(done) {
    return done ? "Checked" : "";
});

Handlebars.registerHelper('formatImportance', function(importance) {
    const gmaxImportance = 5;

    let html = '<span class="staticrating">';
    for (let i = 1; i <= gmaxImportance; i++) {
        if (i <= (gmaxImportance - importance)) {
            html += '<span></span>';
        }
        else {
            html += '<span class="active"></span>';
        }
    }
    html += '</span>';

    return new Handlebars.SafeString(html);
});

Handlebars.registerHelper('checked', function(currentValue) {
return currentValue == true ? ' checked="checked"' : '';
});

Handlebars.registerHelper ('radioChecked', function (value, currentValue) {
    if ( value == currentValue ) {
       return "checked";
    } else {
       return "";
    }
 });