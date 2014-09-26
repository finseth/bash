/*jslint browser:true*/

var Bash = function (selector, options) {

    'use strict';

        // Selectors
    var command = selector.querySelector('.command'),
        terminal = selector.querySelector('.terminal'),

        // Options
        computer = options.computer || 'ttys000',
        help = options.help || undefined,
        prompt = options.prompt || 'user@home:~$',
        name = options.name || undefined,
        func = options.function || undefined,
        demo = options.demo || false,

        // Variables
        history = [],
        current = history.length,
        self = this;

    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\xA0]+|[\s\xA0]+$/g, '');
        };
    }

    this.time = function () {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            now = new Date(),
            day = days[now.getDay()],
            month = months[now.getMonth()],
            date = now.getDate(),
            hours = (now.getHours() < 10 ? '0' : '') + now.getHours(),
            minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes(),
            seconds = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();
        return day + ' ' + month + ' ' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    };

    this.createPrompt = function (string, index) {
        var symbol = document.createElement('span');
        symbol.className = 'prompt prompt-' + index;
        symbol.innerHTML = string.trim() + ' ';
        return symbol;
    };

    this.addPrompts = function (element) {
        var i;
        if (typeof prompt === 'string') {
            element.appendChild(self.createPrompt(prompt), 0);
        } else {
            for (i = 0; i < prompt.length; i += 1) {
                element.appendChild(self.createPrompt(prompt[i], i));
            }
        }
    };

    this.reset = function () {
        var header = document.createElement('p'),
            input = document.createElement('span');
        self.addPrompts(header);
        input.className = 'command';
        input.contentEditable = 'true';
        header.appendChild(input);
        terminal.appendChild(header);
        terminal.scrollTop = terminal.scrollHeight;
        command = selector.querySelector('.command');
        command.focus();
    };

    this.post = function (message, delay, symbol, feedback, next) {
        var output;
        setTimeout(function () {
            output = document.createElement('p');
            if (feedback) {
                output.className = 'feedback';
            }
            if (demo && symbol) {
                self.addPrompts(output);
            }
            output.innerHTML = output.innerHTML + ' ' + message;
            terminal.appendChild(output);
            terminal.scrollTop = terminal.scrollHeight;
            if (next) {
                return next();
            }
        }, delay);
    };

    self.clear = function (next) {
        var spacer = document.createElement('br');
        spacer.className = 'spacer';
        spacer.style.height = terminal.clientHeight - 40 + 'px';
        terminal.appendChild(spacer);
        return next() || true;
    };

    this.start = function () {
        self.post('Last login: ' + this.time() + ' on ' + computer, 300, false, true, function () {
            if (help) {
                self.post(help, 150, false, true);
            }
            setTimeout(function () {
                self.reset();
            }, 300);
        });
    };

    terminal.addEventListener('keydown', function (e) {
        var key = e.keyCode,
            request,
            message;
        if (key === 13) {
            e.preventDefault();
            command.removeAttribute('contenteditable');
            request = command.innerHTML.trim();
            command.removeAttribute('class');
            if (request === "") {
                self.reset();
            } else if (request === name) {
                func(self, function () {
                    self.reset();
                    history.push(request);
                    current = history.length;
                });
            } else if (request === 'clear') {
                self.clear(function () {
                    self.reset();
                });
            } else if (request.split(' ')[0] === 'echo') {
                message = request.split(' ').splice(1).join(' ');
                self.post(message === '' ? '&nbsp;' : message, 0, false, true, function () {
                    self.reset();
                    history.push(request);
                    current = history.length;
                });
            } else {
                self.post('-bash: ' + request.split(' ')[0] + ': command not found', 0, false, true, function () {
                    self.reset();
                    history.push(request);
                    current = history.length;
                });
            }
        } else if (key === 38 && current > 0) {
            current -= 1;
            command.innerHTML = history[current];
        } else if (key === 40 && current < history.length - 1) {
            current += 1;
            command.innerHTML = history[current];
        }
    });

    this.initialise = function () {
        if (demo && func) {
            func(self, function () {
                return true;
            });
        } else {
            self.start();
        }
    };

    this.initialise();

};
