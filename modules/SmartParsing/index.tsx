import React, { useState } from 'react';
import { mockFiles } from './mockData';
import { SmartFile, SecurityStatus, ParsingStatus } from './types';
import { FileDetailModal } from './FileDetailModal';

export const SmartParsingModule = () => {
  const [files, setFiles] = useState<SmartFile[]>(mockFiles);
  const [selectedFile, setSelectedFile] = useState<SmartFile | null>(null);

  // 格式化大小
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 状态徽章渲染
  const renderSecurityBadge = (status: SecurityStatus) => {
    const config = {
      safe: { color: 'bg-green-100 text-green-700', label: '安全', icon: '🛡️' },
      dangerous: { color: 'bg-red-100 text-red-700', label: '危险', icon: '☣️' },
      suspicious: { color: 'bg-orange-100 text-orange-700', label: '可疑', icon: '⚠️' },
      unknown: { color: 'bg-slate-200 text-slate-600', label: '未知', icon: '❓' },
    };
    const c = config[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${c.color}`}>
        {c.icon} {c.label}
      </span>
    );
  };

  const renderParsingBadge = (status: ParsingStatus) => {
    const config = {
      success: { color: 'bg-blue-50 text-blue-700 border-blue-200', label: '解析成功' },
      processing: { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', label: '解析中...' },
      failed: { color: 'bg-red-50 text-red-700 border-red-200', label: '解析失败' },
    };
    const c = config[status];
    return (
      <span className={`px-2 py-0.5 rounded text-xs border ${c.color}`}>
        {c.label}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      <div className="px-8 py-6 border-b border-slate-200 bg-white flex justify-between items-center shadow-sm">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">非结构化数据智能解析</h2>
            <p className="text-sm text-slate-500 mt-1">自动识别、安全检测与高价值信息提取</p>
        </div>
        <div className="flex gap-3">
             <input type="text" placeholder="搜索文件名/数据集..." className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
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
                <th className="px-6 py-4">安全检测</th>
                <th className="px-6 py-4">解析状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                    <span className="text-xl">📄</span> {file.name}
                  </td>
                  <td className="px-6 py-4">{file.datasetName}</td>
                  <td className="px-6 py-4 text-slate-500">{file.sourceType}</td>
                  <td className="px-6 py-4 font-mono text-slate-500">{formatSize(file.size)}</td>
                  <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold text-slate-600">{file.fileType}</span></td>
                  <td className="px-6 py-4">{renderSecurityBadge(file.securityStatus)}</td>
                  <td className="px-6 py-4">{renderParsingBadge(file.parsingStatus)}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                        onClick={() => setSelectedFile(file)}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center justify-end gap-1 ml-auto"
                    >
                        <span>👁️</span> 查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {files.length === 0 && (
             <div className="p-10 text-center text-slate-400">暂无数据，请先前往“数据导入”模块上传文件。</div>
          )}
        </div>
      </div>

      {/* 文件详情弹窗 */}
      {selectedFile && (
        <FileDetailModal 
            file={selectedFile} 
            onClose={() => setSelectedFile(null)} 
            onUpdateFile={(updatedFile) => {
                setFiles(prev => prev.map(f => f.id === updatedFile.id ? updatedFile : f));
                setSelectedFile(updatedFile); // Update modal view
            }}
        />
      )}
    </div>
  );
};
