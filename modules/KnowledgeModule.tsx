import React, { useState } from 'react';
import { KnowledgeSidebar } from './Knowledge/Sidebar';
import { KnowledgeBaseList } from './Knowledge/KnowledgeBase/index';
import { DatasetDetail } from './Knowledge/KnowledgeBase/DatasetDetail/index';
import { DatabaseList } from './Knowledge/Database/index';
import { KnowledgeDataset } from './Knowledge/types';
import { ModuleType } from '../index';

interface Props {
  onNavigate: (module: ModuleType) => void;
}

export const KnowledgeModule: React.FC<Props> = ({ onNavigate }) => {
  const [activeMenu, setActiveMenu] = useState('knowledge_base'); // 'knowledge_base' | 'database'
  const [selectedDataset, setSelectedDataset] = useState<KnowledgeDataset | null>(null);

  return (
    <div className="flex h-full w-full bg-slate-50 relative">
      <KnowledgeSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      <div className="flex-1 overflow-hidden h-full">
        {activeMenu === 'database' ? (
           /* 数据库（业务资产库）逻辑 */
           <DatabaseList />
        ) : (
           /* 知识库逻辑 */
           selectedDataset ? (
             <DatasetDetail 
                dataset={selectedDataset} 
                onBack={() => setSelectedDataset(null)} 
             />
           ) : (
             <KnowledgeBaseList 
                onSelectDataset={setSelectedDataset}
                onCreateClick={() => onNavigate('import')}
             />
           )
        )}
      </div>
    </div>
  );
};
