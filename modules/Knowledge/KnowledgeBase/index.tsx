import React, { useState } from 'react';
import { mockDatasets } from '../mockData';
import { KnowledgeDataset, DatasetType } from '../types';
import { DatasetCard } from './DatasetCard';
import { SettingsModal } from './SettingsModal';

interface Props {
  onSelectDataset: (ds: KnowledgeDataset) => void;
  onCreateClick: () => void;
}

export const KnowledgeBaseList: React.FC<Props> = ({ onSelectDataset, onCreateClick }) => {
  const [activeTab, setActiveTab] = useState<DatasetType>('public');
  const [searchQuery, setSearchQuery] = useState('');
  const [datasets, setDatasets] = useState<KnowledgeDataset[]>(mockDatasets);
  
  // Settings Modal State
  const [editingDataset, setEditingDataset] = useState<KnowledgeDataset | null>(null);

  const filteredDatasets = datasets.filter(ds => 
    ds.type === activeTab && 
    (ds.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     ds.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleUpdateDataset = (updated: KnowledgeDataset) => {
      setDatasets(prev => prev.map(d => d.id === updated.id ? updated : d));
      setEditingDataset(null);
  };

  const handleDeleteDataset = (id: string) => {
      if(window.confirm('确定要删除该知识库吗？此操作不可恢复。')) {
          setDatasets(prev => prev.filter(d => d.id !== id));
      }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
        {/* Top Bar */}
        <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
            <div className="flex gap-4">
                <button 
                    onClick={() => setActiveTab('public')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'public' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    公共知识库
                </button>
                <button 
                    onClick={() => setActiveTab('private')}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'private' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                    私有知识库
                </button>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="输入名称、描述、标签查询" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 border border-slate-300 rounded-md py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute left-2.5 top-1.5 text-slate-400 text-xs">🔍</span>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700">查询</button>
            </div>
        </div>

        {/* Content Grid */}
        <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Create New Card */}
                <div 
                    onClick={onCreateClick}
                    className="bg-white border-2 border-dashed border-blue-200 rounded-xl min-h-[180px] flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center text-4xl mb-3 group-hover:scale-110 group-hover:bg-blue-100 transition-transform">
                        +
                    </div>
                    <span className="text-slate-500 font-medium group-hover:text-blue-600">点击创建</span>
                </div>

                {/* Dataset Cards */}
                {filteredDatasets.map(ds => (
                    <DatasetCard 
                        key={ds.id} 
                        dataset={ds} 
                        onClick={() => onSelectDataset(ds)}
                        onEdit={() => setEditingDataset(ds)}
                        onDelete={() => handleDeleteDataset(ds.id)}
                        onToggleDisable={() => handleUpdateDataset({...ds, isDisabled: !ds.isDisabled})}
                    />
                ))}
            </div>
        </div>

        {/* Settings Modal */}
        {editingDataset && (
            <SettingsModal 
                dataset={editingDataset} 
                onClose={() => setEditingDataset(null)} 
                onSave={handleUpdateDataset} 
            />
        )}
    </div>
  );
};
