
// redirect_example.js
function redirectToTwispay() {
    const twispayParams = {
        siteID: 'YOUR_SITE_ID',
        orderID: '{{ order.id }}',
        amount: '{{ order.total_price | money_without_currency }}',
        currency: '{{ order.currency }}',
        backUrl: 'https://yourshopifydomain.com/thank_you',
        callbackUrl: 'https://your-ipn-server.com/ipn',
        customer: {
            identifier: `shopify_{{ customer.id }}`,
            email: '{{ customer.email }}',
            firstName: '{{ customer.first_name }}',
            lastName: '{{ customer.last_name }}',
            country: '{{ customer.country_code }}'
        }
    };

    // Serialize and encode parameters
    const encodedParams = btoa(JSON.stringify(twispayParams));
    const redirectUrl = `https://secure.twispay.com/?jsonRequest=${encodedParams}`;

    window.location.href = redirectUrl; // Redirect to Twispay
}

// Trigger redirection after checkout
redirectToTwispay();
