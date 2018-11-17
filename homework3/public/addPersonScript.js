$(document).ready(function () {
  $( 'form' ).submit(function( event ) {
    event.preventDefault();

    var form = $( this );

    let jsPromise = Promise.resolve($.ajax({
      type: 'POST',
      url: '/people',
      data: form.serialize(),
      dataType: 'json',
      success: function( resp ) {
        console.log( resp );
        $( 'form')[0].reset();
      }
    }));
    jsPromise.then(function (result) {
        console.log('AJAX request succeeded...');
        $('form').next("div").html("<p>" + result + "</p>");
    }, function (xhr) {
        console.log('AJAX request failed...');
        $('form').next("div").html("<p>" + xhr.statusText + "</p>");
    });

  });
});
