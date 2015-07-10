/* ----------------------------------------
Accordion Functions
---------------------------------------- */
$(document).ready(function() {
   var accordion = $('.accordion');
    
    accordion.click(function(e) {
        e.preventDefault();
        
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
Dropdown Button Functions
---------------------------------------- */
$(document).ready(function() {
    var dropdown = $('.dropdown'),
        dropdownOptions = $('.dropdown-options');
    
    dropdown.each(function() { // Set options width to match button on load
        var buttonWidth = $(this).outerWidth();
         $('+ .dropdown-options', this).css('min-width', buttonWidth + 'px');
    });
    
    $(document).click(function() {
        dropdownOptions.hide();
    });
    
    dropdown.click(function(e) {
        e.stopPropagation(); // Don't alert document of this click
        
        if ($('+ .dropdown-options', this).length > 0) {
            $('+ .dropdown-options', this).show();
        } else {
            console.error('No immediate sibling with the "dropdown-options" class exists.');
        }
    });
});

/* ----------------------------------------
Alert Functions
---------------------------------------- */
$(document).ready(function() {
    var alertElement = $('.alert'),
        openAlertLink = $('.open-alert'),
        closeAlertLink = $('.close-alert');
    
    closeAlertLink.click(function() {
        $(this).parent()
            .stop()
            .slideUp(250);
    });
    
    openAlertLink.click(function(e) {
        e.preventDefault();
        
        var alertId = $(this).data('alert-id'),
            targetAlert = $('#' + alertId);
        
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
            revealElement.each(function() {
                if (!$(this).hasClass('visible') && $(window).scrollTop() + positionTrigger >= $(this).offset().top) {
                    $(this).addClass('visible');
                    revealCount++;
                }
            });
            if (revealCount >= revealLength) { // Unbind if all elements have been revealed
                $(window).unbind('scroll', reveal);
            }
        }
        
        reveal(); // Show visisble elements on load
        
        $(window).on('scroll', reveal);
    }
});

/* ----------------------------------------
Quick Modal Plugin (Edited for Salesforce1)
---------------------------------------- */
(function($) { // Protect the $ alias (IIF)
    $.fn.quickModal = function(args) {
        if (!$('#modal-background').length) $('body .scope').append('<div id="modal-background"></div>'); // Append background; do not append if re-initialized or background already exists
        
        if (args !== null && typeof args === 'string') { // If calling a method
            var bodyTag = $('body'),
                closeModalLink = $('.close-modal'),
                modalBackground = $('#modal-background'),
                targetModal = this;
            
            switch (args) {
                case 'open':
                    bodyTag.addClass('disable-scroll');
                    modalBackground.show();
                    targetModal.show();
                    setTimeout(function() { // Ensure elements are displayed before adding classes
                        modalBackground.addClass('visible');
                        targetModal.addClass('visible');
                    }, 25);
                    targetModal.trigger('modalopen'); // Trigger custom 'open' event
                    
                    closeModalLink.click(function(e) { // Bind events based on options
                        e.preventDefault();
                        targetModal.quickModal('close');
                    });
                    
                    $(document).keyup(function(e) {
                        if (e.keyCode == 27) targetModal.quickModal('close'); // Esc
                    });
                    
                    modalBackground.click(function() {
                        targetModal.quickModal('close');
                    });
                    break;
                    
                case 'close':
                    bodyTag.removeClass('disable-scroll');
                    modalBackground.removeClass('visible');
                    targetModal.removeClass('visible');
                    setTimeout(function() {
                        modalBackground.hide();
                        targetModal.hide();
                        targetModal.trigger('modalclose'); // Trigger custom 'close' event
                    }, 250);
                    break;
            }
        } else { // If initializing plugin with options
            var settings = $.extend({ // Extend the default settings established below
                    modalWindowClass: '.modal',
                    closeModalClass: '.close-modal'
                }, args),
                bodyTag = $('body'),
                openModalLink = this,
                modalWindow = $(settings.modalWindowClass),
                closeModalLink = $(settings.closeModalClass),
                modalBackground = $('#modal-background');
            
            function closeModal() {
                var visibleModal = $(settings.modalWindowClass + '.visible');
                
                visibleModal.quickModal('close');
            }
            
            openModalLink.click(function(e) {
                e.preventDefault();
                
                var modalId = $(this).data('modal-id'),
                    targetModal = $('#' + modalId);
                
                if (modalId === undefined) console.error('No "data-modal-id" attribute is set.');
                
                targetModal.quickModal('open');
            });
            
            closeModalLink.click(function(e) { // Bind events based on options
                e.preventDefault();
                closeModal();
            });
            
            $(document).keyup(function(e) {
                if (e.keyCode == 27) closeModal(); // Esc
            });
            
            modalBackground.click(closeModal);
        }
        
        return this; // Return the object to enable chaining
    }
}(jQuery));

$(document).ready(function() {
    $('.open-modal').quickModal(); // Initialize plugin
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
