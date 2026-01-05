
import React, { useState } from 'react';
import { mockTokens } from '../mockData';
import { ApiToken } from '../types';

export const TokenMgr = () => {
  const [tokens, setTokens] = useState<ApiToken[]>(mockTokens);

  return (
    <div className="h-full flex flex-col bg-slate-50 p-8 animate-fade-in">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Token 认证管理</h2>
                <p className="text-slate-500 mt-1">管理 AI 服务接口的访问凭证与权限范围。</p>
            </div>
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium shadow hover:bg-blue-700 flex items-center gap-2">
                <span>🔑</span> 生成新 Token
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokens.map(token => (
                <div key={token.id} className={`bg-white rounded-xl p-6 border transition-all ${token.status === 'active' ? 'border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300' : 'border-slate-100 opacity-70'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${token.status === 'active' ? 'bg-blue-50 text-blue-500' : 'bg-slate-100 text-slate-400'}`}>
                                🏷️
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">{token.name}</h3>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${token.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'}`}>
                                    {token.status}
                                </span>
                            </div>
                        </div>
                        <button className="text-slate-400 hover:text-slate-700 text-xl leading-none">⋮</button>
                    </div>

                    <div className="bg-slate-50 rounded p-3 mb-4 font-mono text-sm text-slate-600 flex justify-between items-center border border-slate-100">
                        {token.keyMasked}
                        <button className="text-blue-600 hover:text-blue-800 text-xs font-bold">COPY</button>
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">权限范围</span>
                            <div className="flex gap-1">
                                {token.scope.map(s => (
                                    <span key={s} className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-600 border border-slate-200">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">速率限制</span>
                            <span className="font-medium text-slate-700">{token.rateLimit} RPM</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">上次使用</span>
                            <span className="font-mono text-slate-600 text-xs">{token.lastUsed}</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-50 flex gap-2">
                         {token.status === 'active' ? (
                             <button className="flex-1 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded border border-slate-200">
                                 🚫 禁用
                             </button>
                         ) : (
                             <button className="flex-1 py-2 text-sm text-green-600 hover:bg-green-50 rounded border border-green-200 font-medium">
                                 ✅ 启用
                             </button>
                         )}
                         <button className="flex-1 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded border border-blue-200 font-medium">
                             🔄 刷新密钥
                         </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};
