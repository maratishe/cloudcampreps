$.ioutils.nolog = true;
$.ioutils.nostats = true;
$.ioutils.callbacktimeout = '20s';
var $body = $( 'body').css({ 'font-size': $.io.defs.fonts.big})
var AS, STR, AUTH, DRILLS, DOCS, KS; AUTH = null; DRILLS = null; DOCS = {};
//var action = null; action = chrome.browserAction;  
//var runtime = null; runtime = chrome.runtime;  // onMessage
$body.css({ width: '500px', height: 'auto', 'background-color': '#eee', color: '#555', margin: '5px', padding: '0px', 'font-size': $.io.font.small})
var $header, $main, $footer, $drillcount; 
var loadoc = function( $box, code) { $box.empty().append( 'loading...'); STR.find({ code: code}, function( docs) { 
	if ( ! docs.length) return;
	DOCS[ code] = $.s642sutf8( docs[ 0][ AS.lang()]);
	$box.ioanimoutemptyin( 'fast', function() { $box.append( DOCS[ code]); })
})}
var showdoc = function( $box, $box2, o, code) { 
	var $show = $box.ioground( '#2AF', o).ioover( true).append( code).css({ overflow: 'hidden', 'font-size': AS.font( 'big'), margin: '1px 1%', width: '98%', color: '#000', 'font-weight': 'bold'})
	$box.ioatomsPlainButton({ donotwrap: true, donotdraw: true}).onclick( function() { $box2.toggle(); if ( KS[ code] && ! DOCS[ code]) loadoc( $box2, code); })
	if ( ! KS[ code]) return;	// not the actual doc
	var rate = $.mathRound( $.mathAvg( $.hv( DRILLS.raw[ code])), 1);
	var $rate = $box.ioover({ position: 'absolute', right: '5px', top: '2px', width: 'auto', height: 'auto'}).append( '<strong>' + ( AS.lang() == 'en' ? 'Rating:' : '緊急性:') + rate + '</strong>')
	$rate.find( 'strong').iotextbutton( function( c) { ratedoc( code, rate, $rate.find( 'strong').eq( 0)); }, '#555')
}
var ratedoc = function( code, rate, $ratebox) { $body.myoverclosebox( function( box) { 
	var $box = box.inner();
	$box.ioover( true).append( 'Code: <strong>' + code + '</strong>').css({ 'font-size': AS.font( 'big'), color: '#000'});
	$box.ioover( true).append( ( AS.lang() == 'en' ? 'Rating' : '緊急性') + ': <strong>' + rate + '</strong>').css({ 'font-size': AS.font( 'big'), color: '#000'});
	$box.ioover( true).css({ height: '3px'})
	var $doc = $box.ioover( true);
	$doc.append( DOCS[ code]).css({ 'font-size': AS.font( 'big'), color: '#555'});
	if ( ! DOCS[ code]) loadoc( $doc, code);
	$box.ioover( true).css({ height: '10px'})
	$box.ioover( true).append( ( AS.lang() == 'en' ? 'Previous vote' : '以前の投票') + '(<strong>' + AUTH.email + '</strong>): ' + '<strong>' + ( DRILLS.raw[ code][ AUTH.email] ? DRILLS.raw[ code][ AUTH.email] : '--') + '</strong>').css({ 'font-size': AS.font( 'big'), color: '#000'});
	$box.ioover( true).css({ height: '3px'})
	var $box2 = $box.ioover( true).append( AS.lang() == 'en' ? 'Your new vote: ' : '投票（選択）: ').css({ 'font-size': AS.font( 'big'), color: '#000'});
	$box.ioover( true).css({ height: '3px'})
	var $status = null;
	var L = []; for ( var i = 1; i < 10; i++) L.push( '<strong>' + i + '</strong>');
	$box2.append( $.ltt( L, ' - ')).find( 'strong').iotextbutton( function( v) { $status.empty().append( v); }, '#4AF');
	$box.ioover( true).css({ height: '3px'})
	$box.ioover( true).append( '<strong>*</strong> ' + ( AS.lang() == 'en' ? '<strong>1</strong>: least urgent/important, <strong>9</strong>: most urgent/important' : '<strong>1</strong>: 重要・緊急性の最も低い, <strong>9</strong>: 重要・緊急性の最も高い'));
	var $error = $box.ioover( true).css({ 'font-size': AS.font( 'normal'), color: '#f00'})
	$box.ioover( true).css({ height: '3px'})
	var $button = $box.ioover( true);
	$button.iofblist( AS.lang() == 'en' ? 'submit' : '投票する', AS.font( 'huge'), null, $.io.style.canvas.alert, function() { 
		var v = $.trim( $status.text()); 
		if ( ! v) return $error.empty().append( AS.lang() == 'en' ? 'ERROR! Select a number.' : 'エラー：番号を選択してください.');
		$button.ioanimoutemptyin( 'fast', function() { 
			$button.append( 'saving...');
			DRILLS.raw[ code][ AUTH.email] = parseInt( v);
			$ratebox.empty().append( '<strong>' + ( AS.lang() == 'en' ? 'Rating:' : '緊急性:') + $.mathRound( $.mathAvg( $.hv( DRILLS.raw[ code]))) + '</strong>');
			STR.add( DRILLS, function() { box.close(); })
			STR.add({ type: 'vote', email: AUTH.email, vote: { code: DRILLS.raw[ code][ AUTH.email]}}, function() { });
		})
		
	})
	$status = $button.ioover( true).css({ clear: 'both', 'font-size': AS.font( 'normal'), color: '#f00', 'font-weight': 'bold'})
	$box.find( 'strong').css({ color: '#4AF'})
}, false, '#fff', 0.95)}
var A = [];	// actions     0: tree, 1: search, 2: rating, 3: add
A[ 0] = function() { $main.ioanimoutemptyin( 'fast', function() { // tree 
	if ( ! AUTH || ! DRILLS) return $main.append( AS.lang() == 'en' ? 'No data and/or auth.' : 'データ・認証情報がありません。');
	var h = {}; 
	$main.ioover( true).css({ height: '5px'});
	var $box = $main.ioover( true).css({ position: 'relative', height: '300px', 'border-bottom': '3px solid #888'})
	var frame = $box.ioover().mockvframe();
	$box.ioover({ position: 'absolute', bottom: '-2px', left: '48%', width: 'auto', height: 'auto', color: '#666', 'font-size': AS.font( 'huge')})
	.append( '+').ioatomsPlainButton({ donotdraw: true, donotwrap: true}).onclick( function() {  $box.css({ height: Math.round( $box.height() + 50) + 'px'}); })
	$main.ioover( true).css({ height: '20px'});
	for ( var code in DRILLS.raw) {
		var L = $.ttl( code, '.'); var h2 = h;
		for ( var i in L) {
			var k = L[ i];
			if ( ! h2[ k]) h2[ k] = {};
			h2 = h2[ k];
		}
		
	}
	var one = function( $box, prefix, ks, h, o, c) { 
		$box.ioover( true).css({ height: '2px'})
		var $box2 = null;
		var $box3 = $box.ioover( true).css({ 'font-size': AS.font( 'normal'), color: '#000'})
		$box2 = $box.ioover( true).css({ margin: '0px 0px 0px 5%', width: '95%'})
		showdoc( $box3, $box2, o, prefix);
		$box2.ioloop( ks, '1ms', function( dom, value, sleep, c2) { 
			if ( ! value.length) { c2(); c(); return $box2.hide(); }
			var k = value.shift();
			one( $box2, prefix + '.' + k, $.hk( h[ k]), h, o - 0.1, function() { c2( value); });
		})
		
	}
	$box.ioloop( $.hk( h), '1ms', function( dom, value, sleep, c) { 
		if ( ! value.length) return c();
		var k = value.shift();
		one( frame.inner(), k, $.hk( h[ k]), h[ k], 0.6, function() { c( value); });
	})
	
})}
A[ 1] = function() { $main.ioanimoutemptyin( 'fast', function() { // search
	if ( ! AUTH || ! DRILLS) return $main.append( AS.lang() == 'en' ? 'No data and/or auth.' : 'データ・認証情報がありません。');
	$main.ioover( true).css({ height: '5px'})
	var search = $main.ioover( true).css({ height: '1.2em', 'font-size': AS.font( 'normal')}).guiTextBox( 'code', function() { }, '?', '#4AF,0.25', { 'font-size': AS.font( 'normal')}, true);
	$main.ioover( true).css({ height: '3px'})
	var $show = $main.ioover( true);
	$main.ioover( true).css({ height: '15px'})
	search.onchange( function() { $show.stopTime().oneTime( '1s', function() { $show.ioanimoutemptyin( 'fast', function() {  
		var v = $.trim( search.value()); if ( ! v) return;
		var h = {}; for ( var code in DRILLS.raw) if ( $.ttl( ' ' + code + ' ', v).length > 1) h[ code] = true;
		$show.ioloop( $.hk( h), '1ms', function( dom, value, sleep, c) { 
			if ( ! value.length) return c();
			var code = value.shift();
			$show.iounder( true).css({ height: '3px'})
			var $box2 = $show.iounder( true); 
			var $box3 = $show.iounder( true);
			showdoc( $box3, $box2, 0.3, code);
			c( value);
		})
		
	})})})
	
})}
A[ 2] = function() { $main.ioanimoutemptyin( 'fast', function() { // rating 
	if ( ! AUTH || ! DRILLS) return $main.append( AS.lang() == 'en' ? 'No data and/or auth.' : 'データ・認証情報がありません。');
	var HL = [];
	for ( var code in DRILLS.raw) HL.push({ code: code, rate: $.mathRound( $.mathAvg( $.hv( DRILLS.raw[ code])),1)});
	HL = $.hlsort( HL, 'rate');
	$main.ioover( true).css({ height: '5px'});
	var $box = $main.ioover( true).css({ position: 'relative', height: '300px', 'border-bottom': '3px solid #888'})
	var frame = $box.ioover().mockvframe();
	$box.ioover({ position: 'absolute', bottom: '-2px', left: '48%', width: 'auto', height: 'auto', color: '#666', 'font-size': AS.font( 'huge')})
	.append( '+').ioatomsPlainButton({ donotdraw: true, donotwrap: true}).onclick( function() {  $box.css({ height: Math.round( $box.height() + 50) + 'px'}); })
	$main.ioover( true).css({ height: '20px'});
	var one = function( h) { }
	frame.inner().ioloop( HL, '1ms', function( dom, value, sleep, c) { 
		if ( ! value.length) return c();
		var h = value.shift();
		frame.inner().iounder( true).css({ height: '3px'})
		var $box2 = frame.inner().iounder( true); 
		var $box3 = frame.inner().iounder( true);
		showdoc( $box3, $box2, 0.3, h.code);
		c( value);
	})
	
})}
A[ 3] = function() { $main.ioanimoutemptyin( 'fast', function() { // add
	$.log( 'A[3]() DRILLS', $.h2json( DRILLS));
	if ( ! AUTH) return $main.append( AS.lang() == 'en' ? 'No auth.' : '認証情報がありません。');
	$main.ioover( true).css({ height: '10px'})
	$main.ioover( true).append( '<span>*</span> ' + ( AS.lang() == 'en' ? 'unique <strong>dot-delimited code</strong> for this topic (drill)' : '本課題（ドリル）におけるユニックで<strong>ドットで区切られたコード</strong>を記入してください。')).css({ 'font-size': AS.font( 'normal'), color: '#555'})
	var $code = $main.ioover( true).css({ 'font-size': AS.font( 'small'), color: '#f00'})
	var code = $main.ioover( true).css({ height: '1.2em', 'font-size': AS.font( 'normal')}).guiTextBox( 'code', function() { }, 'your.topic.code', '#4AF,0.25', { 'font-size': AS.font( 'normal')}, true);
	$main.ioover( true).css({ height: '10px'})
	$main.ioover( true).append( '<span>*</span> ' + ( AS.lang() == 'en' ? 'description in <strong>english</strong>' : '概要（<strong>英語</strong>）')).css({ 'font-size': AS.font( 'normal'), color: '#555'})
	var $en = $main.ioover( true).css({ 'font-size': AS.font( 'small'), color: '#f00'})
	var en = $main.ioover( true).css({ height: '6em', 'font-size': AS.font( 'normal')}).guiTextBox( 'code', function() { }, '... text goes here', '#4AF,0.25', { 'font-size': AS.font( 'normal')}, true);
	$main.ioover( true).css({ height: '10px'})
	$main.ioover( true).append( '<span>*</span> ' + ( AS.lang() == 'en' ? 'description in <strong>japanese</strong>' : '概要（<strong>日本語</strong>）')).css({ 'font-size': AS.font( 'normal'), color: '#555'})
	var $jp = $main.ioover( true).css({ 'font-size': AS.font( 'small'), color: '#f00'})
	var jp = $main.ioover( true).css({ height: '6em', 'font-size': AS.font( 'normal')}).guiTextBox( 'code', function() { }, '... 文章ココ', '#4AF,0.25', { 'font-size': AS.font( 'normal')}, true);
	$main.ioover( true).css({ height: '5px'})
	$main.ioover( true).iofblist( AS.lang() == 'en' ? 'send' : '送信', AS.font( 'big'), null, $.io.style.canvas.alert, function() { 
		var h = { code: $.trim( code.value()), en: $.trim( en.value()), jp: $.trim( jp.value()), creator: AUTH.email};
		var ks = null; if ( DRILLS) ks = $.hvak( $.hk( DRILLS.raw), true, true);
		$.log( 'ks/DRILLS', $.h2json( ks), $.h2json( DRILLS));
		if ( ! h.code || $.ttl( h.code, '.').length < 2) return $code.empty().append( AS.lang() == 'en' ? 'bad code' : 'コードが誤っている');
		if ( DRILLS && ks && ks[ h.code]) return $code.empty().append( AS.lang() == 'en' ? 'this code already exists' : 'このコードが既に存在している');
		if ( ! h.en.length) return $en.empty().append( AS.lang() == 'en' ? 'this field cannot be empty' : '空欄禁止です。');
		if ( ! h.jp.length) return $jp.empty().append( AS.lang() == 'en' ? 'this field cannot be empty' : '空欄禁止です。');
		$main.ioanimoutemptyin( 'fast', function() { 
			if ( ! DRILLS) DRILLS = { type: 'drillsummary', raw: {}};
			if ( ! DRILLS.raw[ h.code]) DRILLS.raw[ h.code] = {};
			KS = $.hvak( $.hk( DRILLS.raw), true, true); // update for immediate use
			$drillcount.empty().append( '' + $.hk( DRILLS.raw).length);
			STR.add( DRILLS, function( docid) { }, true);
			STR.add({ type: 'drill', code: h.code, en: $.s2s64utf8( h.en), jp: $.s2s64utf8( h.jp), creator: AUTH.email}, function( docid) { }, true);
		})
		
	})
	$main.ioover( true).css({ height: '10px', clear: 'both'})
	$main.find( 'span').css({ 'font-weight': 'bold', color: '#f00', 'font-size': AS.font( 'big')});
})}
function header() { $header.ioanimoutemptyin( 'fast', function() { 
	$header.css({ 'border-bottom': '2px solid #4AF'});
	var $box = $header.ioover( true);
	var $text = $box.ioover( true).attr( 'id', 'text').css({ height: 'auto', width: '75%'}).css({ color: '#444', 'text-align': 'right'})
	$text.ioover( true).append( 'Cloud Camp Preps').css({ 'font-size': AS.font( 'huge')});
	$text.ioover( true).append( 'Phase 1/3 (<a target="_blank" href="guide.pdf">' + ( AS.lang() == 'en' ? 'topics' : '課題募集中') + '</a> till <strong>April 30</strong>)')
	.css({ 'font-size': AS.font( 'normal')}).find( 'a').css({ 'font-weight': 'bold', color: '#f00'})
	$drillcount = $text.ioover( true).append( AS.lang() == 'en' ? 'Found <strong>?</strong> topics (drills).' : '現在<strong>?</strong>課題（ドリル）が登録されている。')
	.find( 'strong').css({ 'font-size': AS.font( 'big'), color: '#4AF'})
	$text.ioover( true).css({ height: '5px'})
	var L = $.ttl( AS.lang() == 'en' ? 'tree,search,rating,add' : '階層,検索,緊急性順,課題追加');
	var A2P = $.hvak( L); var L2 = []; for ( var i in L) L2.push( '<strong>' + L[ i] + '</strong>');
	$text.ioover( true).css({ 'font-size': AS.font( 'normal')}).append( $.ltt( L2, ' ')).find( 'strong').iotextbutton( function( k) { eval( A[ A2P[ k]])(); }, '#f00');
	$text.ioover( true).css({ height: '5px'})
	$text.ioover().css({ left: '102%', top: '0px', height: '100%', width: 'auto'})
	.ioover( { position: 'relative', display: 'block', width: 'auto', height: '100%'}, 'img', { src: 'icon.png'})
	//$.log( 'huge', AS.font( 'huge'));
})}
function footer() { $footer.ioanimoutemptyin( 'fast', function() { 
	$footer.ioground( '#4AF,0.4')
	.ioover( true).append( 'contact <a href="mailto:cloudq9@gmail.com">cloudq9@gmail.com</a> or see <a target="_blank" href="guide.pdf">guide.pdf</a>')
	.css({ 'font-size': AS.font( 'small'), color: '#444'})
	.find( 'a').css({ 'font-weight': 'bold', color: '#333'})
})}
function main() { $main.ioanimoutemptyin( 'fast', function() { $main.stringex( function( str, auth) { STR = str; STR.find({ type: 'reps', email: auth.email}, function( docs) { 
	AUTH = auth;
	if ( ! docs.length) STR.add({ type: 'reps', email: auth.email, info: auth}, function() { $.log( 'account saved'); }, true);
	STR.find({ type: 'drillsummary'}, function( docs) { 
		if ( docs.length) DRILLS = docs[ 0];
		if ( docs.length) KS = $.hvak( $.hk( DRILLS.raw), true, true);
		$drillcount.empty().append( DRILLS ? '' + $.hk( DRILLS.raw).length : '0'); 
	}, false, true);
	if ( ! AUTH.admin) return;
	// if there are some admin/hidden functions, place them here
})})})}
function start() { DRILLS = null; DOCS = {}; header(); footer(); main(); }
$body.ioover( true).autoset( function( a)  { 
	AS = a; 
	$header = $body.ioover( true); $body.ioover( true).css({ height: '2px'});
	$main = $body.ioover( true); $body.ioover( true).css({ height: '2px'}); 
	$footer = $body.ioover( true); $body.ioover( true).css({ height: '2px'});
	start(); a.onchange( start);  
}, '#4AF,0.4')

