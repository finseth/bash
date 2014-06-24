/*jslint browser:true*/
/*global moment*/

var bash = function (selector, options) {

    'use strict';

    var command = selector.querySelector('.command'),
        terminal = selector.querySelector('.terminal'),
        content = document.createElement('span'),
        title = options.title || 'user@home:~$ ',
        computer = options.computer || 'ttys000',
        time,
        request,
        message,
        header,
        output,
        help,
        self = this;

    this.error = function (request) {
        message = document.createElement('p');
        message.innerHTML = '-bash: ' + request + ': command not found';
        terminal.appendChild(message);
        message = undefined;
    };

    this.reset = function () {
        header = document.createElement('p');
        header.innerHTML = title;
        content = document.createElement('span');
        content.className = 'command';
        content.contentEditable = 'true';
        header.appendChild(content);
        terminal.appendChild(header);
        terminal.scrollTop = terminal.scrollHeight;
        command = selector.querySelector('.command');
        command.focus();
    };

    this.post = function (message, delay) {
        setTimeout(function () {
            output = document.createElement('p');
            output.innerHTML = message;
            terminal.appendChild(output);
            terminal.scrollTop = terminal.scrollHeight;
        }, delay);
    };

    this.initialise = function () {
        self = this;
        time = document.createElement('p');
        time.innerHTML = 'Last login: ' + moment().format("ddd MMM D hh:mm:ss") + ' on ' + computer;
        setTimeout(function () {
            terminal.appendChild(time);
        }, 300);
        if (options.help) {
            help = document.createElement('p');
            help.innerHTML = options.help;
            setTimeout(function () {
                terminal.appendChild(help);
            }, 450);
        }
        setTimeout(function () {
            self.reset();
        }, 600);
    };

    terminal.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            command.removeAttribute('contenteditable');
            request = command.innerHTML.replace(/&nbsp;/g, '');
            command.removeAttribute('class');
            if (request.replace(/^\s+|\s+$/gm, '') === "") {
                self.reset();
            } else if (request === options.name) {
                options.function(function () {
                    self.reset();
                });
            } else {
                self.error(request);
                self.reset();
            }
        }
    });

    this.initialise();

};
