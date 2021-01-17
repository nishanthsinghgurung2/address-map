import { fetchHousePurchaseDates } from '../lib/fetchHousePurchaseDates';

const checkIfAnyFieldsAreUndefined = ({ postcode, county, city, street, subBuilding, buildingName, buildingNumber}) => {
    return (
        (postcode === undefined) || 
        (county === undefined) || 
        (city === undefined) || 
        (street === undefined) || 
        (subBuilding === undefined) || 
        (buildingName === undefined) || 
        (buildingNumber === undefined)
    );
};


export const findAll = async (req, res) => {
    try {
        if(!req.query || checkIfAnyFieldsAreUndefined(req.query)) {
            return res.status(400).end();
        };
        const housePurchaseDates = fetchHousePurchaseDates(req.query);
        res.status(200).send({
            housePurchaseDates: housePurchaseDates
        });
    } catch(e) {
        console.error(e);
        res.status(400).end();
    }
    
}