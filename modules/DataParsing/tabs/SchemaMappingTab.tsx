import React, { useState } from 'react';
import { StructuredFile, FieldMapping, TargetFieldType } from '../types';

interface Props {
  file: StructuredFile;
  onUpdateFile: (file: StructuredFile) => void;
}

const FIELD_TYPES: { value: TargetFieldType; label: string }[] = [
    { value: 'email', label: '📧 邮箱' },
    { value: 'phone', label: '📱 手机号' },
    { value: 'id_card', label: '🪪 身份证' },
    { value: 'account', label: '👤 账号' },
    { value: 'password', label: '🔑 密码' },
    { value: 'bank_card', label: '💳 银行卡' },
    { value: 'user_info', label: '📝 用户信息(姓名等)' },
    { value: 'address', label: '📍 地址' },
    { value: 'org', label: '🏢 单位名称' },
    { value: 'ip', label: '🌐 IP地址' },
    { value: 'domain', label: '🔗 域名' },
    { value: 'plate', label: '🚗 车牌号' },
    { value: 'other', label: '⚪ 其他/自定义' },
];

export const DetailSchemaMapping: React.FC<Props> = ({ file, onUpdateFile }) => {
  const [mappings, setMappings] = useState<FieldMapping[]>(file.fieldMappings);

  const handleMappingChange = (id: string, field: keyof FieldMapping, value: any) => {
      const newMappings = mappings.map(m => {
          if (m.id === id) {
              return { ...m, [field]: value, isConfirmed: true };
          }
          return m;
      });
      setMappings(newMappings);
      onUpdateFile({ ...file, fieldMappings: newMappings });
  };

  const handleDeleteMapping = (id: string) => {
      const newMappings = mappings.filter(m => m.id !== id);
      setMappings(newMappings);
      onUpdateFile({ ...file, fieldMappings: newMappings });
  };

  const handleAddMapping = () => {
      const newMapping: FieldMapping = {
          id: `new-${Date.now()}`,
          originalKey: '',
          targetKey: '',
          targetType: 'other',
          confidence: 100,
          isConfirmed: true
      };
      setMappings([...mappings, newMapping]);
      onUpdateFile({ ...file, fieldMappings: [...mappings, newMapping] });
  };

  return (
    <div className="h-full flex flex-col">
       {/* 上半部分：结构/DDL 展示 */}
       <div className="h-1/3 p-6 border-b border-slate-200 flex flex-col bg-slate-50 overflow-hidden">
           <div className="flex justify-between items-center mb-3">
               <h4 className="font-bold text-slate-700 flex items-center gap-2">
                   <span>🏗️</span> 识别到的结构定义 (DDL)
                   {file.dbType && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded ml-2">{file.dbType}</span>}
               </h4>
           </div>
           <div className="flex-1 overflow-auto bg-slate-800 rounded-lg p-4 font-mono text-xs text-green-400 shadow-inner">
               <pre>{file.detectedDDL}</pre>
           </div>
       </div>

       {/* 下半部分：字段映射配置 */}
       <div className="flex-1 flex flex-col p-6 overflow-hidden bg-white">
           <div className="flex justify-between items-center mb-4 shrink-0">
               <div>
                   <h4 className="font-bold text-slate-800">📐 智能字段映射配置</h4>
                   <p className="text-xs text-slate-500 mt-1">系统已自动识别敏感字段与业务字段，请确认映射关系以生成标准表结构。</p>
               </div>
               <button 
                  onClick={handleAddMapping}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded text-sm font-medium transition-colors border border-blue-200"
               >
                   + 新增映射
               </button>
           </div>

           <div className="flex-1 overflow-auto border border-slate-200 rounded-lg">
               <table className="w-full text-left">
                   <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase border-b border-slate-200">
                       <tr>
                           <th className="px-4 py-3 w-1/4">原始字段 (Source Key)</th>
                           <th className="px-4 py-3 w-1/4">识别类型 (Type)</th>
                           <th className="px-4 py-3 w-1/4">目标映射字段 (Target Key)</th>
                           <th className="px-4 py-3 w-24 text-center">置信度</th>
                           <th className="px-4 py-3 text-right">操作</th>
                       </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 text-sm">
                       {mappings.map(m => (
                           <tr key={m.id} className="hover:bg-slate-50 group">
                               <td className="px-4 py-2">
                                   <input 
                                      type="text" 
                                      value={m.originalKey}
                                      onChange={(e) => handleMappingChange(m.id, 'originalKey', e.target.value)}
                                      className="w-full bg-transparent border-b border-transparent focus:border-blue-300 outline-none font-mono text-slate-700"
                                      placeholder="输入原始列名..."
                                   />
                               </td>
                               <td className="px-4 py-2">
                                   <select 
                                      value={m.targetType}
                                      onChange={(e) => handleMappingChange(m.id, 'targetType', e.target.value)}
                                      className="w-full bg-transparent border-b border-transparent focus:border-blue-300 outline-none text-slate-700 cursor-pointer"
                                   >
                                       {FIELD_TYPES.map(t => (
                                           <option key={t.value} value={t.value}>{t.label}</option>
                                       ))}
                                   </select>
                               </td>
                               <td className="px-4 py-2">
                                    <input 
                                      type="text" 
                                      value={m.targetKey}
                                      onChange={(e) => handleMappingChange(m.id, 'targetKey', e.target.value)}
                                      className={`w-full bg-transparent border-b border-transparent focus:border-blue-300 outline-none font-mono font-bold ${
                                          !m.isConfirmed ? 'text-orange-600' : 'text-blue-700'
                                      }`}
                                      placeholder="输入目标字段..."
                                   />
                               </td>
                               <td className="px-4 py-2 text-center">
                                   <div className="flex flex-col items-center">
                                       <span className={`text-xs font-bold ${m.confidence > 90 ? 'text-green-600' : 'text-orange-500'}`}>
                                           {m.confidence}%
                                       </span>
                                       <div className="w-12 h-1 bg-slate-200 rounded-full mt-1">
                                           <div className={`h-full rounded-full ${m.confidence > 90 ? 'bg-green-500' : 'bg-orange-400'}`} style={{width: `${m.confidence}%`}}></div>
                                       </div>
                                   </div>
                               </td>
                               <td className="px-4 py-2 text-right">
                                   <button 
                                      onClick={() => handleDeleteMapping(m.id)}
                                      className="text-slate-400 hover:text-red-500 font-bold px-2"
                                      title="删除映射"
                                   >
                                       &times;
                                   </button>
                               </td>
                           </tr>
                       ))}
                       {mappings.length === 0 && (
                           <tr><td colSpan={5} className="p-8 text-center text-slate-400">暂无映射配置，请添加。</td></tr>
                       )}
                   </tbody>
               </table>
           </div>
       </div>
    </div>
  );
};
