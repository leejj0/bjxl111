import React from 'react';
import { SmartFile } from '../types';

export const DetailSecurity = ({ file }: { file: SmartFile }) => {
  const { securityReport: report, securityStatus } = file;

  const getScoreColor = (score: number) => {
      if (score >= 90) return 'text-green-600';
      if (score >= 60) return 'text-orange-500';
      return 'text-red-600';
  };

  const StatusIcon = ({ status }: { status: string }) => {
      if(status === 'clean') return <span className="text-green-600 font-bold flex items-center gap-1">✅ 安全</span>;
      return <span className="text-red-600 font-bold flex items-center gap-1">☣️ 感染</span>;
  };

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="flex items-start gap-10 mb-10">
          {/* 左侧评分 */}
          <div className="w-1/3 bg-slate-50 rounded-2xl p-8 flex flex-col items-center justify-center border border-slate-100 text-center shadow-inner">
              <div className="text-slate-500 font-medium mb-4">综合安全评分</div>
              <div className={`text-6xl font-black mb-2 ${getScoreColor(report.overallScore)}`}>
                  {report.overallScore}
              </div>
              <div className="text-sm text-slate-400">分值越低风险越大</div>
              <div className={`mt-6 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider
                  ${securityStatus === 'safe' ? 'bg-green-100 text-green-700' : 
                    securityStatus === 'dangerous' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                  {securityStatus === 'safe' ? 'SAFE' : securityStatus === 'dangerous' ? 'DANGEROUS' : 'SUSPICIOUS'}
              </div>
          </div>

          {/* 右侧详情 */}
          <div className="flex-1 space-y-6">
              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                      <h5 className="font-bold text-slate-700 flex items-center gap-2">🔍 病毒扫描 <span className="text-xs font-normal bg-slate-100 px-2 py-0.5 rounded text-slate-500">Engine: {report.virusCheck.engine}</span></h5>
                      <StatusIcon status={report.virusCheck.status} />
                  </div>
                  <p className="text-sm text-slate-600">{report.virusCheck.details}</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                      <h5 className="font-bold text-slate-700 flex items-center gap-2">📉 静态分析 <span className="text-xs font-normal bg-slate-100 px-2 py-0.5 rounded text-slate-500">Issues: {report.staticAnalysis.issuesCount}</span></h5>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          report.staticAnalysis.severity === 'high' ? 'bg-red-100 text-red-700' : 
                          report.staticAnalysis.severity === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                      }`}>
                          {report.staticAnalysis.severity.toUpperCase()}
                      </span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                      {report.staticAnalysis.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                      <h5 className="font-bold text-slate-700 flex items-center gap-2">🧪 动态沙箱分析</h5>
                      <span className="text-xs text-slate-400">Behavior Monitor</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="font-semibold text-slate-500">行为:</span> {report.dynamicAnalysis.sandboxBehavior}</div>
                      <div><span className="font-semibold text-slate-500">网络:</span> {report.dynamicAnalysis.networkActivity}</div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
