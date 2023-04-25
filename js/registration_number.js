let registrationNumbers = [];
if (localStorage["regNumbersList"]) {
    registrationNumbers = localStorage["regNumbersList"].split(",");
}

let countingPlaces = regNumbersFactory(registrationNumbers).getCountingPlaces();
if (localStorage["counting_towns"]) {
    countingPlaces = JSON.parse(localStorage["counting_towns"]) ;
}

let regFactory = regNumbersFactory(registrationNumbers, countingPlaces); // ? my instance variable

let regNumList = document.querySelector(".reg-nums-list");
let regInput = document.querySelector(".reg-num-input");

// ************************** Town Counters elements ***********************************
let cptCounter = document.querySelector("#cape_town_counter");
let stellenboschCounter = document.querySelector("#stellenbosch_counter");
let bellvilleCounter = document.querySelector("#bellville_counter");
let paarlCounter = document.querySelector("#paarl_counter");
let krCounter = document.querySelector("#kuils_river_counter");
let malmesburyCounter = document.querySelector("#malmesbury_counter");
// ************************************** END  *****************************************

// ************************** Default Display Of Registration Numbers & Counters *******************
for (let i = 0; i < registrationNumbers.length; i++) {
    const listItem = document.createElement("li");

    listItem.textContent = registrationNumbers[i];
    regNumList.appendChild(listItem);
}
cptCounter.textContent = countingPlaces["Cape Town"];
stellenboschCounter.textContent = countingPlaces["Stellenbosch"];
bellvilleCounter.textContent = countingPlaces["Bellville"];
paarlCounter.textContent = countingPlaces["Paarl"];
krCounter.textContent = countingPlaces["Kuils River"];
malmesburyCounter.textContent = countingPlaces["Malmesbury"];

// ************************************** END  *****************************************

// ************************** Filtered Display Of Registration Numbers *******************
function displayFilteredReg() {
    let regList = document.querySelectorAll("li");
    regList.forEach(function (e) {
        e.style.display = "none";
    });

    for (let i = 0; i < registrationNumbers.length; i++) {
        const listItem = document.createElement("li");

        listItem.textContent = registrationNumbers[i];
        regNumList.appendChild(listItem);
    }
}
// ************************************** END  *****************************************

function townCounters() {
    regFactory.countForTown();

    cptCounter.textContent = regFactory.getCountingPlaces()["Cape Town"];
    stellenboschCounter.textContent = regFactory.getCountingPlaces()["Stellenbosch"];
    bellvilleCounter.textContent = regFactory.getCountingPlaces()["Bellville"];
    paarlCounter.textContent = regFactory.getCountingPlaces()["Paarl"];
    krCounter.textContent = regFactory.getCountingPlaces()["Kuils River"];
    malmesburyCounter.textContent = regFactory.getCountingPlaces()["Malmesbury"];

    localStorage["counting_towns"] = JSON.stringify(regFactory.getCountingPlaces());
}

function addRegistration() {
    if (regFactory.handleDuplicates(regInput.value)) {
        const listItem = document.createElement("li");

        regFactory.addRegNum(regInput.value);

        listItem.textContent = registrationNumbers[registrationNumbers.length - 1];
        regNumList.appendChild(listItem);

        localStorage["regNumbersList"] = regFactory.getRegistrations();

        townCounters();
    } else {
        alert("Its a duplicates");
    }
}

const addButton = document.querySelector("#add-btn");
addButton.addEventListener("click", addRegistration);

// Todo : ############################################ The Clear Function #######################################

const clearButton = document.querySelector("#clear-btn");
clearButton.addEventListener("click", function () {
    regFactory.clearData();
});

// Todo : ############################################ The Filter Function #######################################

function filterBtnClicked(town) {
    registrationNumbers = regFactory.filterRegNumbers(town);
    displayFilteredReg();
}
