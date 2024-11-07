
const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// IPN Endpoint
app.post('/ipn', async (req, res) => {
    const { data, signature } = req.body;

    // Decode and verify data
    const decodedData = Buffer.from(data, 'base64').toString('utf-8');
    const paymentData = JSON.parse(decodedData);
    
    const expectedSignature = crypto
        .createHmac('sha512', process.env.TWISPAY_SECRET)
        .update(data)
        .digest('hex');

    if (signature !== expectedSignature) {
        console.error('Invalid Signature');
        return res.status(400).send('Invalid Signature');
    }

    const { orderId, status, clientId } = paymentData;
    const apiKey = process.env[`SHOPIFY_API_KEY_${clientId}`];
    const apiPassword = process.env[`SHOPIFY_API_PASSWORD_${clientId}`];
    const storeUrl = process.env[`SHOPIFY_STORE_URL_${clientId}`];

    if (!apiKey || !apiPassword || !storeUrl) {
        console.error('Shopify credentials missing for client:', clientId);
        return res.status(500).send('Missing Shopify credentials');
    }

    // Update Shopify Order
    const shopifyAuth = Buffer.from(`${apiKey}:${apiPassword}`).toString('base64');
    try {
        await axios.put(`https://${storeUrl}/admin/api/2023-07/orders/${orderId}.json`, {
            order: { financial_status: status === 'complete' ? 'paid' : 'pending' }
        }, {
            headers: { Authorization: `Basic ${shopifyAuth}` }
        });
        res.sendStatus(200);
    } catch (error) {
        console.error('Failed to update order status:', error);
        res.status(500).send('Error updating order');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
    