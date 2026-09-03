import React from 'react';
import DepartmentLogin from '@/components/DepartmentLogin';

export default function MarketingLoginPage() {
  return (
    <DepartmentLogin
      departmentId="D011"
      defaultUsername="marketmgr"
      demoPin="223344"
    />
  );
}
