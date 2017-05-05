/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var _block_lengths = [ 8, 4, 4, 4, 12 ];

module.exports = function( buf, block_lengths ) {
    block_lengths = block_lengths || _block_lengths;

    var i;
    var str = '';

    if ( Array.isArray( buf ) ) {
        for ( i = 0; i < buf.length; ++i ) {
            str += (buf[ i ] + 0x100).toString(16).substr(1);
        }
    }
    else {
        str = buf.toString( 'hex' );
    }

    var blocks = [];
    var offset = 0;
    for( i = 0; i < block_lengths.length; ++i ) {
        blocks.push( str.substr( offset, block_lengths[ i ] ) );
        offset += block_lengths[ i ];
    }

    return blocks.join( '-' );
};
