(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var year = document.getElementById("year");
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var sendBtn = document.getElementById("send-btn");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (toggle && header && nav) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", Boolean(isError));
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      setStatus("");

      if (typeof emailjs === "undefined") {
        setStatus("Mail is unavailable. Use the email link instead.", true);
        return;
      }

      if (sendBtn) sendBtn.disabled = true;
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
          if (sendBtn) sendBtn.disabled = false;
        });
    });
  }

  if (typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: "iba9MU2Dl9ofdcOdo" });
  }
})();
