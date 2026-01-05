import React from 'react';
import { mockNotebooks } from './mockData';
import { Notebook } from './types';

interface Props {
    onSelectNotebook: (nb: Notebook) => void;
}

export const Dashboard: React.FC<Props> = ({ onSelectNotebook }) => {
    return (
        <div className="h-full bg-slate-50 p-10 overflow-y-auto animate-fade-in">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">欢迎回来，开始智能分析</h1>
                        <p className="text-slate-500 mt-2">选择一个笔记本或创建新任务</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-200 transition-all flex items-center gap-2 transform hover:scale-105">
                        <span className="text-xl">+</span> 新建笔记本
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* New Notebook Card */}
                    <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all min-h-[200px] group">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                            <span className="text-3xl text-slate-400 group-hover:text-blue-500">＋</span>
                        </div>
                        <span className="text-slate-600 font-medium">创建空白笔记本</span>
                    </div>

                    {/* Existing Notebooks */}
                    {mockNotebooks.map(nb => (
                        <div 
                            key={nb.id} 
                            onClick={() => onSelectNotebook(nb)}
                            className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group min-h-[200px] flex flex-col"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-slate-400 hover:text-slate-600 p-1">✏️</button>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-4">
                                📒
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">{nb.name}</h3>
                            
                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-1">
                                    <span>📄</span> {nb.sourceCount} 个来源
                                </div>
                                <span>{nb.updatedAt}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
