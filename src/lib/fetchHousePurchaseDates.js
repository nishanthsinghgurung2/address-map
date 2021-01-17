import fs from 'fs';

// Retrieves the data from the property price paid json file
const getPropertyPricePaidData = () => {
    const propertyPriceData = [];
    let rawData = fs.readFileSync("src/data/property_price_paid.json");
    let PropertyPricePaidList = JSON.parse(rawData);
    PropertyPricePaidList
        .forEach((propertyPricePaid, index) => {
            const {price, date_of_transfer, postcode, property_type, old_new, duration, paon, saon, street, locality, city, district, county, ppd_category_type, record_status} = propertyPricePaid;
            propertyPriceData.push({
                p_price: price,
                p_date_of_transfer: date_of_transfer,
                p_postcode: postcode,
                p_property_type: property_type,
                p_old_new: old_new,
                p_duration: duration,
                p_paon: paon,
                p_saon: saon,
                p_street: street,
                p_locality: locality,
                p_city: city,
                p_district: district,
                p_county: county,
                p_ppd_category_type: ppd_category_type,
                p_record_status: record_status
            });
    });
    return propertyPriceData;
};

/* Function to check if paon from property price paid json file matches the building details from case study address file

    Here are some of the conditions I could derive by observing data from both the files.

    "buildingName" from case study address file is sometimes same as "paon" OR 
    "buildingNumber + buildingName" from case study address file is sometimes same as "paon" OR 
    "buildingNumber" from case study address file is sometimes same as "paon" OR 
    "buildingNumber + subBuilding" from case study address file is sometimes same as "paon"
    In this case, for the subBulding field extract string after Flat Ex: ‘B’ in ‘Flat B’ and 
    buildingNumber could be range Ex: 336-338. Extract the numbers in that range and search for each buildingNumber
*/
const checkIfBuildingDetailsMatchesPeon = (paon, buildingName, buildingNumber, subBuilding) => {
    if(paon === buildingName.toUpperCase()){
        return true;
    } else if(paon === buildingName.toUpperCase() + ", "+ buildingNumber) {
        return true;
    } else if(paon === buildingNumber) {
        return true;
    } else {
        
        if(subBuilding && subBuilding.includes('Flat ')){
            const subBuildingFlatType = subBuilding.split(' ')[1];
            if(paon === (buildingNumber + subBuildingFlatType.toUpperCase())) {
                return true;
            }
        }
        
    }
    return false;
};


// Function to check if saon from property price paid matches the buildingDetails
const checkIfSaonMatchesSubBuilding = (saon, subBuilding) => {
    if(isNaN(Number(subBuilding))){
        return (!saon || ((saon === subBuilding.toUpperCase()) || (saon.includes(subBuilding.toUpperCase()))))
    } else {
        
        return saon === subBuilding;
    }
};

// Function to get the house purchase dates list
const getHousePurchaseDateList = (caseStudyAddress) => {
    const { postcode, county, city, street, subBuilding, buildingName, buildingNumber} = caseStudyAddress;
    const propertyPriceData = getPropertyPricePaidData();
    const housePurchaseDates = [];

    propertyPriceData.map(propertyPriceDataRecord => {
        let { p_postcode, p_city, p_county, p_saon, p_street, p_paon, p_date_of_transfer } = propertyPriceDataRecord;
       
        if(
            ( p_postcode === postcode.toUpperCase()) &&
            (!city || p_city === city.toUpperCase()) &&
            (!county || p_county === county.toUpperCase()) &&
            (!street || p_street === street.toUpperCase()) && 
            (!subBuilding || checkIfSaonMatchesSubBuilding(p_saon, subBuilding)) &&
            checkIfBuildingDetailsMatchesPeon(p_paon, buildingName, buildingNumber, subBuilding)
        ) {
            housePurchaseDates.push(p_date_of_transfer);
        }
    })
    return housePurchaseDates;
};

// Main function that gets called from external files that has all the logic and calls related to fetching the house purchase date list.
export const fetchHousePurchaseDates = (caseStudyAddress) => {
    
    let housePurchaseDatesList = [];
    let buildingNumbersList = [];
    const { postcode, county, city, street, subBuilding, buildingName, buildingNumber} = caseStudyAddress;
    
    // If there is a range of buildingNumbers. Search for each buildingNumber in the propertyPriceData list
    if(buildingNumber.includes('-')) {
        let buildingNumbers = buildingNumber.split('-');
        let buildingNumbersInt = buildingNumbers.map(buildingNumber => {
            return Number(buildingNumber);
        });
        for(let i= buildingNumbersInt[0]; i <= buildingNumbersInt[1]; i++) {
            buildingNumbersList.push(i);
        }
    }
    
    // If buildingNumbers are in range then get the house purchase dates list for all the buildingNumbers in that range
    if(buildingNumbersList.length > 1) {
        buildingNumbersList.map(buildingNumber => {
            housePurchaseDatesList = housePurchaseDatesList.concat(getHousePurchaseDateList({ postcode, county, city, street, subBuilding, buildingName, buildingNumber}));
        })
    } else {
        housePurchaseDatesList = getHousePurchaseDateList({ postcode, county, city, street, subBuilding, buildingName, buildingNumber});
    }

    return housePurchaseDatesList;
};
