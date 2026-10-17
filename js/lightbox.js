// Full-screen photo viewer for any link with a data-lightbox="<group>" attribute.
// Arrow keys / swipe move within the group, Esc or a click on the backdrop closes.
(function () {
	var box = document.getElementById("lightbox");
	if (!box) return;

	var img = box.querySelector(".lightbox__img"),
		count = box.querySelector(".lightbox__count"),
		prevBtn = box.querySelector(".lightbox__prev"),
		nextBtn = box.querySelector(".lightbox__next"),
		closeBtn = box.querySelector(".lightbox__close"),
		items = [],
		index = 0,
		opener = null;

	function show(i) {
		index = (i + items.length) % items.length;
		var link = items[index],
			thumb = link.querySelector("img");
		img.classList.remove("is-loaded");
		img.onload = function () { img.classList.add("is-loaded"); };
		img.src = link.href;
		img.alt = thumb ? thumb.alt : "";
		count.textContent = items.length > 1 ? (index + 1) + " / " + items.length : "";
		prevBtn.hidden = nextBtn.hidden = items.length < 2;

		// Preload neighbours so next/prev feel instant
		[index - 1, index + 1].forEach(function (n) {
			var link = items[(n + items.length) % items.length];
			if (link) new Image().src = link.href;
		});
	}

	function open(link) {
		items = Array.prototype.slice.call(
			document.querySelectorAll('[data-lightbox="' + link.dataset.lightbox + '"]')
		);
		opener = link;
		box.hidden = false;
		document.body.classList.add("lightbox-open");
		show(items.indexOf(link));
		closeBtn.focus();
	}

	function close() {
		box.hidden = true;
		document.body.classList.remove("lightbox-open");
		img.removeAttribute("src");
		if (opener) opener.focus();
	}

	document.addEventListener("click", function (e) {
		var link = e.target.closest("[data-lightbox]");
		if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
		e.preventDefault();
		open(link);
	});

	prevBtn.addEventListener("click", function () { show(index - 1); });
	nextBtn.addEventListener("click", function () { show(index + 1); });
	closeBtn.addEventListener("click", close);
	box.addEventListener("click", function (e) {
		if (e.target === box || e.target.classList.contains("lightbox__figure")) close();
	});

	document.addEventListener("keydown", function (e) {
		if (box.hidden) return;
		if (e.key === "Escape") close();
		else if (e.key === "ArrowLeft") show(index - 1);
		else if (e.key === "ArrowRight") show(index + 1);
	});

	var touchX = null;
	box.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
	box.addEventListener("touchend", function (e) {
		if (touchX === null) return;
		var dx = e.changedTouches[0].clientX - touchX;
		if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
		touchX = null;
	});
})();
