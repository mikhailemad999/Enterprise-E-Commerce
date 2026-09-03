export const COOKIE_NAME = 'lumio_dept_session';

export interface DepartmentUser {
  id: number;
  username: string;
  department_id: string;
  role: string;
  name: string;
  permissions: string[];
}

export const DEPARTMENT_METADATA: Record<string, { name: string; prefix: string; title: string; defaultPath: string; loginPath: string }> = {
  D001: { name: 'SUPER_ADMIN', prefix: '/super-admin', title: 'Super Admin Control Center', defaultPath: '/super-admin/dashboard', loginPath: '/super-admin/login' },
  D002: { name: 'STORE_ADMIN', prefix: '/store-admin', title: 'Store Admin Console', defaultPath: '/store-admin/dashboard', loginPath: '/store-admin/login' },
  D003: { name: 'PRODUCT_MANAGER', prefix: '/product', title: 'Product & Catalog Studio', defaultPath: '/product/dashboard', loginPath: '/product/login' },
  D004: { name: 'INVENTORY_MANAGER', prefix: '/inventory', title: 'Inventory Management WMS', defaultPath: '/inventory/dashboard', loginPath: '/inventory/login' },
  D005: { name: 'WAREHOUSE', prefix: '/warehouse', title: 'Warehouse Fulfillment Operations', defaultPath: '/warehouse/dashboard', loginPath: '/warehouse/login' },
  D006: { name: 'SALES', prefix: '/sales', title: 'Sales & Client Orders', defaultPath: '/sales/dashboard', loginPath: '/sales/login' },
  D007: { name: 'CUSTOMER_SUPPORT', prefix: '/support', title: 'Client Concierge & Support', defaultPath: '/support/dashboard', loginPath: '/support/login' },
  D008: { name: 'DELIVERY_MANAGER', prefix: '/delivery-manager', title: 'Delivery Fleet Dispatch Hub', defaultPath: '/delivery-manager/dashboard', loginPath: '/delivery-manager/login' },
  D009: { name: 'DRIVER', prefix: '/driver', title: 'Courier Delivery Mobile Portal', defaultPath: '/driver/dashboard', loginPath: '/driver/login' },
  D010: { name: 'ACCOUNTING', prefix: '/accounting', title: 'Financial & Accounting Ledger', defaultPath: '/accounting/dashboard', loginPath: '/accounting/login' },
  D011: { name: 'MARKETING', prefix: '/marketing', title: 'Marketing Campaigns & Curations', defaultPath: '/marketing/dashboard', loginPath: '/marketing/login' },
  D012: { name: 'CUSTOMER', prefix: '/customer', title: 'Client Private Portal', defaultPath: '/customer/dashboard', loginPath: '/customer/login' },
};
