import React, { useState } from 'react';
import { UploadFile, DatasetTask, ParsingMethod } from './types';
import { ArchiveService } from './ArchiveService';
import { NasExplorer } from './UploadSources';
import { FtpConfig } from './UploadSources';

interface TaskCreatorProps {
  task: DatasetTask;
  onUpdateName: (name: string) => void;
  onMinimize: () => void;
  uploadQueue: UploadFile[];
  onAddFiles: (files: Omit<UploadFile, 'taskId'>[]) => void;
  onTogglePause: (id: string) => void;
  onDeleteFile: (id: string) => void;
  onTryDecompress: (id: string) => void;
}

export const TaskCreator: React.FC<TaskCreatorProps> = ({ 
    task, onUpdateName, onMinimize, uploadQueue, onAddFiles, onTogglePause, onDeleteFile, onTryDecompress
}) => {
  const [scope, setScope] = useState<'public' | 'private'>(task.isPublic ? 'public' : 'private');
  const [unstructuredExt, setUnstructuredExt] = useState('.jpg;.doc;.docx;.xls;.pdf;.txt;.png;.ppt');
  const [structuredExt, setStructuredExt] = useState('.sql;.csv;.json;.xml');
  const [uploadMethod, setUploadMethod] = useState<'local' | 'nas' | 'ftp'>('local');

  const displayQueue = uploadQueue;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
    }
  };

  // 根据后缀判断解析方式
  const detectParsingMethod = (fileName: string): ParsingMethod => {
      const ext = '.' + fileName.split('.').pop()?.toLowerCase();
      
      // 使用 ArchiveService 判断
      if (ArchiveService.isArchive(fileName)) {
          return 'archive'; 
      }
      
      const structExts = structuredExt.split(';').map(s => s.trim().toLowerCase());
      if (structExts.some(s => s === ext)) {
          return 'structured';
      }
      return 'unstructured';
  };

  const processFiles = (fileList: FileList) => {
      const newFiles = Array.from(fileList).map((f, index) => ({
          id: Date.now() + '-' + index,
          name: f.name,
          size: f.size,
          uploaded: 0,
          speed: 0,
          progress: 0,
          status: 'waiting' as const,
          parsingMethod: detectParsingMethod(f.name)
      }));
      onAddFiles(newFiles);
  };

  const formatSize = (bytes: number) => {
      if(bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getActionButtons = (file: UploadFile) => {
      if (file.parsingMethod === 'pending_decompression') {
          return (
             <div className="flex items-center justify-end gap-3 text-xs font-medium">
                <button 
                    onClick={() => onTryDecompress(file.id)} 
                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 animate-pulse"
                >
                    🔐 点击解压
                </button>
                <button onClick={() => onDeleteFile(file.id)} className="text-slate-400 hover:text-red-600 hover:underline">删除</button>
             </div>
          );
      }

      return (
          <div className="flex items-center justify-end gap-3 text-xs font-medium">
             {file.status === 'completed' ? (
                 <>
                    {/* 压缩包本身不显示查看解析，只允许删除或作为源文件存在 */}
                    {file.parsingMethod !== 'archive' && (
                        <button className="text-blue-600 hover:text-blue-800 hover:underline">查看解析</button>
                    )}
                    <button 
                        onClick={() => onDeleteFile(file.id)} 
                        className="text-slate-400 hover:text-red-600 hover:underline">
                        删除
                    </button>
                 </>
             ) : (
                 <>
                    {(file.status === 'uploading' || file.status === 'paused') && (
                        <button 
                            onClick={() => onTogglePause(file.id)} 
                            className={`${file.status === 'paused' ? 'text-green-600' : 'text-orange-500'} hover:underline`}
                        >
                            {file.status === 'paused' ? '▶ 继续' : '⏸ 暂停'}
                        </button>
                    )}
                    <button 
                        onClick={() => onDeleteFile(file.id)} 
                        className="text-red-500 hover:text-red-700 hover:underline">
                        删除
                    </button>
                 </>
             )}
          </div>
      );
  };

  const getParsingMethodLabel = (file: UploadFile) => {
      switch(file.parsingMethod) {
          case 'structured': return <span className="px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-700">数据库解析</span>;
          case 'unstructured': return <span className="px-2 py-0.5 rounded text-xs bg-cyan-100 text-cyan-700">非结构化</span>;
          case 'archive': return <span className="px-2 py-0.5 rounded text-xs bg-indigo-100 text-indigo-700">自动解压</span>;
          case 'pending_decompression': return <span className="px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-700 font-bold">待解压</span>;
          default: return null;
      }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
        {/* Header Configuration */}
        <div className="px-8 py-6 border-b border-slate-200 flex justify-between items-start bg-white z-10 shrink-0">
            <div className="space-y-4 max-w-4xl flex-1">
                <div className="flex items-center gap-6">
                    <input 
                        type="text" 
                        value={task.name}
                        onChange={(e) => onUpdateName(e.target.value)}
                        className="text-2xl font-extrabold text-slate-800 bg-transparent border-b-2 border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none w-64 transition-all" 
                    />
                     <div className="flex items-center gap-6 text-sm">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
                            <input type="radio" name="scope" checked={scope === 'public'} onChange={() => setScope('public')} className="w-4 h-4 text-blue-600" /> 
                            公开
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
                            <input type="radio" name="scope" checked={scope === 'private'} onChange={() => setScope('private')} className="w-4 h-4 text-blue-600" /> 
                            私有
                        </label>
                    </div>
                </div>
                
                <div className="space-y-3">
                    <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                        <span className="text-slate-700 font-medium text-sm">非结构化配置</span>
                        <input 
                            type="text"
                            value={unstructuredExt}
                            onChange={(e) => setUnstructuredExt(e.target.value)}
                            className="border border-slate-300 rounded px-3 py-1.5 text-slate-600 bg-white text-sm shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none w-full"
                        />
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                        <span className="text-slate-700 font-medium text-sm">结构化配置</span>
                        <input 
                             type="text"
                             value={structuredExt}
                             onChange={(e) => setStructuredExt(e.target.value)}
                             className="border border-slate-300 rounded px-3 py-1.5 text-slate-600 bg-white text-sm shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none w-full"
                        />
                    </div>
                </div>
            </div>
            
            <button 
                onClick={onMinimize} 
                className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 text-sm flex items-center gap-2 transition-all px-4 py-2 rounded-lg border border-transparent hover:border-blue-200"
            >
                <span>后台最小化</span> 
                <span className="text-lg mb-1">🗕</span>
            </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col px-8 py-6 overflow-hidden bg-white">
            {/* Tabs */}
            <div className="flex items-end gap-10 border-b-2 border-slate-100 mb-6 shrink-0">
                <h3 className="text-3xl font-extrabold text-slate-800 pb-2">提交数据</h3>
                <div className="flex gap-8 text-lg pb-2.5">
                    {[
                        {id: 'local', label: '文件/文件夹上传'},
                        {id: 'nas', label: 'NAS挂载'},
                        {id: 'ftp', label: 'FTP'}
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setUploadMethod(tab.id as any)}
                            className={`font-medium transition-colors ${
                                uploadMethod === tab.id 
                                ? 'text-slate-800 font-bold border-b-4 border-slate-800 -mb-[13px] pb-3 z-10' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic Content based on Tab */}
            <div className="flex-1 flex flex-col overflow-hidden">
                
                {/* 1. Drag & Drop Area */}
                {uploadMethod === 'local' && (
                    <div 
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="mb-6 shrink-0 border-2 border-dashed border-slate-300 rounded-xl h-40 flex flex-col items-center justify-center text-slate-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer group relative"
                    >
                        <input 
                            type="file" 
                            multiple 
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => e.target.files && processFiles(e.target.files)}
                        />
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">☁️</div>
                        <div className="font-medium">点击或拖拽文件到此处上传</div>
                        <div className="text-xs mt-1 opacity-70">
                            支持 .zip, .rar 等压缩包自动解压 | 多文件并发 | 单文件最大 15GB
                        </div>
                    </div>
                )}

                {uploadMethod === 'nas' && <NasExplorer onAddFiles={onAddFiles} />}
                {uploadMethod === 'ftp' && <FtpConfig />}

                {/* 2. Upload Queue List */}
                {displayQueue.length > 0 && uploadMethod === 'local' && (
                    <div className="flex-1 overflow-y-auto pr-2 border-t border-slate-100 pt-4">
                        <div className="flex justify-between items-center mb-2 px-2 bg-slate-50 py-2 rounded-t border-b border-slate-200">
                             <span className="text-sm font-bold text-slate-700 pl-2">文件列表 ({displayQueue.length})</span>
                             <div className="flex items-center gap-8 text-xs font-semibold text-slate-500 mr-2">
                                <span className="w-24 text-right">大小</span>
                                <span className="w-24 text-right">上传进度</span>
                                <span className="w-24 text-left">解析方式</span>
                                <span className="w-32 text-right">操作</span>
                             </div>
                        </div>
                        <div className="space-y-2">
                            {displayQueue.map((file, idx) => (
                                <div key={file.id} className="relative py-3 group border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded px-2 transition-colors">
                                    <div className="flex justify-between items-center relative z-10 mb-2">
                                        <div className="flex flex-col justify-center w-1/3 overflow-hidden">
                                            <div className="flex items-center gap-4">
                                                <span className="text-slate-400 font-mono text-sm w-6 shrink-0">{idx + 1}</span>
                                                <span className="truncate font-medium text-slate-700 text-base" title={file.name}>{file.name}</span>
                                            </div>
                                            {/* 显示来源压缩包信息 */}
                                            {file.sourceArchive && (
                                                <div className="pl-10 text-xs text-slate-400 flex items-center gap-1">
                                                    <span>↳ 来源: {file.sourceArchive}</span>
                                                    {file.extractedPath && <span className="font-mono bg-slate-100 px-1 rounded">目录: {file.extractedPath}</span>}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-8 text-sm">
                                            <span className="w-24 text-right text-slate-600">{formatSize(file.size)}</span>
                                            
                                            <div className="w-24 text-right">
                                                {file.status === 'uploading' ? (
                                                     <span className="text-blue-600 font-mono">{formatSize(file.speed)}/s</span>
                                                ) : file.status === 'paused' ? (
                                                     <span className="text-orange-500 text-xs">已暂停</span>
                                                ) : file.status === 'completed' ? (
                                                     <span className="text-green-600 text-xs">100%</span>
                                                ) : (
                                                     <span className="text-slate-400 text-xs">--</span>
                                                )}
                                            </div>

                                            <div className="w-24 text-left">
                                                {getParsingMethodLabel(file)}
                                            </div>

                                            <div className="w-32 text-right">
                                                {getActionButtons(file)}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    {(file.status === 'uploading' || file.status === 'paused') && (
                                        <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden shadow-inner mx-1 mt-1">
                                            <div 
                                                className={`absolute top-0 left-0 h-full transition-all duration-300 ease-out ${
                                                    file.status === 'paused' ? 'bg-orange-400' : 'bg-blue-500'
                                                }`}
                                                style={{width: `${file.progress}%`}}
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
