import React, { useState } from 'react';

const FilterSection = ({ title, children, defaultOpen = true }: { title: string, children?: React.ReactNode, defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-slate-200 py-4 px-4">
            <div 
                className="flex justify-between items-center cursor-pointer mb-2 group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4 className="text-sm font-bold text-slate-700 group-hover:text-blue-600">{title}</h4>
                <span className={`text-slate-400 text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </div>
            {isOpen && <div className="space-y-2 animate-fade-in">{children}</div>}
        </div>
    );
};

export const FilterSidebar = () => {
  return (
    <div className="pb-10">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filters</span>
            <button className="text-xs text-blue-600 hover:underline">Reset All</button>
        </div>

        <FilterSection title="📅 日期 (Dates)">
            <div className="flex flex-col gap-1 text-sm text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> 2024 (1,240)</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> 2023 (8,500)</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> 2022 (12,000)</label>
            </div>
        </FilterSection>

        <FilterSection title="🔲 实体类型 (Entity Type)">
             <div className="flex flex-col gap-1 text-sm text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> Person (93k)</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> Company (81k)</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> Document (6k)</label>
            </div>
        </FilterSection>

        <FilterSection title="🌐 国家 (Countries)">
             <div className="flex flex-col gap-1 text-sm text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> Russia (8,480)</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> Pakistan (3,991)</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> Iran (2,484)</label>
            </div>
        </FilterSection>

        <FilterSection title="⚠️ 敏感类型 (Sensitive)">
             <div className="flex flex-col gap-1 text-sm text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> Password</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> Email</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600"><input type="checkbox" className="rounded text-blue-600" /> ID Card</label>
            </div>
        </FilterSection>
    </div>
  );
};