
export type SearchMode = 'ai' | 'traditional' | 'sql';

export interface InferenceCapsule {
  id: string;
  type: 'time' | 'keyword' | 'entity' | 'field';
  label: string;
  value: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'document' | 'database_row';
  source: string; // e.g. "OFAC List", "Report.pdf"
  summary: string;
  score: number;
  timestamp: string;
  metadata: {
    fileType?: string;
    datasetId?: string;
    topicId?: string; // for database rows
    [key: string]: any;
  };
  tags: string[];
}

export interface EntityAttribute {
  key: string;
  label: string;
  value: string;
}

export interface EntityProfileData {
  id: string;
  name: string;
  avatar?: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskTags: string[]; // e.g., ["PEP", "Sanctioned"]
  
  basicInfo: EntityAttribute[];
  contactInfo: EntityAttribute[];
  
  // 溯源信息
  sourceDataset: { id: string; name: string };
  sourceTopic?: { id: string; name: string }; // 如果是结构化数据
  
  description: string;
}
