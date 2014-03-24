$.ioutils.nolog = false;
$.ioutils.nostats = true;
var action = chrome.browserAction;  
var runtime = chrome.runtime;  // onMessage
var storage = chrome.storage.local; // QUOTA_BYTES, getBytesInUse(), get(), set(), remove(), clear()
var $hidden = $( 'body').ioover().css({ left: '-10px', width: '5px', height: '5px'})
function popup( text, color) { $( 'body').ioover({ position: 'fixed', right: '5px', top: '5px', width: '40%', height: 'auto', 'z-index': 1000000}).ioground( color ? color : '#000', 0.9).ioover( true).css({ padding: '5px', color: '#fff'}).append( text); }
storage.get( 'crawlersSetup', function( h) { 
	if ( ! h) return $.log( 'die, no crawler setup');
	$.log( 'ok', h); h = $.json2h( h.crawlersSetup);	// name, detector
	if ( $.ttl( window.location.href, h.detector) == 1) return $.log( 'die, not my page');
	if ( ! $.parsers || ! $.parsers[ h.name]) return $.log( 'die, no parser for [' + h.name + ']');
	eval( $.parsers[ h.name])();
})

