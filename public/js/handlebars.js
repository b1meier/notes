'use strict';

Handlebars.registerHelper('formatDate', function(date) {
    return moment(date).format("dddd, DD.MM.YYYY");
});

Handlebars.registerHelper('formatDateForm', function(date) {
    return moment(date).format("YYYY-MM-DD");
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