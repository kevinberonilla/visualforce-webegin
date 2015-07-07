/* ----------------------------------------
Accordion Functions
---------------------------------------- */
$(document).ready(function() {
   var accordion = $('.accordion');
    
    accordion.click(function() {
        if ($('+ .accordion-content', this).length > 0) {
            $(this).toggleClass('open');
            $('+ .accordion-content', this).stop()
                .slideToggle(250);
        } else {
            console.error('No immediate sibling with the "accordion-content" class exists.');
        }
    });
});

/* ----------------------------------------
Alert Functions
---------------------------------------- */
$(document).ready(function() {
    var alertElement = $('.alert'),
        openAlert = $('.open-alert'),
        closeAlert = $('.alert.dismissible').after();
    
    closeAlert.click(function() {
        $(this).stop()
            .slideUp(250);
    });
    
    openAlert.click(function(e) {
        e.preventDefault();
        
        var targetId = $(this).data('target-id'),
            targetAlert = $('#' + targetId);
        
        targetAlert.stop()
            .slideDown(250);
    });
});

/* ----------------------------------------
Progress Functions
---------------------------------------- */
$(document).ready(function() {
    
    $('.progress').each(function() {
        var progressPercentage = $(this).data('percentage');
        
        $(this).css('width', progressPercentage + '%');
    });
});

/* ----------------------------------------
Reveal Functions
---------------------------------------- */
$(document).ready(function() {
    var revealElement = $('.reveal'),
        revealLength = revealElement.length,
        revealCount = 0;
    
    if (revealLength > 0) {
        var windowHeight = $(window).height(),
            positionTrigger = windowHeight * 0.8;
        
        $(window).resize(function() { // Reset if window is resized
            windowHeight = $(window).height();
            positionTrigger = windowHeight * 0.8;
        });
        
        function reveal() {
            console.log('scroll');
            revealElement.each(function() {
                if (!$(this).hasClass('visible') && $(window).scrollTop() + positionTrigger >= $(this).offset().top) {
                    $(this).addClass('visible');
                    revealCount++;
                }
            });
            if (revealCount >= revealLength) { // Unbind if all elements have been revealed
                $(window).unbind('scroll');
            }
        }
        
        reveal(); // Show visisble elements on load
        
        $(window).scroll(reveal);
    }
});

/* ----------------------------------------
Modal Functions
---------------------------------------- */
$(document).ready(function() {
    var bodyTag = $('body'),
        openModal = $('.open-modal'),
        modalWindow = $('.modal'),
        closeModal = $('.close-modal');
    
    if (openModal.length > 0) { // Add modal background if modal links are present
        $('.scope').append('<div id="modal-background"></div>');
        
        var modalBackground = $('#modal-background');
    }
    
    function closeModals() {
        bodyTag.removeClass('disable-scroll');
        modalBackground.removeClass('visible');
        modalWindow.removeClass('visible');
        setTimeout(function() {
            modalBackground.hide();
            modalWindow.hide();
        }, 250);
    }
    
    openModal.click(function(e) {
        e.preventDefault();
        
        var targetId = $(this).data('target-id'),
            targetModal = $('#' + targetId);
        
        bodyTag.addClass('disable-scroll');
        modalBackground.show();
        targetModal.show();
        setTimeout(function() { // Ensure elements are displayed before adding classes
            modalBackground.addClass('visible');
            $('#' + targetId).addClass('visible');
        }, 25);
    });
    
    closeModal.click(function(e) {
        e.preventDefault();
        closeModals();
    });
    
    $(document).keyup(function(e) {
        if (e.keyCode == 27) closeModals(); // Esc
    });
    
    modalBackground.click(closeModals);
});

/* ----------------------------------------
TinyMCE Initialize
---------------------------------------- */
$(document).ready(function() {
    tinymce.init({
        selector: 'textarea.rich-text',
        statusbar: false,
        resize: true,
        height: 192
    });
});

/* ----------------------------------------
Tag-it Initialize
---------------------------------------- */
$(document).ready(function() {
    $('.tags').tagit({
        allowSpaces: true,
        
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
    $('.autocomplete').each(function() { // Set list data for each
        var autocompleteList = eval($(this).data('list')); // Use eval() to interpolate
        
        $(this).autocomplete({
            source: autocompleteList
        });
    });
});

/* ----------------------------------------
jQuery UI Date Picker Initialize
---------------------------------------- */
$(document).ready(function() {
    $('.date-picker').datepicker({
        dateFormat: 'mm/dd/yy',
        showAnim: ''
    });
});
