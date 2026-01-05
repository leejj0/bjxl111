
import React, { useState } from 'react';
import { SearchMode, EntityProfileData } from './Search/types';
import { AISearchView } from './Search/AISearch/index';
import { TraditionalSearchView } from './Search/TraditionalSearch/index';
import { DatabaseSearchView } from './Search/DatabaseSearch/index';
import { EntityProfile } from './Search/EntityProfile/index';
import { mockEntityProfile } from './Search/mockData';

export const SearchModule = () => {
  const [activeTab, setActiveTab] = useState<SearchMode>('ai');
  const [viewingProfile, setViewingProfile] = useState<EntityProfileData | null>(null);

  // 模拟点击查看详情
  const handleViewEntity = (id: string) => {
    // 实际应根据 ID fetch 数据，这里使用 Mock
    setViewingProfile(mockEntityProfile);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'ai':
        return <AISearchView onViewEntity={handleViewEntity} />;
      case 'traditional':
        return <TraditionalSearchView onViewEntity={handleViewEntity} />;
      case 'sql':
        return <DatabaseSearchView />;
      default:
        return <AISearchView onViewEntity={handleViewEntity} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 relative">
      {/* 顶部导航 Tabs */}
      <div className="bg-white border-b border-slate-200 px-6 shrink-0 h-14 flex items-center justify-between shadow-sm z-10">
        <div className="flex gap-8 h-full">
          {[
            { id: 'ai', label: 'AI 智能检索', icon: '🤖' },
            { id: 'traditional', label: '传统数据检索', icon: '🔍' },
            { id: 'sql', label: '数据库检索', icon: '⌨️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SearchMode)}
              className={`flex items-center gap-2 h-full text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
             <button className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1">
                 <span>⚙️</span> 检索配置
             </button>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-hidden relative">
        {renderContent()}
      </div>

      {/* 实体画像滑层/弹窗 */}
      {viewingProfile && (
        <EntityProfile 
          data={viewingProfile} 
          onClose={() => setViewingProfile(null)} 
        />
      )}
    </div>
  );
};
