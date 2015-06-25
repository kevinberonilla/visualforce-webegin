/* ----------------------------------------
TinyMCE Initialize
---------------------------------------- */
$(document).ready(function() {
    tinymce.init({
        selector: 'textarea.rich-text',
        statusbar: false,
        resize: true,
        height: 198
    });
});