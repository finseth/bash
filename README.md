# Bash.js

Terminal function emulator.

## Getting Started

Download through GitHub or clone with Bower:

```
bower install bash --save
```

Also requires Moment.js, listed as a Bash dependency.

## Usage

```
var container = document.querySelector('.bash');
var bsh = new bash(container, {
    name: 'gulp',
    function: function(next) {
        lestrade(next);
    },
    title: 'Macbook-Pro:lestrade haydenbleasel$ ',
    help: 'Terminal ready. Try running "gulp"!'
});
```

```
<div class="bash">
    <div class="window">
        <div class="header">
            <a href="#" class="button close"></a>
            <a href="#" class="button min"></a>
            <a href="#" class="button max"></a>
            <a href="#" class="maxer">&#8660;</a>
            <span>Lestrade &#8212; Bash &#8212; 80x24</span>
        </div>
        <div class="terminal"></div>
    </div>
</div>
```
