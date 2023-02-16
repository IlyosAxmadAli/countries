const cardsContainer = document.querySelector(".cards-container");
const spinner = document.querySelector(".spinner");
const darkModeBtn = document.querySelector(".dark-mode-btn");
const api = `https://restcountries.com/v3.1/all`;

const request = new XMLHttpRequest();

request.addEventListener("readystatechange", () => {
  if (request.readyState === 4 && request.status === 200) {
    spinner.classList.add("hidden");
    JSON.parse(request.responseText).forEach((country) => {
      createCountry(country);
    });
  }
});

request.open("GET", api);
request.send();

function createCountry(obj) {
  const { capital, flags, name, region, population } = obj;
  const div = document.createElement("div");
  div.classList.add("country");
  div.innerHTML = `
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
  cardsContainer.appendChild(div);
}

JSON.parse(localStorage.getItem("darkLight"))
  ? document.body.classList.add("dark-mode")
  : [];

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkLight",
    document.body.classList.contains("dark-mode")
  );
});
