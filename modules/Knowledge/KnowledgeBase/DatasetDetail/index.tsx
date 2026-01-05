import React from 'react';
import { KnowledgeDataset } from '../../types';
import { HeaderInfo } from './HeaderInfo';
import { FileBrowser } from './FileBrowser';

interface Props {
  dataset: KnowledgeDataset;
  onBack: () => void;
}

export const DatasetDetail: React.FC<Props> = ({ dataset, onBack }) => {
  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-hidden animate-fade-in">
        <button 
            onClick={onBack}
            className="mb-4 text-slate-500 hover:text-blue-600 flex items-center gap-1 w-fit transition-colors"
        >
            <span>←</span> 返回知识库
        </button>

        <HeaderInfo dataset={dataset} />

        <FileBrowser />
    </div>
  );
};
