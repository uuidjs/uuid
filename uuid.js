(function () {
	// TODO add forEach / map / whatever
	/**
	 * Generate a RFC4122(v4) UUID
	 * Documentation at https://github.com/broofa/node-uuid
	 * @class
	 */
	var UUID = function () {
		/** 
		 * Instance of this.BufferClass to use for creating UUID strings in the case that an optional UUID.prototype.BufferClass is not passed.
		 * @property
		 */
		this.stringUuidBuffer = new this.BufferClass(16);

		var maps = this.getHexMaps();

		/**
		 * An object with hexidecimal string properties with values equal to the decimal representation of their property names.
		 * @example
		 * this.fromHexStringMap['FF'] === 255
		 * @property
		 */
		this.fromHexStringMap = maps.fromHexStringMap;

		/**
		 * An array with values equal to Strings of hexidecimal numbers of their indices.
		 * @example
		 * this.toHexStringMap[255] === 'FF'
		 * @property
		 */
		this.toHexStringMap = maps.toHexStringMap;

	};

	/** @lends UUID.prototype */
	UUID.prototype = {
		/**
		 * If a Buffer class equivalent to the one provided by Node.js is found, use that, otherwise, use built-in Array.
		 * @property
		 */
		BufferClass : typeof Buffer === 'function' ? Buffer : Array,

		// Cache number <-> hex string for octet values
		getHexMaps : function () {
			var toHexStringMap = [],
				fromHexStringMap = {},
				iterator = function (i) {
					toHexStringMap[i] = (i + 0x100).toString(16).substr(1).toUpperCase();
					fromHexStringMap[toHexStringMap[i]] = i;
				};

			for (var i = 0; i < 256; i++) {
				iterator(i);
			}

			return {
				fromHexStringMap : fromHexStringMap,
				toHexStringMap : toHexStringMap
			};
		},

		/**
		 * Generates a UUID string or buffer, optionally using the passed buffer, and optionally starting at the passed offest
		 * @param {String} format If 'binary', this method returns an instance of BufferClass instead of String
		 * @param {UUID.prototype.BufferClass} [buffer] An instance of BufferClass to use.
		 * @param {Number} [offset] Only if buffer is passed; the offset index to begin populating it at.
		 * @type String|UUID.prototype.BufferClass
		 */
		generate : function (format,buffer,offset) {
			var b32 = 0x100000000,
				ff = 0xff,
				i = buffer && offset || 0,
				randomNumber = Math.random() * b32;

			buffer = format !== 'binary' ? this.stringUuidBuffer : (buffer ? buffer : new this.BufferClass(16));

			buffer[i++] = randomNumber & ff;
			buffer[i++] = randomNumber >>> 8 & ff;
			buffer[i++] = randomNumber >>> 16 & ff;
			buffer[i++] = randomNumber >>> 24 & ff;

			randomNumber = Math.random() * b32;
			buffer[i++] = randomNumber & ff;
			buffer[i++] = randomNumber >>> 8 & ff;
			buffer[i++] = randomNumber >>> 16 & 0x0f | 0x40; // See RFC4122 sect. 4.1.3
			buffer[i++] = randomNumber >>> 24 & ff;

			randomNumber = Math.random() * b32;
			buffer[i++] = randomNumber & 0x3f | 0x80; // See RFC4122 sect. 4.4
			buffer[i++] = randomNumber >>> 8 & ff;
			buffer[i++] = randomNumber >>> 16 & ff;
			buffer[i++] = randomNumber >>> 24 & ff;

			randomNumber = Math.random() * b32;
			buffer[i++] = randomNumber & ff;
			buffer[i++] = randomNumber >>> 8 & ff;
			buffer[i++] = randomNumber >>> 16 & ff;
			buffer[i++] = randomNumber >>> 24 & ff;

			return format === undefined ? this.unparse(buffer) : buffer;
		},

		/**
		 * Returns a BufferClass instance, parsed from the passed UUID 
		 * @method
		 * @type BufferClass
		 */
		parse : function (uuidString) {
			uuidString = uuidString.toUpperCase();

			var buffer = new this.BufferClass(16),
				fromHexStringMap = this.fromHexStringMap,
				match,
				pattern = /[0-9A-F][0-9A-F]/g,
				i = 0;

			// try removing iterator and just doing the work in the loop
			while ((match = pattern.exec(uuidString)) !== null) {
				buffer[i++] = fromHexStringMap[match[0]];
			}

			return buffer;
		},

		/**
		 * Returns a UUID string from passed BufferClass
		 * @method
		 * @type String
		 */
		unparse : function (buffer) {
			var toHexStringMap = this.toHexStringMap;
			return [toHexStringMap[buffer[0]],
				toHexStringMap[buffer[1]],
				toHexStringMap[buffer[2]],
				toHexStringMap[buffer[3]],
				'-',
				toHexStringMap[buffer[4]],
				toHexStringMap[buffer[5]],
				'-',
				toHexStringMap[buffer[6]],
				toHexStringMap[buffer[7]],
				'-',
				toHexStringMap[buffer[8]],
				toHexStringMap[buffer[9]],
				'-',
				toHexStringMap[buffer[10]],
				toHexStringMap[buffer[11]],
				toHexStringMap[buffer[12]],
				toHexStringMap[buffer[13]],
				toHexStringMap[buffer[14]],
				toHexStringMap[buffer[15]]].join('');
		}
	};

	// export to node.js module system
	if (typeof module !== 'undefined') {
		module.exports = UUID;
	} else {
		// In browser? Set as top-level function
		this.UUID = UUID;
	}
})();
