const siteTitle = document.querySelector("title");
const countryImg = document.querySelector(".country-img");
const introTitle = document.querySelector(".intro-title");
const nativeName = document.querySelector(".native-name");
const CountryPopulation = document.querySelector(".population");
const CountryRegion = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capitalCountry = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currency = document.querySelector(".currency");
const language = document.querySelector(".language");
const btnImg = document.querySelector(".btn-img");

const searchParams = window.location.search;
const countryNames = new URLSearchParams(searchParams).get("q");

const getDataCountry = (recourse) => {
  const requestCountry = new XMLHttpRequest();

  requestCountry.addEventListener("readystatechange", () => {
    if (requestCountry.readyState === 4 && requestCountry.status === 200) {
      const data = JSON.parse(requestCountry.responseText);
      showData(data);
    }
  });
  requestCountry.open("GET", recourse);
  requestCountry.send();
};
getDataCountry(`https://restcountries.com/v3.1/alpha/${countryNames}`);

function showData(country) {
  const {
    name,
    flags,
    population,
    region,
    capital,
    subregion,
    tld,
    currencies,
    languages,
    borders,
  } = country[0];

  siteTitle.textContent = name.common;
  countryImg.src = flags.svg;
  introTitle.textContent = name.common;
  nativeName.textContent = name.official;
  CountryPopulation.textContent = population;
  CountryRegion.textContent = region;
  subRegion.textContent = subregion;
  capitalCountry.textContent = capital ? capital : "no capital";
  domain.textContent = tld;
  currency.textContent = Object.keys(currencies);
  language.textContent = Object.values(languages);

  if (borders) {
    const bordersCountries = borders;
    const ul = document.createElement("ul");
    ul.classList.add("border-countries");
    ul.innerHTML += `
    <li>Border Countries: </li>
    `;

    bordersCountries.forEach((borderCountry) => {
      const li = document.createElement("li");
      li.innerHTML += `
        <a href="detail.html?q=${borderCountry}" class="border-country">${borderCountry}</a>
        `;

      ul.appendChild(li);
    });
    document.querySelector(".intro-content").appendChild(ul);
  }
}
