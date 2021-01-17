import regeneratorRuntime from "regenerator-runtime";
import {InterceptRequest} from '../../lib/interceptor';
import { findHousePurchaseDatesController } from '../fetchHousePurchaseDates.controller';

describe("findHousePurchaseDatesController", () => {
    it("should return 200 response", async() => {
        let req = InterceptRequest.mockRequest();
        req.query = {
            postcode: "BN22 7RJ",
            county: "East Sussex",
            city: "Eastbourne",
            street: "Seaside",
            subBuilding: "Flat B",
            buildingName: "",
            buildingNumber: "336-338"
        };
        const res = InterceptRequest.mockResponse();
        const responseData = {
            "housePurchaseDates": [
                "2003-03-17",
                "2005-03-24",
                "2003-03-17",
                "2005-03-24"
            ]
        };

        await findHousePurchaseDatesController(req, res);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send.mock.calls.length).toBe(1);
        expect(res.send).toHaveBeenCalledWith(responseData);
    })

    it("should return 404 when invalid input is passed", async() => {
        let req = InterceptRequest.mockRequest();
        req.query = {
            INVALIDFIELD: "BN22 7RJ",
            county: "East Sussex",
            city: "Eastbourne",
            street: "Seaside",
            subBuilding: "Flat B",
            buildingName: "",
            buildingNumber: "336-338"
        };
        const res = InterceptRequest.mockResponse();
        const responseData = {
            message: 'Invalid request'
        };

        await findHousePurchaseDatesController(req, res);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status.mock.calls.length).toBe(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(responseData);
    })
})