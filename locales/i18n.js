async function loadTranslation(lang) {
  const response = await fetch(`./locales/${lang}/translation.json`);
  // console.log(response);
  if(!response.ok) {
    console.error(`Ошибка загрузки файла переводов для языка ${lang}`);
    return;
  }
  return response.json();
}

function savedLanguage () {
  return localStorage.getItem('language') || 'ru';
}

async function initI18n() {

  const resources = {
    ru: {"translation": await loadTranslation('ru')},
    lt: {"translation": await loadTranslation('lt')}
  }

  i18next.init({
    lng: savedLanguage(),
    debug: true,
    fallbacking: 'ru',
    resources
  }, function(err, t) {
    if(err) {
      return console.error('Ошибка инициализации i18next:', err);
    }
  });
  updateContent();
}

// Функция для изменения языка
function changeLanguage(lang) {
  i18next.changeLanguage(lang, function(err, t) {
    if (err) {
      return console.error('Ошибка смены языка:', err);
    }
    console.log('Язык успешно изменен на:', lang);
    
    updateContent(); 
    localStorage.setItem('language', lang); // Сохраняем выбранный язык
   
  });
}

function updateContent() {
  let elements = document.querySelectorAll('[id]');

  elements.forEach((element) => {
    if(i18next.exists(element.id)) {
       document.getElementById(element.id).innerHTML = i18next.t(element.id);
    } else {
      return;
    }
  });

}


updateContent();

document.querySelector('.current').innerHTML = savedLanguage();// переключать текст на переключателе

initI18n();

 i18next.on('languageChanged', function(lng) {
      if(lng == 'ru') {
        document.querySelector('.flag-country').src = "../assets/img2/country/country-rus.png";
      } else {
         document.querySelector('.flag-country').src = "../assets/img2/country/country-lt.png";
         console.log('not');
      }
});