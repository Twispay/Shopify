
// redirect_secure.js

import { TWISPAY_CONFIG } from './config.js';

function getCustomerDetails(customer) {
    return {
        identifier: `shopify_{{ customer.id }}`,
        email: '{{ customer.email }}',
        firstName: '{{ customer.first_name }}',
        lastName: '{{ customer.last_name }}',
        country: '{{ customer.country_code }}',
        phone: '{{ customer.phone }}', // Added phone
        address: '{{ customer.default_address | address_without_country }}' // Added address
    };
}

function createTransactionParams(order, customer) {
    return {
        siteID: TWISPAY_CONFIG.siteID,
        orderID: '{{ order.id }}',
        amount: '{{ order.total_price | money_without_currency }}',
        currency: '{{ order.currency }}',
        backUrl: TWISPAY_CONFIG.backUrl,
        callbackUrl: TWISPAY_CONFIG.callbackUrl,
        customer: getCustomerDetails(customer),
        transactionOptions: {
            secureMode: true,
            additionalData: '{{ order.note }}'
        }
    };
}

function redirectToTwispay(order, customer) {
    const twispayParams = createTransactionParams(order, customer);
    const encodedParams = btoa(JSON.stringify(twispayParams));
    const redirectUrl = `${TWISPAY_CONFIG.redirectBaseUrl}${encodedParams}`;

    try {
        window.location.href = redirectUrl;
    } catch (error) {
        console.error('Redirection failed:', error);
    }
}

// Example trigger
// redirectToTwispay(order, customer);
