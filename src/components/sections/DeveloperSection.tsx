import React, { useState } from 'react';
import { Bolt, KeyRound, Copy, Check, Terminal, Play } from 'lucide-react';

export const DeveloperSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fe' | 'be' | 'api'>('fe');
  const [copied, setCopied] = useState(false);
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const codeSnippets = {
    fe: `// 1. Install via npm: npm i @react-id/web
import { ReactID } from '@react-id/web';

// 2. Trigger spontaneous presence check modal
const session = await ReactID.verify({
  mode: 'adaptive', // 'silent' | 'interactive' | 'adaptive' | 'high_assurance'
  maxDurationMs: 5000,
  containerId: '#auth-mount',
  nonce: crypto.randomUUID()
});

// 3. Pass Ed25519 token to your auth backend
if (session.status === 'VERIFIED_HUMAN') {
  await postLoginAuth({ token: session.attestationToken });
}`,
    be: `// Server validation: @react-id/node
import { ReactIdClient } from '@react-id/node';

const reactId = new ReactIdClient({ apiKey: process.env.REACTID_SECRET });

export async function handleAuth(req, res) {
  const { token } = req.body;
  const verification = await reactId.sessions.verify(token);

  if (verification.risk === 'low' && verification.humanConfidence > 0.95) {
    return res.json({ access: 'GRANTED', userId: req.user.id });
  } else {
    return res.status(403).json({ error: 'SYNTHETIC_PRESENCE_DETECTED' });
  }
}`,
    api: `# POST /v1/sessions/verify
# Authorization: Bearer rct_live_99f...

{
  "session_id": "ses_89b21f92e",
  "status": "VERIFIED_HUMAN",
  "confidence_score": 0.988,
  "risk_band": "LOW",
  "cross_signals": {
    "landmark_velocity_match": 0.88,
    "biological_latency_ms": 218,
    "rppg_pulse_detected": true,
    "synthetic_anomaly_score": 0.008
  },
  "signature": "ed25519:3b14a2f8d839e9177a64c8d9e01f28b5e..."
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runTestApi = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setTestResponse(
        JSON.stringify(
          {
            session_id: 'ses_live_' + Math.random().toString(36).substring(2, 9),
            status: 'VERIFIED_HUMAN',
            confidence_score: 0.994,
            risk_band: 'LOW',
            verified_at: new Date().toISOString(),
            attestation_signature: 'ed25519:e4a9192bb...' + Math.random().toString(36).substring(2, 8),
          },
          null,
          2
        )
      );
      setIsVerifying(false);
    }, 600);
  };

  return (
    <section className="w-full bg-[#0a0e15] py-16 border-b border-[#1c2027]" id="sdk-integration">
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Dev Intro (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="font-['JetBrains_Mono'] text-[11px] font-semibold text-[#4cd7f6] uppercase tracking-wider">
              DEVELOPER-FIRST RUNTIME
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-semibold text-[#dfe2ed]">
              Drop-in SDK. Sub-second Verification.
            </h2>
            <p className="font-['Inter'] text-sm text-[#bbcabf] leading-relaxed">
              Integrate client-side liveness detection in three lines of code. No multi-megabyte neural weights to download; our WebAssembly engine compiles down to just 340KB.
            </p>

            <div className="space-y-3 mt-2">
              <div className="flex items-start gap-3 p-3 bg-[#1c2027] border border-[#262a32] rounded">
                <Bolt className="w-5 h-5 text-[#4edea3] shrink-0 mt-0.5" />
                <div>
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-semibold text-[#dfe2ed] block">
                    Zero External SDK Latency
                  </span>
                  <span className="font-['Inter'] text-xs text-[#86948a] leading-relaxed block mt-0.5">
                    Runs directly in WebAssembly sandbox at 60 FPS without server roundtrips during capture.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#1c2027] border border-[#262a32] rounded">
                <KeyRound className="w-5 h-5 text-[#4cd7f6] shrink-0 mt-0.5" />
                <div>
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-semibold text-[#dfe2ed] block">
                    Cryptographic Session Handshake
                  </span>
                  <span className="font-['Inter'] text-xs text-[#86948a] leading-relaxed block mt-0.5">
                    Returns an Ed25519-signed JWT containing verified confidence scores for backend settlement.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Code Terminal (7 cols) */}
          <div className="lg:col-span-7 bg-[#1c2027] border border-[#31353d] rounded-xl overflow-hidden shadow-2xl">
            {/* Terminal Header Tabs */}
            <div className="flex items-center justify-between bg-[#262a32] px-4 py-2 border-b border-[#3c4a42]/60">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('fe')}
                  className={`px-3 py-1 rounded font-['Inter'] text-xs transition-all cursor-pointer ${
                    activeTab === 'fe'
                      ? 'bg-[#31353d] text-[#4edea3] font-semibold'
                      : 'text-[#bbcabf] hover:text-[#dfe2ed]'
                  }`}
                >
                  Web SDK (Frontend)
                </button>
                <button
                  onClick={() => setActiveTab('be')}
                  className={`px-3 py-1 rounded font-['Inter'] text-xs transition-all cursor-pointer ${
                    activeTab === 'be'
                      ? 'bg-[#31353d] text-[#4cd7f6] font-semibold'
                      : 'text-[#bbcabf] hover:text-[#dfe2ed]'
                  }`}
                >
                  Node.js Server
                </button>
                <button
                  onClick={() => setActiveTab('api')}
                  className={`px-3 py-1 rounded font-['Inter'] text-xs transition-all cursor-pointer ${
                    activeTab === 'api'
                      ? 'bg-[#31353d] text-[#ffb95f] font-semibold'
                      : 'text-[#bbcabf] hover:text-[#dfe2ed]'
                  }`}
                >
                  REST API (JSON)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={runTestApi}
                  disabled={isVerifying}
                  className="hidden sm:inline-flex items-center gap-1 font-['JetBrains_Mono'] text-[11px] text-[#4cd7f6] hover:text-[#dfe2ed] px-2 py-0.5 bg-[#181c23] border border-[#3c4a42] rounded cursor-pointer transition-colors"
                >
                  <Play className={`w-3 h-3 ${isVerifying ? 'animate-spin' : ''}`} />
                  <span>Test Verify</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 font-['JetBrains_Mono'] text-[11px] text-[#bbcabf] hover:text-[#dfe2ed] transition-colors cursor-pointer px-2 py-0.5 rounded bg-[#181c23] border border-[#3c4a42]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#4edea3]" />
                      <span className="text-[#4edea3]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Snippet Container */}
            <div className="p-6 bg-[#0a0e15] font-['JetBrains_Mono'] text-xs overflow-x-auto min-h-[300px]">
              {activeTab === 'fe' && (
                <pre className="text-[#dfe2ed] leading-relaxed">
                  <code>
                    <span className="text-[#86948a]">// 1. Install via npm: npm i @react-id/web</span>
                    {'\n'}
                    <span className="text-[#4cd7f6]">import</span> {'{'} ReactID {'}'} <span className="text-[#4cd7f6]">from</span> <span className="text-[#10b981]">'@react-id/web'</span>;
                    {'\n\n'}
                    <span className="text-[#86948a]">// 2. Trigger spontaneous presence check modal</span>
                    {'\n'}
                    <span className="text-[#4cd7f6]">const</span> session = <span className="text-[#4cd7f6]">await</span> ReactID.<span className="text-[#4cd7f6]">verify</span>({'{'}
                    {'\n  '}mode: <span className="text-[#10b981]">'adaptive'</span>, <span className="text-[#86948a]">// 'silent' | 'interactive' | 'adaptive' | 'high_assurance'</span>
                    {'\n  '}maxDurationMs: <span className="text-[#ffb95f]">5000</span>,
                    {'\n  '}containerId: <span className="text-[#10b981]">'#auth-mount'</span>,
                    {'\n  '}nonce: <span className="text-[#4cd7f6]">crypto</span>.<span className="text-[#4cd7f6]">randomUUID</span>()
                    {'\n'});
                    {'\n\n'}
                    <span className="text-[#86948a]">// 3. Pass Ed25519 token to your auth backend</span>
                    {'\n'}
                    <span className="text-[#4cd7f6]">if</span> (session.status === <span className="text-[#10b981]">'VERIFIED_HUMAN'</span>) {'{'}
                    {'\n  '}<span className="text-[#4cd7f6]">await</span> postLoginAuth({'{'} token: session.attestationToken {'}'});
                    {'\n}'}
                  </code>
                </pre>
              )}

              {activeTab === 'be' && (
                <pre className="text-[#dfe2ed] leading-relaxed">
                  <code>
                    <span className="text-[#86948a]">// Server validation: @react-id/node</span>
                    {'\n'}
                    <span className="text-[#4cd7f6]">import</span> {'{'} ReactIdClient {'}'} <span className="text-[#4cd7f6]">from</span> <span className="text-[#10b981]">'@react-id/node'</span>;
                    {'\n\n'}
                    <span className="text-[#4cd7f6]">const</span> reactId = <span className="text-[#4cd7f6]">new</span> ReactIdClient({'{'} apiKey: process.env.REACTID_SECRET {'}'});
                    {'\n\n'}
                    <span className="text-[#4cd7f6]">export async function</span> handleAuth(req, res) {'{'}
                    {'\n  '}<span className="text-[#4cd7f6]">const</span> {'{'} token {'}'} = req.body;
                    {'\n  '}<span className="text-[#4cd7f6]">const</span> verification = <span className="text-[#4cd7f6]">await</span> reactId.sessions.<span className="text-[#4cd7f6]">verify</span>(token);
                    {'\n\n  '}<span className="text-[#4cd7f6]">if</span> (verification.risk === <span className="text-[#10b981]">'low'</span> && verification.humanConfidence &gt; <span className="text-[#ffb95f]">0.95</span>) {'{'}
                    {'\n    '}<span className="text-[#4cd7f6]">return</span> res.json({'{'} access: <span className="text-[#10b981]">'GRANTED'</span>, userId: req.user.id {'}'});
                    {'\n  '} {'}'} <span className="text-[#4cd7f6]">else</span> {'{'}
                    {'\n    '}<span className="text-[#4cd7f6]">return</span> res.status(<span className="text-[#ffb95f]">403</span>).json({'{'} error: <span className="text-[#ffb95f]">'SYNTHETIC_PRESENCE_DETECTED'</span> {'}'});
                    {'\n  '} {'}'}
                    {'\n}'}
                  </code>
                </pre>
              )}

              {activeTab === 'api' && (
                <pre className="text-[#dfe2ed] leading-relaxed">
                  <code>
                    <span className="text-[#86948a]"># POST /v1/sessions/verify</span>
                    {'\n'}
                    <span className="text-[#86948a]"># Authorization: Bearer rct_live_99f...</span>
                    {'\n\n'}
                    {'{'}
                    {'\n  '}<span className="text-[#4cd7f6]">"session_id"</span>: <span className="text-[#10b981]">"ses_89b21f92e"</span>,
                    {'\n  '}<span className="text-[#4cd7f6]">"status"</span>: <span className="text-[#10b981]">"VERIFIED_HUMAN"</span>,
                    {'\n  '}<span className="text-[#4cd7f6]">"confidence_score"</span>: <span className="text-[#ffb95f]">0.988</span>,
                    {'\n  '}<span className="text-[#4cd7f6]">"risk_band"</span>: <span className="text-[#10b981]">"LOW"</span>,
                    {'\n  '}<span className="text-[#4cd7f6]">"cross_signals"</span>: {'{'}
                    {'\n    '}<span className="text-[#4cd7f6]">"landmark_velocity_match"</span>: <span className="text-[#ffb95f]">0.88</span>,
                    {'\n    '}<span className="text-[#4cd7f6]">"biological_latency_ms"</span>: <span className="text-[#ffb95f]">218</span>,
                    {'\n    '}<span className="text-[#4cd7f6]">"rppg_pulse_detected"</span>: <span className="text-[#4edea3]">true</span>,
                    {'\n    '}<span className="text-[#4cd7f6]">"synthetic_anomaly_score"</span>: <span className="text-[#ffb95f]">0.008</span>
                    {'\n  '}{'},'}
                    {'\n  '}<span className="text-[#4cd7f6]">"signature"</span>: <span className="text-[#10b981]">"ed25519:3b14a2f8d839..."</span>
                    {'\n}'}
                  </code>
                </pre>
              )}

              {testResponse && (
                <div className="mt-4 p-3 bg-[#181c23] border border-[#10b981]/50 rounded">
                  <div className="flex items-center justify-between mb-1 text-[11px] text-[#4edea3]">
                    <span>✓ LIVE RESPONSE RECEIVED (200 OK)</span>
                    <button
                      onClick={() => setTestResponse(null)}
                      className="text-[#86948a] hover:text-white"
                    >
                      Clear
                    </button>
                  </div>
                  <pre className="text-[#bbcabf]">{testResponse}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
