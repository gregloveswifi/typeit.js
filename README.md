# typeit.js

Funny jQuery plugin to simulate typing and untyping text.

### Demo
Check out [vria.eu](http://vria.eu/)

### Get it work

-   include JS and CSS

        <link rel="stylesheet" href="{{ asset('vendor/typeit/typeit.css') }}">
        <script type="text/javascript" src="{{ asset('vendor/typeit/typeit.js') }}"></script>


    Please respect this structure for now to get correct results.
    
-   add this HTML:

        <span id="typeit">&zwnj;<span class="typed">this plugin is awesome</span><span class="untyped"></span><span class="cursor blinking">|</span></span>

    Please, respect this tag structure.

-   use `$.typeit(array_of_phrases, object_of_options)`:

        $('#typeit').typeit([
            {phrase: "this plugin is awesome", color: "#2196F3"},
            {phrase: "you'd rather use it", color: "#F44336"},
            {phrase: "it would be nice to say hello to the author", color: "#00B300"}
        ]);

    Default options are

        {
            typeInterval: 100, // Interval of typing
            unTypeInterval: 50, // Interval of untyping
            unTypeDelay: 5000, // Delay before the phase starts being untyped (all phrase is visible)
            deleteDelay: 500, // Delay before the phase is deleted (all phrase is visible selected)
            typeDelay: 1000 // Delay before the phase starts being typed (only cursor is visible)
        }
