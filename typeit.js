jQuery.fn.blinker = function( options ) {
    function stopBlink( element ) {
        if (element.interval != undefined) {
            clearInterval(element.interval);
        }
        delete element.interval;
    }

    function startBlink(element) {
        if (element.interval == undefined) {
            element.interval = setInterval(function () {
                $(element).fadeToggle(settings.fadeDuration);
            }, settings.delay);
        }
    }

    if (typeof options == "string") {
        options = {action: options};
    }

    var settings = $.extend({
        action: "blink",
        fadeDuration: 200,
        delay: 500,
    }, options );

    return this.each(function() {
        switch (settings.action) {
            case "show":
                stopBlink(this);
                $(this).fadeIn(settings.fadeDuration);
                break;
            case "hide":
                stopBlink(this);
                $(this).fadeOut(settings.fadeDuration);
                break;
            default:
                startBlink(this);
        }
    });
};

jQuery.fn.typeit = function(options) {

    function typeLetterByLetter(element, text, onFinish) {
        if (text.length > 0) {
            element.text(element.text() + text[0]);
            setTimeout(function() { typeLetterByLetter(element, text.substr(1), onFinish); }, 100);
            return;
        }
        if (typeof onFinish == "function") {
            onFinish.call();
        }
    }

    function type(element, text, onUnTypeFinish) {
        var container = element.find('.typeit');
        if (container.length == 0) {
            container = $('<span class="typeit"><span>');
            element.append(container);
        }

        var typedText = container.find('.typed');
        if (typedText.length == 0) {
            typedText = $('<span class="typed"></span>');
            container.append(typedText);
        }

        var cursor = container.find(".cursor");
        if (cursor.length == 0) {
            cursor = $('<span class="cursor">|</span>').blinker({action: "show"});
            container.append(cursor);
        }

        typeLetterByLetter(typedText, text, function() {
            cursor.blinker();
            setTimeout(function() { unType(container, onUnTypeFinish); }, 3000);
        });
    }

    function unTypeLetterByLetter(typed, untyped, onFinish) {
        var typedText = typed.text();
        var unTypedText = untyped.text();

        if (typedText.length > 0) {
            untyped.text(typedText.slice(-1) + unTypedText);
            typed.text(typedText.slice(0, -1));
            setTimeout(function() { unTypeLetterByLetter(typed, untyped, onFinish); }, 100);
            return;
        }
        if (typeof onFinish == "function") {
            onFinish.call();
        }
    }

    function unType(container, onFinish) {
        var cursor = container.find(".cursor");
        cursor.blinker("hide");

        var typed = container.find('.typed');
        var untyped = $('<span class="untyped" style="color: white; background-color: blue;"></span>');
        typed.after(untyped);

        unTypeLetterByLetter(typed, untyped, function(){
            untyped.remove();
            cursor.blinker();
            if (typeof onFinish == "function") {
                onFinish.call();
            }
        });
    }

    /* Circular array */
    options.text.currentIndex = 0;
    options.text.getCurrent = function() {
        return this[this.currentIndex];
    };
    options.text.getNext = function() {
        this.currentIndex++;
        if (this[this.currentIndex] == undefined) { this.currentIndex = 0; }
        return this.getCurrent();
    };


    return this.each(function(){
        var element = $(this);
        var onUnTypeFinish = function() {
            type(element, options.text.getNext(), onUnTypeFinish);
        };

        type(element, options.text.getCurrent(), onUnTypeFinish);
    });
};