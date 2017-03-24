apiKey = "yM898o598jOYl77EYKtVy8OnJbOjzRGl";

/**
 * Get JSONP data
 * @param  {String}   url      The JSON URL
 * @param  {Function} callback The function to run after JSONP data loaded
 */
var getJSONP = function ( url, callback ) {

    // Create script with url and callback (if specified)
    var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
    var script = window.document.createElement( 'script' );
    script.src = url + (url.indexOf( '?' ) + 1 ? '&' : '?') + 'callback=' + callback;

    // Insert script tag into the DOM (append to <head>)
    ref.parentNode.insertBefore( script, ref );

    // After the script is loaded (and executed), remove it
    script.onload = function () {
        this.remove();
    };

};

// Callback function
var UserInfo = function ( data ) {
    console.log( data );
};

// Callback function
var Project = function ( data ) {
    console.log( data );
};

// Get JSON
getJSONP( "https://api.behance.net/v2/users/bananascivolare?client_id=" + apiKey + "&callback=myCallbackFunction", 'UserInfo' );
getJSONP( "http://www.behance.net/v2/projects/48484463?client_id=" + apiKey + "&callback=myCallbackFunction", 'Project' );


