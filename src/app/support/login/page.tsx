import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function SupportLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D007"
      defaultUsername="supportrep"
      demoPin="789012"
    />
  );
}
