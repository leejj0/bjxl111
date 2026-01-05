
import React, { useState } from 'react';
import { UserList } from './UserList';
import { RoleList } from './RoleList';

export const UserMgr = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');

  return (
    <div className="h-full flex flex-col bg-slate-50">
        <div className="h-14 border-b border-slate-200 bg-white flex items-center px-6 shrink-0 gap-6">
            <h2 className="text-lg font-bold text-slate-800 mr-4">用户权限管理</h2>
            <button 
                onClick={() => setActiveTab('users')}
                className={`h-full border-b-2 px-2 text-sm font-medium transition-colors ${
                    activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
                用户管理
            </button>
            <button 
                onClick={() => setActiveTab('roles')}
                className={`h-full border-b-2 px-2 text-sm font-medium transition-colors ${
                    activeTab === 'roles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
                角色管理
            </button>
        </div>

        <div className="flex-1 overflow-hidden">
            {activeTab === 'users' ? <UserList /> : <RoleList />}
        </div>
    </div>
  );
};
