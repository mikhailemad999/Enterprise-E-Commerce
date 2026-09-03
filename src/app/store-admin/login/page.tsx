import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function StoreAdminLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D002"
      defaultUsername="storeadmin"
      demoPin="234567"
    />
  );
}
