const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";

let dropdown = document.querySelectorAll(".dropdown select");

for (let code in countryList) {
    console.log(code, countryList[code]);
}