# typeit.js

Funny jQuery plugin to simulate typing and untyping text.

### Demo
Download source files or check out this site [vria.eu](http://vria.eu/).

### Get it work

-   HTML 

        <span id="typeit">&zwnj;<span class="typed">this plugin is awesome</span><span class="untyped"></span><span class="cursor blinking">|</span></span>
    
    Please respect this structure for now to get correct results.
    
-   JS

    include `typeit.js`

        $('#typeit').typeit([
            {phrase: "this plugin is awesome", color: "#2196F3"},
            {phrase: "you'd rather use it", color: "#F44336"},
            {phrase: "it would be nice to say hello to the author", color: "#00B300"}
        ]);

    Options will be described later

-   CSS

    include `typeit.css`