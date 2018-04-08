module.exports = initOptions => {
	
	// read lodash
	_ = require ( "lodash" );

	// read timestamp
	timestamp = require ( "time-stamp" );

	initOptions = initOptions || {};

	const defaultOptions = {
		noColor: false,
		level: "info",
		timestampFormat: "YYYY-MM-DD @ HH:mm:ss:ms"
	};

	let options = _.merge ( defaultOptions, initOptions );

	
	let isDef = obj => obj !== null && obj !== undefined;

	// let's validate options...
	let validateOpt = ( opt, expectedType, required, obj, originalOpt ) => {
		if ( obj === undefined ) {
			obj = options;
		}

		if ( originalOpt === undefined ) {
			originalOpt = opt;
		}

		if ( typeof ( opt ) === "string" ) {
			opt = opt.split ( /\./ );
		}

		if ( opt.length > 1 ) {
			// try to get local object
			let localObj = obj [ opt [ 0 ] ];
			if ( !isDef ( localObj ) && required ) {
				throw `Option [${ originalOpt }] is required.`;
			}

			let foundType = typeof ( localObj );
			if ( foundType !== "object" ) {
				throw `Option [${ opt [ 0 ] }] should be an object but it is ${ foundType }.`;
			}

			// recurse
			validateOpt ( opt.slice ( 1 ), expectedType, required, localObj, originalOpt );
			return;
		}
		else {
			let localObj = obj [ opt [ 0 ] ];
			if ( !isDef ( localObj ) && required ) {
				throw `Option [${ originalOpt }] is required.`;
			}

			if ( !isDef ( localObj ) ) {
				return;
			}

			let foundType = typeof ( localObj );
			if ( foundType !== expectedType ) {
				throw `Option [${ originalOpt }] type is incompatible. Got ${ foundType }, expected: ${ expectedType }.`;
			}
		}
	}

	validateOpt ( "noColor", "boolean", false );
	validateOpt ( "level", "string", true );
	validateOpt ( "timestampFormat", "string", true );

	let noColor = isDef ( options.noColor ) ? options.noColor : false;
	let levelStr = options.level;
	let timestampFormat = options.timestampFormat;

	const logSymbols = require ( "log-symbols" );
	if ( !noColor ) {
		chalk = require ( "chalk" );
	}

	const levelTable = {
		trace: {
			val: 0,
			out: process.stdout,
			msg: noColor ? "» TRACE" : chalk.white ( "» TRACE" )
		},
		debug: {
			val: 1,
			out: process.stdout,
			msg: noColor ? "» DEBUG" : chalk.white ( "» DEBUG" )
		},
		info: {
			val: 2,
			out: process.stdout,
			msg: noColor ? logSymbols.info + " INFO" : chalk.blueBright ( logSymbols.info + " INFO" )
		},
		success: {
			val: 2,
			out: process.stdout,
			msg: noColor ? logSymbols.success + " SUCCESS" : chalk.greenBright ( logSymbols.success + " SUCCESS" )
		},
		warn: {
			val: 3,
			out: process.stderr,
			msg: noColor ? logSymbols.warning + " WARNING" : chalk.yellowBright	( logSymbols.warning + " WARNING" )
		},
		error: {
			val: 4,
			out: process.stderr,
			msg: noColor ? logSymbols.error + " ERROR" : chalk.redBright ( logSymbols.error + " ERROR" )
		}
	};

	let level = levelTable [ levelStr ];

	if ( !isDef ( level ) ) {
		let highlight = k => noColor ? k : chalk.cyan ( k );
		throw `Invalid log level: ${ levelStr }. Expected one of: ${ Object.keys ( levelTable ).map ( highlight ).join(", ") }.`;
	}

	let accept = ( loggedLevel ) => loggedLevel.val >= level.val;

	let ts = () => {
		if ( noColor ) {
			return "[" + timestamp ( timestampFormat ) + "]";
		}

		return "[" + chalk.white ( timestamp ( timestampFormat ) ) + "]";
	}

	let log = function ( arr ) {
		var msgs = [];
		for ( var i = 1; i < arr.length; i++ ) {
			var argI = arr [ i ];

			if ( isDef ( argI ) ) {
				var strVal = argI.toString ( )

				if ( isDef ( strVal ) && strVal.length > 0 ) {
					msgs.push ( argI.toString ( ) );
				}
			}
		}

		msgs.push ( "\n" );

		// TODO: support log in files

		let levelObj = levelTable [ arr [ 0 ] ];

		if ( accept ( levelObj ) ) {
			levelObj.out.write ( `[${ levelObj.msg }] ${ ts ( ) } - ${ msgs.join ( " " ) }` );
		}
	}

	return {
		trace () { log ( [ "trace" ].concat ( Array.from ( arguments ) ) ) },
		debug () { log ( [ "debug" ].concat ( Array.from ( arguments ) ) ) },
		success () { log ( [ "success" ].concat ( Array.from ( arguments ) ) ) },
		info () { log ( [ "info" ].concat ( Array.from ( arguments ) ) ) },
		warn () { log ( [ "warn" ].concat ( Array.from ( arguments ) ) ) },
		error () { log ( [ "error" ].concat ( Array.from ( arguments ) ) ) }
	};
}
