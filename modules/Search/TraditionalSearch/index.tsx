
import React from 'react';
import { FilterSidebar } from './FilterSidebar';
import { ResultList } from './ResultList';

interface Props {
    onViewEntity: (id: string) => void;
}

export const TraditionalSearchView: React.FC<Props> = ({ onViewEntity }) => {
  return (
    <div className="flex h-full bg-white">
      {/* Top Search Bar (within content area) */}
      <div className="absolute top-0 left-0 right-0 h-16 border-b border-slate-200 bg-white z-20 flex items-center px-6 gap-4">
         <div className="flex-1 max-w-4xl relative">
             <input 
                type="text" 
                placeholder="输入高级语法，如: email: *@gmail.com AND country: CN"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg h-10 pl-4 pr-12 font-mono text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
             />
             <span className="absolute right-3 top-2.5 text-slate-400 text-xs border border-slate-200 rounded px-1.5 py-0.5">syntax on</span>
         </div>
         <div className="flex gap-2">
             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">检索</button>
             <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">保存模板</button>
         </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex w-full mt-16 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-64 border-r border-slate-200 bg-slate-50 overflow-y-auto">
              <FilterSidebar />
          </div>

          {/* Result List */}
          <div className="flex-1 bg-white overflow-hidden">
              <ResultList onViewEntity={onViewEntity} />
          </div>
      </div>
    </div>
  );
};
