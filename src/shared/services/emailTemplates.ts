export const emailTemplates = {
  welcome: (data: { userName: string; loginUrl: string }) => ({
    subject: 'Welcome to Gill Store!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Gill Store, ${data.userName}!</h2>
        <p>Thank you for joining our community. We're excited to have you on board!</p>
        <p>You can now browse our collection and start shopping.</p>
        <a href="${data.loginUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Start Shopping</a>
        <p style="margin-top: 20px; color: #666;">Best regards,<br>The Gill Store Team</p>
      </div>
    `
  }),

  orderConfirmation: (data: { 
    orderNumber: string; 
    userName: string; 
    items: Array<{ name: string; quantity: number; price: number }>; 
    totalAmount: number;
    orderTrackingUrl: string;
  }) => ({
    subject: `Order Confirmation - #${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Confirmed!</h2>
        <p>Hi ${data.userName},</p>
        <p>Thank you for your order! Your order #${data.orderNumber} has been confirmed.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Order Details:</h3>
          ${data.items.map(item => `
            <div style="border-bottom: 1px solid #dee2e6; padding: 10px 0;">
              <strong>${item.name}</strong><br>
              Quantity: ${item.quantity} × $${item.price.toFixed(2)}
            </div>
          `).join('')}
          <div style="margin-top: 15px; font-size: 18px; font-weight: bold;">
            Total: $${data.totalAmount.toFixed(2)}
          </div>
        </div>
        
        <a href="${data.orderTrackingUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Track Your Order</a>
        <p style="margin-top: 20px; color: #666;">Best regards,<br>The Gill Store Team</p>
      </div>
    `
  }),

  orderStatusUpdate: (data: { 
    orderNumber: string; 
    userName: string; 
    newStatus: string; 
    orderTrackingUrl: string;
  }) => ({
    subject: `Order Update - #${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Status Update</h2>
        <p>Hi ${data.userName},</p>
        <p>Your order #${data.orderNumber} status has been updated.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0; color: #007bff;">Status: ${data.newStatus.toUpperCase()}</h3>
        </div>
        
        <a href="${data.orderTrackingUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Track Your Order</a>
        <p style="margin-top: 20px; color: #666;">Best regards,<br>The Gill Store Team</p>
      </div>
    `
  }),

  passwordReset: (data: { userName: string; resetUrl: string; expiryTime: string }) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi ${data.userName},</p>
        <p>You requested a password reset for your Gill Store account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${data.resetUrl}" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p style="margin-top: 20px; color: #666;">This link will expire in ${data.expiryTime}.</p>
        <p style="color: #666;">If you didn't request this, please ignore this email.</p>
        <p style="color: #666;">Best regards,<br>The Gill Store Team</p>
      </div>
    `
  }),

  passwordChanged: (data: { userName: string; changeTime: string }) => ({
    subject: 'Password Changed Successfully',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Changed</h2>
        <p>Hi ${data.userName},</p>
        <p>Your password was successfully changed on ${data.changeTime}.</p>
        <p>If you didn't make this change, please contact our support team immediately.</p>
        <p style="margin-top: 20px; color: #666;">Best regards,<br>The Gill Store Team</p>
      </div>
    `
  }),

  orderCancelled: (data: { orderNumber: string; userName: string; refundAmount: number }) => ({
    subject: `Order Cancelled - #${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Cancelled</h2>
        <p>Hi ${data.userName},</p>
        <p>Your order #${data.orderNumber} has been cancelled as requested.</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Refund Amount:</strong> $${data.refundAmount.toFixed(2)}</p>
          <p>Your refund will be processed within 3-5 business days.</p>
        </div>
        <p style="color: #666;">Best regards,<br>The Gill Store Team</p>
      </div>
    `
  }),

  lowStock: (data: { productName: string; currentStock: number }) => ({
    subject: `Low Stock Alert - ${data.productName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Low Stock Alert</h2>
        <p>The product "${data.productName}" is running low on stock.</p>
        <p><strong>Current Stock:</strong> ${data.currentStock} units</p>
        <p>Please restock soon to avoid stockouts.</p>
      </div>
    `
  }),

  newsletter: (data: { userName: string; unsubscribeUrl: string; content: string }) => ({
    subject: 'Gill Store Newsletter',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Hi ${data.userName}!</h2>
        ${data.content}
        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          <a href="${data.unsubscribeUrl}">Unsubscribe</a> from these emails.
        </p>
      </div>
    `
  }),

  accountDeactivated: (data: { userName: string; reason: string }) => ({
    subject: 'Account Deactivated',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc3545;">Account Deactivated</h2>
        <p>Hi ${data.userName},</p>
        <p>Your account has been deactivated.</p>
        <p><strong>Reason:</strong> ${data.reason}</p>
        <p>If you believe this is an error, please contact our support team.</p>
        <p style="color: #666;">Best regards,<br>The Gill Store Team</p>
      </div>
    `
  })
};