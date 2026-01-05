import React, { useState } from 'react';
import { KnowledgeDataset } from '../types';

interface Props {
  dataset: KnowledgeDataset;
  onClose: () => void;
  onSave: (ds: KnowledgeDataset) => void;
}

export const SettingsModal: React.FC<Props> = ({ dataset, onClose, onSave }) => {
  const [name, setName] = useState(dataset.name);
  const [desc, setDesc] = useState(dataset.description);
  const [exts, setExts] = useState(dataset.allowedExtensions.join('; '));

  const handleSave = () => {
      onSave({
          ...dataset,
          name,
          description: desc,
          allowedExtensions: exts.split(';').map(s => s.trim()).filter(s => s)
      });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center animate-fade-in">
        <div className="bg-white w-96 rounded-xl shadow-2xl p-6 animate-scale-in">
            <h3 className="text-lg font-bold text-slate-800 mb-4">⚙️ 知识库设置</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">名称</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">描述</label>
                    <textarea 
                        value={desc} 
                        onChange={e => setDesc(e.target.value)}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none h-20 resize-none" 
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">允许的文件后缀 (用分号隔开)</label>
                    <input 
                        type="text" 
                        value={exts} 
                        onChange={e => setExts(e.target.value)}
                        className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none font-mono" 
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded text-sm">取消</button>
                <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded text-sm">保存</button>
            </div>
        </div>
    </div>
  );
};
