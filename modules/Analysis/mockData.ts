import { Notebook, SourceFile, Message, Note } from './types';

export const mockNotebooks: Notebook[] = [
    { id: 'nb1', name: '2024年度财务审计报告分析', updatedAt: '2025-01-10', sourceCount: 12 },
    { id: 'nb2', name: '新能源汽车市场竞品调研', updatedAt: '2025-01-08', sourceCount: 5 },
    { id: 'nb3', name: '核心系统架构升级方案V2', updatedAt: '2025-01-05', sourceCount: 8 },
];

export const mockSources: SourceFile[] = [
    { id: 's1', name: 'Q1_Financial_Report.pdf', type: 'pdf', wordCount: 12500, selected: true },
    { id: 's2', name: 'Competitor_Analysis_Tesla.docx', type: 'docx', wordCount: 8900, selected: true },
    { id: 's3', name: 'Meeting_Notes_202412.txt', type: 'txt', wordCount: 3200, selected: false },
    { id: 's4', name: 'Architecture_Diagram_Specs.md', type: 'md', wordCount: 4500, selected: false },
];

export const mockNotes: Note[] = [
    { 
        id: 'n1', 
        title: '关键风险点总结', 
        content: '根据审计报告，主要的财务风险集中在海外投资汇率波动...', 
        tags: ['风险', '财务'], 
        createdAt: '2025-01-10 10:30' 
    }
];

export const mockInitialMessages: Message[] = [
    {
        id: 'msg-system',
        role: 'ai',
        content: '你好！我是你的智能分析助手。我已经阅读了左侧选中的 2 个文件。你可以让我总结内容，或者提出具体问题。',
        timestamp: Date.now()
    }
];
