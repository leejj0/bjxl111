export type FileStatus = 'waiting' | 'uploading' | 'paused' | 'completed' | 'error';
export type ParsingMethod = 'structured' | 'unstructured' | 'archive' | 'pending_decompression';

export interface UploadFile {
  id: string;
  taskId: number; // 关联的任务ID
  name: string;
  size: number; // bytes
  uploaded: number; // bytes
  speed: number; // bytes per second
  progress: number; // 0-100
  status: FileStatus;
  parsingMethod: ParsingMethod;
  sourceArchive?: string; // 来源压缩包名称
  extractedPath?: string; // 解压后的目录路径
}

export interface DatasetTask {
  id: number;
  name: string;
  user: string;
  created: string;
  updated: string;
  isPublic: boolean;
}
