const container = document.getElementById("countries-container");
const searchInput = document.getElementById("search");

let countries = [];

container.innerHTML = "<p>⏳ Loading countries...</p>";

async function fetchCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population");

    if (!res.ok) throw new Error("API failed");

    countries = await res.json();
    showCountries(countries);

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filtered = countries.filter(c =>
        c.name.common.toLowerCase().includes(query)
      );
      showCountries(filtered, query);
    });

  } catch (error) {
    console.error("Fetch failed:", error);
    container.innerHTML = `<p style="color:red;">❌ Failed to load countries. Please check your internet connection and try again.</p>`;
  }
}

function showCountries(data, query = "") {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p>😕 No country found for "<strong>${query}</strong>"</p>`;
    return;
  }

  data.forEach(country => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${country.flags?.png}" alt="Flag of ${country.name.common}">
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    `;

    container.appendChild(card);
  });
}

fetchCountries();
