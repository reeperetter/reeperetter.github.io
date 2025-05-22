const input = document.querySelector(".input");
const button = document.querySelector(".button");
const result = document.querySelector(".result");
const fromCurr = document.getElementById("fromCurr");
const toCurr = document.getElementById("toCurr");
const URL = (url) => `https://v6.exchangerate-api.com/v6/12f81f484d22a1ade8ddd5c1/latest/${url}`;

let currencies = [];

const getCurrencies = () =>
    fetch(URL("UAH"))
        .then((result) => {
            if (!result.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return result.json();
            }
        })
        .then((data) => {
            rates = data.conversion_rates;
            for (let cur in rates) {
                currencies.push(cur);
            }
            const createOptions = (arr) => arr.map((cur) => `<option value="${cur}">${cur}</option>`).join("");
            fromCurr.innerHTML = createOptions(currencies);
            toCurr.innerHTML = createOptions(currencies);
        });
getCurrencies();

button.addEventListener("click", () => {
    if (!input.value) {
        alert("Введіть значення!!!");
        return;
    }
    let valueFrom = fromCurr.value.trim();
    let valueTo = toCurr.value.trim();
    let multiplier;
    fetch(URL(valueFrom))
        .then((result) => {
            if (!result.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return result.json();
            }
        })
        .then((data) => {
            rates = data.conversion_rates;
            multiplier = rates[valueTo];
            let res = (Number(input.value.trim()) * multiplier).toFixed(2);
            result.textContent = `${input.value.trim()} ${fromCurr.value} дорівнює ${res} ${toCurr.value}`;
        });
});