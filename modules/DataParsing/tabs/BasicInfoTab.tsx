import React from 'react';
import { StructuredFile } from '../types';

export const DetailBasicInfo = ({ file }: { file: StructuredFile }) => {
  const infoGrid = [
    { label: '文件名称', value: file.name },
    { label: '文件哈希 (SHA256)', value: file.fileHash, mono: true },
    { label: '文件大小', value: `${file.size.toLocaleString()} Bytes` },
    { label: '文件类型', value: file.fileType },
    { label: '数据库类型', value: file.dbType || '-' },
    { label: '解析记录数', value: `${file.recordCount.toLocaleString()} 条` },
    { label: '归属数据集', value: file.datasetName },
    { label: '来源方式', value: file.sourceType },
    { label: '来源压缩包', value: file.sourceArchive || '-' },
    { label: '文件源路径', value: file.sourcePath || '-' },
  ];

  return (
    <div className="h-full overflow-y-auto p-8">
      <h4 className="text-lg font-bold text-slate-800 mb-6 border-l-4 border-cyan-600 pl-3">结构化数据属性</h4>
      
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-10">
        {infoGrid.map((item, idx) => (
            <div key={idx} className="flex flex-col border-b border-slate-100 pb-2">
                <span className="text-xs font-semibold text-slate-400 mb-1">{item.label}</span>
                <span className={`text-slate-800 text-sm ${item.mono ? 'font-mono text-xs break-all' : ''}`}>{item.value}</span>
            </div>
        ))}
      </div>

      <h4 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-purple-600 pl-3 flex items-center gap-2">
          <span>🧠</span> AI 结构理解摘要
      </h4>
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl p-6 relative">
          <div className="text-cyan-200 text-6xl absolute top-2 right-4 opacity-20">❝</div>
          <p className="text-slate-700 leading-relaxed relative z-10 text-justify">
              {file.aiStructureSummary || '正在分析文件结构...'}
          </p>
      </div>
    </div>
  );
};
