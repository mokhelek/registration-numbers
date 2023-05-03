let registrationNumbers = [];
if (localStorage["regNumbersList"]) {
    registrationNumbers = localStorage["regNumbersList"].split(",");
}

let countingPlaces = regNumbersFactory(registrationNumbers).getCountingPlaces();
if (localStorage["counting_towns"]) {
    countingPlaces = JSON.parse(localStorage["counting_towns"]);
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
    let notFound = document.querySelector(".not-found");
    notFound.style.display = "none";
    regList.forEach(function (e) {
        e.style.display = "none";
    });
    if (registrationNumbers.length > 0) {
        for (let i = 0; i < registrationNumbers.length; i++) {
            const listItem = document.createElement("li");

            listItem.textContent = registrationNumbers[i];
            regNumList.appendChild(listItem);
        }
    } else {
        notFound.style.display = "block";
    }
}
// ************************************** END  *****************************************

function townCounters() {
    let unknownLocation = document.querySelector("#unknown-location-error");

    if(regFactory.countForTown() == true){

        cptCounter.textContent = regFactory.getCountingPlaces()["Cape Town"];
        stellenboschCounter.textContent = regFactory.getCountingPlaces()["Stellenbosch"];
        bellvilleCounter.textContent = regFactory.getCountingPlaces()["Bellville"];
        paarlCounter.textContent = regFactory.getCountingPlaces()["Paarl"];
        krCounter.textContent = regFactory.getCountingPlaces()["Kuils River"];
        malmesburyCounter.textContent = regFactory.getCountingPlaces()["Malmesbury"];
    
    }else{
        unknownLocation.style.display = "block";
        setTimeout(function () {
            unknownLocation.style.display = "none";
        }, 3000);
        regNumList.removeChild(regNumList.childNodes[0])


    }
    localStorage["counting_towns"] = JSON.stringify(regFactory.getCountingPlaces());
}

function addRegistration() {
    let duplicateError = document.querySelector("#duplicate-error");
    let emptyInputError = document.querySelector("#empty-input-error");
    let formatError = document.querySelector("#format-error");

    if (regInput.value != "") {
        if (regFactory.regFormatCheck(regInput.value.replace(/\s/g, ""))) {
            if (regFactory.handleDuplicates(regInput.value.toUpperCase().replace(/\s/g, ""))) {
                const listItem = document.createElement("li");

                regFactory.addRegNum(regInput.value.toUpperCase().replace(/\s/g, ""));

                listItem.textContent = registrationNumbers[registrationNumbers.length - 1];
                regNumList.appendChild(listItem);

                regNumList.insertBefore(listItem, regNumList.childNodes[0]);

                localStorage["regNumbersList"] = regFactory.getRegistrations();

                townCounters();
            } else {
                duplicateError.style.display = "block";
                setTimeout(function () {
                    duplicateError.style.display = "none";
                }, 3000);
            }
        } else {
            formatError.style.display = "block";
            setTimeout(function () {
                formatError.style.display = "none";
            }, 3000);
        }
    } else {
        emptyInputError.style.display = "block";
        setTimeout(function () {
            emptyInputError.style.display = "none";
        }, 3000);
    }
}

const addButton = document.querySelector("#add-btn");
addButton.addEventListener("click", addRegistration);

// Todo : ############################################ The Clear Function #######################################

const clearButton = document.querySelector("#clear-btn");
clearButton.addEventListener("click", function () {
    if (confirm("Your data will be permanently deleted")) {
        regFactory.clearData();
    }
});

// Todo : ############################################ The Filter Function #######################################

let dropDown = document.querySelector("#dropDown");

function cleanSelected(){
    let selectedClass = document.querySelectorAll(".selected-card");
    selectedClass.forEach((item)=>{
        item.classList.remove("selected-card")
    })
}

dropDown.addEventListener("change",function(){
    registrationNumbers = regFactory.filterRegNumbers(dropDown.value);
    let className = "selected-card"
    let cpt_card = cptCounter.parentElement ;
    let kr_card = krCounter.parentElement ;
    let bellville_card = bellvilleCounter.parentElement ;
    let paarl_card =paarlCounter.parentElement ;
    let stellenbosch_card = stellenboschCounter.parentElement ;
    let malmesbury_card = malmesburyCounter.parentElement ;
    
    if(dropDown.value == "CA"){
       cleanSelected()
       cpt_card.classList.add(className)
       
    }else if(dropDown.value == "CF"){
        cleanSelected()
        kr_card.classList.add(className)
        
    }else if(dropDown.value == "CL"){
        cleanSelected()
        stellenbosch_card.classList.add(className)
        
    }else if(dropDown.value == "CY"){
        cleanSelected()
        bellville_card.classList.add(className)

    }else if(dropDown.value == "CK"){
        cleanSelected()
        malmesbury_card.classList.add(className)

    }else if(dropDown.value == "CJ"){
        cleanSelected()
        paarl_card.classList.add(className)
        
    }else{
        cleanSelected()  
    }
    displayFilteredReg();
})

