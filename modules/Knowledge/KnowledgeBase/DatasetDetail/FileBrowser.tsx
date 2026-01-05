import React, { useState } from 'react';
import { mockFiles } from '../../mockData';
import { KnowledgeFile } from '../../types';

export const FileBrowser = () => {
    const [files, setFiles] = useState<KnowledgeFile[]>(mockFiles);
    const [previewFile, setPreviewFile] = useState<KnowledgeFile | null>(null);

    const formatSize = (bytes?: number) => {
        if (!bytes) return '-';
        return (bytes / 1024).toFixed(2) + ' KB';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="h-12 border-b border-slate-200 flex items-center justify-between px-4 bg-slate-50 shrink-0">
                <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600" title="Grid View">📅</button>
                    <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600" title="List View">☰</button>
                    <div className="h-4 w-px bg-slate-300 mx-2 self-center"></div>
                    <button className="px-3 py-1 bg-white border border-slate-300 rounded text-sm hover:bg-slate-100">批量操作 ⌄</button>
                </div>
                <div className="flex gap-2">
                    <span className="text-slate-400 cursor-pointer hover:text-blue-600">🔍</span>
                    <span className="text-slate-400 cursor-pointer hover:text-blue-600">⬇️</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* File List Pane */}
                <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${previewFile ? 'border-r border-slate-200' : ''}`}>
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-1">
                            {files.map(file => (
                                <div 
                                    key={file.id} 
                                    className={`flex items-center p-3 rounded-lg cursor-pointer group border-b border-slate-50 last:border-0 transition-colors ${
                                        previewFile?.id === file.id ? 'bg-blue-100 border-blue-100' : 'hover:bg-blue-50'
                                    }`}
                                    onClick={() => file.type === 'file' && setPreviewFile(file)}
                                >
                                    <div className="w-10 text-2xl text-center mr-3">
                                        {file.type === 'folder' ? '📁' : '📄'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-sm font-medium truncate ${previewFile?.id === file.id ? 'text-blue-900' : 'text-slate-700 group-hover:text-blue-700'}`}>
                                            {file.name}
                                        </div>
                                        <div className="text-xs text-slate-400 flex gap-3 mt-0.5 whitespace-nowrap">
                                            <span>{file.type === 'folder' ? `${file.children?.length || 0} 个项目` : formatSize(file.size)}</span>
                                            <span className="hidden sm:inline">|</span>
                                            <span className="hidden sm:inline">{file.updatedAt}</span>
                                            {file.status && (
                                                <>
                                                    <span className="hidden sm:inline">|</span>
                                                    <span className={`${file.status === 'parsed' ? 'text-green-500' : 'text-orange-500'}`}>
                                                        {file.status === 'parsed' ? '解析完成' : '解析中'}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`opacity-0 group-hover:opacity-100 flex gap-2 ${previewFile?.id === file.id ? 'opacity-100' : ''}`}>
                                        <button className="text-xs text-blue-600 hover:underline">下载</button>
                                        <button className="text-xs text-slate-500 hover:text-red-500 hover:underline">删除</button>
                                    </div>
                                </div>
                            ))}
                            <div className="text-center text-xs text-slate-300 mt-6 pb-2">没有更多内容了</div>
                        </div>
                    </div>
                </div>

                {/* Preview Pane */}
                {previewFile && (
                    <div className="w-[500px] bg-slate-50 flex flex-col shrink-0 shadow-[inset_4px_0_10px_-4px_rgba(0,0,0,0.1)] transition-all duration-300">
                         <div className="h-12 border-b border-slate-200 flex justify-between items-center px-4 bg-white shrink-0">
                             <h3 className="font-bold text-slate-700 truncate max-w-[300px]" title={previewFile.name}>{previewFile.name}</h3>
                             <div className="flex items-center gap-2">
                                <button className="p-1 hover:bg-slate-100 rounded text-slate-500" title="全屏">⛶</button>
                                <button onClick={() => setPreviewFile(null)} className="p-1 hover:bg-slate-100 rounded text-slate-500 text-lg leading-none" title="关闭">&times;</button>
                             </div>
                         </div>
                         <div className="flex-1 p-6 flex flex-col items-center justify-center overflow-y-auto">
                             <div className="text-6xl mb-4 text-slate-300">📄</div>
                             <p className="text-slate-500 mb-4 font-medium">在线预览渲染区域</p>
                             <div className="bg-white p-6 rounded shadow-sm border border-slate-200 w-full text-sm text-slate-600 leading-relaxed">
                                 <div className="mb-4 pb-4 border-b border-slate-100">
                                    <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">File Info</span>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><span className="text-slate-500">Size:</span> {formatSize(previewFile.size)}</div>
                                        <div><span className="text-slate-500">Type:</span> {previewFile.name.split('.').pop()?.toUpperCase()}</div>
                                        <div><span className="text-slate-500">Date:</span> {previewFile.updatedAt}</div>
                                    </div>
                                 </div>
                                 <div>
                                     这里是模拟的文件内容预览。<br/>
                                     实际上这里会渲染 PDF Canvas, Word Viewer 或 Text Editor。<br/>
                                     支持缩放、查找、复制等操作。
                                 </div>
                             </div>
                             <div className="mt-auto pt-6 flex gap-3">
                                 <button className="px-4 py-2 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 text-sm">下载文件</button>
                                 <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded shadow-sm hover:bg-slate-50 text-sm">分享</button>
                             </div>
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};
