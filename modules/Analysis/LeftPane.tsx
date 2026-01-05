import React, { useState } from 'react';
import { SourceFile } from './types';

interface Props {
    sources: SourceFile[];
    onToggleSource: (id: string) => void;
}

export const LeftPane: React.FC<Props> = ({ sources, onToggleSource }) => {
    const [filter, setFilter] = useState('');

    const filteredSources = sources.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));
    const selectedCount = sources.filter(s => s.selected).length;

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header / Upload */}
            <div className="p-4 border-b border-slate-200 shrink-0">
                <div className="flex gap-2 mb-4">
                    <button className="flex-1 bg-white border border-slate-300 hover:border-blue-400 hover:text-blue-600 text-slate-600 py-2 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2">
                        <span>📤</span> 上传文件
                    </button>
                    <button className="flex-1 bg-white border border-slate-300 hover:border-purple-400 hover:text-purple-600 text-slate-600 py-2 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2">
                        <span>📚</span> 知识库
                    </button>
                </div>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="搜索来源..." 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-md py-1.5 pl-8 pr-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute left-2.5 top-1.5 text-slate-400 text-xs">🔍</span>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2">
                <div className="px-2 py-1 flex justify-between items-center text-xs text-slate-500 font-medium mb-1">
                    <span>来源 ({sources.length})</span>
                    <span>已选 {selectedCount}</span>
                </div>
                {filteredSources.map(source => (
                    <div 
                        key={source.id}
                        className={`group flex items-center gap-3 p-3 rounded-lg mb-1 cursor-pointer transition-colors ${
                            source.selected ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-100 border border-transparent'
                        }`}
                        onClick={() => onToggleSource(source.id)}
                    >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            source.selected ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'
                        }`}>
                            {source.selected && <span className="text-white text-[10px]">✔</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`text-sm truncate font-medium ${source.selected ? 'text-blue-900' : 'text-slate-700'}`}>
                                {source.name}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                <span className="uppercase bg-slate-200 px-1 rounded">{source.type}</span>
                                <span>{(source.wordCount / 1000).toFixed(1)}k words</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Folders (Mock UI) */}
            <div className="p-3 border-t border-slate-200 shrink-0">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2 cursor-pointer hover:text-slate-800">
                    <span className="font-bold">📁 我的文件夹</span>
                    <span>+</span>
                </div>
                <div className="space-y-1 opacity-60">
                    <div className="flex items-center gap-2 text-sm text-slate-600 px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">
                        <span>📂</span> 财务类
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">
                        <span>📂</span> 技术文档
                    </div>
                </div>
            </div>
        </div>
    );
};
