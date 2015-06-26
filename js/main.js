/* ----------------------------------------
Accordion Functions
---------------------------------------- */
$(document).ready(function() {
   var accordion = $('.accordion');
    
    accordion.click(function() {
        $(this).toggleClass('open');
        $('+ .accordion-content', this).stop().slideToggle(250);
    });
});

/* ----------------------------------------
TinyMCE Initialize
---------------------------------------- */
$(document).ready(function() {
    tinymce.init({
        selector: 'textarea.rich-text',
        statusbar: false,
        resize: true,
        height: 190
    });
});

/* ----------------------------------------
Tooltipster Initialize
---------------------------------------- */
$(document).ready(function() {
    $('.tooltip').tooltipster({
        delay: 0,
        animation: 'fade',
        touchDevices: true,
        trigger: 'hover',
        speed: 250
    });
});

/* ----------------------------------------
jQuery UI Autocomplete Initialize
---------------------------------------- */
$(document).ready(function() {
    var choices = [
        'ActionScript',
        'AppleScript',
        'Asp',
        'BASIC',
        'C',
        'C++',
        'Clojure',
        'COBOL',
        'ColdFusion',
        'Erlang',
        'Fortran',
        'Groovy',
        'Haskell',
        'Java',
        'JavaScript',
        'Lisp',
        'Perl',
        'PHP',
        'Python',
        'Ruby',
        'Scala',
        'Scheme'
    ];
    $('.auto-complete').autocomplete({
        source: choices
    });
});

/* ----------------------------------------
jQuery UI Date Picker
---------------------------------------- */
$(document).ready(function() {
    $('.date-picker').datepicker({
        dateFormat: 'mm/dd/yy',
        showAnim: ''
    });
});
