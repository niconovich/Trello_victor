import { Modal } from 'bootstrap';
import { $ } from './helpers.js';
import { clock } from './clock.js';
import { users } from './jsonplaceholder.js'
setInterval(clock, 1000);
clock();


console.log(users())