import express from 'express';
import purchaseDatesRouter from './routes/fetchHousePurchaseDates.routes';

export const app = express();

app.use('/api/purchaseDates', purchaseDatesRouter);

export const start = async() => {
    try {
        app.listen(3000, () => {
            console.log('Listening on port 3000');
        })
    } catch(e) {
        console.error(e)
    }
}

