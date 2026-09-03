import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function DriverLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D009"
      defaultUsername="driver1"
      demoPin="901234"
    />
  );
}
