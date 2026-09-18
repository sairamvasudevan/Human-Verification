import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, Send, Key, ShieldCheck } from 'lucide-react';

export const DeveloperApiView: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<'node' | 'python' | 'go' | 'curl'>('node');
  const [apiKey, setApiKey] = useState<string>('rct_test_7f9b0c3a812');
  const [reqMode, setReqMode] = useState<string>('adaptive');
  const [copied, setCopied] = useState<boolean>(false);
  const [responseJson, setResponseJson] = useState<string | null>(null);
  const [executing, setExecuting] = useState<boolean>(false);

  const snippets = {
    node: `import { ReactIdClient } from '@react-id/node';

const client = new ReactIdClient({
  apiKey: process.env.REACTID_SECRET_KEY,
  environment: 'production'
});

// Verify client-generated Ed25519 attestation token
const result = await client.verifications.verifyToken({
  token: req.body.reactIdToken,
  expectedNonce: req.session.nonce,
  maxRiskScore: 0.15
});

if (result.status === 'VERIFIED_HUMAN') {
  console.log('Human verified in ' + result.latencyMs + 'ms');
  grantAccess(req.user.id);
}`,
    python: `from react_id import ReactIdClient

client = ReactIdClient(api_key="rct_secret_...")

# Verify incoming token
result = client.verifications.verify_token(
    token=request.json["react_id_token"],
    expected_nonce=session["nonce"],
    min_confidence=0.95
)

if result.is_human:
    unlock_high_assurance_action(user_id=request.user.id)`,
    go: `package main

import (
  "context"
  "fmt"
  "github.com/react-id/go-sdk/reactid"
)

func main() {
  client := reactid.NewClient("rct_secret_...")
  res, err := client.Verifications.Verify(context.Background(), &reactid.VerifyParams{
    Token: "eyJhbGciOiJFZERTQTE5...",
  })
  if err == nil && res.Status == reactid.StatusVerifiedHuman {
    fmt.Println("Presence verified:", res.ConfidenceScore)
  }
}`,
    curl: `curl -X POST https://api.react-id.com/v1/verifications/verify \\
  -H "Authorization: Bearer rct_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "token": "eyJhbGciOiJFZERTQTE5I...",
    "mode": "adaptive",
    "challenge_nonce": "9b841a02-f91"
  }'`,
  };

  const handleRunApiTest = () => {
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      setResponseJson(
        JSON.stringify(
          {
            id: 'ver_9f83a021' + Math.random().toString(36).substring(2, 6),
            status: 'VERIFIED_HUMAN',
            confidence_score: 0.992,
            risk_band: 'LOW',
            saccade_latency_delta_ms: 224,
            rppg_perfusion_bpm: 74,
            mode_enforced: reqMode,
            session_duration_ms: 4820,
            attestation: {
              algorithm: 'Ed25519',
              verified_at: new Date().toISOString(),
              signature: 'ed25519:7b3a9...' + Math.random().toString(36).substring(2, 8),
            },
          },
          null,
          2
        )
      );
    }, 700);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[selectedLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0f131b] py-12">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 space-y-10">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4cd7f6] uppercase tracking-wider">
              DEVELOPER SPECIFICATION &amp; REPOSITORIES
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#86948a]">
              API VERSION 2025.1
            </span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-3xl md:text-4xl font-bold text-[#dfe2ed]">
            Developer API &amp; SDK Architecture
          </h1>
          <p className="font-['Inter'] text-sm text-[#bbcabf] max-w-3xl mt-2 leading-relaxed">
            Integrate client-side WebAssembly verification in under 5 minutes. Verify cryptographically signed tokens on your backend with standard Ed25519 verification.
          </p>
        </div>

        {/* Code & Documentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SDK Code Viewer (7 cols) */}
          <div className="lg:col-span-7 bg-[#1c2027] border border-[#31353d] rounded-2xl overflow-hidden shadow-xl">
            {/* Lang Tabs */}
            <div className="flex items-center justify-between bg-[#262a32] px-4 py-2 border-b border-[#3c4a42]/60">
              <div className="flex items-center gap-1.5">
                {(['node', 'python', 'go', 'curl'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-3 py-1 rounded font-['Inter'] text-xs uppercase font-semibold transition-all cursor-pointer ${
                      selectedLang === lang
                        ? 'bg-[#31353d] text-[#4edea3]'
                        : 'text-[#bbcabf] hover:text-[#dfe2ed]'
                    }`}
                  >
                    {lang === 'node' ? 'Node.js / TS' : lang}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 font-['JetBrains_Mono'] text-[11px] text-[#bbcabf] hover:text-white px-2 py-0.5 rounded bg-[#181c23] border border-[#3c4a42] cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#4edea3]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <div className="p-6 bg-[#0a0e15] font-['JetBrains_Mono'] text-xs overflow-x-auto min-h-[340px]">
              <pre className="text-[#dfe2ed] leading-relaxed">
                <code>{snippets[selectedLang]}</code>
              </pre>
            </div>
          </div>

          {/* Interactive API Playground Tester (5 cols) */}
          <div className="lg:col-span-5 bg-[#1c2027] border border-[#31353d] p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-[#262a32] mb-4">
                <Send className="w-4 h-4 text-[#4cd7f6]" />
                <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#dfe2ed]">
                  Live Token Verification Tester
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-['JetBrains_Mono'] text-[11px] text-[#86948a] uppercase block mb-1">
                    API KEY (TEST TENANT)
                  </label>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-[#0a0e15] border border-[#262a32] rounded px-3 py-1.5 font-['JetBrains_Mono'] text-xs text-[#dfe2ed] focus:outline-none focus:border-[#4cd7f6]"
                  />
                </div>

                <div>
                  <label className="font-['JetBrains_Mono'] text-[11px] text-[#86948a] uppercase block mb-1">
                    TARGET VERIFICATION MODE
                  </label>
                  <select
                    value={reqMode}
                    onChange={(e) => setReqMode(e.target.value)}
                    className="w-full bg-[#0a0e15] border border-[#262a32] rounded px-3 py-1.5 font-['JetBrains_Mono'] text-xs text-[#dfe2ed] focus:outline-none focus:border-[#4cd7f6]"
                  >
                    <option value="silent">Mode 01: Silent (Zero Interaction)</option>
                    <option value="interactive">Mode 02: Interactive Reflex</option>
                    <option value="adaptive">Mode 03: Adaptive Tree</option>
                    <option value="high_assurance">Mode 04: High Assurance (Financial KYC)</option>
                  </select>
                </div>

                <button
                  onClick={handleRunApiTest}
                  disabled={executing}
                  className="w-full py-2 bg-[#10b981] hover:bg-[#4edea3] text-[#00422b] font-['Plus_Jakarta_Sans'] font-semibold text-xs rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${executing ? 'animate-spin' : ''}`} />
                  <span>{executing ? 'Sending POST Request...' : 'Send API Verification Request'}</span>
                </button>

                {responseJson && (
                  <div className="p-3 bg-[#0a0e15] border border-[#262a32] rounded-lg">
                    <span className="font-['JetBrains_Mono'] text-[10px] text-[#4edea3] uppercase font-bold block mb-1">
                      HTTP 200 OK • RESPONSE
                    </span>
                    <pre className="font-['JetBrains_Mono'] text-[11px] text-[#bbcabf] overflow-x-auto max-h-48">
                      {responseJson}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[#262a32] text-xs font-['Inter'] text-[#86948a] mt-4">
              Endpoint: <code className="text-[#4cd7f6]">POST https://api.react-id.com/v1/sessions/verify</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
