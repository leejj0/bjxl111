
import React, { useState } from 'react';
import { OpsSidebar } from './Ops/Sidebar';
import { OpsDashboard } from './Ops/Dashboard/index';
import { UserMgr } from './Ops/UserMgr/index';
import { LogAudit } from './Ops/LogAudit/index';
import { TokenMgr } from './Ops/TokenMgr/index';

export const OpsModule = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <OpsDashboard />;
      case 'users': return <UserMgr />;
      case 'logs': return <LogAudit />;
      case 'tokens': return <TokenMgr />;
      default: return <OpsDashboard />;
    }
  };

  return (
    <div className="flex h-full w-full bg-slate-100">
      <OpsSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <div className="flex-1 overflow-hidden h-full">
        {renderContent()}
      </div>
    </div>
  );
};
