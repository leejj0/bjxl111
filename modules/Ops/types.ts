
export type RoleType = 'admin' | 'auditor' | 'operator' | 'user';

export interface User {
  id: string;
  username: string;
  name: string;
  role: RoleType;
  roleName: string; // Display name e.g. "超级管理员"
  department: string;
  status: 'active' | 'inactive' | 'frozen';
  lastLogin: string;
  createdAt: string;
}

export interface PermissionNode {
  id: string;
  name: string;
  key: string; // e.g., 'search', 'import'
  actions: {
    view: boolean;
    edit: boolean;
    delete: boolean;
    export: boolean;
  };
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  updatedAt: string;
  permissions: PermissionNode[]; // 简化的权限树结构
}

export interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  module: string; // e.g., "知识库", "系统登录"
  action: string;
  target: string;
  ip: string;
  status: 'success' | 'failure';
  details: string;
}

export interface ApiToken {
  id: string;
  name: string;
  keyMasked: string; // e.g. "sk-abc***"
  scope: string[];
  rateLimit: number; // RPM
  status: 'active' | 'disabled';
  createdAt: string;
  lastUsed: string;
}

export interface DashboardMetrics {
  healthScore: number;
  activeUsers: number;
  activeUsersTrend: number; // percentage
  aiLatency: number; // ms
  pendingAlerts: number;
  storageUsage: { label: string; value: number; color: string }[];
  trafficTrend: { time: string; value: number; load: number }[];
}
