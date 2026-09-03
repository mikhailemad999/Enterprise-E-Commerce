import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function DeliveryManagerLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D008"
      defaultUsername="deliverymgr"
      demoPin="890123"
    />
  );
}
