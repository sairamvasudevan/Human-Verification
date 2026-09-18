import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Activity, Globe, Filter, Search } from 'lucide-react';
import { SAMPLE_ENTERPRISE_LOGS } from '../../data/mockData';
import { VerificationLog } from '../../types';

export const EnterpriseDashboardView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'verified' | 'intercepted'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLogs = SAMPLE_ENTERPRISE_LOGS.filter((log) => {
    if (filter === 'verified' && log.verdict !== 'VERIFIED_HUMAN' && log.verdict !== 'ASSISTIVE_VERIFIED') {
      return false;
    }
    if (filter === 'intercepted' && (log.verdict === 'VERIFIED_HUMAN' || log.verdict === 'ASSISTIVE_VERIFIED')) {
      return false;
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        log.sessionId.toLowerCase().includes(term) ||
        log.originCountry.toLowerCase().includes(term) ||
        log.userAgent.toLowerCase().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="w-full bg-[#0f131b] py-12">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4edea3] uppercase tracking-wider">
                ENTERPRISE SOC TELEMETRY
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]"></span>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a]">
                CLUSTER ID: US-EAST-EDGE-09
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-bold text-[#dfe2ed]">
              Enterprise Live Telemetry Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-[#1c2027] border border-[#262a32] rounded flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#dfe2ed] font-semibold">
                ACTIVE THROUGHPUT: 1,480 req/s
              </span>
            </div>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[#1c2027] border border-[#262a32] rounded-xl">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block mb-1">
              TODAY'S VERIFICATIONS
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#dfe2ed]">
              842,109
            </span>
            <span className="font-['Inter'] text-xs text-[#4edea3] block mt-1">
              +14.2% vs yesterday
            </span>
          </div>

          <div className="p-4 bg-[#1c2027] border border-[#262a32] rounded-xl">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block mb-1">
              ATTACKS INTERCEPTED
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#ffb4ab]">
              12,481
            </span>
            <span className="font-['Inter'] text-xs text-[#ffb4ab] block mt-1">
              100% Interception Rate
            </span>
          </div>

          <div className="p-4 bg-[#1c2027] border border-[#262a32] rounded-xl">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block mb-1">
              MEAN SESSION LATENCY
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#4cd7f6]">
              4.28s
            </span>
            <span className="font-['Inter'] text-xs text-[#bbcabf] block mt-1">
              Client WASM Execution
            </span>
          </div>

          <div className="p-4 bg-[#1c2027] border border-[#262a32] rounded-xl">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#86948a] uppercase block mb-1">
              GLOBAL EDGE AVAILABILITY
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#4edea3]">
              99.998%
            </span>
            <span className="font-['Inter'] text-xs text-[#bbcabf] block mt-1">
              14 POP Nodes Active
            </span>
          </div>
        </div>

        {/* Real-time Event Stream Table */}
        <div className="bg-[#1c2027] border border-[#31353d] rounded-2xl overflow-hidden shadow-xl">
          {/* Table Header Controls */}
          <div className="p-4 bg-[#262a32] border-b border-[#3c4a42]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#dfe2ed]">
                Live Session Ingestion Stream
              </span>
              <span className="text-xs bg-[#181c23] text-[#4cd7f6] px-2 py-0.5 rounded font-['JetBrains_Mono']">
                Streaming
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#86948a]" />
                <input
                  type="text"
                  placeholder="Filter sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0a0e15] border border-[#262a32] rounded pl-8 pr-3 py-1 font-['Inter'] text-xs text-[#dfe2ed] focus:outline-none focus:border-[#4cd7f6]"
                />
              </div>

              <div className="flex items-center gap-1 bg-[#181c23] p-1 rounded border border-[#262a32]">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-2 py-0.5 text-xs rounded transition-colors cursor-pointer ${
                    filter === 'all' ? 'bg-[#31353d] text-[#dfe2ed] font-semibold' : 'text-[#86948a]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('verified')}
                  className={`px-2 py-0.5 text-xs rounded transition-colors cursor-pointer ${
                    filter === 'verified' ? 'bg-[#10b981]/20 text-[#4edea3] font-semibold' : 'text-[#86948a]'
                  }`}
                >
                  Verified
                </button>
                <button
                  onClick={() => setFilter('intercepted')}
                  className={`px-2 py-0.5 text-xs rounded transition-colors cursor-pointer ${
                    filter === 'intercepted' ? 'bg-[#93000a]/40 text-[#ffb4ab] font-semibold' : 'text-[#86948a]'
                  }`}
                >
                  Attacks
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-['JetBrains_Mono'] text-xs">
              <thead className="bg-[#181c23] text-[#86948a] border-b border-[#262a32]">
                <tr>
                  <th className="px-4 py-3">TIMESTAMP</th>
                  <th className="px-4 py-3">SESSION ID</th>
                  <th className="px-4 py-3">MODE</th>
                  <th className="px-4 py-3">VERDICT</th>
                  <th className="px-4 py-3">RISK SCORE</th>
                  <th className="px-4 py-3">ORIGIN REGION</th>
                  <th className="px-4 py-3">CLIENT AGENT / DRIVER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262a32]">
                {filteredLogs.map((log) => {
                  const isSuccess =
                    log.verdict === 'VERIFIED_HUMAN' || log.verdict === 'ASSISTIVE_VERIFIED';

                  return (
                    <tr key={log.id} className="hover:bg-[#262a32]/50 transition-colors">
                      <td className="px-4 py-3 text-[#86948a]">{log.timestamp}</td>
                      <td className="px-4 py-3 text-[#4cd7f6] font-semibold">{log.sessionId}</td>
                      <td className="px-4 py-3 text-[#bbcabf]">{log.mode}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            isSuccess
                              ? 'bg-[#10b981]/20 text-[#4edea3]'
                              : 'bg-[#93000a]/40 text-[#ffb4ab]'
                          }`}
                        >
                          {isSuccess ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                          <span>{log.verdict}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={log.riskScore < 0.1 ? 'text-[#4edea3] font-bold' : 'text-[#ffb4ab] font-bold'}
                        >
                          {log.riskScore.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#dfe2ed]">{log.originCountry}</td>
                      <td className="px-4 py-3 text-[#86948a] truncate max-w-xs">{log.userAgent}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
