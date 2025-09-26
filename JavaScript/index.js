// for language updates
async function fetchLanguageData(lang) {
    const response = await fetch(`Languages/${lang}.json`);
    return response.json();
}

function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = langData[key];

    });

    document.querySelectorAll("[data-i18n-img]").forEach(img => {
    const key = img.getAttribute("data-i18n-img");
    if (langData[key]) {
      img.src = langData[key];
    }
  });
}

async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});

//language bar

const language_btn = document.getElementById('language-btn');
const language_menu = document.getElementById('language-menu');

language_btn.addEventListener('click', () => {
    const open = language_btn.getAttribute('aria-expanded') === 'true';
    language_btn.setAttribute('aria-expanded', String(!open));
    language_menu.hidden = open;
});

document.addEventListener('click', (e) => {
    if (!language_btn.contains(e.target) && !language_menu.contains(e.target)) {
    language_btn.setAttribute('aria-expanded', 'false');
    language_menu.hidden = true;
    }
});


const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 50) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});


document.getElementById("extra-text").textContent = "This text was added by JavaScript!";
