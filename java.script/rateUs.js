const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("rating-text");

let savedRating = sessionStorage.getItem("siteRating");

if (savedRating) {
  setRating(savedRating);
}

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const rating = star.getAttribute("data-value");
    setRating(rating);
    sessionStorage.setItem("siteRating", rating);
  });

  star.addEventListener("mouseover", () => {
    const rating = star.getAttribute("data-value");
    highlightStars(rating);
  });

  star.addEventListener("mouseout", () => {
    const currentRating = sessionStorage.getItem("siteRating") || 0;
    highlightStars(currentRating);
  });
});

function setRating(rating) {
  highlightStars(rating);
  ratingText.textContent = `Your rating: ${rating} ⭐`;


  if (window.jQuery) {
    showToast("Your rating has been submitted and will be taken into account in the statistics.");
  }

}

function highlightStars(rating) {
  stars.forEach((s) => {
    s.classList.toggle("active", s.getAttribute("data-value") <= rating);
  });
}


function showToast(message, duration = 2500) {

  if (typeof window.jQuery === "undefined") return;

  const $toast = $('<div class="toast-message" role="status"></div>').text(message);
  $("#toast-container").append($toast);
  $toast.fadeIn(200).delay(duration).fadeOut(300, function() {
    $(this).remove();
  });
}
