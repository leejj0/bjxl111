
import React from 'react';
import { mockLogs } from '../mockData';

export const LogAudit = () => {
  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-hidden">
        <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold text-slate-800">系统 / 审计日志</h2>
        </div>

        {/* Charts Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 shrink-0 h-48">
             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                 <h4 className="text-xs font-bold text-slate-500 mb-4">最近7天 登录状态统计</h4>
                 <div className="flex-1 flex items-end justify-between px-2 gap-3">
                     {[25, 23, 2, 5, 23, 29, 2].map((val, i) => (
                         <div key={i} className="flex-1 bg-blue-100 rounded-t relative group h-full flex items-end">
                             <div className="w-full bg-blue-500 transition-all hover:bg-blue-600" style={{height: `${val * 3}%`}}></div>
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{val}</div>
                         </div>
                     ))}
                 </div>
                 <div className="flex justify-between mt-2 text-[10px] text-slate-400">
                     <span>12-25</span>
                     <span>12-31</span>
                 </div>
             </div>

             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2 flex flex-col">
                 <h4 className="text-xs font-bold text-slate-500 mb-4">最近7天 功能访问Top</h4>
                 <div className="flex-1 flex gap-4 items-center">
                     <div className="space-y-2 flex-1">
                         {[
                             { label: 'AI应用 [327]', w: '90%', c: 'bg-purple-500' },
                             { label: '知识库 [142]', w: '50%', c: 'bg-blue-500' },
                             { label: '域名检索 [47]', w: '20%', c: 'bg-cyan-500' },
                             { label: '批量查询 [13]', w: '10%', c: 'bg-teal-500' },
                         ].map((bar, i) => (
                             <div key={i} className="flex items-center gap-2">
                                 <span className="text-[10px] text-slate-500 w-20 text-right">{bar.label.split(' ')[0]}</span>
                                 <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                                     <div className={`h-full rounded-full ${bar.c}`} style={{width: bar.w}}></div>
                                 </div>
                                 <span className="text-[10px] text-slate-400 w-8">{bar.label.split(' ')[1]}</span>
                             </div>
                         ))}
                     </div>
                     {/* Fake Pie Chart */}
                     <div className="w-32 h-32 rounded-full border-[16px] border-slate-100 border-t-purple-500 border-r-blue-500 border-b-cyan-500 border-l-teal-500 rotate-45"></div>
                 </div>
             </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-3 rounded-t-xl border border-slate-200 border-b-0 flex gap-3 items-center">
            <select className="border border-slate-300 rounded px-3 py-1.5 text-sm outline-none bg-white">
                <option>全部类型</option>
                <option>操作日志</option>
                <option>系统日志</option>
            </select>
            <input type="text" placeholder="操作用户" className="border border-slate-300 rounded px-3 py-1.5 text-sm outline-none w-32" />
            <input type="text" placeholder="操作IP" className="border border-slate-300 rounded px-3 py-1.5 text-sm outline-none w-32" />
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm hover:bg-blue-700">查询</button>
            <button className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-1.5 rounded text-sm hover:bg-blue-100">重置</button>
            <button className="ml-auto flex items-center gap-1 text-slate-500 hover:text-blue-600 text-sm">
                <span>⬇</span> 导出
            </button>
        </div>

        {/* Log Table */}
        <div className="flex-1 bg-white border border-slate-200 rounded-b-xl overflow-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase sticky top-0 shadow-sm">
                    <tr>
                        <th className="p-3">序号</th>
                        <th className="p-3">日志类型</th>
                        <th className="p-3">用户</th>
                        <th className="p-3">模块</th>
                        <th className="p-3">操作行为</th>
                        <th className="p-3">操作IP</th>
                        <th className="p-3">目标/描述</th>
                        <th className="p-3">时间</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {mockLogs.map((log, idx) => (
                        <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3 text-slate-400 font-mono text-xs">{idx + 1}</td>
                            <td className="p-3">
                                {log.module === '系统登录' ? '系统日志' : '操作日志'}
                            </td>
                            <td className="p-3 font-medium text-slate-900">{log.user}</td>
                            <td className="p-3">{log.module}</td>
                            <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-xs ${log.status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                    {log.action}
                                </span>
                            </td>
                            <td className="p-3 font-mono text-xs text-slate-500">{log.ip}</td>
                            <td className="p-3 max-w-xs truncate" title={log.details}>
                                <div className="text-xs text-slate-500">{log.target}</div>
                                <div className="text-[10px] text-slate-400">{log.details}</div>
                            </td>
                            <td className="p-3 text-slate-500 font-mono text-xs">{log.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <div className="bg-white p-3 border-t border-slate-200 flex justify-end gap-2 text-xs text-slate-500 items-center">
            <span>共 13 条</span>
            <button className="px-2 py-1 border rounded hover:bg-slate-100 disabled:opacity-50">◀</button>
            <span className="font-medium text-blue-600">1</span>
            <button className="px-2 py-1 border rounded hover:bg-slate-100">2</button>
            <button className="px-2 py-1 border rounded hover:bg-slate-100">▶</button>
            <select className="border rounded py-1"><option>10条/页</option></select>
        </div>
    </div>
  );
};
