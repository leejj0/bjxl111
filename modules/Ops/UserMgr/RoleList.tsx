
import React, { useState } from 'react';
import { mockRoles } from '../mockData';

export const RoleList = () => {
    return (
        <div className="p-6 h-full flex flex-col bg-white">
            <div className="mb-6 bg-yellow-50 border border-yellow-100 rounded-lg p-3 text-sm text-yellow-800 flex items-center gap-2">
                 <span>💡</span>
                 <span>角色组：可以将多个角色分配到同一组。在用户管理中，用户只能查看相同角色组下的用户，也只能为这些用户分配相同角色组下的角色。</span>
            </div>

            <div className="flex justify-between items-center mb-6">
                 <div className="flex gap-3">
                     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2">
                        <span>⊕</span> 新增角色
                     </button>
                     <button className="bg-white border border-slate-300 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
                        🗑 批量删除
                     </button>
                 </div>
                 <div className="relative">
                    <input type="text" placeholder="角色名" className="border border-slate-300 rounded-lg px-3 py-2 pl-3 pr-8 text-sm focus:outline-none focus:border-blue-500" />
                    <span className="absolute right-3 top-2 text-slate-400">🔍</span>
                 </div>
            </div>

            <div className="flex-1 overflow-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase sticky top-0 z-10">
                        <tr>
                            <th className="p-4 w-10"><input type="checkbox" className="rounded" /></th>
                            <th className="p-4">角色ID</th>
                            <th className="p-4">角色名</th>
                            <th className="p-4">角色描述</th>
                            <th className="p-4">状态</th>
                            <th className="p-4">成员数</th>
                            <th className="p-4">更新时间</th>
                            <th className="p-4 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {mockRoles.map(role => (
                            <tr key={role.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4"><input type="checkbox" className="rounded" /></td>
                                <td className="p-4 font-mono text-slate-400 text-xs">{role.id}</td>
                                <td className="p-4 font-bold text-slate-700">{role.name}</td>
                                <td className="p-4 text-slate-500 max-w-xs truncate">{role.description}</td>
                                <td className="p-4"><span className="text-green-600">✔</span></td>
                                <td className="p-4"><span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-600 font-bold">{role.userCount}</span></td>
                                <td className="p-4 text-slate-400 text-xs">{role.updatedAt}</td>
                                <td className="p-4 text-right">
                                    <button className="text-blue-600 hover:underline mr-3 text-xs font-medium" title="编辑权限">📝</button>
                                    <button className="text-red-500 hover:underline text-xs font-medium" title="删除">🗑</button>
                                </td>
                            </tr>
                        ))}
                        {/* 模拟更多静态数据以填充视图 */}
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="p-4"><input type="checkbox" className="rounded" /></td>
                            <td className="p-4 font-mono text-slate-400 text-xs">r_dev</td>
                            <td className="p-4 font-bold text-slate-700">智海研发</td>
                            <td className="p-4 text-slate-500">--</td>
                            <td className="p-4"><span className="text-green-600">✔</span></td>
                            <td className="p-4"><span className="bg-slate-100 px-2 py-0.5 rounded text-xs text-slate-600 font-bold">5</span></td>
                            <td className="p-4 text-slate-400 text-xs">2025-12-09</td>
                            <td className="p-4 text-right">
                                <button className="text-blue-600 hover:underline mr-3 text-xs font-medium">📝</button>
                                <button className="text-red-500 hover:underline text-xs font-medium">🗑</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
