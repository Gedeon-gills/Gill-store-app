import { emailTemplates } from './emailTemplates';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

interface EmailData {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

export const emailService = {
  // Send welcome email after registration
  sendWelcomeEmail: async (userEmail: string, userName: string) => {
    const template = emailTemplates.welcome({
      userName,
      loginUrl: `${window.location.origin}/login`
    });
    
    const emailData: EmailData = {
      to: userEmail,
      subject: template.subject,
      template: 'welcome',
      data: {
        userName,
        loginUrl: `${window.location.origin}/login`,
        html: template.html
      }
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (!response.ok) {
        console.warn('Failed to send welcome email');
      }
    } catch (error) {
      console.warn('Email service unavailable:', error);
    }
  },

  // Send order confirmation email
  sendOrderConfirmation: async (userEmail: string, orderData: {
    orderNumber: string;
    userName: string;
    items: Array<{ name: string; quantity: number; price: number }>;
    totalAmount: number;
    shippingAddress?: any;
  }) => {
    const template = emailTemplates.orderConfirmation({
      ...orderData,
      orderTrackingUrl: `${window.location.origin}/orders/${orderData.orderNumber}`
    });
    
    const emailData: EmailData = {
      to: userEmail,
      subject: template.subject,
      template: 'order-confirmation',
      data: {
        ...orderData,
        orderTrackingUrl: `${window.location.origin}/orders/${orderData.orderNumber}`,
        html: template.html
      }
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (!response.ok) {
        console.warn('Failed to send order confirmation email');
      }
    } catch (error) {
      console.warn('Email service unavailable:', error);
    }
  },

  // Send order status update email
  sendOrderStatusUpdate: async (userEmail: string, orderData: {
    orderNumber: string;
    userName: string;
    newStatus: string;
    previousStatus: string;
  }) => {
    const template = emailTemplates.orderStatusUpdate({
      ...orderData,
      orderTrackingUrl: `${window.location.origin}/orders/${orderData.orderNumber}`
    });
    
    const emailData: EmailData = {
      to: userEmail,
      subject: template.subject,
      template: 'order-status-update',
      data: {
        ...orderData,
        orderTrackingUrl: `${window.location.origin}/orders/${orderData.orderNumber}`,
        html: template.html
      }
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (!response.ok) {
        console.warn('Failed to send order status update email');
      }
    } catch (error) {
      console.warn('Email service unavailable:', error);
    }
  },

  // Send password reset email
  sendPasswordResetEmail: async (userEmail: string, userName: string, resetToken: string) => {
    const template = emailTemplates.passwordReset({
      userName,
      resetUrl: `${window.location.origin}/reset-password/${resetToken}`,
      expiryTime: '1 hour'
    });
    
    const emailData: EmailData = {
      to: userEmail,
      subject: template.subject,
      template: 'password-reset',
      data: {
        userName,
        resetUrl: `${window.location.origin}/reset-password/${resetToken}`,
        html: template.html
      }
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (!response.ok) {
        console.warn('Failed to send password reset email');
      }
    } catch (error) {
      console.warn('Email service unavailable:', error);
    }
  },

  // Send password changed confirmation
  sendPasswordChangedEmail: async (userEmail: string, userName: string) => {
    const template = emailTemplates.passwordChanged({
      userName,
      changeTime: new Date().toLocaleString()
    });
    
    const emailData: EmailData = {
      to: userEmail,
      subject: template.subject,
      template: 'password-changed',
      data: {
        userName,
        html: template.html
      }
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (!response.ok) {
        console.warn('Failed to send password changed email');
      }
    } catch (error) {
      console.warn('Email service unavailable:', error);
    }
  },

  // Send order cancellation email
  sendOrderCancelledEmail: async (userEmail: string, orderData: {
    orderNumber: string;
    userName: string;
    refundAmount: number;
  }) => {
    const template = emailTemplates.orderCancelled(orderData);
    
    const emailData: EmailData = {
      to: userEmail,
      subject: template.subject,
      template: 'order-cancelled',
      data: {
        ...orderData,
        html: template.html
      }
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (!response.ok) {
        console.warn('Failed to send order cancelled email');
      }
    } catch (error) {
      console.warn('Email service unavailable:', error);
    }
  },

  // Send low stock alert (admin)
  sendLowStockAlert: async (adminEmail: string, productName: string, currentStock: number) => {
    const template = emailTemplates.lowStock({ productName, currentStock });
    
    const emailData: EmailData = {
      to: adminEmail,
      subject: template.subject,
      template: 'low-stock',
      data: {
        productName,
        currentStock,
        html: template.html
      }
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (!response.ok) {
        console.warn('Failed to send low stock alert');
      }
    } catch (error) {
      console.warn('Email service unavailable:', error);
    }
  },

  // Send newsletter
  sendNewsletter: async (userEmail: string, userName: string, content: string) => {
    const template = emailTemplates.newsletter({
      userName,
      content,
      unsubscribeUrl: `${window.location.origin}/unsubscribe`
    });
    
    const emailData: EmailData = {
      to: userEmail,
      subject: template.subject,
      template: 'newsletter',
      data: {
        userName,
        content,
        html: template.html
      }
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (!response.ok) {
        console.warn('Failed to send newsletter');
      }
    } catch (error) {
      console.warn('Email service unavailable:', error);
    }
  },

  // Send account deactivation email
  sendAccountDeactivatedEmail: async (userEmail: string, userName: string, reason: string) => {
    const template = emailTemplates.accountDeactivated({ userName, reason });
    
    const emailData: EmailData = {
      to: userEmail,
      subject: template.subject,
      template: 'account-deactivated',
      data: {
        userName,
        reason,
        html: template.html
      }
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      
      if (!response.ok) {
        console.warn('Failed to send account deactivated email');
      }
    } catch (error) {
      console.warn('Email service unavailable:', error);
    }
  }
};