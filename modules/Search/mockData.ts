
import { SearchResult, EntityProfileData } from './types';

export const mockSearchResults: SearchResult[] = [
  {
    id: 'res-1',
    title: '弗拉基米尔·普京 (Vladimir Putin)',
    type: 'database_row',
    source: '全球制裁名单库 (OFAC)',
    summary: 'Matched entity in SDN List. Role: President of the Russian Federation. DOB: 1952-10-07. POx: St. Petersburg.',
    score: 98,
    timestamp: '2024-01-15',
    tags: ['PEP', 'Sanctioned', 'Head of State'],
    metadata: {
      topicId: 'db_sanctions',
      datasetId: 'ds-global-sanctions'
    }
  },
  {
    id: 'res-2',
    title: '关于俄罗斯联邦相关人员的资产分析报告.pdf',
    type: 'document',
    source: '2024年Q1情报汇总',
    summary: '...documents regarding the assets of <span class="bg-yellow-200">Vladimir Putin</span> and his close associates have been analyzed. The report indicates...',
    score: 85,
    timestamp: '2024-03-10',
    tags: ['PDF', 'Report'],
    metadata: {
      fileType: 'PDF',
      datasetId: 'ds-reports-2024'
    }
  },
  {
    id: 'res-3',
    title: 'Bank Transaction Log - 2023.csv',
    type: 'document',
    source: 'Leak_Bank_2023',
    summary: 'Transaction ID: 99887766. Related to entity code VP-01. Amount: $5,000,000. Flagged as suspicious.',
    score: 72,
    timestamp: '2023-12-12',
    tags: ['CSV', 'Financial'],
    metadata: {
      fileType: 'CSV',
      datasetId: 'ds-leaks-bank'
    }
  }
];

export const mockEntityProfile: EntityProfileData = {
  id: 'ent-putin',
  name: '弗拉基米尔·普京 (Vladimir Putin)',
  riskLevel: 'high',
  riskTags: ['Sanctioned Entity', 'PEP', 'Head of State'],
  description: 'Vladimir Vladimirovich Putin is a Russian politician and former intelligence officer who is the president of Russia.',
  
  basicInfo: [
    { key: 'nationality', label: '国籍 (Nationality)', value: '俄罗斯 (Russia)' },
    { key: 'dob', label: '出生日期 (Date of Birth)', value: '1952-10-07' },
    { key: 'gender', label: '性别 (Gender)', value: 'Male' },
    { key: 'pob', label: '出生地 (Place of Birth)', value: 'Leningrad (now St. Petersburg)' },
    { key: 'aliases', label: '别名 (Aliases)', value: 'Vladimir Vladimirovich Putin; Putin; President of Russia' }
  ],
  
  contactInfo: [
    { key: 'address', label: '地址 (Address)', value: 'Moscow, Kremlin' },
    { key: 'email', label: '邮箱 (Email)', value: 'presid@gov.ru' },
    { key: 'phone', label: '电话 (Phone)', value: '+7 495 606 36 02' }
  ],
  
  sourceDataset: { id: 'ds-global-sanctions', name: 'Global Sanctions List 2024' },
  sourceTopic: { id: 'db_sanctions', name: '全球制裁实体库' }
};
