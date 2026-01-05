
import React from 'react';
import { mockUsers } from '../mockData';

export const UserList = () => {
    return (
        <div className="p-6 h-full flex flex-col bg-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-3">
                    <input type="text" placeholder="搜索用户名、姓名..." className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 w-64" />
                    <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                        <option>所有部门</option>
                        <option>IT部</option>
                        <option>市场部</option>
                    </select>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2">
                    <span>+</span> 新增用户
                </button>
            </div>

            <div className="flex-1 overflow-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase sticky top-0 z-10">
                        <tr>
                            <th className="p-4 w-10"><input type="checkbox" className="rounded" /></th>
                            <th className="p-4">用户</th>
                            <th className="p-4">角色</th>
                            <th className="p-4">部门</th>
                            <th className="p-4">状态</th>
                            <th className="p-4">最近登录</th>
                            <th className="p-4 text-right">操作</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {mockUsers.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4"><input type="checkbox" className="rounded" /></td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{user.name}</div>
                                            <div className="text-xs text-slate-400">@{user.username}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                        user.role === 'auditor' ? 'bg-orange-100 text-orange-700' :
                                        'bg-blue-50 text-blue-700'
                                    }`}>
                                        {user.roleName}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-600">{user.department}</td>
                                <td className="p-4">
                                    {user.status === 'active' ? (
                                        <span className="text-green-600 flex items-center gap-1 text-xs">✔ 正常</span>
                                    ) : (
                                        <span className="text-slate-400 flex items-center gap-1 text-xs">⛔ 冻结</span>
                                    )}
                                </td>
                                <td className="p-4 text-slate-500 font-mono text-xs">{user.lastLogin}</td>
                                <td className="p-4 text-right">
                                    <button className="text-blue-600 hover:underline mr-3 text-xs font-medium">编辑</button>
                                    <button className="text-red-500 hover:underline text-xs font-medium">重置密码</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
