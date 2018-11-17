$(document).ready(function () {
  $( 'form' ).submit(function( event ) {
    event.preventDefault();

    var form = $( this );

    let jsPromise = Promise.resolve($.ajax({
      type: 'GET',
      url: '/person/' + $('#logId').val(),
      success: function( resp ) {
        console.log( resp );
      }
    }));
    jsPromise.then(function (result) {
        console.log('AJAX request succeeded...');
        $("#result").next("div").html("<p>" + JSON.stringify(result) + "</p>");
    }, function (xhr) {
        console.log('AJAX request failed...');
        $("#result").next("div").html("<p>" + xhr.statusText + "</p>");
    });

  });
});
