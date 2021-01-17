import { fetchHousePurchaseDates } from '../lib/fetchHousePurchaseDates';

// Checks if any of the input query params passed is not defined
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

// find house purchase dates controller method
export const findHousePurchaseDatesController = async (req, res) => {
    try {
        if(!req.query || checkIfAnyFieldsAreUndefined(req.query)) {
            return res.status(400).json({ message: 'Invalid request'});
        };
        const housePurchaseDates = fetchHousePurchaseDates(req.query);
        res.status(200).send({
            housePurchaseDates: housePurchaseDates
        });
    } catch(e) {
        console.error(e);
        res.status(500).json({ message: 'Server not responding'});
    }
    
}