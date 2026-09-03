import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function WarehouseLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D005"
      defaultUsername="warehouse1"
      demoPin="567890"
    />
  );
}
