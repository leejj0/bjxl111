import React, { useState } from 'react';
import { SmartFile, EntityItem } from '../types';

interface Props {
  file: SmartFile;
  onUpdateFile: (file: SmartFile) => void;
  onJump: (page: number, text: string) => void;
}

export const DetailKeyInfo: React.FC<Props> = ({ file, onUpdateFile, onJump }) => {
  const [entities, setEntities] = useState<EntityItem[]>(file.entities);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleDelete = (id: string) => {
      const newEntities = entities.filter(e => e.id !== id);
      setEntities(newEntities);
      onUpdateFile({ ...file, entities: newEntities });
  };

  const startEdit = (entity: EntityItem) => {
      setEditingId(entity.id);
      setEditValue(entity.value);
  };

  const saveEdit = () => {
      if(!editingId) return;
      const newEntities = entities.map(e => e.id === editingId ? { ...e, value: editValue } : e);
      setEntities(newEntities);
      onUpdateFile({ ...file, entities: newEntities });
      setEditingId(null);
  };

  // 分类字典
  const typeMap: Record<string, string> = {
      email: '📧 邮箱', account: '👤 账号', password: '🔑 密码', user_info: '📝 用户信息',
      id_card: '🪪 身份证', phone: '📱 手机号', bank_card: '💳 银行卡', address: '📍 地址',
      org: '🏢 单位名称', ip: '🌐 IP地址', domain: '🔗 域名', plate: '🚗 车牌号'
  };

  return (
    <div className="h-full flex flex-col">
       <div className="p-4 bg-yellow-50 border-b border-yellow-100 text-yellow-800 text-sm flex justify-between items-center shrink-0">
           <span>💡 以下信息由 AI 深度解析提取，请人工核对准确性。支持编辑与修正。</span>
           <span className="font-bold">共提取 {entities.length} 条高价值信息</span>
       </div>

       <div className="flex-1 overflow-auto p-0">
           <table className="w-full text-left border-collapse">
               <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider sticky top-0 shadow-sm z-10">
                   <tr>
                       <th className="p-4 w-32">类型</th>
                       <th className="p-4">提取内容</th>
                       <th className="p-4 w-24 text-center">页码</th>
                       <th className="p-4 text-right w-48">操作</th>
                   </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 text-sm">
                   {entities.map(entity => (
                       <tr key={entity.id} className="hover:bg-blue-50/30 transition-colors group">
                           <td className="p-4 text-slate-500 font-medium">
                               {typeMap[entity.type] || entity.type}
                           </td>
                           <td className="p-4">
                               {editingId === entity.id ? (
                                   <div className="flex gap-2">
                                       <input 
                                          type="text" 
                                          value={editValue} 
                                          onChange={e => setEditValue(e.target.value)}
                                          className="border border-blue-300 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-200 w-full"
                                          autoFocus
                                       />
                                       <button onClick={saveEdit} className="text-green-600 hover:text-green-800 font-bold">✔</button>
                                       <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                                   </div>
                               ) : (
                                   <span className={`font-mono text-slate-800 ${entity.type === 'password' ? 'bg-red-100 text-red-800 px-1 rounded' : ''}`}>
                                       {entity.value}
                                   </span>
                               )}
                           </td>
                           <td className="p-4 text-center text-slate-400">P.{entity.pageIndex}</td>
                           <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                               <div className="flex justify-end gap-3">
                                   <button 
                                      onClick={() => onJump(entity.pageIndex, entity.value)}
                                      className="text-blue-600 hover:text-blue-800 hover:underline text-xs flex items-center gap-1"
                                   >
                                       <span>📍</span> 定位
                                   </button>
                                   <button 
                                      onClick={() => startEdit(entity)}
                                      className="text-slate-500 hover:text-blue-600 hover:underline text-xs"
                                   >
                                       编辑
                                   </button>
                                   <button 
                                      onClick={() => handleDelete(entity.id)}
                                      className="text-slate-500 hover:text-red-600 hover:underline text-xs"
                                   >
                                       删除
                                   </button>
                               </div>
                           </td>
                       </tr>
                   ))}
                   {entities.length === 0 && (
                       <tr><td colSpan={4} className="p-8 text-center text-slate-400">未提取到关键信息</td></tr>
                   )}
               </tbody>
           </table>
       </div>
    </div>
  );
};
