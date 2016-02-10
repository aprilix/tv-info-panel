'use strict';

/*global process, require, __dirname */

const fs = require( 'fs' ),
	path = require( 'path' ),
	sep = path.sep;

class JSONStorage {
	constructor( basePath ) {

		if ( fs.accessSync( basePath, fs.W_OK ) === false ) {
			throw new Error( `${basePath} is not a valid path!` );
		}

		Object.defineProperties( this, {
			'_basePath': {
				configurable: false,
				enumerable  : false,
				value       : basePath,
				writable    : true
			}
		} )
	}

	hasItem( key ) {
		return Object.keys( this.data ).indexOf > -1;
	}

	getItem( key ) {
		return this.data[ key ];
	}

	setItem( key, value ) {
		this.data[ key ] = value;
		return this;
	}

	sync() {
		const file = `${this.basePath}${sep}storage.json`;

		function write( data ) {
			fs.writeSync( file, JSON.stringify( data ) );
		}

		function read() {
			var data = fs.readSync( file );
			this.data = JSON.parse( data );
		}

		var error = null;
		try {
			fs.accessSync( file )
		} catch ( error ) {
			write( this.data );
			return self;
		}

		read();
		return self;
	}
}

module.exports = JSONStorage;