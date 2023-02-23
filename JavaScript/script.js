const cardsContainer = document.querySelector(".cards-container");
const spinner = document.querySelector(".spinner");
const formSearch = document.querySelector("#form-search");
const filterSelect = document.querySelector("#filter-select");

const getData = (recourse) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        spinner.classList.add("hidden");
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject();
      }
    });
    request.open("GET", recourse);
    request.send();
  });
};
getData(`https://restcountries.com/v3.1/all`)
  .then((data) => {
    data.forEach((country) => {
      createCountry(country);
    });
  })
  .catch((spinner) => {
    spinner.classList.add("hidden");
  });

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let countryValue = formSearch.countryName.value;
  if (countryValue == "") {
    cardsContainer.innerHTML = "";
    getData(`https://restcountries.com/v3.1/all`).then((data) => {
      data.forEach((country) => {
        createCountry(country);
      });
    });
  } else {
    cardsContainer.innerHTML = "";
    getData(`https://restcountries.com/v3.1/name/${countryValue}`).then(
      (data) => {
        data.forEach((country) => {
          createCountry(country);
        });
      }
    );
  }
});

filterSelect.addEventListener("change", () => {
  let region = filterSelect.value;
  if (region == "all") {
    cardsContainer.innerHTML = "";
    getData(`https://restcountries.com/v3.1/all`).then((data) => {
      data.forEach((country) => {
        createCountry(country);
      });
    });
  } else {
    cardsContainer.innerHTML = "";
    getData(`https://restcountries.com/v3.1/region/${region}`).then((data) => {
      data.forEach((country) => {
        createCountry(country);
      });
    });
  }
});

function createCountry(obj) {
  const { capital, flags, name, region, population, fifa } = obj;
  const a = document.createElement("a");
  a.setAttribute("href", `detail.html?q=${fifa}`);
  a.innerHTML = `
  <div class="card">
     <img src="${flags.svg}" class="card-img" />
     <div class="card-body">
        <h5 class="card-title">${name.common}</h5>
        <p><b>Population: </b>${population}</p>
        <p><b>Region: </b>${region}</p>
        <p><b>Capital: ${capital ? capital : "no capital"}</b></p>
     </div>
  </div>
  `;
  cardsContainer.appendChild(a);
}
