import React, { useState } from 'react';
import { mockStructuredFiles } from './mockData';
import { StructuredFile, ParsingStatus } from './types';
import { StructuredFileDetailModal } from './FileDetailModal';

export const DataParsingModule = () => {
  const [files, setFiles] = useState<StructuredFile[]>(mockStructuredFiles);
  const [selectedFile, setSelectedFile] = useState<StructuredFile | null>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderParsingBadge = (status: ParsingStatus) => {
    const config = {
      success: { color: 'bg-green-50 text-green-700 border-green-200', label: '解析成功' },
      processing: { color: 'bg-blue-50 text-blue-700 border-blue-200', label: '解析中...' },
      failed: { color: 'bg-red-50 text-red-700 border-red-200', label: '解析失败' },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs border ${c.color} font-medium`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      <div className="px-8 py-6 border-b border-slate-200 bg-white flex justify-between items-center shadow-sm">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">结构化数据解析</h2>
            <p className="text-sm text-slate-500 mt-1">智能识别 SQL/CSV/Excel/JSON 结构，自动提取高价值字段映射</p>
        </div>
        <div className="flex gap-3">
             <input type="text" placeholder="搜索文件名/表名..." className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold">
              <tr>
                <th className="px-6 py-4">文件名</th>
                <th className="px-6 py-4">所属数据集</th>
                <th className="px-6 py-4">来源</th>
                <th className="px-6 py-4">大小</th>
                <th className="px-6 py-4">文件类型</th>
                <th className="px-6 py-4">数据库/版本</th>
                <th className="px-6 py-4">解析记录数</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-cyan-50/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                    <span className="text-xl">
                        {file.fileType === 'SQL' ? '🗄️' : file.fileType === 'CSV' ? '📊' : file.fileType === 'JSON' ? '{}' : '📄'}
                    </span> 
                    {file.name}
                  </td>
                  <td className="px-6 py-4">{file.datasetName}</td>
                  <td className="px-6 py-4 text-slate-500">{file.sourceType}</td>
                  <td className="px-6 py-4 font-mono text-slate-500">{formatSize(file.size)}</td>
                  <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold text-slate-600">{file.fileType}</span></td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{file.dbType || '-'}</td>
                  <td className="px-6 py-4 font-mono">{file.recordCount > 0 ? file.recordCount.toLocaleString() : '-'}</td>
                  <td className="px-6 py-4">{renderParsingBadge(file.parsingStatus)}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => setSelectedFile(file)}
                        className="text-cyan-600 hover:text-cyan-800 font-medium hover:underline flex items-center justify-end gap-1 ml-auto"
                    >
                        <span>👁️</span> 查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {files.length === 0 && (
             <div className="p-10 text-center text-slate-400">暂无数据，请先上传结构化文件。</div>
          )}
        </div>
      </div>

      {/* 详情弹窗 */}
      {selectedFile && (
        <StructuredFileDetailModal 
            file={selectedFile} 
            onClose={() => setSelectedFile(null)} 
            onUpdateFile={(updatedFile) => {
                setFiles(prev => prev.map(f => f.id === updatedFile.id ? updatedFile : f));
                setSelectedFile(updatedFile); 
            }}
        />
      )}
    </div>
  );
};
