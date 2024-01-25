const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
let msg = document.querySelector(".msg");

for (select of dropdowns) {
    for (currCode in countryList) {
        // console.log(currCode, countryList[currCode]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


const currencyExchange = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    
    const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(rate);

    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();  // to not change or refresh page even after clicking button
    currencyExchange();
})

window.addEventListener("load",()=>{
    currencyExchange();
})