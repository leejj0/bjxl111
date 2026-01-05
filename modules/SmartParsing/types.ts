export type SecurityStatus = 'safe' | 'dangerous' | 'suspicious' | 'unknown';
export type ParsingStatus = 'success' | 'processing' | 'failed';

export interface EntityItem {
  id: string;
  type: 'email' | 'account' | 'password' | 'user_info' | 'id_card' | 'phone' | 'bank_card' | 'address' | 'org' | 'ip' | 'domain' | 'plate';
  value: string;
  pageIndex: number; // 所在页码 (从1开始)
  contextSnippet?: string; // 上下文片段，用于定位
}

export interface SecurityReport {
  overallScore: number; // 0-100
  virusCheck: { status: 'clean' | 'infected'; engine: string; details: string };
  staticAnalysis: { issuesCount: number; severity: 'low' | 'medium' | 'high'; details: string[] };
  dynamicAnalysis: { sandboxBehavior: string; networkActivity: string; details: string };
}

export interface PageContent {
  pageIndex: number;
  originalMarkdown: string; // 原始文本（Markdown格式，支持表格图片等）
  translatedMarkdown?: string; // 翻译后的文本
}

export interface SmartFile {
  id: string;
  name: string;
  datasetName: string;
  sourceType: string; // e.g. "NAS挂载", "本地上传"
  size: number;
  fileType: string; // e.g. "PDF", "DOCX"
  sourceArchive?: string; // 来源压缩包，无则为 "-"
  sourcePath?: string; // 解压路径，无则为 "-"
  fileHash: string; // SHA256
  
  securityStatus: SecurityStatus;
  parsingStatus: ParsingStatus;
  aiSummary: string;
  
  securityReport: SecurityReport;
  entities: EntityItem[];
  contentPages: PageContent[];
}
