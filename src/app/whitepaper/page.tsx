"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id: "executive-summary", label: "🟧 Executive Summary" },
  { id: "problem-solution", label: "🔍 Problem & Solution" },
  { id: "technology-team", label: "🤖 Technology, Team & Collaborations" },
  { id: "tokenomics", label: "💰 Tokenomics" },
  { id: "roadmap", label: "📅 Roadmap" },
  { id: "superbridge", label: "🌉 SuperBridge Explained" },
  { id: "direct-l2-purchase", label: "💸 Direct L2 Purchase of $PEPU" },
  { id: "disclaimer", label: "⚠ Disclaimer" },
  { id: "links", label: "📎 Official Links" },
];

export default function Whitepaper() {
  const [active, setActive] = useState(sections[0].id);
  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: s.id, top: Math.abs(rect.top - 80) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#101112] border-b border-yellow-400 px-4 py-3">
        <button 
          className="bg-yellow-400 text-black font-bold px-3 py-2 rounded shadow-lg" 
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Contents
        </button>
      </header>
      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col bg-[#101112] md:w-64 w-64 h-screen sticky top-0 z-20 border-r border-yellow-400`}>
        <div className="flex flex-col h-full">
          <div className="px-6 pt-8 pb-4">
            <span className="text-yellow-400 font-bold text-lg tracking-wide uppercase whitespace-nowrap block">Table of Contents</span>
          </div>
          <nav className="flex-1 flex flex-col px-6 pb-8 mt-4">
            {sections.map((section, idx) => (
              <div key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block py-2 pl-0 pr-3 font-semibold transition-colors text-base text-left truncate
                    ${active === section.id ? 'font-bold text-white bg-gray-800 border-l-4 border-gray-400' : 'text-white/80 hover:text-white'}`}
                  style={{ maxWidth: '100%' }}
                >
                  {section.label}
                </a>
                {idx !== sections.length - 1 && <div className="w-full h-0.5 bg-gray-700" />}
              </div>
            ))}
          </nav>
        </div>
      </aside>
      {/* Mobile Sidebar Drawer */}
      {/* Overlay to close sidebar when tapping outside */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/80 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`fixed inset-0 z-30 bg-black/80 transition-transform duration-300 w-64 border-r border-yellow-400 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ minHeight: '100vh' }}>
        {/* Sidebar content */}
        <div className="relative z-10 h-full flex flex-col bg-[#101112] w-64">
          <div className="flex items-center justify-between px-6 py-4 border-b border-yellow-400/10">
            <span className="text-yellow-400 font-bold text-lg tracking-wide uppercase">Table of Contents</span>
            <button className="text-yellow-400 text-2xl font-bold" onClick={() => setSidebarOpen(false)}>&times;</button>
          </div>
          <nav className="flex-1 flex flex-col gap-1 px-6 pb-8 overflow-y-auto">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`block py-2 px-3 rounded-lg font-semibold transition-colors text-base mb-1
                  ${active === section.id ? 'font-bold text-white bg-gray-800 border-l-4 border-gray-400' : 'text-white/80 hover:text-white'}`}
                onClick={() => setSidebarOpen(false)}
              >
                {section.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 md:py-16 md:ml-0 pt-16 md:pt-8" style={{ scrollBehavior: 'smooth' }}>
        <div className="flex justify-center mb-6">
          <img src="/logo_pepu_bank.jpg" alt="Pepu Bank Logo" className="h-32 w-auto rounded shadow-lg border border-yellow-400 bg-[#181b1c] p-2" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 text-center">Pepu Bank Whitepaper</h1>
        <section id="executive-summary" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">🟧 Executive Summary</h2>
          <p className="mb-4">The bridge to financial freedom? Start with PEPU BANK.<br/>
          PEPU BANK was born to offer solidity, speed, and creativity in the decentralized world. With a SuperBridge that eliminates waiting times and with exclusive services for those who hold $PENK, we position ourselves as the real alternative to the limits of Pepe Unchained's Layer 2.<br/>
          Our vision? Building a meme-banking infrastructure that combines technology, community and fun.</p>
          <p className="mb-4">PEPU BANK is a next-gen decentralized protocol built on the new Pepe Unchained Layer 2 network, powered by the utility token $PENK. Our mission is to deliver seamless access to the PEPU ecosystem through tools like the SuperBridge, L2-native token purchases, and gamified community features.</p>
          <p className="mb-4">We believe in tech for the people — focused on ease of use, fairness, and community ownership.</p>
        </section>
        <section id="problem-solution" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">🔍 The Problem & Solution</h2>
          <div className="mb-2 font-semibold text-yellow-300">Problem:</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>Slow bridging: Up to 7 days, 6 hours from L2 to L1.</li>
            <li>Complex $PEPU purchases on Layer 2.</li>
            <li>Unstable projects: many pretend to be solid — we are, like a bank.</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Solution:</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>SuperBridge: Fast L2 &lt;-&gt; L1 transfers.</li>
            <li>Direct $PEPU purchase on L2: via ETH, BTC, USDC on-site.</li>
            <li>$PENK-powered services: priority access, lower fees, future features.</li>
            <li>PEPU Game: Multiplayer experience to drive value and community.</li>
          </ul>
        </section>
        <section id="technology-team" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">🤖 Technology, Team & Collaborations</h2>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>Blockchain: Ethereum + Pepe Unchained (L2)</li>
            <li>Smart Contracts: Bridge, Purchase, Rewards, Services</li>
            <li>Upcoming: DAO Governance, dApps</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Team</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>Founder: @PEPU_BANK1</li>
            <li>Co-founder: @brodo_di_pollo</li>
            <li>Admins: @CryptoConnoisseurOG, @blabla0020, @covernrb</li>
            <li>Artwork: @V_for_Venom</li>
            <li>Development: Anonymous (to be revealed at SuperBridge launch)</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Collaborations:</div>
          <p className="mb-4">Actively working with L2 projects for PEPU-compatible network.</p>
        </section>
        <section id="tokenomics" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">💰 Tokenomics</h2>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>Token: $PENK</li>
            <li>Contract: <span className="break-all">0x82144C93bd531E46F31033FE22D1055Af17A514c</span></li>
            <li>Supply: 1 Billion $PENK</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Utility:</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>SuperBridge access</li>
            <li>Reduced transaction/purchase fees</li>
            <li>Participation in rewards system</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Launch Type:</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>100% Fair Launch on Pepe’s Pump Pad</li>
            <li>No presales</li>
            <li>No airdrops</li>
            <li>No early team allocations</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Team Allocation: 150M $PENK (15%)</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>Marketing</li>
            <li>Development</li>
            <li>Liquidity</li>
            <li>Bank reserves</li>
          </ul>
        </section>
        <section id="roadmap" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">📅 Roadmap</h2>
          <div className="mb-2 font-semibold text-yellow-300">Phase 1 – July 2025 🎉</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>Website + SuperBridge launch</li>
            <li>Exclusive SuperBridge access for $PENK holders</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Phase 2 – August 2025 💰</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>Direct $PEPU purchase on L2</li>
            <li>ETH, BTC, USDC accepted</li>
            <li>Discounted token pricing</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Phase 3 – December 2025 🔥</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>PEPU-themed multiplayer game</li>
            <li>Scoring + Grand Prize</li>
            <li>Community engagement + utility</li>
          </ul>
        </section>
        <section id="superbridge" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">🌉 SuperBridge Explained</h2>
          <p className="mb-4">The SuperBridge enables instant $PEPU transfer from L2 → L1, bypassing long wait periods.</p>
          <div className="mb-2 font-semibold text-yellow-300">How it Works:</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>User sends $PEPU to L2 smart contract</li>
            <li>L1 wallet receives same amount instantly</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Key Features:</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>Instant delivery</li>
            <li>Exclusive to $PENK holders</li>
            <li>User-friendly</li>
            <li>Bridge fee in $PEPU (TBD)</li>
            <li>L1 pool pre-funded and managed by PEPU BANK</li>
          </ul>
        </section>
        <section id="direct-l2-purchase" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">💸 Direct L2 Purchase of $PEPU Explained</h2>
          <div className="mb-2 font-semibold text-yellow-300">Problem:</div>
          <p className="mb-4">Bridging from L1 to L2 = high fees, delay, complexity</p>
          <div className="mb-2 font-semibold text-yellow-300">Solution:</div>
          <p className="mb-4">Buy $PEPU directly on L2 using funds from L1</p>
          <div className="mb-2 font-semibold text-yellow-300">Payment Options:</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>ETH</li>
            <li>BTC</li>
            <li>USDC</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Advantages:</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>Zero gas fees (PEPU BANK covers backend costs)</li>
            <li>Discounted token pricing</li>
            <li>No bridging steps</li>
            <li>Simple UX on official site</li>
          </ul>
          <div className="mb-2 font-semibold text-yellow-300">Why Buy on L2:</div>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>Direct purchase</li>
            <li>Cheaper</li>
            <li>Gas-free</li>
            <li>Seamless process</li>
          </ul>
        </section>
        <section id="disclaimer" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">⚠ Disclaimer</h2>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li>$PENK is a meme utility token — not financial advice or a security.</li>
            <li>No guarantees of profits, ownership rights, or governance.</li>
            <li>Users must ensure legal compliance based on jurisdiction.</li>
            <li>Crypto risk warning: Participation is at your own discretion.</li>
          </ul>
        </section>
        <section id="links" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">📎 Official Links</h2>
          <ul className="list-disc list-inside mb-4 text-white/90">
            <li><a href="https://x.com/PepuBank" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline hover:text-yellow-400">x.com/PepuBank</a></li>
            <li><a href="https://t.me/Pepu_BANK" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline hover:text-yellow-400">t.me/Pepu_BANK</a></li>
          </ul>
        </section>
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
} 