import React, { useState, useRef, useEffect } from 'react';
import { Message, Citation } from './types';

interface Props {
    messages: Message[];
    onSendMessage: (text: string) => void;
}

export const CenterPane: React.FC<Props> = ({ messages, onSendMessage }) => {
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if(input.trim()) {
                onSendMessage(input);
                setInput('');
            }
        }
    };

    // 渲染引用标签 [1]
    const renderContentWithCitations = (msg: Message) => {
        if (!msg.citations) return <p className="whitespace-pre-wrap">{msg.content}</p>;

        // 简单的替换逻辑，实际应用需更复杂的解析
        // 这里假设 content 已经是渲染好的，或者我们手动插入 JSX
        return (
            <div className="whitespace-pre-wrap leading-relaxed">
                {msg.content}
                {/* 模拟引用尾注 */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {msg.citations.map((cit, idx) => (
                         <div key={cit.id} className="group relative inline-block">
                             <span className="cursor-pointer inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-[10px] text-slate-600 font-bold hover:bg-blue-600 hover:text-white transition-colors">
                                 {idx + 1}
                             </span>
                             {/* Hover Card */}
                             <div className="absolute bottom-full left-0 mb-2 w-64 bg-white p-3 rounded-lg shadow-xl border border-slate-200 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                                 <div className="text-xs font-bold text-slate-800 mb-1">来源: {cit.sourceId}</div>
                                 <div className="text-xs text-slate-600 line-clamp-3 italic">"{cit.textSnippet}"</div>
                                 <div className="mt-2 text-[10px] text-blue-500 font-medium">点击查看详情 (开发中)</div>
                             </div>
                         </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col bg-white relative">
            {/* Header */}
            <div className="h-14 border-b border-slate-100 flex items-center px-6 shrink-0 justify-between">
                <span className="font-bold text-slate-700">💬 智能问答</span>
                <button className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1 rounded-full transition-colors">
                    ✨ 生成摘要
                </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            msg.role === 'ai' ? 'bg-gradient-to-tr from-blue-500 to-cyan-500 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                            {msg.role === 'ai' ? '✦' : '👤'}
                        </div>
                        <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-slate-100 rounded-2xl px-4 py-3 text-slate-800' : ''}`}>
                             <div className="text-sm text-slate-800">
                                 {renderContentWithCitations(msg)}
                                 {msg.isStreaming && <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1 align-middle"></span>}
                             </div>
                             
                             {msg.role === 'ai' && !msg.isStreaming && (
                                 <div className="flex gap-4 mt-3 pt-3 border-t border-slate-50">
                                     <button className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
                                         <span>📋</span> 复制
                                     </button>
                                     <button className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors">
                                         <span>📝</span> 存为笔记
                                     </button>
                                 </div>
                             )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-6 pt-2 shrink-0">
                <div className="relative shadow-lg rounded-2xl border border-slate-200 bg-white">
                    <textarea 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="向笔记本提问，或输入指令..."
                        className="w-full min-h-[60px] max-h-[200px] p-4 pr-12 rounded-2xl focus:outline-none resize-none bg-transparent text-sm"
                        rows={1}
                    />
                    <button 
                        onClick={() => { if(input.trim()) { onSendMessage(input); setInput(''); } }}
                        className="absolute bottom-3 right-3 p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!input.trim()}
                    >
                        ➤
                    </button>
                </div>
                <div className="text-center mt-2">
                     <p className="text-[10px] text-slate-400">AI 可能会产生错误，请核对重要信息。</p>
                </div>
            </div>
        </div>
    );
};
