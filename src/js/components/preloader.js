const imagesToPreload = [
	'./images/sprites/png/logo.png',
	'./images/sprites/png/love-image.png',
];
function preloadImagesAndAnimate(images, callback) {
	let loadedImages = 0;
	let totalImages = images.length;

	function imageLoaded() {
		loadedImages++;
		const percentLoaded = loadedImages / totalImages;

		const animationSpeed = Math.max(0, 1000 - percentLoaded * 1000);
		$('#preloader .rocket').css('animation-duration', animationSpeed + 'ms');

		if (loadedImages === totalImages) {
			$('#preloader').fadeOut(500, callback);
		}
	}

	images.forEach((image) => {
		const img = new Image();
		img.src = image;
		img.onload = imageLoaded;
	});
}

preloadImagesAndAnimate(imagesToPreload, function () {
	// $('html').attr('style', 'overflow-y: auto;')
});
