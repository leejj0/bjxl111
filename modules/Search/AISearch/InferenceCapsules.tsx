
import React from 'react';
import { InferenceCapsule } from '../types';

export const InferenceCapsules = () => {
  // Mock inferred data
  const capsules: InferenceCapsule[] = [
    { id: '1', type: 'entity', label: '实体', value: 'Vladimir Putin' },
    { id: '2', type: 'time', label: '时间范围', value: '2023 - 2024' },
    { id: '3', type: 'keyword', label: '关键词', value: 'Sanctions OR Assets' },
    { id: '4', type: 'field', label: '字段', value: 'Email like *.ru' },
  ];

  const getColor = (type: string) => {
      switch(type) {
          case 'entity': return 'bg-purple-50 text-purple-700 border-purple-200';
          case 'time': return 'bg-blue-50 text-blue-700 border-blue-200';
          case 'field': return 'bg-orange-50 text-orange-700 border-orange-200';
          default: return 'bg-slate-100 text-slate-700 border-slate-200';
      }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 animate-fade-in">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">AI 推理条件:</span>
        {capsules.map(cap => (
            <div 
                key={cap.id} 
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${getColor(cap.type)} transition-all hover:shadow-sm cursor-pointer group`}
            >
                <span className="opacity-60 font-semibold">{cap.label}:</span>
                <span className="font-bold">{cap.value}</span>
                <button className="w-4 h-4 rounded-full hover:bg-black/10 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                    ✕
                </button>
            </div>
        ))}
        <button className="text-xs text-blue-600 hover:underline ml-2">+ 添加条件</button>
    </div>
  );
};
