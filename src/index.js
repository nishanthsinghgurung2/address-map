import express from 'express';
import {json} from 'body-parser';
import purchaseDatesRouter from './routes/fetchHousePurchaseDates.routes';

export const app = express();

app.use(json())
app.use('/api/purchaseDates', purchaseDatesRouter);

app.listen(3000, () => {
    console.log('Listening on port 3000');
})

