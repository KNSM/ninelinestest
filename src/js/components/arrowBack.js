import scroll from './scroll'


const $arrowBack = $('#arrow-back');

function updateCircleAndTextProgress(scrollPercentage) {
	const circle = $arrowBack.find('.circle-progress');
	const circleLength = circle.get(0).getTotalLength();
	let progress = (scrollPercentage * circleLength) / 100;
	scrollPercentage = Math.round(scrollPercentage);

	if (scrollPercentage >= 100) {
		circle.attr("stroke-dasharray", progress + "," + circleLength);
		$arrowBack.find('.content').html('<img src="/images/sprites/svg/arrow-top.svg">');
		$arrowBack.addClass('arrow-back--active');
	} else {
		circle.attr("stroke-dasharray", progress + "," + circleLength);
		$arrowBack.find('.content').html(scrollPercentage + "%");
		$arrowBack.removeClass('arrow-back--active');
	}
}

function updateProgressOnScroll() {
	let windowHeight = $(window).height();
	let documentHeight = $('body').height();
	let scrollTop = scroll.scroll.instance.scroll.y;
	let scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

	updateCircleAndTextProgress(scrollPercentage);
}

updateProgressOnScroll();

scroll.on('scroll', updateProgressOnScroll);

$arrowBack.click(function () {
	if ($(this).hasClass('arrow-back--active')) {
		scroll.scrollTo('top');
	}
});
