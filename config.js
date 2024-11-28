
// config.js

// Configuration file for Twispay redirection
export const TWISPAY_CONFIG = {
    siteID: 'YOUR_SITE_ID',
    backUrl: 'https://yourshopifydomain.com/thank_you',
    callbackUrl: 'https://your-ipn-server.com/ipn',
    redirectBaseUrl: 'https://secure.twispay.com/?jsonRequest=',
};
