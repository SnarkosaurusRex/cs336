$( document ).ready(function() {
    $( "a" ).click(function( event ) {
        alert( "As you can see, the link no longer took you to jquery.com" );
        event.preventDefault();
    });

    $( "a" ).addClass( "test" );
    $( "a" ).removeClass( "test" );

    $( "button" ).click(function( event ) {
        event.preventDefault();
        $("<em>", {html: "no data yet..."}).appendTo("body");
    });
});
