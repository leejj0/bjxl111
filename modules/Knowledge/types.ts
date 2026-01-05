export type DatasetType = 'public' | 'private';

export interface KnowledgeDataset {
  id: string;
  name: string;
  description: string;
  type: DatasetType;
  fileCount: number;
  totalSize: string;
  updatedAt: string;
  tags: string[];
  allowedExtensions: string[]; // for settings
  isDisabled: boolean; // "Eye" button status
  
  // 统计信息
  stats: {
    fileStatus: { total: number; success: number; failed: number };
    summaryStatus: { total: number; success: number; failed: number };
    tagStatus: { total: number; success: number; failed: number };
  };
}

export interface KnowledgeFile {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  updatedAt: string;
  status?: 'parsed' | 'processing' | 'failed';
  children?: KnowledgeFile[]; // for folder structure (if nested)
}

// --- 新增：数据库（业务库）相关定义 ---

export type RiskLevel = 'high' | 'medium' | 'low';

export interface DatabaseTopic {
  id: string;
  title: string; // e.g., "员工身份信息库", "服务器凭据库"
  description: string;
  recordCount: number; // 总记录数
  sourceCount: number; // 来源数据集数量
  riskLevel: RiskLevel;
  updatedAt: string;
  tags: string[];
  fields: string[]; // 该库包含的主要字段，用于列表展示预览
}

// 聚合后的宽表记录
export interface AggregatedRecord {
  id: string;
  [key: string]: any; // 动态字段
  _sourceDataset: string; // 来源数据集名称（仅用于溯源，不作为主要展示）
  _riskScore?: number;
}
