const body = document.body;

const fonts = ["Arial", "Courier New", "Georgia", "Verdana", "Comic Sans MS"];
let currentFont = 0;

const pages = [
  "index.html",
  "gamezones.html",
  "price.html",
  "games.html",
  "contacts.html",
  "login.html",
  "FAQ.html"
];
let currentPage = pages.findIndex(p => window.location.pathname.includes(p));

const user = {
  name: "Guest",
  score: 0,
  increaseScore() {
    this.score += 10;
    const scoreDisplay = document.getElementById("scoreDisplay");
    if (scoreDisplay) {
      scoreDisplay.textContent = `${this.name}'s score: ${this.score}`;
    }
  }
};
//

//
const clickSound = new Audio("sounds/sfx00374.mp3");
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

body.style.transition = "font-family 0.5s ease, color 0.5s ease";

const keysPressed = {};

const menuLinks = document.querySelectorAll(".sidebar ul li a");
let focusedIndex = 0;

window.addEventListener("DOMContentLoaded", () => {
  const fontDisplay = document.getElementById("fontDisplay");
  if (fontDisplay) fontDisplay.textContent = `Current font: ${fonts[currentFont]}`;

  const scoreDisplay = document.getElementById("scoreDisplay");
  if (scoreDisplay) scoreDisplay.textContent = `${user.name}'s score: ${user.score}`;

  menuLinks.forEach((link, index) => {
    if (link.getAttribute("href") === window.location.pathname.split("/").pop()) {
      focusedIndex = index;
    }
  });

  if (menuLinks.length > 0) menuLinks[focusedIndex].focus();

  menuLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      link.style.backgroundColor = "#f0f0f0";
      link.style.transition = "background-color 0.3s ease";
    });
    link.addEventListener("mouseleave", () => {
      link.style.backgroundColor = "";
    });
  });

  if(extraText) {
    extraText.style.opacity = 0;
    extraText.style.transition = "opacity 0.5s ease";
  }
});

document.addEventListener("keydown", (event) => {
  if (keysPressed[event.code]) return;
  keysPressed[event.code] = true;

  switch (event.code) {
    case "KeyZ":
      changeFont();
      break;
    case "KeyX":
      user.increaseScore();
      break;
    case "ArrowRight":
      currentPage = (currentPage + 1) % pages.length;
      window.location.href = pages[currentPage];
      break;
    case "ArrowLeft":
      currentPage = (currentPage - 1 + pages.length) % pages.length;
      window.location.href = pages[currentPage];
      break;
    case "ArrowDown":
      if (menuLinks.length > 0) {
        focusedIndex = (focusedIndex + 1) % menuLinks.length;
        menuLinks[focusedIndex].focus();
        event.preventDefault();
      }
      break;
    case "ArrowUp":
      if (menuLinks.length > 0) {
        focusedIndex = (focusedIndex - 1 + menuLinks.length) % menuLinks.length;
        menuLinks[focusedIndex].focus();
        event.preventDefault();
      }
      break;
    case "Enter":
      if (menuLinks.length > 0) {
        menuLinks[focusedIndex].click();
      }
      break;
  }
});

document.addEventListener("keyup", (event) => {
  keysPressed[event.code] = false;
});

document.querySelectorAll("button").forEach(el => {
  el.addEventListener("click", playClickSound);
});

function changeFont() {
  body.style.textShadow = "0 0 5px rgba(0,0,0,0.3)";
  body.style.transition = "text-shadow 0.3s ease, color 0.3s ease, font-family 0.3s ease";

  setTimeout(() => {
    currentFont = (currentFont + 1) % fonts.length;
    body.style.fontFamily = fonts[currentFont];

    /*const colors = ["#333", "#0077cc", "#cc0000", "#009933", "#6600cc"];
    body.style.color = colors[Math.floor(Math.random() * colors.length)];
    body.style.textShadow = "none";*/

    localStorage.setItem("selectedFont", currentFont);

    const fontDisplay = document.getElementById("fontDisplay");
    if (fontDisplay) fontDisplay.textContent = `Current font: ${fonts[currentFont]}`;

    playClickSound();
  }, 300);
}

window.addEventListener("DOMContentLoaded", () => {
  const savedFont = localStorage.getItem("selectedFont");
  if (savedFont !== null) {
    currentFont = parseInt(savedFont);
    body.style.fontFamily = fonts[currentFont];
    const fontDisplay = document.getElementById("fontDisplay");
    if (fontDisplay) fontDisplay.textContent = `Current font: ${fonts[currentFont]}`;
  }
});

const readMoreBtn = document.getElementById("readMoreBtn");
const extraText = document.getElementById("extraText");

if(readMoreBtn && extraText) {
  readMoreBtn.addEventListener("click", () => {
    if(extraText.style.display === "none" || extraText.style.display === "") {
      extraText.style.display = "block";
      setTimeout(() => extraText.style.opacity = 1, 10);
      readMoreBtn.textContent = "Закрыть";
    } else {
      extraText.style.opacity = 0;
      setTimeout(() => extraText.style.display = "none", 500);
      readMoreBtn.textContent = "Читать далее";
    }
    playClickSound();
  });
}

pages.forEach((page, index) => {
  console.log(`Page ${index + 1}: ${page}`);
});

