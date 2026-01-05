import { SmartFile } from './types';

// 模拟Markdown内容，包含复杂的表格和图片占位符
const MOCK_MD_PAGE_1 = `
# 2024年第一季度 核心用户数据泄露风险分析报告

## 1. 概述
本报告旨在分析近期发现的潜在数据泄露风险，涉及多个关键业务系统。

## 2. 涉事人员名单 (绝密)

| 姓名 | 部门 | 职位 | 风险等级 |
| :--- | :--- | :--- | :--- |
| 张三 | 技术部 | 架构师 | 高 |
| 李四 | 财务部 | 出纳 | 中 |
| 王五 | 运维部 | DBA | 高 |

![风险趋势图](https://placehold.co/600x200?text=Risk+Trend+Chart)

> 注意：以下信息包含敏感PII数据，请严格保密。

`;

const MOCK_MD_PAGE_1_TRANS = `
# Q1 2024 Core User Data Leakage Risk Analysis Report

## 1. Overview
This report aims to analyze recently discovered potential data leakage risks involving multiple key business systems.

## 2. List of Involved Personnel (Top Secret)

| Name | Dept | Position | Risk Level |
| :--- | :--- | :--- | :--- |
| Zhang San | Tech | Architect | High |
| Li Si | Finance | Cashier | Medium |
| Wang Wu | Ops | DBA | High |

![Risk Trend Chart](https://placehold.co/600x200?text=Risk+Trend+Chart)

> Note: The following information contains sensitive PII data, please keep it strictly confidential.
`;

const MOCK_MD_PAGE_2 = `
## 3. 详细敏感信息提取

在日志文件中发现了以下明文存储的凭证：

**数据库连接串:**
\`jdbc:mysql://192.168.1.100:3306/users?user=admin&password=Password123!\`

**管理员联系方式:**
* 电话: 13800138000
* 邮箱: admin@company.com
* 身份证: 110101199001011234

### 3.1 异常IP访问记录

| 来源 IP | 归属地 | 访问时间 | 行为 |
| :--- | :--- | :--- | :--- |
| 202.96.128.86 | 广州 | 2024-03-12 10:00 | 暴力破解 |
| 14.215.177.38 | 北京 | 2024-03-12 10:05 | SQL注入 |

`;

const MOCK_MD_PAGE_2_TRANS = `
## 3. Detailed Sensitive Information Extraction

The following credentials stored in plain text were found in the log files:

**Database Connection String:**
\`jdbc:mysql://192.168.1.100:3306/users?user=admin&password=Password123!\`

**Admin Contact:**
* Phone: 13800138000
* Email: admin@company.com
* ID Card: 110101199001011234

### 3.1 Abnormal IP Access Records

| Source IP | Location | Access Time | Behavior |
| :--- | :--- | :--- | :--- |
| 202.96.128.86 | Guangzhou | 2024-03-12 10:00 | Brute Force |
| 14.215.177.38 | Beijing | 2024-03-12 10:05 | SQL Injection |
`;

export const mockFiles: SmartFile[] = [
  {
    id: 'f1',
    name: '2024_Q1_Core_Risk_Report.pdf',
    datasetName: '12月3号数据',
    sourceType: '本地上传',
    size: 2450000,
    fileType: 'PDF',
    sourceArchive: 'data_backup_2024.zip',
    sourcePath: '/reports/q1/',
    fileHash: 'a1b2c3d4e5f67890abcdef1234567890',
    securityStatus: 'dangerous',
    parsingStatus: 'success',
    aiSummary: '该文档是一份关于2024年第一季度核心用户数据泄露的风险分析报告。文档中包含了涉事人员名单表格、风险趋势图以及大量敏感的PII信息（如数据库密码、身份证号、手机号等）。建议立即进行脱敏处理。',
    securityReport: {
      overallScore: 45,
      virusCheck: { status: 'clean', engine: 'ClamAV', details: '未发现已知病毒签名。' },
      staticAnalysis: { issuesCount: 12, severity: 'high', details: ['发现明文密码', '发现身份证号格式', '包含内部IP地址结构'] },
      dynamicAnalysis: { sandboxBehavior: '正常', networkActivity: '无外连请求', details: '文档打开时未触发宏或恶意脚本。' }
    },
    entities: [
      { id: 'e1', type: 'password', value: 'Password123!', pageIndex: 2, contextSnippet: 'user=admin&password=Password123!' },
      { id: 'e2', type: 'phone', value: '13800138000', pageIndex: 2, contextSnippet: '电话: 13800138000' },
      { id: 'e3', type: 'email', value: 'admin@company.com', pageIndex: 2, contextSnippet: '邮箱: admin@company.com' },
      { id: 'e4', type: 'id_card', value: '110101199001011234', pageIndex: 2, contextSnippet: '身份证: 110101199001011234' },
      { id: 'e5', type: 'ip', value: '192.168.1.100', pageIndex: 2, contextSnippet: 'jdbc:mysql://192.168.1.100:3306' },
      { id: 'e6', type: 'ip', value: '202.96.128.86', pageIndex: 2, contextSnippet: '202.96.128.86 | 广州' },
      { id: 'e7', type: 'user_info', value: '张三', pageIndex: 1, contextSnippet: '张三 | 技术部' },
      { id: 'e8', type: 'org', value: '技术部', pageIndex: 1, contextSnippet: '张三 | 技术部' },
    ],
    contentPages: [
      { pageIndex: 1, originalMarkdown: MOCK_MD_PAGE_1, translatedMarkdown: MOCK_MD_PAGE_1_TRANS },
      { pageIndex: 2, originalMarkdown: MOCK_MD_PAGE_2, translatedMarkdown: MOCK_MD_PAGE_2_TRANS },
    ]
  },
  {
    id: 'f2',
    name: 'invoice_template_v2.docx',
    datasetName: '财务报表源',
    sourceType: 'NAS挂载',
    size: 54000,
    fileType: 'DOCX',
    sourceArchive: '-',
    sourcePath: '-',
    fileHash: '9876543210fedcba0987654321fedcba',
    securityStatus: 'safe',
    parsingStatus: 'success',
    aiSummary: '这是一份标准的发票模板文件，未包含敏感数据。',
    securityReport: {
      overallScore: 98,
      virusCheck: { status: 'clean', engine: 'ClamAV', details: '通过' },
      staticAnalysis: { issuesCount: 0, severity: 'low', details: ['文档结构正常'] },
      dynamicAnalysis: { sandboxBehavior: '正常', networkActivity: '无', details: '-' }
    },
    entities: [],
    contentPages: [
       { pageIndex: 1, originalMarkdown: '# Invoice Template\n\nNo sensitive data here.', translatedMarkdown: '# 发票模板\n\n此处无敏感数据。' }
    ]
  },
  {
    id: 'f3',
    name: 'unknown_script.js',
    datasetName: '12月3号数据',
    sourceType: '本地上传',
    size: 1200,
    fileType: 'JS',
    sourceArchive: '-',
    sourcePath: '-',
    fileHash: 'abcdefabcdefabcdefabcdefabcdefab',
    securityStatus: 'suspicious',
    parsingStatus: 'processing',
    aiSummary: '正在分析中...',
    securityReport: {
        overallScore: 60,
        virusCheck: { status: 'clean', engine: 'ClamAV', details: '通过' },
        staticAnalysis: { issuesCount: 1, severity: 'medium', details: ['包含混淆代码'] },
        dynamicAnalysis: { sandboxBehavior: '等待沙箱运行', networkActivity: '-', details: '-' }
    },
    entities: [],
    contentPages: []
  }
];
