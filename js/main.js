// Animation
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const staggerItems = document.querySelectorAll('.reveal-stagger');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const isStagger = entry.target.classList.contains('reveal-stagger');

      let delay = 0;
      if (isStagger) {
        const index = [...staggerItems].indexOf(entry.target);
        delay = index * 100;
      }

      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, delay);

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  reveals.forEach(el => observer.observe(el));

// FAQ Stuff 
  const faqContainer = document.querySelector(".faq-content");
  if (!faqContainer) return;

  faqContainer.addEventListener("click", (e) => {
    const groupHeader = e.target.closest(".faq-group-header");
    if (!groupHeader) return;

    const group = groupHeader.parentElement;
    const groupBody = group.querySelector(".faq-group-body");
    const icon = groupHeader.querySelector("i");

    // Close other open groups
    const otherGroups = faqContainer.querySelectorAll(".faq-group");
    otherGroups.forEach((otherGroup) => {
      if (otherGroup === group) return;

      const otherGroupBody = otherGroup.querySelector(".faq-group-body");
      const otherIcon = otherGroup.querySelector(".faq-group-header i");

      otherGroupBody.classList.remove("open");
      otherGroupBody.style.maxHeight = "0px";

      if (otherIcon) {
        otherIcon.classList.remove("fa-minus");
        otherIcon.classList.add("fa-plus");
      }
    });

    // Toggle icon
    if (icon) {
      icon.classList.toggle("fa-plus");
      icon.classList.toggle("fa-minus");
    }

    // Toggle body smoothly
    const isOpen = groupBody.classList.contains("open");
    if (!isOpen) {
      groupBody.classList.add("open");
      groupBody.style.maxHeight = groupBody.scrollHeight + "px";
    } else {
      groupBody.classList.remove("open");
      groupBody.style.maxHeight = "0px";
    }
  });

  // If open and window resizes, keep height correct
  window.addEventListener("resize", () => {
    document.querySelectorAll(".faq-group-body.open").forEach((body) => {
      body.style.maxHeight = body.scrollHeight + "px";
    });
  });

  const openMessageButtons = document.querySelectorAll('[data-message-target]');
  const closeMessageButtons = document.querySelectorAll('[data-close-button]');
  const overlay = document.getElementById('overlay');

  openMessageButtons.forEach (button => {
    button.addEventListener('click', () => {
      const ceo = document.querySelector(button.dataset.messageTarget);
      openMessage(ceo);
    })
  })

  overlay.addEventListener('click', () => {
    const ceos = document.querySelectorAll('.ceo-message.active');
    ceos.forEach(ceo => {
      closeMessage(ceo);
    }) 
  })

  closeMessageButtons.forEach (button => {
    button.addEventListener('click', () => {
      const ceo = button.closest('.ceo-message');
      closeMessage(ceo);
    })
  })

  function openMessage(ceo) {
    if (ceo == null) {
      return;
    }

    ceo.classList.add('active');
    overlay.classList.add('active');
  }

  function closeMessage(ceo) {
    if (ceo == null) {
      return;
    }

    ceo.classList.remove('active');
    overlay.classList.remove('active');
  }


})

