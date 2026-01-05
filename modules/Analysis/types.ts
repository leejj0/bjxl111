export interface SourceFile {
    id: string;
    name: string;
    type: 'pdf' | 'docx' | 'txt' | 'md' | 'csv';
    wordCount: number;
    selected: boolean;
}

export interface Citation {
    id: string;
    sourceId: string;
    textSnippet: string;
    page?: number;
}

export interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    citations?: Citation[];
    timestamp: number;
    isStreaming?: boolean;
}

export interface TaskNode {
    id: string;
    name: string;
    status: 'pending' | 'running' | 'completed' | 'error';
    logs: string[]; // 模拟流式日志
    result?: string;
}

export interface AnalysisTask {
    id: string;
    name: string;
    type: 'summary' | 'qa' | 'outline' | 'extraction';
    status: 'running' | 'completed';
    nodes: TaskNode[];
    createdAt: string;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    sourceTaskId?: string;
    tags: string[];
    createdAt: string;
}

export interface Notebook {
    id: string;
    name: string;
    updatedAt: string;
    sourceCount: number;
}
