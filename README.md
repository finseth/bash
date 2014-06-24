# Bash.js

A terminal function emulator written in CSS3 and Javascript. You can write your own commands on top of the core terminal. Great for showing off your open source projects!

## Getting Started

You can clone or [download](download the latest archive) the repository from GitHub or install through Bower:


    bower install bash --save


Also requires [Moment.js](http://momentjs.com/) (listed as a Bower dependency).

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
                <a href="#" class="maxer">&#8660;</a>
                <span>Project &#8212; Bash &#8212; 80x24</span>
            </div>
            <div class="terminal"></div>
        </div>
    </div>

Execute Bash.js by creating a new instance:

    var container = document.querySelector('.bash');
    var bsh = new bash(container, {
        name: 'gulp',
        function: function(next) {
            lestrade(next);
        },
        title: 'Macbook-Pro:lestrade haydenbleasel$ ',
        help: 'Terminal ready. Try running "gulp"!'
    });

The `bash` object accepts a selector (usually `.bash`) and an array of options. The options include:

- `name`: the command you'll enter in the terminal
- `function`: the function to execute
- `title`: the prompt
- `help`: optional help text

# Custom commands

For an example of a custom command, check out the [Lestrade](https://github.com/haydenbleasel/bash/blob/gh-pages/lestrade.js) command on the demo site.
