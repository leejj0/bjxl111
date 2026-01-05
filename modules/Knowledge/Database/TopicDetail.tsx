import React, { useState } from 'react';
import { DatabaseTopic, AggregatedRecord } from '../types';
import { mockPersonRecords } from '../mockData';

interface Props {
  topic: DatabaseTopic;
  onBack: () => void;
}

export const TopicDetail: React.FC<Props> = ({ topic, onBack }) => {
    // 实际项目中应根据 topic.id 加载对应的 mock records，这里简化统一使用 personRecords
    const records = mockPersonRecords;
    const [search, setSearch] = useState('');

    const filteredRecords = records.filter(r => 
        Object.values(r).some(val => String(val).toLowerCase().includes(search.toLowerCase()))
    );

    // 动态提取表头 (排除 _ 开头的内部字段)
    const headers = records.length > 0 
        ? Object.keys(records[0]).filter(k => !k.startsWith('_')) 
        : topic.fields;

    return (
        <div className="h-full flex flex-col bg-white animate-fade-in">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="w-8 h-8 rounded-full hover:bg-white border border-transparent hover:border-slate-200 text-slate-500 flex items-center justify-center transition-all"
                    >
                        ←
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            {topic.title}
                            <span className="text-xs font-normal bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                {topic.recordCount.toLocaleString()} 条记录
                            </span>
                        </h2>
                        <div className="text-xs text-slate-500 mt-1 flex gap-2">
                            {topic.tags.map(t => <span key={t}>#{t}</span>)}
                            <span className="text-slate-300">|</span>
                            <span>最后更新: {topic.updatedAt}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="全局检索数据..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-64 border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 pl-8"
                        />
                         <span className="absolute left-2.5 top-1.5 text-slate-400 text-xs">🔍</span>
                    </div>
                    <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded text-sm hover:bg-slate-50 font-medium">
                        ⬇ 导出数据
                    </button>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 font-medium">
                        📊 生成分析报告
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="flex-1 overflow-auto bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-600 text-xs font-bold uppercase sticky top-0 shadow-sm z-10">
                        <tr>
                            <th className="p-4 w-16 text-center border-b border-slate-200">#</th>
                            {headers.map(h => (
                                <th key={h} className="p-4 border-b border-slate-200 border-r border-slate-100 last:border-r-0 whitespace-nowrap min-w-[120px]">
                                    {h}
                                </th>
                            ))}
                            {/* 来源数据集作为辅助列展示 */}
                            <th className="p-4 border-b border-slate-200 text-slate-400 min-w-[150px]">
                                来源数据集 (溯源)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                        {filteredRecords.map((row, idx) => (
                            <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="p-4 text-center text-slate-400 font-mono text-xs">{idx + 1}</td>
                                {headers.map(h => (
                                    <td key={h} className="p-4 border-r border-slate-50 last:border-r-0 truncate max-w-[300px]" title={String(row[h])}>
                                        {/* 简单的敏感数据高亮逻辑示例 */}
                                        {(h.includes('身份证') || h.includes('密码')) ? (
                                            <span className="font-mono bg-slate-100 text-slate-600 px-1 rounded">{row[h]}</span>
                                        ) : h.includes('手机') ? (
                                            <span className="font-mono text-blue-600">{row[h]}</span>
                                        ) : (
                                            <span className="text-slate-700">{row[h]}</span>
                                        )}
                                    </td>
                                ))}
                                <td className="p-4 text-slate-400 text-xs italic">
                                    <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                        📦 {row._sourceDataset}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {filteredRecords.length === 0 && (
                            <tr>
                                <td colSpan={headers.length + 2} className="p-10 text-center text-slate-400">
                                    未找到匹配记录
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
