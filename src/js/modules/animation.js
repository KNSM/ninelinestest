import scroll from '../components/scroll'

const $elementsToAnimate = $('.fade-in-text');

function animateTextIn() {
	$elementsToAnimate.each(function () {
		const elementTop = this.getBoundingClientRect().top + scroll.scroll.instance.scroll.y;
		const windowHeight = window.innerHeight;

		if (elementTop < windowHeight) {
			$(this).addClass('visible');
		}
	});
}

animateTextIn();

scroll.on('scroll', animateTextIn);
