import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function AccountingLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D010"
      defaultUsername="accountant"
      demoPin="112233"
    />
  );
}
