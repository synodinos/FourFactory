
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Zepto provides nice js and DOM methods (very similar to jQuery,
    // and a lot smaller):
    // http://zeptojs.com/
    var $ = require('zepto');

    // Need to verify receipts? This library is included by default.
    // https://github.com/mozilla/receiptverifier
    require('receiptverifier');

    // Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    //require('./install-button');

    // Write your app here.
    var install = require('install');
    install.on('change', function() {
        if (install.state == 'uninstalled')
            install();
    //     else {
    //         var request = window.navigator.mozApps.getInstalled(); 
    //         request.onerror = function(e) {
    //           alert("Error calling getInstalled: " + request.error.name);
    //         };
    //         request.onsuccess = function(e) {
    //             var appsRecord = request.result;
    //             if (appsRecord[0].manifest.version != "0.6")
    //                 install();
    //         };
    //     }
    });
    install.on('error', function(e, err) {
        // Feel free to customize this
        alert('There was an error during installation.');
    });
    if (install.state == 'uninstalled') {
        install();
    }
    // else {
    //         var request = window.navigator.mozApps.getInstalled(); 
    //         request.onerror = function(e) {
    //           alert("Error calling getInstalled: " + request.error.name);
    //         };
    //         request.onsuccess = function(e) {
    //             var appsRecord = request.result;
    //             if (appsRecord[0].manifest.version != "0.6") {
    //                 install();
    //             }
    //         };        
    // }
});

