import React from 'react';
import { KnowledgeDataset } from '../../types';

export const HeaderInfo: React.FC<{ dataset: KnowledgeDataset }> = ({ dataset }) => {
  const statItems = [
      { label: '文件状态', success: dataset.stats.fileStatus.success, total: dataset.stats.fileStatus.total },
      { label: '摘要状态', success: dataset.stats.summaryStatus.success, total: dataset.stats.summaryStatus.total },
      { label: '标签状态', success: dataset.stats.tagStatus.success, total: dataset.stats.tagStatus.total },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-4 flex justify-between items-start">
        {/* Left: Basic Info */}
        <div className="max-w-lg">
            <div className="text-xs text-slate-400 mb-1">{dataset.updatedAt}</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <span className="bg-cyan-100 text-cyan-600 w-8 h-8 flex items-center justify-center rounded text-base">📈</span>
                {dataset.name}
            </h2>
            <p className="text-slate-500 text-sm mb-3">{dataset.description}</p>
            <div className="flex items-center gap-2">
                {dataset.tags.map((tag, i) => (
                    <span key={i} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs">
                        🏷️ {tag}
                    </span>
                ))}
                <button className="text-xs text-slate-400 hover:text-blue-500">+ 添加标签</button>
            </div>
        </div>

        {/* Right: Stats */}
        <div className="flex gap-8">
            <div className="text-right">
                <div className="text-xs text-slate-400 mb-1">(文本) {dataset.type === 'public' ? '公共' : '私有'}</div>
                <div className="text-xl font-bold text-red-500">{dataset.fileCount} <span className="text-sm text-slate-400 font-normal">个文档</span></div>
            </div>
            
            <div className="flex gap-6 border-l border-slate-100 pl-6">
                {statItems.map((item, i) => (
                    <div key={i} className="flex flex-col text-sm">
                        <span className="text-slate-500 font-medium mb-1">{item.label}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-slate-700 font-bold">{item.total}</span>
                            <span className="text-xs text-slate-400">个 (总共)</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs">
                             <span className="text-green-600">{item.success} 个 (成功)</span>
                             <span className="text-orange-400">/</span>
                             <span className="text-slate-400">{item.total - item.success} 个 (失败)</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2 border-l border-slate-100 pl-6">
                 <button className="text-slate-400 hover:text-blue-600">⚙️</button>
                 <button className="text-slate-400 hover:text-blue-600">👁️</button>
                 <button className="text-slate-400 hover:text-blue-600">📝</button>
                 <button className="text-slate-400 hover:text-red-600">🗑️</button>
            </div>
        </div>
    </div>
  );
};
