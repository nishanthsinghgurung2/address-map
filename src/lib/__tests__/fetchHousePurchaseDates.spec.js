import { fetchHousePurchaseDates } from "../fetchHousePurchaseDates";

describe('fetchHousePurchaseDates', () => {
    it('should return empty if adress is not found in property price paid file', () => {
        const caseStudyAddress = {
            postcode: "BLAH",
            county: "Kent",
            city: "Gravesend",
            street: "Astra Drive",
            subBuilding: "",
            buildingName: "",
            buildingNumber: "139"
        };

        const responseData =  [];

        const result = fetchHousePurchaseDates(caseStudyAddress);
        expect(result).toEqual(responseData);
    })
    it('should fetch the house purchase dates for the address with no buildingName and subBuildingName', () => {
        const caseStudyAddress = {
            postcode: "DA12 4QF",
            county: "Kent",
            city: "Gravesend",
            street: "Astra Drive",
            subBuilding: "",
            buildingName: "",
            buildingNumber: "139"
        };

        const responseData =  [ "1995-10-02"];

        const result = fetchHousePurchaseDates(caseStudyAddress);
        expect(result).toEqual(responseData);
    })
    it('should fetch the house purchase dates for the address buildingNumber in range', () => {
        const caseStudyAddress = {
            postcode: "BN22 7RJ",
            county: "East Sussex",
            city: "Eastbourne",
            street: "Seaside",
            subBuilding: "Flat B",
            buildingName: "",
            buildingNumber: "336-338"
        };

        const responseData = [
                "2003-03-17",
                "2005-03-24",
                "2003-03-17",
                "2005-03-24"
            ];

        const result = fetchHousePurchaseDates(caseStudyAddress);
        expect(result).toEqual(responseData);
    })
    
})