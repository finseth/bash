# Bash

A lightweight terminal emulator written in CSS3 and Javascript. You can write your own commands on top of the core terminal. Great for showing off your open source projects!

## Getting Started

You can clone or [download](https://github.com/haydenbleasel/bash/archive/master.zip) the repository from GitHub or install through Bower:

    bower install bash --save

## Usage

Add the core script and stylesheet to your page with:

    <link rel="stylesheet" href="bash.css" />
    <script src="bash.js"></script>

Add the scaffolding to your HTML:

    <div class="bash">
        <div class="window">
            <div class="header">
                <a href="#" class="button close"></a>
                <a href="#" class="button min"></a>
                <a href="#" class="button max"></a>
                <span class="maxer">&lsaquo; &rsaquo;</span>
                <span>Project &#8212; Bash &#8212; 80x24</span>
            </div>
            <div class="terminal"></div>
        </div>
    </div>

You can also include a theme CSS file after the core which are located in the `themes` folder. Execute Bash.js by creating a new instance. The `bash` object accepts a selector (usually `.bash`) and an array of options. A demo with defaults is show below:

    var container = document.querySelector('.bash');
    var bsh = new Bash(container, {
        computer: 'ttys000',       // Name of the computer (string)
        help: undefined,           // Optional help text (string)
        prompt: 'user@home:~$',    // Shell prompt symbol (string or array)
        name: undefined,           // Name of custom function (string)
        function: undefined,       // Custom function definition (function)
        demo: false                // Enable demonstration mode (boolean)
    });

The function property takes two parameters: bash (the terminal instance) and next (the callback). You can use them like so:

    function: function(bash, next) {
        bash.post('Hello, world!', 0, false, true, function () {
            return next();
        }
    });

The `bash.post` function takes five parameters as shown in the previous example. Let's examine each one:

    bash.post(
        'Hello, world!',    // The message
        0,                  // The delay
        false,              // Add a prompt before the message? (Demo mode only)
        true,               // Is this message a comment / feedback?
        function () { ...   // The callback, fired once the message is posted.
    );


this.post = function (message, delay, symbol, feedback, next) {

## Examples

An example of a custom function that runs a Gruntfile:

    var container = document.querySelector('.bash');
    var bsh = new Bash(container, {
        name: 'grunt',
        prompt: '$',
        function: function(bash, next) {
            bash.post('Running "jshint:gruntfile" (jshint) task', 0, false, true);
            bash.post('>> 1 file lint free.', 500, false, true);
            bash.post('&nbsp;', 600);
            bash.post('Running "uglify:dist" (uglify) task', 700, false, true);
            bash.post('File "dist/scripts.min.js" created.', 1600, false, true);
            bash.post('Uncompressed size: 389 bytes.', 1800, false, true);
            bash.post('&nbsp;', 1900);
            bash.post('Done, without errors.', 2000, false, true, function() {
                return next();
            });
        }
    });

An example of a demonstration function that emulates installing NPM packages and running the Node application:

    var container = document.querySelector('.bash');
    var bsh = new Bash(container, {
        demo: true,
        prompt: ['~', '$'],
        function: function(bash, next) {
            bash.post('npm install --production', 0, true);
            bash.post('npm start', 500, true);
            bash.post('&nbsp;', 600);
            bash.post('&nbsp;', 600);
            bash.post('# You\'re done!', 1500, false, true, function() {
                return next();
            });
        }
    });
