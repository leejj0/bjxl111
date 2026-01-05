
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SearchModule } from './modules/SearchModule';
import { DataImportModule } from './modules/DataImport/index';
import { AnalysisModule } from './modules/Analysis/index';
import { KnowledgeModule } from './modules/KnowledgeModule';
import { OpsModule } from './modules/OpsModule';

// 定义系统模块枚举
export type ModuleType = 'import' | 'analysis' | 'knowledge' | 'search' | 'ops';

const App = () => {
  // 默认为智能检索 (首页)
  const [currentModule, setCurrentModule] = useState<ModuleType>('search');

  // 顶部导航配置
  const navItems: { id: ModuleType; label: string; icon: string }[] = [
    { id: 'search', label: '智能检索', icon: '🔍' },
    { id: 'analysis', label: '智能分析', icon: '📊' },
    { id: 'import', label: '数据导入', icon: '📥' },
    { id: 'knowledge', label: '知识管理', icon: '📚' },
    { id: 'ops', label: '运维管理', icon: '⚙️' },
  ];

  // 渲染当前激活的模块组件
  const renderModule = () => {
    switch (currentModule) {
      case 'search': return <SearchModule />;
      case 'import': return <DataImportModule />;
      case 'analysis': return <AnalysisModule />;
      case 'knowledge': return <KnowledgeModule onNavigate={setCurrentModule} />;
      case 'ops': return <OpsModule />;
      default: return <SearchModule />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50 text-slate-800">
      {/* --- 顶部一级菜单 (Global Top Navigation) --- */}
      <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shadow-md z-50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">
            D
          </div>
          <span className="text-xl font-bold tracking-wide">DataMind 智能系统</span>
        </div>

        <nav className="flex items-center h-full gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentModule(item.id)}
              className={`
                h-12 px-6 flex items-center gap-2 rounded-md transition-all duration-200
                ${currentModule === item.id 
                  ? 'bg-blue-600 text-white font-medium shadow-sm' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-800 rounded-full text-slate-300 transition-colors">
            🔔
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-800 p-1.5 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              Admin
            </div>
            <span className="text-sm text-slate-300">管理员</span>
          </div>
        </div>
      </header>

      {/* --- 模块内容区域 --- */}
      <main className="flex-1 overflow-hidden relative">
        {renderModule()}
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
