import '../styles/main.sass';

import { bestGirls, markup } from './best-girls-data'

import initTabs from 'future-tabs';

document.getElementById('best-girls').innerHTML = markup;
document.getElementById('best-girls3').innerHTML = markup;

initTabs('.tabs');

let intervalId = 0;

const $scrollButton = document.querySelector('.scroll');

function scrollStep() {
	if (window.pageYOffset === 0) {
		clearInterval(intervalId);
	}
	window.scroll(0, window.pageYOffset - 50);
}

function scrollToTop() {
	intervalId = setInterval(scrollStep, 16.66);
}

$scrollButton.addEventListener('click', scrollToTop);
