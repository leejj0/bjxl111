import React, { useState } from 'react';
import { UploadFile } from './types';

// --- NAS Component ---
export const NasExplorer = ({ onAddFiles }: { onAddFiles: (f: Omit<UploadFile, 'taskId'>[]) => void }) => {
    const [path, setPath] = useState('/mnt/nas_data/');
    
    const mockFiles = [
        { name: 'project_alpha_backup', type: 'folder' },
        { name: 'raw_images_2024', type: 'folder' },
        { name: 'dataset_v1.csv', type: 'file', size: 1024 * 1024 * 500 },
        { name: 'scan_archive.pdf', type: 'file', size: 1024 * 1024 * 12 },
    ];

    const handleSelect = (file: any) => {
        if(file.type === 'file') {
            // 简单的后缀判断逻辑，这里简单处理，实际应复用TaskCreator的逻辑或由后端判断
            const isStructured = file.name.endsWith('.csv') || file.name.endsWith('.sql');
            
            onAddFiles([{
                id: `nas-${Date.now()}`,
                name: file.name,
                size: file.size,
                uploaded: 0,
                speed: 0,
                progress: 0,
                status: 'waiting',
                parsingMethod: isStructured ? 'structured' : 'unstructured'
            }]);
        }
    };

    return (
        <div className="h-full flex flex-col animate-fade-in">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4 flex items-center gap-2">
                <span className="font-bold text-slate-600">NAS 路径:</span>
                <input 
                    type="text" 
                    value={path} 
                    onChange={(e) => setPath(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded px-2 py-1 text-sm" 
                />
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">跳转</button>
            </div>
            
            <div className="flex-1 border border-slate-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4">
                    {mockFiles.map((f, i) => (
                        <div 
                            key={i} 
                            onClick={() => handleSelect(f)}
                            className="flex flex-col items-center p-4 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-lg cursor-pointer transition-all"
                        >
                            <div className="text-4xl mb-2 text-yellow-500">{f.type === 'folder' ? '📁' : '📄'}</div>
                            <span className="text-sm text-slate-700 text-center break-all">{f.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <p className="mt-2 text-xs text-slate-400">提示: 点击文件即可直接加入上传队列。支持自动识别挂载盘位。</p>
        </div>
    );
};

// --- FTP Component ---
export const FtpConfig = () => {
    return (
        <div className="max-w-xl mx-auto mt-10 p-6 border border-slate-200 rounded-xl bg-slate-50 animate-fade-in">
            <h4 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                <span>🔌</span> 配置 FTP 连接
            </h4>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">主机地址 (Host)</label>
                        <input type="text" placeholder="192.168.1.100" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">端口 (Port)</label>
                        <input type="text" placeholder="21" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">用户名</label>
                        <input type="text" placeholder="ftp_user" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">密码</label>
                        <input type="password" placeholder="••••••" className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:border-blue-500 outline-none" />
                    </div>
                </div>
                <button className="w-full bg-slate-800 text-white py-2.5 rounded hover:bg-slate-700 transition-colors font-medium mt-2">
                    测试连接并选择文件
                </button>
            </div>
        </div>
    );
};
