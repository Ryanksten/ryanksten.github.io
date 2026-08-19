(function () {
	var year = document.getElementById("year");
	if (year) {
		year.textContent = String(new Date().getFullYear());
	}

	if (typeof emailjs !== "undefined") {
		emailjs.init({ publicKey: "iba9MU2Dl9ofdcOdo" });
	}

	var form = document.getElementById("contact-form");
	var status = document.getElementById("form-status");
	if (!form) return;

	function setStatus(message, isError) {
		if (!status) return;
		status.textContent = message;
		status.classList.toggle("is-error", Boolean(isError));
	}

	form.addEventListener("submit", function (event) {
		event.preventDefault();
		setStatus("");

		if (typeof emailjs === "undefined") {
			setStatus("Mail is unavailable. Email Ryanksten@gmail.com instead.", true);
			return;
		}

		var submit = form.querySelector('input[type="submit"]');
		if (submit) submit.disabled = true;
		setStatus("Sending…");

		emailjs
			.sendForm("service_y13dioo", "template_ouk1lje", form)
			.then(function () {
				setStatus("Sent. I’ll reply from that address.");
				form.reset();
			})
			.catch(function () {
				setStatus("Couldn’t send. Email Ryanksten@gmail.com instead.", true);
			})
			.finally(function () {
				if (submit) submit.disabled = false;
			});
	});
})();
