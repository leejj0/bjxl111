import { KnowledgeDataset, KnowledgeFile, DatabaseTopic, AggregatedRecord } from './types';

export const mockDatasets: KnowledgeDataset[] = [
  {
    id: 'kb1',
    name: '微信公众号安全知识库',
    description: '收集来源于微信公众号各类安全文章，用于威胁情报分析。',
    type: 'public',
    fileCount: 1200,
    totalSize: '2.5 GB',
    updatedAt: '2025-12-22 09:17:54',
    tags: ['威胁情报', '安全文章', '公众号'],
    allowedExtensions: ['.pdf', '.html', '.txt'],
    isDisabled: false,
    stats: {
      fileStatus: { total: 1200, success: 1190, failed: 10 },
      summaryStatus: { total: 1200, success: 1150, failed: 50 },
      tagStatus: { total: 1200, success: 1200, failed: 0 }
    }
  },
  {
    id: 'kb2',
    name: 'test251212',
    description: '12月12日测试数据集',
    type: 'public',
    fileCount: 6,
    totalSize: '12 MB',
    updatedAt: '2025-12-12 14:28:37',
    tags: ['测试'],
    allowedExtensions: ['.docx'],
    isDisabled: false,
    stats: {
      fileStatus: { total: 6, success: 6, failed: 0 },
      summaryStatus: { total: 6, success: 6, failed: 0 },
      tagStatus: { total: 6, success: 5, failed: 1 }
    }
  },
  {
    id: 'kb3',
    name: 'APT知识库',
    description: '高级持续性威胁相关报告合集',
    type: 'public',
    fileCount: 8500,
    totalSize: '15 GB',
    updatedAt: '2025-11-03 11:47:54',
    tags: ['APT', 'Report', 'RedTeam'],
    allowedExtensions: ['.pdf'],
    isDisabled: true, // 模拟被禁用
    stats: {
      fileStatus: { total: 8500, success: 8000, failed: 500 },
      summaryStatus: { total: 8500, success: 7000, failed: 1500 },
      tagStatus: { total: 8500, success: 8400, failed: 100 }
    }
  },
  {
    id: 'kb4',
    name: '取证手册',
    description: '内部取证流程SOP',
    type: 'public',
    fileCount: 2,
    totalSize: '5 MB',
    updatedAt: '2025-11-24 20:17:21',
    tags: ['SOP', 'Forensics'],
    allowedExtensions: ['.pdf', '.md'],
    isDisabled: false,
    stats: {
      fileStatus: { total: 2, success: 2, failed: 0 },
      summaryStatus: { total: 2, success: 2, failed: 0 },
      tagStatus: { total: 2, success: 2, failed: 0 }
    }
  }
];

export const mockFiles: KnowledgeFile[] = [
    { id: 'f1', name: '奇怪怪怪', type: 'folder', updatedAt: '2025-12-28', children: [] },
    { id: 'f2', name: '沙箱对接文档4.5.docx', type: 'file', size: 734630, updatedAt: '2025-12-29', status: 'parsed' },
    { id: 'f3', name: '二合一沙箱', type: 'folder', updatedAt: '2025-12-29', children: [] },
    { id: 'f4', name: '专项-沙箱', type: 'folder', updatedAt: '2025-12-29', children: [] },
    { id: 'f5', name: '不是新建的文件', type: 'folder', updatedAt: '2025-12-29', children: [] },
];

// --- Mock Data for Database Module ---

export const mockTopics: DatabaseTopic[] = [
    {
        id: 'db_person',
        title: '人员身份信息库',
        description: '从简历、通讯录、HR报表中提取的所有人员实名信息，包含姓名、手机、身份证等敏感要素。',
        recordCount: 12580,
        sourceCount: 14,
        riskLevel: 'high',
        updatedAt: '2025-12-29 14:00',
        tags: ['PII', '实名数据', '社工库'],
        fields: ['姓名', '身份证号', '手机号', '邮箱', '家庭住址', '职位']
    },
    {
        id: 'db_credential',
        title: '泄露凭据资产库',
        description: '从配置文件、日志、代码库中提取的账号密码对、API Key、Access Token等认证信息。',
        recordCount: 342,
        sourceCount: 8,
        riskLevel: 'high',
        updatedAt: '2025-12-28 09:30',
        tags: ['密码', 'Token', 'AK/SK'],
        fields: ['账号/Key', '密码/Secret', '服务地址', '类型', '来源位置']
    },
    {
        id: 'db_asset',
        title: 'IT 基础设施资产库',
        description: '从运维文档、扫描报告中提取的服务器IP、域名、端口及中间件版本信息。',
        recordCount: 5600,
        sourceCount: 5,
        riskLevel: 'medium',
        updatedAt: '2025-12-25 11:20',
        tags: ['资产', 'IP', '域名'],
        fields: ['IP地址', '端口', '服务名', '操作系统', '域名']
    },
    {
        id: 'db_audit',
        title: '操作审计日志库',
        description: '汇聚各系统的关键操作日志，用于行为分析。',
        recordCount: 150000,
        sourceCount: 22,
        riskLevel: 'low',
        updatedAt: '2025-12-30 08:00',
        tags: ['日志', '审计'],
        fields: ['操作人', '动作', '对象', '时间', '结果']
    }
];

// Mock Records for "人员身份信息库"
export const mockPersonRecords: AggregatedRecord[] = [
    { id: 'r1', '姓名': '张三', '身份证号': '110101199001011234', '手机号': '13800138000', '邮箱': 'zhangsan@corp.com', '职位': '架构师', _sourceDataset: '12月HR花名册', _riskScore: 90 },
    { id: 'r2', '姓名': '李四', '身份证号': '310101199205055678', '手机号': '13912345678', '邮箱': 'lisi@corp.com', '职位': '财务主管', _sourceDataset: '财务报销单2024', _riskScore: 85 },
    { id: 'r3', '姓名': '王五', '身份证号': '440101199508089900', '手机号': '15011112222', '邮箱': 'wangwu@corp.com', '职位': '运维工程师', _sourceDataset: '运维排班表', _riskScore: 60 },
    { id: 'r4', '姓名': '赵六', '身份证号': '510101199812123344', '手机号': '18099998888', '邮箱': 'zhaoliu@corp.com', '职位': '前端开发', _sourceDataset: '研发部通讯录', _riskScore: 50 },
    { id: 'r5', '姓名': 'Alice Chen', '身份证号': '-', '手机号': '+1 123-456-7890', '邮箱': 'alice.c@us.corp.com', '职位': 'Regional Manager', _sourceDataset: '海外员工列表', _riskScore: 40 },
];
