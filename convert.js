// Convert (bytes & numbers)

Convert = {
	bytes_str2hex: function( src, spc ) {
		var res = "", tmp = null;
		for( var i=0; i<src.length; i++ ) {
			tmp = src.charCodeAt(i); // padding to 2:
			res += ( tmp < 16 ? '0' : '' ) + tmp.toString( 16 );
			if( spc != 0 && ((i+1) % spc) == 0 )
				res += " ";
		}
		return res;
	},
	bytes_str2bin: function( src, spc ) {
		var res = "", tmp = null;
		for( var i=0; i<src.length; i++ ) {
			tmp = src.charCodeAt(i).toString( 2 ); // padding to 8:
			res += new Array( 9 - tmp.length ).join('0') + tmp;
			if( spc != 0 && ((i+1) % spc) == 0 )
				res += " ";
		}
		return res;
	},
	bytes_str2str: function(s) { return s; },
	bytes_hex2str: function( src, spc ) {
		var res = "";
		src = src.toLowerCase().replace(/[^0-9a-f]+/g, '');
		for( var i=0; i<src.length; i+=2 )
			res += String.fromCharCode( parseInt( src.substr( i, 2 ), 16 ) );
		return res;
	},
	bytes_bin2str: function( src, spc ) {
		var res = "";
		src = src.toLowerCase().replace( /[^01]+/g, '' );
		for( var i=0; i<src.length; i+=8 )
			res += String.fromCharCode( parseInt( src.substr( i, 8 ), 2 ) );
		return res;
	},
	bytes_bin2bin: function( src, spc ) { return Convert.bytes_str2bin( Convert.bytes_bin2str( src, 0 ), spc ); },
	bytes_bin2hex: function( src, spc ) { return Convert.bytes_str2hex( Convert.bytes_bin2str( src, 0 ), spc ); },
	bytes_hex2bin: function( src, spc ) { return Convert.bytes_str2bin( Convert.bytes_hex2str( src, 0 ), spc ); },
	bytes_hex2hex: function( src, spc ) { return Convert.bytes_str2hex( Convert.bytes_hex2str( src, 0 ), spc ); },
	numbers: function( str, from, to ) {
		if( isNaN( from ) || from < 2 || from > 36 )
			throw new RangeError( "Incorrect source base, must be 2-36." );
		if( isNaN( to ) || to < 2 || to > 36 )
			throw new RangeError( "Incorrect destination base, must be 2-36." );
		var match = null, lastIndex = 0, res = "";
		var search = "\\b[0-" + ( from < 10 ? '' + from : '9a' +
			( from > 11 ? '-' + ('bcdefghijklmnopqrstuvwxyz'.charAt(from-11)) : '' ) ) + "]+\\b";
		search = new RegExp( search, 'gi' );
		RegExp.lastIndex = 0;
		while( ( match = search.exec(str) ) != null ) {
			res += str.slice( lastIndex, match.index ) + parseInt( match[0], from ).toString( to );
			lastIndex = match.index + match[0].length;
		}
		res += str.slice( lastIndex );
		return res;
	}
};
