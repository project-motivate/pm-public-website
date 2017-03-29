const person = require('./src/app');
const style = require('./src/styles/main.css');

import Logo from './src/Logo';

const app = document.getElementById('app');
app.innerHTML = `Hello, ${ person.name }`;

const logo = document.getElementById('logo');
logo.innerHTML = `${ Logo }`;
