import React from 'react';
import { KnowledgeDataset } from '../types';

interface Props {
  dataset: KnowledgeDataset;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleDisable: () => void;
}

export const DatasetCard: React.FC<Props> = ({ dataset, onClick, onEdit, onDelete, onToggleDisable }) => {
  return (
    <div className={`bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative flex flex-col ${dataset.isDisabled ? 'border-slate-200 opacity-70' : 'border-blue-100'}`}>
        {/* Header Info */}
        <div className="flex justify-between items-start mb-3">
             <div className="flex items-center gap-3">
                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 ${dataset.isDisabled ? 'bg-slate-100 text-slate-400' : 'bg-cyan-50 text-cyan-600'}`}>
                    {dataset.isDisabled ? '🚫' : '📈'}
                 </div>
                 <div>
                     <div className="text-xs text-slate-400">{dataset.updatedAt}</div>
                     <h3 
                        onClick={onClick}
                        className={`font-bold text-base truncate max-w-[150px] cursor-pointer hover:underline ${dataset.isDisabled ? 'text-slate-500 line-through' : 'text-slate-800'}`} 
                        title={dataset.name}
                     >
                         {dataset.name}
                     </h3>
                 </div>
             </div>
             <div className="text-right">
                 <span className="text-xs text-slate-400 block">(文本) {dataset.type === 'public' ? '公共' : '私有'}</span>
                 <span className={`text-sm font-bold ${dataset.isDisabled ? 'text-slate-500' : 'text-orange-500'}`}>
                     {dataset.fileCount > 10000 ? (dataset.fileCount/10000).toFixed(1) + '万' : dataset.fileCount} <span className="text-xs font-normal text-slate-400">个文档</span>
                 </span>
             </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 mb-4 line-clamp-2 h-8 leading-relaxed">
            {dataset.description || '暂无描述...'}
        </p>

        {/* Footer Actions */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-50">
            <div className="flex gap-2 overflow-hidden mr-2">
                {dataset.tags.length > 0 ? (
                    dataset.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] whitespace-nowrap">
                            🏷️ {tag}
                        </span>
                    ))
                ) : (
                    <button className="bg-slate-50 text-slate-400 px-2 py-0.5 rounded text-[10px] hover:bg-slate-100">
                        🏷️ 添加标签
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <button 
                    onClick={(e) => { e.stopPropagation(); onEdit(); }} 
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                    title="设置"
                >
                    ⚙️
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onToggleDisable(); }} 
                    className="text-slate-400 hover:text-slate-700 transition-colors relative"
                    title={dataset.isDisabled ? "启用智能分析" : "禁用智能分析"}
                >
                    {dataset.isDisabled ? (
                        <span className="relative">
                             👁️
                             <span className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-500 -rotate-45 transform origin-center"></span>
                        </span>
                    ) : '👁️'}
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onClick(); }} 
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                    title="编辑内容"
                >
                    📝
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(); }} 
                    className="text-slate-400 hover:text-red-500 transition-colors"
                    title="删除"
                >
                    🗑️
                </button>
            </div>
        </div>
    </div>
  );
};
