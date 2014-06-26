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
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        now,
        self = this,
        date,
        month,
        day,
        hours,
        minutes,
        seconds;

    this.time = function () {
        now = new Date();
        day = days[now.getDay()];
        month = months[now.getMonth()];
        date = now.getDate();
        hours = (now.getHours() < 10 ? '0' : '') + now.getHours();
        minutes = (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
        seconds = (now.getSeconds() < 10 ? '0' : '') + now.getSeconds();
        return day + ' ' + month + ' ' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    };

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
        time.innerHTML = 'Last login: ' + this.time() + ' on ' + computer;
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
            if (request.trim() === "") {
                self.reset();
            } else if (request.trim() === options.name) {
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
