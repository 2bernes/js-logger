# js-logger
A simple to use [JS logger](https://github.com/2bernes/js-logger).

## Installation
```
	npm install 2b-logger
```

If you want to save the install in `package.json`:
```
	npm install --save 2b-logger
```
Or
```
	npm install --save-dev 2b-logger
```

## Basic usage
The basic usage for this logger is the following:

``` JS
	const loggerConstructor = require ( "2b-logger" );
	const logger = loggerConstructor ();
	logger.info("A nice info message");
```

Or, in a simplified version:

``` JS
	const logger = require ( "2b-logger" ) ();
	logger.info("A nice info message");
```

The import `require ( "2b-logger" )` will return a constructor function that takes, optionally, a configuration object.

The default options are:

``` JSON
	{
		level: "info",
		noColor: false,
		timestampFormat: "YYYY-MM-DD @ HH:mm:ss:ms"
	}
```

## Options
The options object can receive the following configurations:

#### `level` (string, default: `info`)
The level indicates which messages will be logged and which will be discarded.
The accepted values are `trace`, `debug`, `info`, `warn` and `error`.

The following table displays which messages will be logged, depending on the configured level:

<table style="border: 1px #000 solid">
	<tr>
		<th></th>
		<th colspan="6" style="text-align: center">Configured Level</th>
	</tr>
	<tr>
		<th></th>
		<th></th>
		<th><code>trace</code></th>
		<th><code>debug</code></th>
		<th><code>info</code></th>
		<th><code>warn</code></th>
		<th><code>error</code></th>
	</tr>
	<tr>
		<th rowspan="5" style="vertical-align: middle">Message Level:</th>
		<th><code>trace</code></th>
		<td>✔️</td>
		<td>❌</td>
		<td>❌</td>
		<td>❌</td>
		<td>❌</td>
	</tr>
	<tr>
		<th><code>debug</code></th>
		<td>✔️</td>
		<td>️️️️️✔️️️️️</td>
		<td>❌</td>
		<td>❌</td>
		<td>❌</td>
	</tr>
	<tr>
		<th><code>info</code> or <code>success</code></th>
		<td>✔️</td>
		<td>✔️</td>
		<td>✔️</td>
		<td>❌</td>
		<td>❌</td>
	</tr>
	<tr>
		<th><code>warn</code></th>
		<td>✔️</td>
		<td>✔️</td>
		<td>✔️</td>
		<td>✔️</td>
		<td>❌</td>
	</tr>
	<tr>
		<th><code>error</code></th>
		<td>✔️</td>
		<td>✔️</td>
		<td>✔️</td>
		<td>✔️</td>
		<td>✔️️</td>
	</tr>
</table>

Messages with the `success` level are considered to be of `info` level, but they have a different render style.

#### `noColor` (boolean, default: `false`)
This boolean option indicates the logger that no color should be added to rendered messages.

Even if logged messages are colored, they will have the color removed, if `noColor` was set as `true`.

Example:
``` JS
	const logger = require ( "2b-logger" ) ({ noColor: true });
	const chalk = require ( "chalk" );
	logger.info ( chalk.cyan ( "A cyan message" ) );
```

In this case, the redered message **will not** have colors.

#### `timestampFormat` (string, default: `YYYY-MM-DD @ HH:mm:ss:ms`)
This is the timestamp format to be used when rendering messages.
The accepted format can be seen [here](https://github.com/jonschlinkert/time-stamp).
