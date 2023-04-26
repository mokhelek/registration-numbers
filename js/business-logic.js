function regNumbersFactory(regNumbersData, countPlacesData) {
    let registrationNumbers = regNumbersData || [];
    let countingPlaces = countPlacesData || { "Cape Town": 0, Paarl: 0, Bellville: 0, Stellenbosch: 0, "Kuils River": 0, Malmesbury: 0 };
    let registrationFormat =  /^[a-zA-Z]{0,3}\s*\d{3}(?:[-\s]?\d{3})*$/

    function handleDuplicates(regNum) {
        if (!registrationNumbers.includes(regNum)) {
            return true;
        } else {
            return false;
        }
    }
    function addRegNum(regNum) {
        if (handleDuplicates(regNum)) {
            registrationNumbers.push(regNum);
        }
    }

    function getRegistrations() {
        return registrationNumbers;
    }

    function clearData() {
        localStorage.clear();
        location.reload();
    }

    function filterRegNumbers(town) {
        let filteredArray = [];
        registrationNumbers.filter(function (regNum) {
            if (regNum.startsWith(town)) {
                filteredArray.push(regNum);
            }
        });
        return filteredArray;
    }

    function regFormatCheck(input){
        return registrationFormat.test(input)
    }

    function countForTown() {
        if (registrationNumbers[registrationNumbers.length - 1].startsWith("CA")) {
            countingPlaces["Cape Town"]++;
        } else if (registrationNumbers[registrationNumbers.length - 1].startsWith("CJ")) {
            countingPlaces["Paarl"]++;
        } else if (registrationNumbers[registrationNumbers.length - 1].startsWith("CY")) {
            countingPlaces["Bellville"]++;
        } else if (registrationNumbers[registrationNumbers.length - 1].startsWith("CL")) {
            countingPlaces["Stellenbosch"]++;
        } else if (registrationNumbers[registrationNumbers.length - 1].startsWith("CF")) {
            countingPlaces["Kuils River"]++;
        } else if (registrationNumbers[registrationNumbers.length - 1].startsWith("CK")) {
            countingPlaces["Malmesbury"]++;
        } else {
            alert("unknown location");
        }
    }

    function getCountingPlaces() {
        return countingPlaces;
    }
  

    return {
        addRegNum,
        getRegistrations,
        clearData,
        filterRegNumbers,
        countForTown,
        handleDuplicates,
        getCountingPlaces,
        regFormatCheck,
        
    
    };
}
