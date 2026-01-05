
import React from 'react';
import { mockMetrics, mockLogs } from '../mockData';

export const OpsDashboard = () => {
  const { healthScore, activeUsers, activeUsersTrend, aiLatency, pendingAlerts, storageUsage, trafficTrend } = mockMetrics;

  // Max value for chart scaling
  const maxTraffic = Math.max(...trafficTrend.map(t => t.value));

  return (
    <div className="h-full bg-slate-50 p-8 overflow-y-auto animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">运维监控台</h2>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-sm text-slate-500 mb-2 flex justify-between">
                    <span>系统健康度</span>
                    <span className="text-green-500">🟢 正常</span>
                </div>
                <div className="text-4xl font-black text-slate-800 mb-2">{healthScore}%</div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{width: `${healthScore}%`}}></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-sm text-slate-500 mb-2">活跃用户 (今日)</div>
                <div className="text-4xl font-black text-slate-800 mb-2">{activeUsers.toLocaleString()}</div>
                <div className="text-xs text-green-600 font-medium">↑ {activeUsersTrend}% 较昨日</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-sm text-slate-500 mb-2">AI 平均响应延迟</div>
                <div className="text-4xl font-black text-slate-800 mb-2">{aiLatency}<span className="text-xl font-normal text-slate-400">ms</span></div>
                <div className="text-xs text-slate-500">状态稳定 (P99 &lt; 500ms)</div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer hover:border-red-200 transition-colors">
                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 text-red-500">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
                </div>
                <div className="text-sm text-slate-500 mb-2">待处理告警</div>
                <div className="text-4xl font-black text-red-500 mb-2">{pendingAlerts}</div>
                <div className="text-xs text-red-400 font-medium">3个高优先级</div>
            </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 h-80">
            {/* Traffic Trend (Simulated Line Chart) */}
            <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 shadow-sm text-white flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 z-10">
                    <h3 className="font-bold">实时负载 (处理 VS 检索)</h3>
                    <div className="flex gap-4 text-xs">
                         <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span> API调用</span>
                         <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span> 系统负载</span>
                    </div>
                </div>
                
                <div className="flex-1 flex items-end justify-between px-2 gap-2 relative z-10">
                    {/* SVG Curve Simulation */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" preserveAspectRatio="none">
                         <defs>
                             <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                 <stop offset="0%" style={{stopColor:'rgb(96, 165, 250)', stopOpacity:0.5}} />
                                 <stop offset="100%" style={{stopColor:'rgb(96, 165, 250)', stopOpacity:0}} />
                             </linearGradient>
                         </defs>
                         <path d="M0,200 Q100,180 200,80 T400,150 T600,120 T800,180" fill="none" stroke="#60a5fa" strokeWidth="3" />
                         <path d="M0,150 Q100,200 200,50 T400,180 T600,100 T800,150" fill="none" stroke="#fb923c" strokeWidth="3" />
                    </svg>
                    
                    {/* X-Axis Labels */}
                    {trafficTrend.map((t, i) => (
                        <div key={i} className="flex flex-col items-center justify-end h-full w-full pb-6 border-b border-slate-700">
                             <span className="text-[10px] text-slate-400 absolute bottom-1">{t.time}</span>
                             <div className="w-0.5 bg-slate-700/50 h-full absolute"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Storage Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col">
                <h3 className="font-bold text-slate-800 mb-6">存储趋势</h3>
                <div className="flex-1 flex items-end justify-center gap-4 px-4">
                     {storageUsage.map((item, i) => (
                         <div key={i} className="flex flex-col items-center flex-1 group">
                             <div className="w-full relative h-40 bg-slate-100 rounded-t-lg overflow-hidden">
                                 <div className={`absolute bottom-0 w-full ${item.color} transition-all duration-1000 group-hover:opacity-90`} style={{height: `${item.value * 2}%`}}></div>
                             </div>
                             <span className="text-[10px] text-slate-500 mt-2 text-center truncate w-full">{item.label}</span>
                         </div>
                     ))}
                </div>
            </div>
        </div>

        {/* Live Logs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">实时动态流</h3>
                <button className="text-xs text-blue-600 hover:underline">查看全部日志</button>
            </div>
            <div className="divide-y divide-slate-50">
                {mockLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-slate-400">{log.timestamp.split(' ')[1]}</span>
                            <div>
                                <div className="text-sm font-medium text-slate-700">
                                    <span className="font-bold text-slate-900">{log.user}</span> 在 
                                    <span className="mx-1 px-1.5 py-0.5 bg-slate-100 rounded text-xs text-slate-500">{log.module}</span> 
                                    执行了 {log.action}
                                </div>
                                <div className="text-xs text-slate-400 mt-0.5">{log.details}</div>
                            </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${log.status === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {log.status === 'success' ? '成功' : '失败'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
