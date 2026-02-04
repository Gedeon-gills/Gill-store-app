# Email Integration Backend Requirements

## Email Service Endpoint

The frontend expects a backend email service at:
```
POST /api/v1/email/send
```

### Request Body Format:
```json
{
  "to": "user@example.com",
  "subject": "Email Subject",
  "template": "template-name",
  "data": {
    "userName": "John Doe",
    "html": "<div>HTML content</div>",
    // ... other template data
  }
}
```

### Complete Email Templates Used:

1. **Welcome Email** (`template: "welcome"`)
   - Sent after user registration
   - Data: `userName`, `loginUrl`, `html`

2. **Order Confirmation** (`template: "order-confirmation"`)
   - Sent after order creation
   - Data: `orderNumber`, `userName`, `items`, `totalAmount`, `orderTrackingUrl`, `html`

3. **Order Status Update** (`template: "order-status-update"`)
   - Sent when admin changes order status
   - Data: `orderNumber`, `userName`, `newStatus`, `orderTrackingUrl`, `html`

4. **Password Reset** (`template: "password-reset"`)
   - Sent when user requests password reset
   - Data: `userName`, `resetUrl`, `html`

5. **Password Changed** (`template: "password-changed"`)
   - Sent when user successfully changes password
   - Data: `userName`, `changeTime`, `html`

6. **Order Cancelled** (`template: "order-cancelled"`)
   - Sent when order is cancelled
   - Data: `orderNumber`, `userName`, `refundAmount`, `html`

7. **Low Stock Alert** (`template: "low-stock"`)
   - Sent to admin when product stock is low
   - Data: `productName`, `currentStock`, `html`

8. **Newsletter** (`template: "newsletter"`)
   - Sent for marketing campaigns
   - Data: `userName`, `content`, `unsubscribeUrl`, `html`

9. **Account Deactivated** (`template: "account-deactivated"`)
   - Sent when admin deletes/deactivates user account
   - Data: `userName`, `reason`, `html`

### Backend Implementation Notes:

1. The service should handle email sending gracefully (no errors if email fails)
2. HTML content is pre-formatted in the `html` field
3. Consider using services like SendGrid, Mailgun, or AWS SES
4. Implement rate limiting to prevent spam
5. Add email validation and sanitization
6. Support unsubscribe functionality for newsletters

### Example Backend Implementation (Node.js/Express):

```javascript
app.post('/api/v1/email/send', async (req, res) => {
  try {
    const { to, subject, data } = req.body;
    
    // Use your preferred email service
    await emailProvider.send({
      to,
      subject,
      html: data.html
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send failed:', error);
    res.status(200).json({ success: false }); // Don't fail the request
  }
});
```

### Complete Integration Points:

1. **User Registration**: `userService.createUser()` → Welcome email
2. **Order Creation**: `adminAPI.createOrder()` → Order confirmation email  
3. **Order Status Update**: `adminAPI.updateOrderStatus()` → Status update email
4. **Order Cancellation**: `adminAPI.cancelOrder()` → Cancellation email
5. **Password Reset**: `userService.forgotPassword()` → Reset email
6. **Password Change**: `userService.changePassword()` → Confirmation email
7. **Account Deletion**: `adminAPI.deleteCustomer()` → Deactivation email
8. **Newsletter**: `adminAPI.sendNewsletter()` → Marketing email
9. **Low Stock**: `adminAPI.checkLowStock()` → Admin alert email

### Additional Features:

- **Newsletter Management**: Admin can send marketing emails to selected customers
- **Order Cancellation**: Admin can cancel orders with automatic refund emails
- **Stock Monitoring**: Automatic low stock alerts to admin
- **Security Notifications**: Password change confirmations
- **Account Management**: Deactivation notifications

All email calls are non-blocking and won't fail the main operations if email service is unavailable.