

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openPopupBtn");
  const closeBtn = document.getElementById("closePopupBtn");
  const overlay = document.getElementById("popupOverlay");
  const form = document.getElementById("subscribeForm");
  const msg = document.getElementById("subscribeMsg");


  openBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
  });


  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });


  window.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.style.display = "none";
  });


  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("subscriberEmail").value.trim();

    if (!email) {
      msg.style.color = "red";
      msg.innerText = "Введите email!";
      return;
    }

    msg.style.color = "limegreen";
    msg.innerText = " Вы успешно подписались!";
    form.reset();

    setTimeout(() => {
      overlay.style.display = "none";
      msg.innerText = "";
    }, 2000);
  });
});
