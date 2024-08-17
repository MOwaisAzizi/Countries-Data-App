'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const p = document.querySelector('h1');
const countryData = document.querySelector('.country');
let key, key1, lang, cur;

function getCountry() {
  fetch(`https://restcountries.com/v3.1/all`).then(response => {
    if (!response.ok) {
      throw new Error(`country not fount (${response.status})`)
    }
    return response.json()
  }).then(res => {
    res.map(country => {

      for (key in country.languages) {
        lang = country.languages[key]
        break;
      }
      for (key1 in country.currencies) {
        cur = country.currencies[key1].name
        break
      }

      const html = `
<article class="country">
  <img class="country__img" src='${country.flags.png}'/>
  <div class="country__data">
    <h3 class="country__name">${country.name.common}</h3>
    <h4 class="country__region">${country.region}</h4>

    <p class="country__row"><span>🏦</span>${country.capital}</p>
    <p class="country__row"><span>👫</span>${((+country.population) / 1000000).toFixed(3)}M</p>
    <p class="country__row"><span>🗣️</span>${lang}</p>
     <p class="country__row"><span>💰</span>${cur}</p>
  </div>
</article>
`
      countriesContainer.insertAdjacentHTML('beforeend', html)
    })
  })
    .catch(err => {
      console.error(err)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1
    })
}

getCountry()
