import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function SuperAdminLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D001"
      defaultUsername="superadmin"
      demoPin="123456"
    />
  );
}
