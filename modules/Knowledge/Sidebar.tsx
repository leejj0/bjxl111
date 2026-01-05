import React from 'react';

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export const KnowledgeSidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    { id: 'knowledge_base', label: '知识库', icon: '📚' },
    { id: 'database', label: '数据库', icon: '🗄️' },
  ];

  return (
    <aside className="w-48 bg-slate-100 border-r border-slate-300 flex flex-col shrink-0 pt-4">
      <div className="px-5 mb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">资源管理</div>
      {menuItems.map(item => (
        <button
          key={item.id}
          onClick={() => onMenuChange(item.id)}
          className={`px-5 py-3 text-left font-medium text-sm flex items-center gap-3 transition-colors ${
            activeMenu === item.id
            ? 'text-blue-700 bg-white border-r-2 border-blue-600' 
            : 'text-slate-600 hover:bg-slate-200 border-r-2 border-transparent'
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </aside>
  );
};
