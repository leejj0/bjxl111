import React from 'react';
import { StructuredFile } from '../types';

export const DetailDataPreview = ({ file }: { file: StructuredFile }) => {
  const { previewData, fileType } = file;

  const isTableData = (data: any): data is { headers: string[], rows: any[][] } => {
      return typeof data === 'object' && data !== null && 'headers' in data && 'rows' in data;
  };

  return (
    <div className="h-full flex flex-col bg-white">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center shrink-0">
            <div className="text-sm text-slate-600">
                <span className="font-bold mr-2">数据预览</span>
                <span className="text-slate-400">
                    (仅展示前 {fileType === 'JSON' ? '50 个对象' : '100 行'}，实际解析需等待任务完成)
                </span>
            </div>
            <div className="flex gap-2">
                <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono text-slate-500">
                    Format: {fileType}
                </span>
            </div>
        </div>

        <div className="flex-1 overflow-auto p-0">
            {typeof previewData === 'string' ? (
                // 纯文本/JSON 预览
                <pre className="p-4 font-mono text-xs text-slate-700 whitespace-pre-wrap">
                    {previewData}
                </pre>
            ) : isTableData(previewData) ? (
                // 表格预览
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 text-slate-600 text-xs font-bold uppercase sticky top-0 shadow-sm z-10">
                        <tr>
                            <th className="p-3 w-12 text-center border-b border-slate-200">#</th>
                            {previewData.headers.map((h, i) => (
                                <th key={i} className="p-3 border-b border-slate-200 whitespace-nowrap border-r border-slate-200 last:border-r-0 min-w-[100px]">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                        {previewData.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-blue-50/30 transition-colors">
                                <td className="p-3 text-center text-slate-400 font-mono text-xs bg-slate-50">{rIdx + 1}</td>
                                {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-3 border-r border-slate-100 last:border-r-0 truncate max-w-[200px]" title={String(cell)}>
                                        {String(cell)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="p-10 text-center text-slate-400">无法预览数据</div>
            )}
        </div>
    </div>
  );
};
