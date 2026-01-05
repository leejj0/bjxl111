
import React, { useState } from 'react';
import { SearchDashboard } from './Dashboard';
import { InferenceCapsules } from './InferenceCapsules';
import { mockSearchResults } from '../mockData';
import { SearchResult } from '../types';

interface Props {
    onViewEntity: (id: string) => void;
}

export const AISearchView: React.FC<Props> = ({ onViewEntity }) => {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    // 模拟 AI 推理延迟
    setTimeout(() => {
        setIsSearching(false);
        setHasSearched(true);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {!hasSearched ? (
        /* 初始状态：搜索框 + 仪表盘 */
        <div className="flex-1 flex flex-col items-center justify-start pt-20 pb-10 px-4 animate-fade-in">
           <div className="text-center mb-10">
              <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">智能数据检索系统</h1>
              <p className="text-slate-500 text-lg font-light">
                  连接全域数据，洞察业务核心价值
              </p>
           </div>

           <div className="w-full max-w-3xl mb-12 relative z-10">
               <div className="relative group">
                   <div className="absolute inset-0 bg-blue-200 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                   <input 
                       type="text" 
                       className="w-full h-16 pl-6 pr-16 rounded-2xl border border-slate-200 bg-white shadow-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400"
                       placeholder="输入自然语言，例如：查找 2024 年俄罗斯相关的受制裁实体..."
                       value={query}
                       onChange={(e) => setQuery(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                   />
                   <button 
                       onClick={handleSearch}
                       className="absolute right-3 top-3 bottom-3 aspect-square bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm"
                   >
                       {isSearching ? <span className="animate-spin">↻</span> : '🔍'}
                   </button>
               </div>
               <div className="mt-4 flex flex-wrap justify-center gap-2">
                   {['生成月度运营报告', '查找最近的系统告警', '分析竞品市场份额', '知识库：API文档'].map(tag => (
                       <button key={tag} onClick={() => { setQuery(tag); handleSearch(); }} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm">
                           {tag}
                       </button>
                   ))}
               </div>
           </div>

           {/* 仪表盘 */}
           <SearchDashboard />
        </div>
      ) : (
        /* 搜索结果状态 */
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-6 animate-fade-in-up">
            {/* 顶部搜索条 */}
            <div className="mb-6 flex gap-4">
                <div className="flex-1 relative">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:border-blue-500"
                    />
                    <button className="absolute right-3 top-3 text-slate-400 hover:text-blue-600">✕</button>
                </div>
                <button className="bg-blue-600 text-white px-6 rounded-xl font-medium hover:bg-blue-700 shadow-sm">
                    搜索
                </button>
            </div>

            {/* AI 推理展示 */}
            <InferenceCapsules />

            {/* 智能综述 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 mb-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">✨</span>
                    <h3 className="font-bold text-blue-900">AI 智能综述</h3>
                </div>
                <p className="text-sm text-blue-800/80 leading-relaxed">
                    系统根据您的描述，识别到关键实体 <b>"Vladimir Putin"</b> 以及相关的时间范围 <b>2023-2024</b>。
                    主要线索集中在 <b>全球制裁名单库 (OFAC)</b> 和 <b>2024年Q1情报汇总</b> 中。
                    建议重点关注其关联的资金流向记录。
                </p>
            </div>

            {/* 混合结果列表 */}
            <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">最佳匹配结果</h4>
                {mockSearchResults.map(res => (
                    <div 
                        key={res.id} 
                        onClick={() => onViewEntity(res.id)}
                        className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all group"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-blue-700 group-hover:underline flex items-center gap-2">
                                {res.type === 'database_row' ? '🗄️' : '📄'} {res.title}
                            </h3>
                            <span className="text-xs font-mono bg-green-50 text-green-600 px-2 py-0.5 rounded border border-green-100">
                                Match: {res.score}%
                            </span>
                        </div>
                        <div className="text-xs text-slate-400 mb-3 flex items-center gap-3">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">{res.source}</span>
                            <span>{res.timestamp}</span>
                            {res.tags.map(t => <span key={t} className="text-slate-400">#{t}</span>)}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{__html: res.summary}}></p>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};
