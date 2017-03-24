apiKey = "yM898o598jOYl77EYKtVy8OnJbOjzRGl";

$(function(){
   

var jqxhr = $.getJSONP( "https://api.behance.net/v2/users/bananascivolare?client_id=" + apiKey + "&callback=myCallbackFunction", function() {
  console.log( "success" );
})
  .done(function(data) {
    console.log( "second success" );
    console.log( data );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });


jQuery.readyException = function( error ) {
  console.error( error );
};

});