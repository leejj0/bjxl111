
import React from 'react';

export const DatabaseSearchView = () => {
  return (
    <div className="h-full flex">
        {/* Left: Table Tree */}
        <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200">
                <h4 className="font-bold text-slate-700">数据库表</h4>
                <input type="text" placeholder="Filter tables..." className="mt-2 w-full text-xs p-2 border rounded bg-white" />
            </div>
            <div className="flex-1 p-2 overflow-y-auto text-sm text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 px-2">▼ core_db</div>
                <div className="pl-6 py-1 hover:bg-slate-200 rounded cursor-pointer">users</div>
                <div className="pl-6 py-1 hover:bg-slate-200 rounded cursor-pointer">transactions</div>
                <div className="pl-6 py-1 hover:bg-slate-200 rounded cursor-pointer">logs</div>
                <div className="font-bold text-slate-800 px-2 mt-2">▶ external_leaks</div>
            </div>
        </div>

        {/* Right: SQL Editor & Results */}
        <div className="flex-1 flex flex-col bg-white">
            <div className="h-1/3 border-b border-slate-200 flex flex-col">
                <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 justify-between">
                     <span className="text-xs font-mono text-slate-500">Query Editor</span>
                     <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700">▶ Run Query</button>
                </div>
                <textarea 
                    className="flex-1 w-full p-4 font-mono text-sm resize-none focus:outline-none text-slate-800"
                    defaultValue="SELECT * FROM users WHERE country = 'RU' AND risk_score > 80 LIMIT 100;"
                ></textarea>
            </div>
            
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
                <div className="p-2 border-b border-slate-200 text-xs text-slate-500 flex justify-between">
                    <span>Result: 0 rows fetched in 0.00ms</span>
                    <button>Download CSV</button>
                </div>
                <div className="flex-1 flex items-center justify-center text-slate-400">
                    Run query to see results
                </div>
            </div>
        </div>
    </div>
  );
};
