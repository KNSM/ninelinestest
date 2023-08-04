import helpers from '../helpers';
import scroll from './scroll'

function openMenu() {
	return new Promise((resolve) => {
		helpers.$header.addClass('is-menu-opened');
		$('.header__menu').removeClass('is-hidden');

		setTimeout(() => {
			$('.header__menu').addClass('is-active');
			$('.js-burger').removeClass('is-disabled').attr('disabled', false);

			resolve();
		}, 100);
	});
}

function closeMenu() {
	return new Promise((resolve) => {
		helpers.$header.removeClass('is-menu-opened');
		$('.header__menu').removeClass('is-active');

		setTimeout(() => {
			$('.header__menu').addClass('is-hidden');
			$('.js-burger').removeClass('is-disabled').attr('disabled', false);

			resolve();
		}, 500);
	});
}

function toggleMenu(event) {
	event.preventDefault();
	event.stopPropagation();

	if ($(event.currentTarget).hasClass('is-active')) {
		$(event.currentTarget).removeClass('is-active');

		scroll.start();
		closeMenu();
	} else {
		$(event.currentTarget).addClass('is-active');

		scroll.stop();
		console.log(scroll);
		openMenu();
	}
}

function init() {
	helpers.$header = $('.header');

	$('.js-burger').on('click.header', toggleMenu);

	helpers.$document
		.on('click.header', (e) => {
			let $container = $('.header__menu');

			if ($container.is(e.target) && $container.has(e.target).length === 0 && $container.hasClass('is-active')) {
				closeMenu();
				$('.js-burger').removeClass('is-active');
			}
		})
		.on('keyup.header', (e) => {
			if ((e.key === 'Escape' || e.key === 'Esc') && $('.header__menu').hasClass('is-active')) {
				closeMenu();
				$('.js-burger').removeClass('is-active');
			}
		});
}

function destroy() {
	$('.js-burger').off('.header');
	helpers.$document.off('.header');
}


function headerScrolled() {
	if (scroll.scroll.instance.scroll.y > 0) {
		$('.header').addClass('header--scrolled')
	} else {
		$('.header').removeClass('header--scrolled')
	}
}


function getVisiblePercentage(section) {
	var windowHeight = window.innerHeight;
	var rect = section.getBoundingClientRect();
	var height = rect.height;
	var top = rect.top;
	var bottom = rect.bottom;
	var visibleTop = Math.max(top, 0);
	var visibleBottom = Math.min(bottom, windowHeight);
	return (visibleBottom - visibleTop) / height * 100;
}

function highlightMenu() {
	var maxPercentage = 0;
	var activeSection = null;

	$('.js-to-anchor').each(function() {
		var sectionId = $(this).attr('href');
		var section = document.querySelector(sectionId);
		var percentage = getVisiblePercentage(section);

		if (percentage > maxPercentage) {
			maxPercentage = percentage;
			activeSection = sectionId;
		}
	});

	$('.header__menu .list__item').removeClass('list__item--active');

	if (activeSection) {
		$('.header__menu .list__link[href="' + activeSection + '"]').closest('.list__item').addClass('list__item--active');
	}
}

scroll.on("scroll", highlightMenu);

highlightMenu();

scroll.on("scroll", headerScrolled);

export default {
	init,
	destroy,
	openMenu,
	closeMenu,
};
