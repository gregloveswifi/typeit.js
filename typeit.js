(function ( $ ) {

    var ACTION_TYPED = "TYPED";
    var ACTION_UNTYPING = "UNTYPING";
    var ACTION_UNTYPED = "UNTYPED";
    var ACTION_TYPING = "TYPING";
    var ACTION_DELETED = "DELETED";

    var TypeItController = function(element, phrases, options) {
        var controller = this;

        controller.options = options;

        controller.elements = {
            typed: element.find('.typed'),
            untyped: element.find('.untyped'),
            cursor: element.find('.cursor')
        };

        controller.phrases = phrases;

        controller.state = {
            state: "TYPED",
            delayToNextAction: controller.options.unTypeDelay,
            phraseIndex: 0,
            letterIndex: 0
        };

        this.iterate = function() {
            controller.state.delayToNextAction -= controller.options.interval;
            //console.log(controller.state.state, controller.state.delayToNextAction);
            if (controller.state.delayToNextAction <= 0) {
                switch (controller.state.state) {
                    case ACTION_TYPED:
                        controller.state.state = ACTION_UNTYPING;
                        controller.state.delayToNextAction = controller.options.unTypeInterval;
                        controller.elements.cursor.addClass('hide');
                        break;
                    case ACTION_UNTYPING:
                        var typedText = controller.elements.typed.text();
                        var unTypedText = controller.elements.untyped.text();
                        controller.elements.untyped.text(typedText.slice(-1) + unTypedText);
                        controller.elements.typed.text(typedText.slice(0, -1));

                        controller.state.delayToNextAction = controller.options.unTypeInterval;

                        if (typedText.length <= 1) {
                            controller.state.state = ACTION_UNTYPED;
                            controller.state.delayToNextAction = controller.options.deleteDelay;
                        }
                        break;
                    case ACTION_UNTYPED:
                        controller.state.state = ACTION_DELETED;
                        controller.state.phraseIndex++;
                        if (controller.state.phraseIndex >= controller.phrases.length) { controller.state.phraseIndex = 0; }
                        controller.state.letterIndex = 0;
                        controller.state.delayToNextAction = controller.options.typeDelay;

                        controller.elements.untyped.text("");
                        controller.elements.cursor.removeClass('hide');
                        controller.elements.cursor.css({color: controller.phrases[controller.state.phraseIndex].color});
                        controller.elements.typed.css({color: controller.phrases[controller.state.phraseIndex].color});
                        controller.elements.untyped.css({color: controller.phrases[controller.state.phraseIndex].color});
                        break;
                    case ACTION_DELETED:
                        controller.state.state = ACTION_TYPING;
                        controller.state.delayToNextAction = controller.options.typeInterval;
                        controller.elements.cursor.removeClass('blinking');
                        break;
                    case ACTION_TYPING:
                        controller.state.letterIndex++;
                        controller.elements.typed.text(
                            controller.phrases[controller.state.phraseIndex].phrase.slice(0, controller.state.letterIndex)
                        );
                        controller.state.delayToNextAction = controller.options.typeInterval;

                        if (controller.phrases[controller.state.phraseIndex].phrase.length <= controller.state.letterIndex) {
                            controller.state.state = ACTION_TYPED;
                            controller.state.delayToNextAction = controller.options.unTypeDelay;
                            controller.elements.cursor.addClass('blinking');
                        }
                        break;
                }
            }
        }
    };

    $.fn.typeit = function( phrases, options ) {

        options = $.extend({
            interval: 50,
            typeInterval: 50,
            unTypeInterval: 50,
            unTypeDelay: 3000,
            deleteDelay: 100,
            typeDelay: 750
        }, options);

        return this.each(function() {
            var t = new TypeItController( $( this ), phrases, options );
            var interval = setInterval(t.iterate, 100);
        });

    };


}( jQuery ));