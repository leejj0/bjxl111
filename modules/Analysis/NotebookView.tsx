import React, { useState } from 'react';
import { Notebook, SourceFile, Message, AnalysisTask, Note, TaskNode } from './types';
import { LeftPane } from './LeftPane';
import { CenterPane } from './CenterPane';
import { RightPane } from './RightPane';
import { TaskDetailModal } from './TaskDetailModal';
import { mockSources, mockInitialMessages, mockNotes } from './mockData';

interface Props {
    notebook: Notebook;
    onBack: () => void;
}

export const NotebookView: React.FC<Props> = ({ notebook, onBack }) => {
    // UI State
    const [leftOpen, setLeftOpen] = useState(true);
    const [rightOpen, setRightOpen] = useState(true);
    
    // Data State
    const [sources, setSources] = useState<SourceFile[]>(mockSources);
    const [messages, setMessages] = useState<Message[]>(mockInitialMessages);
    const [notes, setNotes] = useState<Note[]>(mockNotes);
    const [tasks, setTasks] = useState<AnalysisTask[]>([]);
    
    // Modal State
    const [activeTask, setActiveTask] = useState<AnalysisTask | null>(null);

    const handleToggleSource = (id: string) => {
        setSources(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
    };

    const handleSendMessage = (text: string) => {
        // 1. Add User Message
        const userMsg: Message = { id: `msg-${Date.now()}`, role: 'user', content: text, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);

        // 2. Simulate AI Response (Streaming)
        const aiMsgId = `ai-${Date.now()}`;
        setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', content: '', timestamp: Date.now(), isStreaming: true }]);

        let responseText = "根据您选中的文档，我为您分析如下：\n\n这是一个关于 " + text + " 的模拟回答。";
        // 模拟引用
        const citations = [{ id: 'c1', sourceId: 'Q1_Financial_Report.pdf', textSnippet: 'Revenue grew by 15% year over year...', page: 12 }];
        
        let i = 0;
        const interval = setInterval(() => {
            setMessages(prev => prev.map(m => {
                if(m.id === aiMsgId) {
                    return { ...m, content: responseText.substring(0, i) };
                }
                return m;
            }));
            i++;
            if(i > responseText.length) {
                clearInterval(interval);
                setMessages(prev => prev.map(m => {
                    if(m.id === aiMsgId) {
                        return { ...m, isStreaming: false, citations: citations };
                    }
                    return m;
                }));
            }
        }, 30);
    };

    const handleUseTool = (type: AnalysisTask['type']) => {
        const newTask: AnalysisTask = {
            id: `task-${Date.now()}`,
            name: `${type === 'summary' ? '文档摘要' : type === 'qa' ? 'Q&A生成' : '数据提取'}任务`,
            type,
            status: 'running',
            createdAt: new Date().toLocaleTimeString(),
            nodes: [
                { id: 'n1', name: '解析选定文档', status: 'running', logs: ['Loading files...', 'Parsing PDF structure...'] },
                { id: 'n2', name: '提取关键信息', status: 'pending', logs: [] },
                { id: 'n3', name: '生成最终结果', status: 'pending', logs: [] },
            ]
        };
        setTasks(prev => [newTask, ...prev]);
        setActiveTask(newTask);

        // 模拟任务执行
        setTimeout(() => {
            setTasks(prev => prev.map(t => t.id === newTask.id ? { 
                ...t, 
                nodes: t.nodes.map(n => n.id === 'n1' ? { ...n, status: 'completed' } : n.id === 'n2' ? { ...n, status: 'running' } : n) 
            } : t));
            setActiveTask(prev => prev ? { ...prev, nodes: prev.nodes.map(n => n.id === 'n1' ? { ...n, status: 'completed' } : n.id === 'n2' ? { ...n, status: 'running' } : n) } : null);
        }, 2000);

        setTimeout(() => {
            const resultText = "## 任务执行结果\n\n成功分析了 2 份文档。发现关键趋势：\n1. 营收稳步增长\n2. 市场份额扩大\n\n建议关注后续季度的成本控制。";
            setTasks(prev => prev.map(t => t.id === newTask.id ? { 
                ...t, 
                status: 'completed',
                nodes: t.nodes.map(n => ({ ...n, status: 'completed', result: resultText }))
            } : t));
             setActiveTask(prev => prev ? { ...prev, status: 'completed', nodes: prev.nodes.map(n => ({ ...n, status: 'completed', result: resultText })) } : null);
        }, 5000);
    };

    const handleSaveNote = (content: string) => {
        const newNote: Note = {
            id: `note-${Date.now()}`,
            title: '任务分析结果',
            content: content,
            tags: ['自动生成'],
            createdAt: new Date().toLocaleString()
        };
        setNotes(prev => [newNote, ...prev]);
        setActiveTask(null); // Close modal
    };

    return (
        <div className="flex flex-col h-full bg-slate-100">
            {/* Navbar */}
            <header className="bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4 shrink-0 shadow-sm z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                        ←
                    </button>
                    <span className="text-xl">📓</span>
                    <h2 className="font-bold text-slate-800">{notebook.name}</h2>
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{notebook.sourceCount} sources</span>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setLeftOpen(!leftOpen)} 
                        className={`p-2 rounded hover:bg-slate-100 ${!leftOpen ? 'text-slate-400' : 'text-blue-600'}`} 
                        title="Toggle Sources"
                    >
                        📑
                    </button>
                    <button 
                        onClick={() => setRightOpen(!rightOpen)} 
                        className={`p-2 rounded hover:bg-slate-100 ${!rightOpen ? 'text-slate-400' : 'text-blue-600'}`}
                        title="Toggle Tools"
                    >
                        🛠️
                    </button>
                </div>
            </header>

            {/* 3-Pane Layout */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Left Pane */}
                <div 
                    className={`bg-slate-50 border-r border-slate-200 transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${
                        leftOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full opacity-0'
                    }`}
                >
                    <LeftPane sources={sources} onToggleSource={handleToggleSource} />
                </div>

                {/* Center Pane (Main Chat) */}
                <div className="flex-1 min-w-0 z-10 shadow-lg">
                    <CenterPane messages={messages} onSendMessage={handleSendMessage} />
                </div>

                {/* Right Pane */}
                <div 
                    className={`bg-slate-50 border-l border-slate-200 transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${
                        rightOpen ? 'w-80 translate-x-0' : 'w-0 translate-x-full opacity-0'
                    }`}
                >
                    <RightPane 
                        notes={notes} 
                        tasks={tasks} 
                        onUseTool={handleUseTool} 
                        onViewTask={setActiveTask}
                        onEditNote={(note) => { /* TODO: Open Note Editor */ }} 
                    />
                </div>
            </div>

            {/* Task Modal */}
            {activeTask && (
                <TaskDetailModal 
                    task={activeTask} 
                    onClose={() => setActiveTask(null)}
                    onConvertToNote={handleSaveNote}
                />
            )}
        </div>
    );
};
