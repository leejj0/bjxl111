import React, { useState } from 'react';
import { mockTopics } from '../mockData';
import { DatabaseTopic } from '../types';
import { TopicCard } from './TopicCard';
import { TopicDetail } from './TopicDetail';

export const DatabaseList = () => {
    const [selectedTopic, setSelectedTopic] = useState<DatabaseTopic | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTopics = mockTopics.filter(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        topic.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (selectedTopic) {
        return <TopicDetail topic={selectedTopic} onBack={() => setSelectedTopic(null)} />;
    }

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Top Bar */}
            <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-2">
                     <h2 className="text-xl font-bold text-slate-800">数据库</h2>
                     <span className="text-slate-400 text-sm">| 业务数据资产全景视图</span>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="搜索业务库名称、标签..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-80 border border-slate-300 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500 shadow-sm"
                        />
                        <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 font-medium shadow-sm transition-all">
                        + 新建业务库
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTopics.map(topic => (
                        <TopicCard 
                            key={topic.id} 
                            topic={topic} 
                            onClick={() => setSelectedTopic(topic)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
