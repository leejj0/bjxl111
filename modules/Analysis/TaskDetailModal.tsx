import React, { useState, useEffect, useRef } from 'react';
import { AnalysisTask, TaskNode } from './types';

interface Props {
    task: AnalysisTask;
    onClose: () => void;
    onConvertToNote: (result: string) => void;
}

export const TaskDetailModal: React.FC<Props> = ({ task, onClose, onConvertToNote }) => {
    const [activeNodeId, setActiveNodeId] = useState<string>(task.nodes[0]?.id || '');
    const [streamingContent, setStreamingContent] = useState('');
    
    // 模拟流式输出效果
    const activeNode = task.nodes.find(n => n.id === activeNodeId);
    const streamInterval = useRef<any>(null);

    useEffect(() => {
        if (activeNode) {
            setStreamingContent('');
            if (activeNode.status === 'completed' && activeNode.result) {
                // 如果已经完成，直接显示结果
                setStreamingContent(activeNode.result);
            } else if (activeNode.status === 'running') {
                // 模拟流式
                let i = 0;
                const fullText = activeNode.logs.join('\n') + "\nThinking...\nGenerating analysis...";
                clearInterval(streamInterval.current);
                streamInterval.current = setInterval(() => {
                    setStreamingContent(prev => {
                        const nextChar = fullText[i];
                        i++;
                        if (i >= fullText.length) clearInterval(streamInterval.current);
                        return nextChar ? prev + nextChar : prev;
                    });
                }, 30);
            }
        }
        return () => clearInterval(streamInterval.current);
    }, [activeNodeId, activeNode]);

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex overflow-hidden animate-scale-in">
                
                {/* Left Sidebar: Nodes */}
                <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col p-4">
                    <h3 className="font-bold text-slate-700 mb-6 text-lg">{task.name}</h3>
                    <div className="space-y-2 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-3.5 top-4 bottom-4 w-0.5 bg-slate-200 -z-10"></div>
                        
                        {task.nodes.map((node, idx) => (
                            <div 
                                key={node.id}
                                onClick={() => setActiveNodeId(node.id)}
                                className={`relative flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                    activeNodeId === node.id ? 'bg-white shadow-sm border border-blue-100' : 'hover:bg-slate-100'
                                }`}
                            >
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 z-10 bg-white ${
                                    node.status === 'completed' ? 'border-green-500 text-green-500' :
                                    node.status === 'running' ? 'border-blue-500 text-blue-500 animate-pulse' :
                                    'border-slate-300 text-slate-300'
                                }`}>
                                    {node.status === 'completed' ? '✔' : idx + 1}
                                </div>
                                <div className="min-w-0">
                                    <div className={`text-sm font-medium ${activeNodeId === node.id ? 'text-blue-800' : 'text-slate-600'}`}>
                                        {node.name}
                                    </div>
                                    <div className="text-[10px] text-slate-400 capitalize">{node.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Content: Stream/Result */}
                <div className="flex-1 flex flex-col bg-white">
                    <div className="h-14 border-b border-slate-100 flex justify-between items-center px-6 shrink-0">
                        <span className="font-bold text-slate-600">
                            {activeNode?.status === 'running' ? 'Running Logs...' : 'Execution Result'}
                        </span>
                        <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-2xl">&times;</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 font-mono text-sm leading-relaxed text-slate-700 bg-slate-50/50">
                        {streamingContent}
                        {activeNode?.status === 'running' && <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1 align-middle"></span>}
                    </div>

                    {/* Footer Actions */}
                    {task.status === 'completed' && activeNodeId === task.nodes[task.nodes.length - 1].id && (
                        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
                             <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">关闭</button>
                             <button 
                                onClick={() => {
                                    if(activeNode?.result) onConvertToNote(activeNode.result);
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm"
                             >
                                 💾 保存结果到笔记
                             </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
