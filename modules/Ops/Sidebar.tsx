
import React from 'react';

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export const OpsSidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { id: 'dashboard', label: '运维监控', icon: '📊' },
    { id: 'users', label: '用户与权限', icon: '👥' },
    { id: 'logs', label: '日志审计', icon: '🛡️' },
    { id: 'tokens', label: 'Token 管理', icon: '🔑' },
  ];

  return (
    <aside className="w-56 bg-white border-r border-slate-200 flex flex-col shrink-0 pt-6 shadow-sm z-10">
      <div className="px-6 mb-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">系统管理中心</h3>
      </div>
      <div className="space-y-1 px-3">
        {menuItems.map(item => (
            <button
            key={item.id}
            onClick={() => onMenuChange(item.id)}
            className={`w-full px-4 py-3 text-left font-medium text-sm flex items-center gap-3 rounded-lg transition-all ${
                activeMenu === item.id
                ? 'bg-blue-50 text-blue-700 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            >
            <span className="text-lg">{item.icon}</span>
            {item.label}
            </button>
        ))}
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-100">
          <div className="bg-slate-50 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500 mb-2">系统版本</div>
              <div className="font-mono text-sm font-bold text-slate-700">v2.5.0-build</div>
          </div>
      </div>
    </aside>
  );
};