$(document).ready(function() {
    const $searchInput = $('.search-box input');
    const $cards = $('.card, .card1');


    const allWords = [];
    $cards.each(function() {
        const text = $(this).find('.card-body').text().trim().split(/\s+/);
        allWords.push(...text);
    });
    const uniqueWords = [...new Set(allWords)].filter(w => w.length > 2);

    const $suggestionBox = $('<ul class="suggestion-box"></ul>').css({
        position: 'absolute',
        background: '#2b2b2b',
        color: 'white',
        listStyle: 'none',
        padding: '5px 10px',
        margin: '0',
        borderRadius: '6px',
        width: $searchInput.outerWidth(),
        maxHeight: '150px',
        overflowY: 'auto',
        display: 'none',
        zIndex: 1000
    });
    $('.search-box').css('position', 'relative').append($suggestionBox);

    $searchInput.on('input', function() {
        const query = $(this).val().toLowerCase().trim();


        $cards.find('.card-body').each(function() {
            $(this).html($(this).text());
        });

        if(query.length === 0) {
            $cards.show();
            $suggestionBox.hide();
            return;
        }

        $cards.each(function() {
            const $card = $(this);
            const text = $card.find('.card-body').text().toLowerCase();

            if(text.includes(query)) {
                $card.closest('.col-sm-12, .col-md-6, .col-lg-4').show();
                highlightText($card.find('.card-body'), query);
            } else {
                $card.closest('.col-sm-12, .col-md-6, .col-lg-4').hide();
            }
        });


        $suggestionBox.empty();
        const suggestions = uniqueWords.filter(w => w.toLowerCase().startsWith(query)).slice(0, 10);
        suggestions.forEach(word => {
            $suggestionBox.append('<li class="suggestion-item">'+word+'</li>');
        });
        $suggestionBox.toggle(suggestions.length > 0);
    });

    function highlightText($container, query) {
        const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&')})`, 'gi');
        $container.html($container.text().replace(regex, '<span class="highlight">$1</span>'));
    }

    $(document).on('click', '.suggestion-item', function() {
        $searchInput.val($(this).text()).trigger('input');
        $suggestionBox.hide();
    });

    $('<style>').prop('type','text/css').html(`
        .highlight { background-color: yellow !important; color: black !important; padding: 1px 2px; border-radius: 3px; font-weight: bold; }
        .suggestion-item { padding: 5px; cursor: pointer; }
        .suggestion-item:hover { background-color: #00bfff; color: black; }
    `).appendTo('head');

    $(document).click(function(e){
        if(!$(e.target).closest('.search-box').length){
            $suggestionBox.hide();
        }
    });
});

$(window).on('scroll', function() {
  const scrollTop = $(window).scrollTop();
  const docHeight = $(document).height() - $(window).height();
  const scrollPercent = (scrollTop / docHeight) * 100;
  $('#scrollProgressBar').css('width', scrollPercent + '%');
});

$('.stat-number').each(function() {
    const $this = $(this);            
    const target = +$this.data('target'); 
    $({ countNum: 0 }).animate({ countNum: target }, {
        duration: 400000,                
        easing: 'swing',               
        step: function() { 
            $this.text(Math.floor(this.countNum)); 
        },
        complete: function() { 
            $this.text(this.countNum); 
        }
    });
});


$(document).ready(function() {
    const $popupOverlay = $('#popupOverlay');
    const $openBtn = $('#openPopupBtn');
    const $closeBtn = $('#closePopupBtn');
    const $subscribeForm = $('#subscribeForm');
    const $subscriberEmail
    = $('#subscriberEmail');
    const $subscribeMsg = $('#subscribeMsg');


$openBtn.on('click', function() {
    $popupOverlay.css('display', 'flex').hide().fadeIn();
});


    $closeBtn.on('click', function() {
        $popupOverlay.fadeOut();
    });


    $subscribeForm.on('submit', function(e) {
        e.preventDefault();
        const email = $subscriberEmail.val().trim();
        if(email === '') return;

        const $btn = $(this).find('button[type="submit"]');
        $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm"></span> Loading...');

        setTimeout(() => {
            $btn.prop('disabled', false).text('Subscribe');
            $subscribeMsg.text('Thanks for subscribing!').fadeIn().delay(2000).fadeOut();
            $subscriberEmail.val('');
        }, 2000);
    });
});

const prankBtn = document.getElementById('prankBtn');

prankBtn.addEventListener('mouseenter', () => {
  prankBtn.textContent = "You are sure?";
});

prankBtn.addEventListener('mouseleave', () => {
  prankBtn.textContent = "Don't press";
});

prankBtn.addEventListener('click', () => {
  alert("All the money has been debited from your bank account! 😎"); 
});

const apiKey = "dbb0bc7657386b876a80f707650e3ab7";
const city = "Astana,KZ";

async function getWeather() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`);
    const data = await response.json();
    console.log(data);

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;

    document.getElementById("weather-info").innerText = 
      `Temperature: ${temp}°C, ${desc}, Humidity: ${humidity}%`;
  } catch (error) {
    document.getElementById("weather-info").innerText = "Couldn't get weather info.";
    console.error(error);
  }
}

window.addEventListener("DOMContentLoaded", getWeather);