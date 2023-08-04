import header from '../components/header';
import helpers from '../helpers';
import scroll from '../components/scroll'

/**
* Модуль "Плавный переход к якорю"
*/
const init = () => {
	helpers.$document.on('click.anchor', '.js-to-anchor', (e) => {
		e.preventDefault();
		e.stopPropagation();

		const id = $(e.currentTarget).attr('href');
		const speed = $(e.currentTarget).data('speed') || 500;
		const offset = helpers.$header.css('position') === 'fixed' || helpers.$header.css('position') === 'absolute'
			? -helpers.$header.outerHeight(true)
			: 0;

		if ($(e.target).hasClass('list__link')) {
			scroll.scrollTo($(id).get(0), {offset});
		} else {
			header.closeMenu().then(() => {
				$('.js-burger').removeClass('is-active');
				scroll.scrollTo($(id).get(0), {offset});
			});
		}
	});
};

const destroy = () => {
	helpers.$document.off('.anchor');
};

export default {
	init,
	destroy,
};
