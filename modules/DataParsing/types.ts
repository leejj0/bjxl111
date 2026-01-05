export type ParsingStatus = 'success' | 'processing' | 'failed';

// 目标映射字段类型（12类高价值信息 + 其他业务字段）
export type TargetFieldType = 
  | 'email' | 'account' | 'password' | 'user_info' | 'id_card' | 'phone' 
  | 'bank_card' | 'address' | 'org' | 'ip' | 'domain' | 'plate' | 'other';

export interface FieldMapping {
  id: string;
  originalKey: string; // 原始文件中的字段名 (如: user_email, col_3)
  targetKey: string;   // 映射到的目标标准字段名 (如: email)
  targetType: TargetFieldType; // 字段类型
  confidence: number;  // AI 识别置信度 0-100
  isConfirmed: boolean; // 用户是否确认
}

export interface PreviewData {
  headers: string[]; // 表头
  rows: any[][];     // 数据行 (只取前N条)
}

export interface StructuredFile {
  id: string;
  name: string;
  datasetName: string;
  sourceType: string;
  size: number;
  fileType: string; // 'SQL', 'CSV', 'JSON', 'EXCEL'
  sourceArchive?: string;
  sourcePath?: string;
  fileHash: string;

  parsingStatus: ParsingStatus;
  
  // 结构化特有字段
  dbType?: string; // e.g., 'MySQL 8.0', 'PostgreSQL 14', 'Oracle'
  recordCount: number; // 解析出的总条数
  
  aiStructureSummary: string; // AI 对数据结构的摘要
  
  // Schema 相关
  detectedDDL: string; // 识别出的 DDL 或 JSON Schema 描述
  fieldMappings: FieldMapping[]; // 字段映射配置
  
  // 预览数据
  previewData: PreviewData | string; // 字符串用于纯文本/JSON展示，对象用于表格
}
