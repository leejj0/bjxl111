
import { User, Role, LogEntry, ApiToken, DashboardMetrics } from './types';

export const mockMetrics: DashboardMetrics = {
  healthScore: 98,
  activeUsers: 1248,
  activeUsersTrend: 12,
  aiLatency: 240,
  pendingAlerts: 14,
  storageUsage: [
    { label: '原始文件', value: 45, color: 'bg-blue-500' },
    { label: '解析数据', value: 30, color: 'bg-cyan-500' },
    { label: '向量索引', value: 15, color: 'bg-purple-500' },
    { label: '日志归档', value: 10, color: 'bg-slate-400' },
  ],
  trafficTrend: [
    { time: '08:00', value: 200, load: 30 },
    { time: '10:00', value: 450, load: 55 },
    { time: '12:00', value: 980, load: 85 },
    { time: '14:00', value: 600, load: 60 },
    { time: '16:00', value: 800, load: 70 },
    { time: '18:00', value: 300, load: 40 },
    { time: '20:00', value: 150, load: 20 },
  ]
};

export const mockUsers: User[] = [
  { id: 'u1', username: 'admin', name: '系统管理员', role: 'admin', roleName: '超级管理员', department: 'IT部', status: 'active', lastLogin: '2025-12-31 09:00', createdAt: '2023-01-01' },
  { id: 'u2', username: 'chenp', name: '陈平', role: 'operator', roleName: '数据操作员', department: '情报分析部', status: 'active', lastLogin: '2025-12-31 08:56', createdAt: '2024-05-12' },
  { id: 'u3', username: 'zhangs', name: '张三', role: 'auditor', roleName: '审计员', department: '合规部', status: 'active', lastLogin: '2025-12-30 14:20', createdAt: '2024-06-01' },
  { id: 'u4', username: 'liuw', name: '刘伟', role: 'user', roleName: '普通用户', department: '研发部', status: 'inactive', lastLogin: '2025-11-15 10:00', createdAt: '2024-08-20' },
  { id: 'u5', username: 'wangx', name: '王茜', role: 'user', roleName: '普通用户', department: '市场部', status: 'frozen', lastLogin: '2025-10-01 11:30', createdAt: '2024-09-10' },
];

export const mockRoles: Role[] = [
  { 
    id: 'r1', name: '超级管理员', description: '拥有系统所有权限', userCount: 2, updatedAt: '2023-01-01',
    permissions: [{ id: 'p1', name: '全系统', key: 'all', actions: { view: true, edit: true, delete: true, export: true } }]
  },
  { 
    id: 'r2', name: '数据操作员', description: '负责数据的导入、清洗与解析', userCount: 15, updatedAt: '2024-05-20',
    permissions: [
      { id: 'p2', name: '数据导入', key: 'import', actions: { view: true, edit: true, delete: false, export: false } },
      { id: 'p3', name: '智能检索', key: 'search', actions: { view: true, edit: false, delete: false, export: true } }
    ]
  },
  { 
    id: 'r3', name: '审计员', description: '仅查看日志与报表，无数据操作权', userCount: 3, updatedAt: '2024-06-01',
    permissions: [
       { id: 'p4', name: '日志审计', key: 'audit', actions: { view: true, edit: false, delete: false, export: true } }
    ]
  }
];

export const mockLogs: LogEntry[] = [
  { id: 'l1', timestamp: '2025-12-31 08:56:34', user: 'chenp', module: '知识库', action: '获取文件列表', target: '知识库/全部文件', ip: '192.168.176.62', status: 'success', details: 'Query params: { limit: 20 }' },
  { id: 'l2', timestamp: '2025-12-31 08:56:32', user: 'chenp', module: '知识库', action: '查看分页', target: '知识库/Page 1', ip: '192.168.176.62', status: 'success', details: '-' },
  { id: 'l3', timestamp: '2025-12-31 08:56:28', user: 'chenp', module: '系统登录', action: '登录成功', target: '-', ip: '192.168.176.62', status: 'success', details: 'Method: Password' },
  { id: 'l4', timestamp: '2025-12-31 08:56:27', user: 'chenp', module: '系统登录', action: '登录失败', target: '-', ip: '192.168.176.62', status: 'failure', details: 'Reason: Wrong Password' },
  { id: 'l5', timestamp: '2025-12-31 08:45:12', user: 'admin', module: '用户管理', action: '冻结用户', target: 'wangx (ID: u5)', ip: '10.0.0.5', status: 'success', details: 'Reason: Security Policy' },
  { id: 'l6', timestamp: '2025-12-31 08:30:00', user: 'zhangs', module: '审计日志', action: '导出日志', target: 'Log_Export_20251231.csv', ip: '192.168.10.12', status: 'success', details: 'Range: Last 7 days' },
];

export const mockTokens: ApiToken[] = [
  { id: 't1', name: '外部CRM接入', keyMasked: 'sk-a7b2***9c1', scope: ['search:read', 'analysis:run'], rateLimit: 60, status: 'active', createdAt: '2024-11-01', lastUsed: '2025-12-31 08:55' },
  { id: 't2', name: '移动端App', keyMasked: 'sk-x9y8***z3a', scope: ['all:read'], rateLimit: 120, status: 'active', createdAt: '2024-10-15', lastUsed: '2025-12-31 08:59' },
  { id: 't3', name: '测试Token', keyMasked: 'sk-test***000', scope: ['search:read'], rateLimit: 10, status: 'disabled', createdAt: '2024-12-01', lastUsed: '2024-12-05 10:00' },
];
