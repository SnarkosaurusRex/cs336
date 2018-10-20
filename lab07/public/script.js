$( document ).ready(function() {
    $( "a" ).click(function( event ) {
        alert( "As you can see, the link no longer took you to jquery.com" );
        event.preventDefault();
    });

    $( "a" ).addClass( "test" );
    $( "a" ).removeClass( "test" );

    $( "button" ).click(function( event ) {
        // event.preventDefault();
        // $("<em>", {html: "no data yet..."}).appendTo("body");

        $.ajax({
        	url: "/hello",
        	data: {
        		name: "lab7"
        	},
        	type: "GET",
        	dataType: "json"
        })

        .done(function( json ) {
        	$("<em>", {html: json}).appendTo("body");
        })

        .fail(function( xhr, status, errorThrown ) {
        	alert("Sorry, there was a problem!");
        	console.log("Error: " + errorThrown);
        	console.log("Status: " + status );
        	console.dir(xhr);
        })

    });

});

