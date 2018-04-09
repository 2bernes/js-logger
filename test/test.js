const assert = require ( "assert" );
const loggerConstructor = require ( "../src/index.js" );
const intercept = require ("intercept-stdout");
const stripAnsi = require ("strip-ansi");

const prefixLength = "[» TRACE  ] [2018-04-09 @ 00:20:29:793] - ".length;

const intercepted = ( isStripAnsi, cb ) => {

	var stderr = "";
	var stdout = "";
	var unintercept = intercept( txt => {
		if ( isStripAnsi ) {
			txt = stripAnsi(txt);
		}

		stdout += txt;
		return "";
	}, txt => {
		
		if ( isStripAnsi ) {
			txt = stripAnsi(txt);
		}
		
		stderr += txt;
		return "";
	});

	try {
		cb ();
	}
	finally {
		unintercept ( );
	}

	return {
		stdout: stdout,
		stderr: stderr
	};
}

const emptyOutput = { stdout: "", stderr: "" };
const assertMsg = ( msgs, out ) => {
	
	Object.keys ( msgs ).forEach ( key => {

		var msg = msgs [ key ];
		assert.equal ( out [ key ].length,

			// the message itself
			msg.length 
	
			// the prefix
			+ prefixLength 
	
			// the newline
			+ 1
		);

		assert.equal( out [ key ].substr ( prefixLength ) , msg + "\n" );
	});
}

describe ( "log", () => {
	describe ( "#trace", () => {
		it ( "should not be logged when config is info", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "info"
				}).trace( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should be logged when config is trace", (done) => {
			
			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "trace"
				}).trace( msg );
			});

			assertMsg ( { stdout: msg }, out );
			done();
		});
	});
});
