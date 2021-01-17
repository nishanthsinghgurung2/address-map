import regeneratorRuntime from "regenerator-runtime";

import router from '../fetchHousePurchaseDates.routes';
describe('fetch house purchase dates router', () => {
    it('has GET route', () => {
        const route = {
            path: '/',
            method: 'get'
        };
        const match = router.stack.find(
            s => s.route.path === route.path && s.route.methods[route.method]
        );
        expect(match).toBeTruthy();
    })
})