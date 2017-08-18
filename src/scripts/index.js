import '../styles/main.sass';

import { bestGirls, markup } from './best-girls-data'

import initTabs from 'future-tabs';

document.getElementById('best-girls').innerHTML = markup;
document.getElementById('best-girls3').innerHTML = markup;

initTabs('.tabs');
