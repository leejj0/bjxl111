
import React from 'react';

export const SearchDashboard = () => {
    return (
        <div className="w-full max-w-5xl grid grid-cols-3 gap-6">
            {/* Card 1: Trend */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                <h4 className="text-sm font-bold text-slate-500 mb-4">数据总量趋势</h4>
                <div className="flex items-end gap-2 h-32 w-full justify-center px-4">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-100 rounded-t-sm relative group overflow-hidden">
                             <div className="absolute bottom-0 w-full bg-blue-500 transition-all duration-1000" style={{height: `${h}%`}}></div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-xs text-slate-400">近 7 天数据入库量</div>
            </div>

            {/* Card 2: Sensitive Data Dist */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
                <h4 className="text-sm font-bold text-slate-500 mb-4">敏感数据分布</h4>
                <div className="w-32 h-32 rounded-full border-8 border-slate-100 relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-8 border-purple-500 border-t-transparent border-l-transparent -rotate-45"></div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-slate-800">42%</div>
                        <div className="text-[10px] text-slate-400">PII 信息</div>
                    </div>
                </div>
                <div className="mt-4 flex gap-3 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span> PII</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-200"></span> 其他</span>
                </div>
            </div>

            {/* Card 3: Top Sources */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 w-full">
                <h4 className="text-sm font-bold text-slate-500 mb-4">数据源 Top 3</h4>
                <div className="space-y-4">
                    {[
                        { name: '财务报表归档', val: 85, color: 'bg-indigo-500' },
                        { name: '邮件服务器日志', val: 62, color: 'bg-cyan-500' },
                        { name: '员工档案库', val: 40, color: 'bg-teal-500' }
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-600 font-medium">{item.name}</span>
                                <span className="text-slate-400">{item.val}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${item.color}`} style={{width: `${item.val}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
