import React, { useState } from 'react';
import { SmartFile, EntityItem } from './types';
import { DetailBasicInfo } from './tabs/BasicInfoTab';
import { DetailSecurity } from './tabs/SecurityTab';
import { DetailKeyInfo } from './tabs/KeyInfoTab';
import { DetailContent } from './tabs/ContentTab';

interface Props {
  file: SmartFile;
  onClose: () => void;
  onUpdateFile: (file: SmartFile) => void;
}

type TabType = 'basic' | 'security' | 'key_info' | 'content';

export const FileDetailModal: React.FC<Props> = ({ file, onClose, onUpdateFile }) => {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  // 用于从关键信息Tab跳转到内容Tab的信号
  const [jumpSignal, setJumpSignal] = useState<{page: number, text: string} | null>(null);

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'basic', label: '基础信息', icon: '📝' },
    { id: 'security', label: '安全检测', icon: '🛡️' },
    { id: 'key_info', label: '关键信息', icon: '🔑' },
    { id: 'content', label: '文本内容', icon: '📄' },
  ];

  const handleJumpToContent = (page: number, text: string) => {
      setJumpSignal({ page, text });
      setActiveTab('content');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">📄</div>
             <div>
                 <h3 className="text-lg font-bold text-slate-800 truncate max-w-md" title={file.name}>{file.name}</h3>
                 <p className="text-xs text-slate-500 font-mono">ID: {file.id} | Size: {(file.size/1024).toFixed(2)}KB</p>
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
                        ? 'border-blue-600 text-blue-600' 
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
                {activeTab === 'security' && <DetailSecurity file={file} />}
                {activeTab === 'key_info' && (
                    <DetailKeyInfo 
                        file={file} 
                        onUpdateFile={onUpdateFile} 
                        onJump={handleJumpToContent} 
                    />
                )}
                {activeTab === 'content' && (
                    <DetailContent 
                        file={file} 
                        jumpSignal={jumpSignal} 
                        onClearSignal={() => setJumpSignal(null)}
                    />
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
