export function initHeaderCompaction(header, marker, Observer) {
  if (!header) return;
  if (typeof Observer === "function") {
    const observer = new Observer(([entry]) => {
      header.classList.toggle("is-compact", !entry.isIntersecting);
    });
    if (marker) observer.observe(marker);
  } else {
    header.classList.add("is-compact");
  }
}

export function initNavigation({ onOpen, onClose } = {}) {
  const dialog = document.querySelector("[data-mobile-dialog]");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  if (!dialog || !openButton || !closeButton) return;

  const close = () => {
    dialog.close();
    document.body.classList.remove("menu-open");
    onClose?.();
    openButton.focus({ preventScroll: true });
  };
  openButton.addEventListener("click", () => {
    dialog.showModal();
    document.body.classList.add("menu-open");
    onOpen?.();
    closeButton.focus();
  });
  closeButton.addEventListener("click", close);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
  dialog.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));

  const header = document.querySelector("[data-site-header]");
  const marker = document.querySelector("[data-header-marker]");
  const Observer = "IntersectionObserver" in window ? window.IntersectionObserver : undefined;
  initHeaderCompaction(header, marker, Observer);
}
