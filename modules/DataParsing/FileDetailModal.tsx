import React, { useState } from 'react';
import { StructuredFile } from './types';
import { DetailBasicInfo } from './tabs/BasicInfoTab';
import { DetailSchemaMapping } from './tabs/SchemaMappingTab';
import { DetailDataPreview } from './tabs/DataPreviewTab';

interface Props {
  file: StructuredFile;
  onClose: () => void;
  onUpdateFile: (file: StructuredFile) => void;
}

type TabType = 'basic' | 'schema' | 'preview';

export const StructuredFileDetailModal: React.FC<Props> = ({ file, onClose, onUpdateFile }) => {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'basic', label: '基础信息', icon: '📝' },
    { id: 'schema', label: '结构与映射', icon: '📐' },
    { id: 'preview', label: '原始预览', icon: '👁️' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-xl font-bold">∑</div>
             <div>
                 <h3 className="text-lg font-bold text-slate-800 truncate max-w-md" title={file.name}>{file.name}</h3>
                 <p className="text-xs text-slate-500 font-mono">
                     ID: {file.id} | Type: {file.fileType} {file.dbType ? `(${file.dbType})` : ''}
                 </p>
             </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-2xl leading-none">&times;</button>
        </div>

        {/* Tabs Navigation */}
        <div className="px-6 pt-2 border-b border-slate-200 flex gap-8 shrink-0">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 px-2 text-sm font-medium transition-colors border-b-2 ${
                        activeTab === tab.id 
                        ? 'border-cyan-600 text-cyan-700' 
                        : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                    }`}
                >
                    <span className="mr-2">{tab.icon}</span>{tab.label}
                </button>
            ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden bg-slate-50 p-6">
            <div className="h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
                {activeTab === 'basic' && <DetailBasicInfo file={file} />}
                {activeTab === 'schema' && <DetailSchemaMapping file={file} onUpdateFile={onUpdateFile} />}
                {activeTab === 'preview' && <DetailDataPreview file={file} />}
            </div>
        </div>
      </div>
    </div>
  );
};
