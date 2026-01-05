import React from 'react';
import { DatabaseTopic, RiskLevel } from '../types';

interface Props {
  topic: DatabaseTopic;
  onClick: () => void;
}

export const TopicCard: React.FC<Props> = ({ topic, onClick }) => {
  const getRiskBadge = (level: RiskLevel) => {
      const styles = {
          high: 'bg-red-50 text-red-600 border-red-100',
          medium: 'bg-orange-50 text-orange-600 border-orange-100',
          low: 'bg-green-50 text-green-600 border-green-100'
      };
      const labels = { high: '高风险', medium: '中风险', low: '低风险' };
      
      return (
          <span className={`px-2 py-0.5 rounded text-xs border font-medium ${styles[level]}`}>
              {labels[level]}
          </span>
      );
  };

  return (
    <div 
        onClick={onClick}
        className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-full"
    >
        <div className="flex justify-between items-start mb-4">
             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md">
                 {topic.title.includes('人') ? '👥' : topic.title.includes('凭据') ? '🔑' : topic.title.includes('资产') ? '🖥️' : '🗃️'}
             </div>
             {getRiskBadge(topic.riskLevel)}
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
            {topic.title}
        </h3>
        
        <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-3 flex-1">
            {topic.description}
        </p>

        {/* Fields Preview */}
        <div className="mb-6 bg-slate-50 rounded-lg p-3 border border-slate-100">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">包含核心字段</div>
            <div className="flex flex-wrap gap-2">
                {topic.fields.slice(0, 4).map(f => (
                    <span key={f} className="text-xs bg-white text-slate-600 px-2 py-1 rounded border border-slate-200 shadow-sm">
                        {f}
                    </span>
                ))}
                {topic.fields.length > 4 && <span className="text-xs text-slate-400 self-center">...</span>}
            </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
             <div className="flex items-center gap-4">
                 <div className="flex flex-col">
                     <span className="text-xs text-slate-400">总数据量</span>
                     <span className="font-bold text-slate-700 font-mono">{topic.recordCount.toLocaleString()}</span>
                 </div>
                 <div className="w-px h-6 bg-slate-200"></div>
                 <div className="flex flex-col">
                     <span className="text-xs text-slate-400">来源数据集</span>
                     <span className="font-bold text-slate-700 font-mono">{topic.sourceCount}</span>
                 </div>
             </div>
             <span className="text-xs text-slate-400">{topic.updatedAt.split(' ')[0]}</span>
        </div>
    </div>
  );
};
