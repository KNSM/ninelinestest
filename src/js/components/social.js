import Share from 'ninelines-sharing';

if (document.querySelector('[data-social]')) {
	const list = document.querySelectorAll('[data-social]');

	Array.prototype.forEach.call(list, (item) => {
		item.addEventListener('click', (e) => {
			const social = e.currentTarget.dataset.social;
			const url = location.origin + location.pathname;

			Share[social](url);
		});
	});
}


$('#fb-share-link').on('click', function (event) {
	event.preventDefault();

	const shareUrl = 'https://www.facebook.com/sharer/sharer.php?'
		+ 'u=' + encodeURIComponent(window.location.href)
		+ '&title=' + encodeURIComponent(window.data.candidate.name)
		+ '&description=' + encodeURIComponent(window.data.candidate.role)
		+ '&picture=' + encodeURIComponent(window.data.candidate.image);

	window.open(shareUrl, '_blank');
});

$('#vk-share-link').on('click', function (event) {
	event.preventDefault();

	const shareUrl = 'https://vk.com/share.php?'
		+ 'url=' + encodeURIComponent(window.location.href)
		+ '&title=' + encodeURIComponent(window.data.candidate.name)
		+ '&description=' + encodeURIComponent(window.data.candidate.role)
		+ '&image=' + encodeURIComponent(window.data.candidate.image);

	window.open(shareUrl, '_blank');
});

$('#tg-share-link').on('click', function (event) {
	event.preventDefault();

	const title = encodeURIComponent(window.data.candidate.name);
	const description = encodeURIComponent(window.data.candidate.role);
	const image = encodeURIComponent(window.data.candidate.image);

	const shareUrl = 'https://t.me/share/url?url=' + encodeURIComponent(window.location.href)
		+ '&text=' + title + '&caption=' + description + '&photo=' + image;

	window.open(shareUrl, '_blank');
});
