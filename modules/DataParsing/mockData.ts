import { StructuredFile } from './types';

// 模拟 CSV 数据预览
const CSV_PREVIEW = {
    headers: ['id', 'full_name', 'u_email', 'phone_num', 'reg_date', 'status'],
    rows: [
        ['1001', 'Alice Wang', 'alice@example.com', '13812345678', '2023-01-01', 'Active'],
        ['1002', 'Bob Zhang', 'bob.z@test.org', '13987654321', '2023-01-02', 'Inactive'],
        ['1003', 'Charlie Li', 'charlie123@163.com', '13700001111', '2023-01-03', 'Active'],
        ['1004', 'David Chen', 'david.c@company.cn', '18612312312', '2023-01-04', 'Active'],
    ]
};

// 模拟 SQL DDL
const SQL_DDL = `CREATE TABLE \`sys_users\` (
  \`user_id\` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  \`username\` varchar(50) NOT NULL COMMENT '账号',
  \`password_hash\` varchar(100) DEFAULT NULL COMMENT '密码哈希',
  \`email\` varchar(100) DEFAULT NULL COMMENT '邮箱',
  \`mobile\` varchar(20) DEFAULT NULL COMMENT '手机号',
  \`id_card_enc\` varchar(200) DEFAULT NULL COMMENT '身份证(加密)',
  \`create_time\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`user_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统用户表';`;

export const mockStructuredFiles: StructuredFile[] = [
  {
    id: 's1',
    name: 'user_export_v2.csv',
    datasetName: '12月3号数据',
    sourceType: '本地上传',
    size: 4500000,
    fileType: 'CSV',
    sourceArchive: '-',
    sourcePath: '-',
    fileHash: 'cc88ff99aa77bb66554433221100ffee',
    parsingStatus: 'success',
    dbType: '-', // CSV 没有特定 DB 类型
    recordCount: 12580,
    aiStructureSummary: '该 CSV 文件包含标准的表格结构，主要存储用户基础信息。系统自动识别出首行为表头。检测到包含个人身份信息 (PII) 列，如邮箱和手机号。日期格式为 YYYY-MM-DD。',
    detectedDDL: `/* Inferred Schema from CSV Header */
TABLE csv_import_temp (
    id INT,
    full_name VARCHAR(255),
    u_email VARCHAR(255),
    phone_num VARCHAR(20),
    reg_date DATE,
    status VARCHAR(50)
);`,
    fieldMappings: [
        { id: 'm1', originalKey: 'u_email', targetKey: 'email', targetType: 'email', confidence: 98, isConfirmed: true },
        { id: 'm2', originalKey: 'phone_num', targetKey: 'phone', targetType: 'phone', confidence: 95, isConfirmed: true },
        { id: 'm3', originalKey: 'full_name', targetKey: 'name', targetType: 'user_info', confidence: 85, isConfirmed: false },
        { id: 'm4', originalKey: 'id', targetKey: 'user_id', targetType: 'other', confidence: 60, isConfirmed: false },
    ],
    previewData: CSV_PREVIEW
  },
  {
    id: 's2',
    name: 'full_backup_20241201.sql',
    datasetName: '12月3号数据',
    sourceType: 'FTP',
    size: 156000000,
    fileType: 'SQL',
    sourceArchive: 'db_dump.zip',
    sourcePath: '/backups/mysql/',
    fileHash: '1234567890abcdef1234567890abcdef',
    parsingStatus: 'success',
    dbType: 'MySQL 8.0',
    recordCount: 8500,
    aiStructureSummary: '这是一个标准的 MySQL 数据库转储文件。包含 `sys_users`, `sys_logs` 等 5 张表的定义及 INSERT 语句。主要高价值数据集中在 `sys_users` 表中，包含加密的身份证号和明文手机号。',
    detectedDDL: SQL_DDL,
    fieldMappings: [
        { id: 'sql1', originalKey: 'username', targetKey: 'account', targetType: 'account', confidence: 99, isConfirmed: true },
        { id: 'sql2', originalKey: 'email', targetKey: 'email', targetType: 'email', confidence: 100, isConfirmed: true },
        { id: 'sql3', originalKey: 'mobile', targetKey: 'phone', targetType: 'phone', confidence: 98, isConfirmed: true },
        { id: 'sql4', originalKey: 'id_card_enc', targetKey: 'id_card', targetType: 'id_card', confidence: 90, isConfirmed: false },
        { id: 'sql5', originalKey: 'password_hash', targetKey: 'password', targetType: 'password', confidence: 92, isConfirmed: true },
    ],
    previewData: {
        headers: ['user_id', 'username', 'email', 'mobile', 'create_time'],
        rows: [
            [1, 'admin', 'admin@sys.com', '13800000000', '2023-05-01 10:00:00'],
            [2, 'operator', 'op@sys.com', '13911112222', '2023-05-02 11:30:00'],
            [3, 'guest', 'guest@sys.com', '13733334444', '2023-06-15 09:20:00'],
        ]
    }
  },
  {
    id: 's3',
    name: 'app_logs.json',
    datasetName: '运维日志集',
    sourceType: '本地上传',
    size: 1024 * 500,
    fileType: 'JSON',
    sourceArchive: '-',
    sourcePath: '-',
    fileHash: 'aabbccddeeff00112233445566778899',
    parsingStatus: 'processing',
    dbType: '-',
    recordCount: 0,
    aiStructureSummary: '正在分析 JSON 嵌套结构...',
    detectedDDL: 'Analyzing...',
    fieldMappings: [],
    previewData: 'Loading preview...'
  }
];
