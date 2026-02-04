// Global notification helper
declare global {
  interface Window {
    addNotification?: (type: string, message: string) => void;
  }
}

export const notify = {
  productCreated: (name: string) => {
    window.addNotification?.('product_created', `New product "${name}" has been created`);
  },
  productUpdated: (name: string) => {
    window.addNotification?.('product_updated', `Product "${name}" has been updated`);
  },
  productDeleted: (name: string) => {
    window.addNotification?.('product_deleted', `Product "${name}" has been deleted`);
  },
  newOrder: (customerName: string, amount: number) => {
    window.addNotification?.('new_order', `New order from ${customerName} - $${amount}`);
  },
  orderUpdated: (orderId: string, status: string) => {
    window.addNotification?.('order_updated', `Order #${orderId} status updated to ${status}`);
  },
  customerRegistered: (name: string) => {
    window.addNotification?.('customer_registered', `New customer "${name}" registered`);
  },
  customerUpdated: (name: string) => {
    window.addNotification?.('customer_updated', `Customer "${name}" profile updated`);
  },
  campaignCreated: (name: string) => {
    window.addNotification?.('campaign_created', `New campaign "${name}" created`);
  },
  systemUpdate: (message: string) => {
    window.addNotification?.('system_update', message);
  }
};

export default notify;