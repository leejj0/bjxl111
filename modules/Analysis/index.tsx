import React, { useState } from 'react';
import { Dashboard } from './Dashboard';
import { NotebookView } from './NotebookView';
import { Notebook } from './types';

export const AnalysisModule = () => {
  const [activeNotebook, setActiveNotebook] = useState<Notebook | null>(null);

  return (
    <div className="h-full w-full bg-slate-50 overflow-hidden">
      {activeNotebook ? (
        <NotebookView 
            notebook={activeNotebook} 
            onBack={() => setActiveNotebook(null)} 
        />
      ) : (
        <Dashboard onSelectNotebook={setActiveNotebook} />
      )}
    </div>
  );
};
