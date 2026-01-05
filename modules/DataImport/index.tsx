import React, { useState, useEffect } from 'react';
import { TaskList } from './TaskList';
import { TaskCreator } from './TaskCreator';
import { ArchiveService } from './ArchiveService';
import { UploadFile, DatasetTask } from './types';
import { SmartParsingModule } from '../SmartParsing/index';
import { DataParsingModule } from '../DataParsing/index';
import { DataImportSidebar } from './Sidebar';

export const DataImportModule = () => {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');
  const [activeMenu, setActiveMenu] = useState('upload'); // 'upload' | 'smart_parsing' | 'data_parsing'
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [completedTaskName, setCompletedTaskName] = useState('');
  
  // 解压密码弹窗状态
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [passwordTargetFileId, setPasswordTargetFileId] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  
  // 任务列表状态
  const [tasks, setTasks] = useState<DatasetTask[]>([
    { id: 1, name: '12月3号数据', user: 'Admin', created: '2025.12.02', updated: '2025.12.06', isPublic: true },
    { id: 2, name: '财务报表源', user: 'User1', created: '2025.12.01', updated: '2025.12.05', isPublic: false },
  ]);

  // 全局上传队列
  const [uploadQueue, setUploadQueue] = useState<UploadFile[]>([]);
  
  // 当前正在操作的任务 ID
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

  // 辅助函数：触发通知
  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
      setToastMessage(msg);
      setToastType(type);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
  };

  // 并发控制 & 进度模拟
  useEffect(() => {
    const interval = setInterval(() => {
      setUploadQueue(prevQueue => {
        let activeCount = prevQueue.filter(f => f.status === 'uploading').length;
        let newQueue = [...prevQueue];
        const tasksCompletedInThisTick = new Set<number>();
        let filesAddedByExtraction = false;

        // 1. 检查是否有等待的文件需要开始 (最大并发 3)
        newQueue.forEach(file => {
          if (file.status === 'waiting' && activeCount < 3) {
            file.status = 'uploading';
            activeCount++;
          }
        });

        // 2. 更新进度
        newQueue.forEach((file) => {
          if (file.status === 'uploading') {
            const increment = 1024 * 1024 * 25; // 模拟 25MB/s
            file.uploaded = Math.min(file.uploaded + increment, file.size);
            file.progress = Math.floor((file.uploaded / file.size) * 100);
            file.speed = increment; 

            if (file.uploaded >= file.size) {
              file.status = 'completed';
              file.progress = 100;
              file.speed = 0;
              activeCount--; 

              // --- 压缩包处理逻辑 (调用 ArchiveService) ---
              if (ArchiveService.isArchive(file.name)) {
                  if (ArchiveService.checkPasswordNeeded(file.name)) {
                      file.parsingMethod = 'pending_decompression';
                  } else {
                      file.parsingMethod = 'archive';
                      // 标记为 Archive 后，将在下方的后处理中被识别并解压
                  }
              }

              // 检查任务完成
              const taskFiles = newQueue.filter(f => f.taskId === file.taskId);
              if (taskFiles.every(f => f.status === 'completed')) {
                 if (!newQueue.some(f => f.taskId === file.taskId && f.parsingMethod === 'pending_decompression')) {
                     tasksCompletedInThisTick.add(file.taskId);
                 }
              }
            }
          }
        });

        // 处理自动解压产生的文件
        const completedArchives = newQueue.filter(f => 
            f.status === 'completed' && 
            f.parsingMethod === 'archive' && 
            ArchiveService.isArchive(f.name)
        );

        const processedArchives = new Set(newQueue.filter(f => f.sourceArchive).map(f => f.sourceArchive));

        completedArchives.forEach(archive => {
            if (!processedArchives.has(archive.name)) {
                // 调用后端服务模拟解压
                const extractedFiles = ArchiveService.mockDecompress(archive);
                newQueue = [...newQueue, ...extractedFiles];
                filesAddedByExtraction = true;
            }
        });

        // 触发任务完成通知
        if (tasksCompletedInThisTick.size > 0 && !filesAddedByExtraction) {
           const completedId = Array.from(tasksCompletedInThisTick)[0];
           const task = tasks.find(t => t.id === completedId);
           if (task) {
             setCompletedTaskName(task.name);
             triggerToast(`数据集 "${task.name}" 所有文件已处理完毕。`);
           }
        }

        return newQueue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  // 创建新任务
  const handleCreateTask = () => {
    const newId = Date.now();
    const newTask: DatasetTask = {
        id: newId,
        name: '新建数据集',
        user: 'Admin',
        created: new Date().toLocaleDateString(),
        updated: new Date().toLocaleDateString(),
        isPublic: true
    };
    
    setTasks(prev => [newTask, ...prev]);
    setActiveTaskId(newId);
    setViewMode('create');
  };

  const handleViewTask = (task: DatasetTask) => {
    setActiveTaskId(task.id);
    setViewMode('create');
  };

  const handleUpdateTaskName = (name: string) => {
      if (activeTaskId) {
          setTasks(prev => prev.map(t => t.id === activeTaskId ? { ...t, name } : t));
      }
  };

  const handleAddFiles = (files: Omit<UploadFile, 'taskId'>[]) => {
    if (!activeTaskId) return;
    const newFiles: UploadFile[] = files.map(f => ({
        ...f,
        taskId: activeTaskId
    }));
    setUploadQueue(prev => [...prev, ...newFiles]);
  };

  const handleTogglePause = (fileId: string) => {
      setUploadQueue(prev => prev.map(f => {
          if (f.id === fileId) {
              if (f.status === 'uploading') return { ...f, status: 'paused', speed: 0 };
              if (f.status === 'paused') return { ...f, status: 'waiting' };
          }
          return f;
      }));
  };

  const handleDeleteFile = (fileId: string) => {
      setUploadQueue(prev => {
          const fileToDelete = prev.find(f => f.id === fileId);
          let newQueue = prev.filter(f => f.id !== fileId);
          // 如果删除的是压缩包，也要删除其解压出的文件
          if (fileToDelete && ArchiveService.isArchive(fileToDelete.name)) {
              newQueue = newQueue.filter(f => f.sourceArchive !== fileToDelete.name);
          }
          return newQueue;
      });
  };

  // 尝试解压（打开弹窗）
  const handleOpenDecompressModal = (fileId: string) => {
      setPasswordTargetFileId(fileId);
      setPasswordInput('');
      setPasswordModalOpen(true);
  };

  // 提交解压密码
  const handleSubmitPassword = () => {
      if (!passwordTargetFileId) return;

      if (ArchiveService.verifyPassword(passwordInput)) {
          setUploadQueue(prev => prev.map(f => {
              if (f.id === passwordTargetFileId) {
                  return { ...f, parsingMethod: 'archive' }; // 修改状态，触发下一次循环的解压
              }
              return f;
          }));
          triggerToast('密码正确，开始解压...', 'success');
          setPasswordModalOpen(false);
      } else {
          triggerToast('解压失败：密码错误', 'error');
      }
  };

  return (
    <div className="flex h-full w-full bg-slate-100 text-slate-800 font-sans relative">
      <DataImportSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      {/* 根据侧边栏选择渲染不同内容 */}
      {activeMenu === 'smart_parsing' ? (
          <div className="flex-1 overflow-hidden h-full">
            <SmartParsingModule />
          </div>
      ) : activeMenu === 'data_parsing' ? (
          <div className="flex-1 overflow-hidden h-full">
             <DataParsingModule />
          </div>
      ) : (
          /* 数据上传模块内容 */
          <>
            {viewMode === 'list' ? (
                <TaskList 
                    tasks={tasks} 
                    onCreate={handleCreateTask} 
                    onView={handleViewTask}
                    uploadQueue={uploadQueue}
                    onTogglePause={handleTogglePause}
                    onDeleteFile={handleDeleteFile}
                    onTryDecompress={handleOpenDecompressModal}
                    onMaximize={() => {
                        const uploadingTask = uploadQueue.find(f => f.status === 'uploading' || f.status === 'waiting' || f.status === 'paused');
                        if (uploadingTask) {
                            setActiveTaskId(uploadingTask.taskId);
                        } else if (tasks.length > 0) {
                            setActiveTaskId(tasks[0].id);
                        }
                        setViewMode('create');
                    }}
                />
            ) : (
                <TaskCreator 
                    task={tasks.find(t => t.id === activeTaskId) || tasks[0]}
                    onUpdateName={handleUpdateTaskName}
                    onMinimize={() => setViewMode('list')}
                    uploadQueue={uploadQueue.filter(f => f.taskId === activeTaskId)}
                    onAddFiles={handleAddFiles}
                    onTogglePause={handleTogglePause}
                    onDeleteFile={handleDeleteFile}
                    onTryDecompress={handleOpenDecompressModal}
                />
            )}
          </>
      )}

      {showToast && (
        <div className={`fixed top-20 right-8 px-6 py-4 rounded-lg shadow-xl z-50 animate-bounce flex items-center gap-3 ${
            toastType === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
        }`}>
          <span className="text-2xl">{toastType === 'success' ? '✅' : '⚠️'}</span>
          <div>
            <h4 className="font-bold">{toastType === 'success' ? '操作成功' : '操作失败'}</h4>
            <p className="text-sm">{toastMessage}</p>
          </div>
        </div>
      )}

      {passwordModalOpen && (
          <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-white rounded-xl shadow-2xl w-96 p-6 animate-scale-in">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <span>🔐</span> 输入解压密码
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">该压缩文件已加密，请输入密码以继续解压。</p>
                  <input 
                      type="password" 
                      autoFocus
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all mb-6"
                      placeholder="请输入密码..."
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmitPassword()}
                  />
                  <div className="flex justify-end gap-3">
                      <button 
                          onClick={() => setPasswordModalOpen(false)}
                          className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                      >
                          取消
                      </button>
                      <button 
                          onClick={handleSubmitPassword}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                      >
                          确认解压
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
