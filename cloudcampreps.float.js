$body = $( 'body').css({ 'font-size': $.io.defs.fonts.big})
$body.css({ width: '500px', height: 'auto', 'background-color': '#eee', color: '#555', margin: '5px', padding: '0px', 'font-size': $.io.font.small})
$body.ioover( true).autoset( function( a)  { 
	AS = a; 
	$header = $body.ioover( true); $body.ioover( true).css({ height: '2px'});
	$main = $body.ioover( true); $body.ioover( true).css({ height: '2px'}); 
	$footer = $body.ioover( true); $body.ioover( true).css({ height: '2px'});
	start(); a.onchange( start);  
}, '#4AF,0.4')

