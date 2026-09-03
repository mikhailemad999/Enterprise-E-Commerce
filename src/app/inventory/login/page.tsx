import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function InventoryLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D004"
      defaultUsername="inventorymgr"
      demoPin="456789"
    />
  );
}
