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

		// log matrix check
		it ( "should not be logged when config is debug", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "debug"
				}).trace( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});
		
		it ( "should not be logged when config is info", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "info"
				}).trace( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should not be logged when config is warn", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "warn"
				}).trace( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should not be logged when config is error", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "error"
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

	describe ( "#debug", () => {

		// log matrix check
		it ( "should not be logged when config is info", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "info"
				}).debug( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should not be logged when config is warn", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "warn"
				}).debug( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should not be logged when config is error", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "error"
				}).debug( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should be logged when config is trace", (done) => {
			
			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "trace"
				}).debug( msg );
			});

			assertMsg ( { stdout: msg }, out );
			done();
		});
		
		it ( "should be logged when config is debug", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "debug"
				}).debug( msg );
			});

			assertMsg ( { stdout: msg }, out );
			done ( );
		});
	});

	describe ( "#info", () => {

		// log matrix check

		it ( "should not be logged when config is warn", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "warn"
				}).info( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should not be logged when config is error", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "error"
				}).info( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should be logged when config is trace", (done) => {
			
			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "trace"
				}).info( msg );
			});

			assertMsg ( { stdout: msg }, out );
			done();
		});
		
		it ( "should be logged when config is debug", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "debug"
				}).info( msg );
			});

			assertMsg ( { stdout: msg }, out );
			done ( );
		});

		it ( "should be logged when config is info", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "info"
				}).info( msg );
			});

			assertMsg ( { stdout: msg }, out );
			done ( );
		});
	});

	describe ( "#success", () => {

		// log matrix check

		it ( "should not be logged when config is warn", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "warn"
				}).success( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should not be logged when config is error", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "error"
				}).success( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should be logged when config is trace", (done) => {
			
			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "trace"
				}).success( msg );
			});

			assertMsg ( { stdout: msg }, out );
			done();
		});
		
		it ( "should be logged when config is debug", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "debug"
				}).success( msg );
			});

			assertMsg ( { stdout: msg }, out );
			done ( );
		});

		it ( "should be logged when config is info", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "info"
				}).success( msg );
			});

			assertMsg ( { stdout: msg }, out );
			done ( );
		});
	});

	describe ( "#warn", () => {

		// log matrix check

		it ( "should not be logged when config is error", (done) => {

			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "error"
				}).warn( "A random message" );
			});

			assert.deepEqual(out, emptyOutput);
			done ( );
		});

		it ( "should be logged when config is trace", (done) => {
			
			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "trace"
				}).warn( msg );
			});

			assertMsg ( { stderr: msg }, out );
			done();
		});
		
		it ( "should be logged when config is debug", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "debug"
				}).warn( msg );
			});

			assertMsg ( { stderr: msg }, out );
			done ( );
		});

		it ( "should be logged when config is info", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "info"
				}).warn( msg );
			});

			assertMsg ( { stderr: msg }, out );
			done ( );
		});

		it ( "should be logged when config is warn", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "warn"
				}).warn( msg );
			});

			assertMsg ( { stderr: msg }, out );
			done ( );
		});
	});

	describe ( "#error", () => {

		// log matrix check

		it ( "should be logged when config is trace", (done) => {
			
			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "trace"
				}).error( msg );
			});

			assertMsg ( { stderr: msg }, out );
			done();
		});
		
		it ( "should be logged when config is debug", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "debug"
				}).error( msg );
			});

			assertMsg ( { stderr: msg }, out );
			done ( );
		});

		it ( "should be logged when config is info", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "info"
				}).error( msg );
			});

			assertMsg ( { stderr: msg }, out );
			done ( );
		});

		it ( "should be logged when config is warn", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "warn"
				}).error( msg );
			});

			assertMsg ( { stderr: msg }, out );
			done ( );
		});

		it ( "should be logged when config is error", (done) => {

			const msg = "a random message";
			let out = intercepted ( true, () => {
				loggerConstructor ( {
					"level": "error"
				}).error( msg );
			});

			assertMsg ( { stderr: msg }, out );
			done ( );
		});
	});
});
