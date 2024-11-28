
# Twispay IPN Server for Shopify Integration

This project provides a centralized server to handle Twispay's Instant Payment Notifications (IPNs) and update Shopify orders based on payment status. This setup is ideal for clients using Shopify stores who want a secure, reliable solution for managing Twispay payment notifications without needing a dedicated server.

## Features
- **Centralized IPN Handling**: Handles IPNs from Twispay for multiple clients.
- **Order Status Update**: Automatically updates order status in Shopify based on payment status.
- **Secure Credentials Storage**: Manages each client’s Shopify API credentials securely.
- **Easy Client Setup**: Clients only need to configure Twispay to use this IPN server.

## Requirements
- **Node.js** (v14+ recommended)
- **Express.js** for routing IPN requests
- **Shopify API** credentials for each client
- **Twispay Account** with access to set IPN URL

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/twispay-ipn-server.git
   cd twispay-ipn-server
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   - Rename the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and configure the following variables:
     ```dotenv
     PORT=3000
     TWISPAY_SECRET=your_twispay_secret_key
     TWISPAY_IPN_URL=https://yourdomain.com/ipn
     ```

   - Add **Shopify API credentials** for each client in the format:
     ```dotenv
     SHOPIFY_API_KEY_client1=client1_shopify_api_key
     SHOPIFY_API_PASSWORD_client1=client1_shopify_api_password
     SHOPIFY_STORE_URL_client1=client1_shopify_store_url

     SHOPIFY_API_KEY_client2=client2_shopify_api_key
     SHOPIFY_API_PASSWORD_client2=client2_shopify_api_password
     SHOPIFY_STORE_URL_client2=client2_shopify_store_url
     ```

4. **Start the Server**:
   ```bash
   npm start
   ```
   - The server will run on the port specified in your `.env` file (default is `3000`).

5. **Set IPN URL in Twispay**:
   - In each client's Twispay account, set the IPN URL to:
     ```
     https://yourdomain.com/ipn
     ```

## How It Works

1. **IPN Receiving**:
   - When a payment is processed, Twispay sends an IPN to the configured IPN URL. The server validates the IPN, identifies the client based on the order ID, and verifies the IPN signature using `TWISPAY_SECRET`.

2. **Order Status Update**:
   - Once the IPN is validated, the server retrieves the appropriate Shopify API credentials for the client and updates the order status in Shopify based on the payment outcome (e.g., "Paid", "Failed").

## Adding New Clients

1. **Add API Credentials**:
   - For each new client, add their Shopify API credentials to the `.env` file, using a unique identifier (e.g., `client3`):
     ```dotenv
     SHOPIFY_API_KEY_client3=client3_shopify_api_key
     SHOPIFY_API_PASSWORD_client3=client3_shopify_api_password
     SHOPIFY_STORE_URL_client3=client3_shopify_store_url
     ```

2. **Configure Twispay IPN**:
   - In the client’s Twispay account, set the IPN URL to:
     ```
     https://yourdomain.com/ipn
     ```

3. **Restart the Server**:
   - Restart the server to apply new credentials:
     ```bash
     npm restart
     ```

## Troubleshooting

- **IPN Verification Failure**:
  - Ensure `TWISPAY_SECRET` matches the Twispay secret key in your `.env` file.
- **Order Status Not Updating**:
  - Verify that each client’s Shopify API credentials are correctly set in `.env`.
  - Check server logs for any error messages.

## Security Considerations

- Store all API credentials securely and never expose them publicly.
- Use HTTPS for secure IPN communication.
- Regularly rotate Shopify API credentials and Twispay secret keys as a best practice.

---

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for more information.
    
## Updates
- Renamed `redirect_example.js` to `redirect_secure.js` and enhanced its logic.
- Added a `styles/checkout.css` file for checkout styling.

### Additional Updates
- Added `config.js` for centralized configuration.
- Updated `redirect_secure.js` to use modularized functions and the configuration file.
- Improved `styles/checkout.css` with mobile responsiveness and success/error message styles.
- Added a `sample_checkout.html` for testing and demonstration.
