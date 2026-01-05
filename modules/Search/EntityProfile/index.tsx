
import React from 'react';
import { EntityProfileData } from '../types';

interface Props {
  data: EntityProfileData;
  onClose: () => void;
}

export const EntityProfile: React.FC<Props> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Side Panel */}
      <div className="relative w-[600px] h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
         {/* Header */}
         <div className="p-8 border-b border-slate-200 bg-slate-50/50">
             <div className="flex justify-between items-start mb-4">
                 <div>
                     <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-2">{data.name}</h2>
                     <div className="flex flex-wrap gap-2">
                         {data.riskTags.map(tag => (
                             <span key={tag} className="px-2 py-0.5 bg-slate-200 text-slate-600 text-xs rounded font-medium border border-slate-300">
                                 {tag}
                             </span>
                         ))}
                         {data.riskLevel === 'high' && (
                             <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded font-bold border border-red-200">
                                 HIGH RISK
                             </span>
                         )}
                     </div>
                 </div>
                 <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-2xl">&times;</button>
             </div>
             
             <div className="flex gap-3">
                 <button className="flex-1 bg-white border border-slate-300 text-slate-700 py-1.5 rounded shadow-sm text-sm hover:bg-slate-50 font-medium">
                     📄 导出档案
                 </button>
                 <button className="flex-1 bg-blue-600 text-white py-1.5 rounded shadow-sm text-sm hover:bg-blue-700 font-medium">
                     👁️ 加入监控
                 </button>
             </div>
         </div>

         {/* Content Scroll Area */}
         <div className="flex-1 overflow-y-auto p-8 space-y-8">
             {/* Personal Attributes */}
             <section>
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                     个人属性 (Person Attributes)
                 </h3>
                 <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                     {data.basicInfo.map((attr, i) => (
                         <div key={i}>
                             <div className="text-xs text-slate-500 mb-1">{attr.label}</div>
                             <div className="text-sm font-medium text-slate-800 break-words">{attr.value}</div>
                         </div>
                     ))}
                 </div>
             </section>

             {/* Contact Info */}
             <section>
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                     联系方式 (Contact Info)
                 </h3>
                 <div className="space-y-4">
                     {data.contactInfo.map((attr, i) => (
                         <div key={i} className="flex flex-col">
                             <span className="text-xs text-slate-500 mb-1">{attr.label}</span>
                             <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm font-mono text-slate-700 select-all">
                                 {attr.value}
                             </div>
                         </div>
                     ))}
                 </div>
             </section>

             {/* Metadata & Lineage */}
             <section className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
                 <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4">
                     元数据 (Metadata)
                 </h3>
                 <div className="space-y-4">
                     <div>
                         <span className="block text-xs text-slate-500 mb-1">发布来源 (Publishing Source)</span>
                         <span className="font-medium text-slate-800">OFAC SDN List, EU Sanctions List</span>
                     </div>
                     <div>
                         <span className="block text-xs text-slate-500 mb-1">关联数据集 (Dataset)</span>
                         <span className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
                             🗃️ {data.sourceDataset.name}
                         </span>
                     </div>
                 </div>
             </section>
         </div>

         {/* Footer Actions (Two Entrances) */}
         <div className="p-4 border-t border-slate-200 bg-slate-50 flex gap-3 shrink-0">
             <button className="flex-1 py-2.5 text-slate-600 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-sm">
                 查看完整档案
             </button>
             <button className="flex-1 py-2.5 text-white bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                 进入数据集 <span>›</span>
             </button>
         </div>
      </div>
    </div>
  );
};
