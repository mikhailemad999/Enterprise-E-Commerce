import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function ProductManagerLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D003"
      defaultUsername="productmgr"
      demoPin="345678"
    />
  );
}
