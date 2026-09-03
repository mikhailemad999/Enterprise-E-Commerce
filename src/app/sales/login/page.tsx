import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function SalesLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D006"
      defaultUsername="salesrep"
      demoPin="678901"
    />
  );
}
