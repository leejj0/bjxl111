
import React from 'react';
import { mockSearchResults } from '../mockData';

interface Props {
    onViewEntity: (id: string) => void;
}

export const ResultList: React.FC<Props> = ({ onViewEntity }) => {
  return (
    <div className="h-full flex flex-col">
        {/* Results Header */}
        <div className="h-10 border-b border-slate-100 flex justify-between items-center px-6 shrink-0 bg-white">
            <span className="text-xs text-slate-500">找到 3 个结果 (耗时 0.45秒)</span>
            <div className="flex gap-4 text-xs text-slate-500">
                <button className="hover:text-blue-600">⬇ 导出 CSV</button>
                <button className="hover:text-blue-600">📶 列表配置</button>
            </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-0">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase sticky top-0 z-10">
                    <tr>
                        <th className="px-6 py-3 border-b border-slate-200">名称</th>
                        <th className="px-6 py-3 border-b border-slate-200">国家/地区</th>
                        <th className="px-6 py-3 border-b border-slate-200">日期/匹配度</th>
                        <th className="px-6 py-3 border-b border-slate-200 text-right">类型</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {mockSearchResults.map(res => (
                        <tr 
                            key={res.id} 
                            onClick={() => onViewEntity(res.id)}
                            className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                        >
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg opacity-60">
                                        {res.type === 'database_row' ? '👤' : '📄'}
                                    </span>
                                    <div>
                                        <div className="font-bold text-blue-700 group-hover:underline">{res.title}</div>
                                        <div className="text-xs text-slate-400 mt-1">{res.source}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">俄罗斯</td>
                            <td className="px-6 py-4">
                                <div>{res.timestamp}</div>
                                <div className="text-xs text-green-600 font-medium">Match: {res.score}%</div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs border border-slate-200">
                                    {res.tags[0]}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};
