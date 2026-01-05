import React from 'react';

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export const DataImportSidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { id: 'upload', label: '数据上传' },
    { id: 'smart_parsing', label: '智能解析' },
    { id: 'data_parsing', label: '数据解析' }
  ];

  return (
    <aside className="w-48 bg-slate-100 border-r border-slate-300 flex flex-col shrink-0 pt-2">
      {menuItems.map(item => (
        <button
          key={item.id}
          onClick={() => onMenuChange(item.id)}
          className={`px-5 py-3 text-left font-bold text-base transition-colors ${
            activeMenu === item.id
            ? 'text-blue-600 bg-white border-l-4 border-blue-600 shadow-sm' 
            : 'text-slate-600 hover:bg-slate-200 border-l-4 border-transparent'
          }`}
        >
          {item.label}
        </button>
      ))}
    </aside>
  );
};
