import React, { useState, useEffect, useRef } from 'react';
import { SmartFile } from '../types';

interface Props {
  file: SmartFile;
  jumpSignal: { page: number, text: string } | null;
  onClearSignal: () => void;
}

export const DetailContent: React.FC<Props> = ({ file, jumpSignal, onClearSignal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showTranslation, setShowTranslation] = useState(false);
  
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isSyncingLeft = useRef(false);
  const isSyncingRight = useRef(false);

  // 获取当前页数据
  const pageData = file.contentPages.find(p => p.pageIndex === currentPage);

  // 处理跳转信号
  useEffect(() => {
      if (jumpSignal) {
          setCurrentPage(jumpSignal.page);
          // 延迟一点以等待DOM渲染，然后尝试高亮滚动 (简化版：只跳转页码)
          // 实际项目中需要复杂的 textRange 定位
          setTimeout(() => {
              onClearSignal();
          }, 500);
      }
  }, [jumpSignal, onClearSignal]);

  // 简单的 Markdown 渲染 (用 dangerouslySetInnerHTML 模拟，实际项目建议使用 react-markdown)
  // 为了实现高亮，我们简单地替换文本
  const renderMarkdown = (text: string) => {
      let html = text
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 pb-2 border-b border-slate-200">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mb-3 mt-6 text-slate-700">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mb-2 mt-4 text-slate-600">$1</h3>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/`(.*)`/gim, '<code class="bg-slate-100 text-red-500 px-1 rounded font-mono text-sm">$1</code>')
        .replace(/> (.*$)/gim, '<blockquote class="border-l-4 border-slate-300 pl-4 italic text-slate-500 my-4 bg-slate-50 py-2">$1</blockquote>')
        // 模拟表格渲染
        .replace(/\|(.*)\|/g, (match) => {
             // 极简表格处理，实际应使用库
             if(match.includes('---')) return ''; // Skip separator
             const cells = match.split('|').filter(c => c.trim() !== '');
             return `<div class="grid grid-cols-${cells.length} gap-0 border-b border-slate-200">${cells.map(c => `<div class="p-2 border-r border-slate-100 last:border-0">${c}</div>`).join('')}</div>`;
        })
        .replace(/!\[(.*)\]\((.*)\)/gim, '<img src="$2" alt="$1" class="max-w-full rounded shadow my-4" />');

      // 处理高亮跳转
      if (jumpSignal && jumpSignal.page === currentPage) {
          const regex = new RegExp(`(${jumpSignal.text})`, 'gi');
          html = html.replace(regex, '<span class="bg-yellow-300 animate-pulse">$1</span>');
      }

      return { __html: html.replace(/\n/g, '<br />') };
  };

  // 同步滚动逻辑
  const handleScroll = (source: 'left' | 'right') => {
      const l = leftRef.current;
      const r = rightRef.current;
      if (!l || !r) return;

      if (source === 'left') {
          if (isSyncingRight.current) {
              isSyncingRight.current = false;
              return;
          }
          isSyncingLeft.current = true;
          const percentage = l.scrollTop / (l.scrollHeight - l.clientHeight);
          r.scrollTop = percentage * (r.scrollHeight - r.clientHeight);
      } else {
          if (isSyncingLeft.current) {
              isSyncingLeft.current = false;
              return;
          }
          isSyncingRight.current = true;
          const percentage = r.scrollTop / (r.scrollHeight - r.clientHeight);
          l.scrollTop = percentage * (l.scrollHeight - l.clientHeight);
      }
  };

  const totalPages = file.contentPages.length;

  return (
    <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="h-12 border-b border-slate-200 bg-slate-50 flex justify-between items-center px-4 shrink-0">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setShowTranslation(!showTranslation)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                        showTranslation ? 'bg-blue-100 text-blue-700' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    <span>文/A</span> {showTranslation ? '关闭对照' : '开启翻译对照'}
                </button>
                <div className="text-xs text-slate-400">
                    * 滚动左侧或右侧区域可自动同步视图
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button 
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                >◀</button>
                <span className="text-sm font-mono text-slate-600">Page {currentPage} / {totalPages || 1}</span>
                <button 
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                >▶</button>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
            {pageData ? (
                <>
                    {/* 原文 */}
                    <div 
                        ref={leftRef}
                        onScroll={() => handleScroll('left')}
                        className={`flex-1 overflow-y-auto p-8 bg-white transition-all ${showTranslation ? 'border-r border-slate-200' : ''}`}
                    >
                        <div className="max-w-3xl mx-auto">
                            <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">Original Content</h3>
                            <div 
                                className="prose prose-slate max-w-none"
                                dangerouslySetInnerHTML={renderMarkdown(pageData.originalMarkdown)}
                            />
                        </div>
                    </div>

                    {/* 译文 */}
                    {showTranslation && (
                        <div 
                            ref={rightRef}
                            onScroll={() => handleScroll('right')}
                            className="flex-1 overflow-y-auto p-8 bg-slate-50"
                        >
                            <div className="max-w-3xl mx-auto">
                                <h3 className="text-xs font-bold text-blue-400 uppercase mb-4 tracking-wider">AI Translation</h3>
                                <div 
                                    className="prose prose-blue max-w-none"
                                    dangerouslySetInnerHTML={renderMarkdown(pageData.translatedMarkdown || '*No translation available*')}
                                />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400">
                    该页面暂无内容
                </div>
            )}
        </div>
    </div>
  );
};
