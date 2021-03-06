'use strict';

// required by the index.html
// will be executed in the renderer process for that window.
// All Node.js APIs are available in this process. :D

var React = require('react');
var ReactDOM = require('react-dom');
var path = require('path');
var url = require('url');
var os = require('os');

var _require = require('electron'),
    remote = _require.remote;

function interfaceStringFormat(str) {}

function interfaceList() {
  var active = os.networkInterfaces();
  console.log(active);
  return active;
}

//**************** Button Group ********************************
function ButtonGroupComponent(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { 'class': 'btn' },
      'Get interface list'
    ),
    React.createElement(
      'button',
      { 'class': 'btn' },
      'connect to local interface'
    ),
    React.createElement(
      'button',
      { 'class': 'btn', id: 'pineForm' },
      props.pineConnected,
      ' pinapple'
    ),
    React.createElement(
      'button',
      { 'class': 'btn' },
      'pipe to Wireshark!'
    )
  );
}
var bthGroupEl = React.createElement(ButtonGroupComponent, { pineConnected: 'Connect' });
ReactDOM.render(bthGroupEl, document.getElementById('b3'));

var interfaceEl = React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    'Hello, Nathan! from React.js ;)'
  ),
  React.createElement(
    'p',
    null,
    'Your active interfaces are as follows: ',
    JSON.stringify(interfaceList(), null, 2)
  )
);

ReactDOM.render(interfaceEl, document.getElementById('re'));

// ****** Remote Pinapple connection form ******
var pineBtn = document.getElementById("pineForm");
pineBtn.onclick = function () {

  var pineappleForm = new remote.BrowserWindow({
    parent: remote.getCurrentWindow(),
    show: false,
    width: 500,
    height: 500
  });

  pineappleForm.loadURL(url.format({
    pathname: path.join(__dirname, '../html/pineForm.html'),
    protocol: 'file:',
    slashes: true
  }));

  pineappleForm.once('ready-to-show', function () {
    pineappleForm.show();
  });

  pineappleForm.on('closed', function () {
    pineappleForm = null;
  });
};

//settings page (Accessable from cog)
