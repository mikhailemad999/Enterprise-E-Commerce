import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function CustomerLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D012"
      defaultUsername="client1"
      demoPin="334455"
    />
  );
}
