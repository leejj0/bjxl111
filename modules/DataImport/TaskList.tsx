import React, { useState } from 'react';
import { DatasetTask, UploadFile } from './types';

interface TaskListProps {
  tasks: DatasetTask[];
  onCreate: () => void;
  onView: (task: DatasetTask) => void;
  uploadQueue: UploadFile[];
  onMaximize: () => void;
  onTogglePause: (id: string) => void;
  onDeleteFile: (id: string) => void;
  onTryDecompress: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ 
    tasks, onCreate, onView, uploadQueue, onMaximize, onTogglePause, onDeleteFile, onTryDecompress
}) => {
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

  // 计算全局正在上传的数量（用于悬浮球）
  const globalPendingCount = uploadQueue.filter(f => f.status === 'uploading' || f.status === 'waiting' || f.status === 'paused').length;

  const toggleExpand = (id: number) => {
      setExpandedTaskId(prev => prev === id ? null : id);
  };

  const formatSize = (bytes: number) => {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getParsingMethodLabel = (file: UploadFile) => {
      switch(file.parsingMethod) {
          case 'structured': return <span className="px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-700">数据库解析</span>;
          case 'unstructured': return <span className="px-2 py-0.5 rounded text-xs bg-cyan-50 text-cyan-700">非结构化</span>;
          case 'archive': return <span className="px-2 py-0.5 rounded text-xs bg-indigo-50 text-indigo-700">自动解压</span>;
          case 'pending_decompression': return <span className="px-2 py-0.5 rounded text-xs bg-amber-50 text-amber-700 font-bold">待解压</span>;
          default: return null;
      }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      <div className="px-6 py-5 border-b border-slate-200 shadow-sm z-10 flex justify-between items-center bg-white">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">创建任务 提交数据</h2>
        <button 
            onClick={onCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium shadow transition-colors"
        >
            + 新建任务
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-slate-50">
        <div className="bg-white border border-slate-300 rounded shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-300 text-slate-700 text-sm">
              <tr>
                <th className="p-4 font-semibold w-12"></th>
                <th className="p-4 font-semibold">名称</th>
                <th className="p-4 font-semibold">用户</th>
                <th className="p-4 font-semibold">文件数</th>
                <th className="p-4 font-semibold">数据量</th>
                <th className="p-4 font-semibold">创建时间</th>
                <th className="p-4 font-semibold">更新时间</th>
                <th className="p-4 font-semibold text-right pr-6">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {tasks.map((task) => {
                const taskFiles = uploadQueue.filter(f => f.taskId === task.id);
                const fileCount = taskFiles.length;
                const totalSize = taskFiles.reduce((acc, curr) => acc + curr.size, 0);
                const isExpanded = expandedTaskId === task.id;

                const sortedFiles = [...taskFiles].sort((a, b) => {
                    const scoreA = (a.status === 'uploading' || a.status === 'paused') ? 3 : a.status === 'waiting' ? 2 : 1;
                    const scoreB = (b.status === 'uploading' || b.status === 'paused') ? 3 : b.status === 'waiting' ? 2 : 1;
                    if (scoreA !== scoreB) return scoreB - scoreA;
                    // 若 sourceArchive 相同，把衍生的放下面
                    if (a.sourceArchive === b.name) return -1;
                    if (b.sourceArchive === a.name) return 1;
                    return parseInt(b.id) - parseInt(a.id);
                });

                const top10Files = sortedFiles.slice(0, 10);
                const hasMore = sortedFiles.length > 10;

                return (
                  <React.Fragment key={task.id}>
                    <tr className={`hover:bg-blue-50/30 transition-colors border-b border-slate-200 ${isExpanded ? 'bg-blue-50/20' : ''}`}>
                        <td className="p-4 text-center cursor-pointer" onClick={() => toggleExpand(task.id)}>
                            <span className={`inline-block transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
                        </td>
                        <td className="p-4 font-medium cursor-pointer" onClick={() => toggleExpand(task.id)}>
                            <div className="flex items-center gap-2">
                                {task.name}
                                {!task.isPublic && <span className="px-1.5 py-0.5 bg-slate-200 text-slate-600 text-xs rounded">私有</span>}
                            </div>
                        </td>
                        <td className="p-4">{task.user}</td>
                        <td className="p-4">{fileCount}个</td>
                        <td className="p-4">{formatSize(totalSize)}</td>
                        <td className="p-4 text-slate-500">{task.created}</td>
                        <td className="p-4 text-slate-500">{task.updated}</td>
                        <td className="p-4 text-right pr-6">
                            <button 
                                onClick={() => onView(task)}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                详情/上传
                            </button>
                        </td>
                    </tr>
                    
                    {isExpanded && (
                        <tr>
                            <td colSpan={8} className="p-0 border-b border-slate-300">
                                <div className="bg-slate-50 p-4 pl-12 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
                                    {taskFiles.length === 0 ? (
                                        <div className="text-slate-400 py-2 italic">暂无文件，点击"详情/上传"添加数据</div>
                                    ) : (
                                        <div className="w-full max-w-6xl">
                                            <table className="w-full text-xs">
                                                <thead className="text-slate-500 font-medium border-b border-slate-200">
                                                    <tr>
                                                        <th className="pb-2 text-left w-1/4">文件</th>
                                                        <th className="pb-2 text-left">大小</th>
                                                        <th className="pb-2 text-left">状态</th>
                                                        <th className="pb-2 text-left">解析方式</th>
                                                        <th className="pb-2 text-left w-1/4">进度</th>
                                                        <th className="pb-2 text-right">操作</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-slate-700">
                                                    {top10Files.map((f) => (
                                                        <tr key={f.id} className="border-b border-slate-100 last:border-0 hover:bg-white transition-colors">
                                                            <td className="py-2.5 pr-2 truncate" title={f.name}>
                                                                <div>{f.name}</div>
                                                                {f.sourceArchive && <div className="text-[10px] text-slate-400">↳ 源: {f.sourceArchive}</div>}
                                                            </td>
                                                            <td>{formatSize(f.size)}</td>
                                                            <td>
                                                                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                                                                    f.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                                    f.status === 'uploading' ? 'bg-blue-100 text-blue-700' :
                                                                    f.status === 'paused' ? 'bg-orange-100 text-orange-700' :
                                                                    f.status === 'error' ? 'bg-red-100 text-red-700' :
                                                                    'bg-slate-200 text-slate-600'
                                                                }`}>
                                                                    {f.status === 'completed' ? '完成' : 
                                                                     f.status === 'uploading' ? '上传中' :
                                                                     f.status === 'paused' ? '暂停' :
                                                                     f.status === 'error' ? '错误' : '等待'}
                                                                </span>
                                                            </td>
                                                            <td>{getParsingMethodLabel(f)}</td>
                                                            <td className="pr-4">
                                                                {(f.status === 'uploading' || f.status === 'paused') ? (
                                                                    <div className="w-full bg-slate-200 rounded-full h-1.5 relative">
                                                                        <div 
                                                                            className={`h-1.5 rounded-full ${f.status === 'paused' ? 'bg-orange-400' : 'bg-blue-600'}`} 
                                                                            style={{width: `${f.progress}%`}}
                                                                        ></div>
                                                                    </div>
                                                                ) : f.status === 'completed' ? (
                                                                    <span className="text-green-600">100%</span>
                                                                ) : (
                                                                    <span className="text-slate-400">-</span>
                                                                )}
                                                            </td>
                                                            <td className="text-right flex items-center justify-end gap-2">
                                                                {f.parsingMethod === 'pending_decompression' ? (
                                                                     <>
                                                                        <button 
                                                                            onClick={() => onTryDecompress(f.id)} 
                                                                            className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                                                                        >
                                                                            🔐 解压
                                                                        </button>
                                                                        <button onClick={() => onDeleteFile(f.id)} className="text-slate-400 hover:text-red-500 hover:underline">删除</button>
                                                                     </>
                                                                ) : f.status === 'completed' ? (
                                                                    <>
                                                                        {f.parsingMethod !== 'archive' && (
                                                                            <button className="text-blue-600 hover:text-blue-800 hover:underline">查看解析</button>
                                                                        )}
                                                                        <button onClick={() => onDeleteFile(f.id)} className="text-slate-400 hover:text-red-500 hover:underline">删除</button>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {(f.status === 'uploading' || f.status === 'paused') && (
                                                                            <button 
                                                                                onClick={() => onTogglePause(f.id)} 
                                                                                className={`${f.status === 'paused' ? 'text-green-600' : 'text-orange-500'} hover:underline`}
                                                                            >
                                                                                {f.status === 'paused' ? '继续' : '暂停'}
                                                                            </button>
                                                                        )}
                                                                        <button onClick={() => onDeleteFile(f.id)} className="text-red-500 hover:text-red-700 hover:underline">删除</button>
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    
                                                    {hasMore && (
                                                        <tr>
                                                            <td colSpan={6} className="pt-3 text-center">
                                                                <button 
                                                                    onClick={(e) => { e.stopPropagation(); onView(task); }}
                                                                    className="text-slate-400 hover:text-blue-600 hover:underline text-xs flex items-center justify-center w-full gap-1 transition-colors"
                                                                >
                                                                    <span>... 数据库总共 {taskFiles.length} 个文件</span>
                                                                    <span>(点击查看详情)</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 悬浮上传窗口 (最小化状态) */}
      {globalPendingCount > 0 && (
        <div 
            onClick={onMaximize}
            className="absolute bottom-6 right-6 z-20 bg-white border border-slate-300 rounded shadow-2xl overflow-hidden w-64 cursor-pointer hover:-translate-y-1 transition-transform animate-fade-in-up"
        >
             <div className="bg-blue-600 h-1.5 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
             </div>
             <div className="p-4 flex items-center justify-between bg-slate-50">
                <div>
                     <div className="text-sm font-bold text-slate-800">正在上传数据...</div>
                     <div className="text-xs text-slate-500 mt-1">后台最小化运行中</div>
                </div>
                <div className="relative">
                    <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-sm">
                        📂
                    </div>
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                        {globalPendingCount}
                    </div>
                </div>
             </div>
        </div>
      )}
    </div>
  );
};
