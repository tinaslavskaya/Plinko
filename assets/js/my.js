document.querySelector('.list').addEventListener('click', function() {
	window.location.href = event.target.getAttribute('data-value');
});