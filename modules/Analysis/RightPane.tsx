import React, { useState } from 'react';
import { Note, AnalysisTask } from './types';

interface Props {
    notes: Note[];
    tasks: AnalysisTask[];
    onUseTool: (type: AnalysisTask['type']) => void;
    onViewTask: (task: AnalysisTask) => void;
    onEditNote: (note: Note) => void;
}

export const RightPane: React.FC<Props> = ({ notes, tasks, onUseTool, onViewTask, onEditNote }) => {
    const [activeTab, setActiveTab] = useState<'tools' | 'notes'>('tools');

    const tools = [
        { id: 'summary', label: '生成摘要', desc: '快速生成选定文件的核心摘要', icon: '📝' },
        { id: 'qa', label: '智能问答', desc: '针对文件内容生成可能的Q&A', icon: '❓' },
        { id: 'outline', label: '提取大纲', desc: '梳理文档结构生成大纲', icon: '📑' },
        { id: 'extraction', label: '数据提取', desc: '提取关键实体表格', icon: '📊' },
    ];

    return (
        <div className="h-full flex flex-col bg-slate-50 border-l border-slate-200">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 bg-white shrink-0">
                <button 
                    onClick={() => setActiveTab('tools')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'tools' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                    🛠️ 工具箱
                </button>
                <button 
                    onClick={() => setActiveTab('notes')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'notes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                    📒 笔记 ({notes.length})
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {activeTab === 'tools' ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-3">
                            {tools.map(tool => (
                                <div 
                                    key={tool.id} 
                                    onClick={() => onUseTool(tool.id as any)}
                                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all group"
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-xl bg-slate-100 rounded-lg w-8 h-8 flex items-center justify-center group-hover:bg-blue-100 transition-colors">{tool.icon}</span>
                                        <h4 className="font-bold text-slate-700">{tool.label}</h4>
                                    </div>
                                    <p className="text-xs text-slate-500 pl-11">{tool.desc}</p>
                                </div>
                            ))}
                        </div>

                        {tasks.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">任务列表</h4>
                                <div className="space-y-2">
                                    {tasks.map(task => (
                                        <div 
                                            key={task.id} 
                                            onClick={() => onViewTask(task)}
                                            className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center cursor-pointer hover:bg-slate-50"
                                        >
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`}></div>
                                                <span className="text-sm font-medium text-slate-700 truncate">{task.name}</span>
                                            </div>
                                            <span className="text-xs text-slate-400 ml-2">{task.status === 'completed' ? '完成' : '运行中'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        <button className="w-full py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-400 text-sm font-medium hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
                            + 新建笔记
                        </button>
                        {notes.map(note => (
                            <div 
                                key={note.id} 
                                onClick={() => onEditNote(note)}
                                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow hover:border-blue-200 cursor-pointer transition-all"
                            >
                                <h4 className="font-bold text-slate-800 text-sm mb-2">{note.title}</h4>
                                <p className="text-xs text-slate-500 line-clamp-3 mb-3 leading-relaxed">{note.content}</p>
                                <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                                    <div className="flex gap-1">
                                        {note.tags.map(tag => (
                                            <span key={tag} className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px]">{tag}</span>
                                        ))}
                                    </div>
                                    <button 
                                        className="text-[10px] text-blue-500 hover:underline"
                                        onClick={(e) => { e.stopPropagation(); /* TODO: Convert Logic */ }}
                                    >
                                        转为来源
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
