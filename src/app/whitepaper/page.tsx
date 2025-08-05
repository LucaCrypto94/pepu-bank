"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';

// Helper to scroll to section after navigation
function scrollToSection(hash: string) {
  if (!hash.startsWith('#')) return;
  setTimeout(() => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

// Helper to go to main page and scroll to section
function goToSection(router: ReturnType<typeof useRouter>, hash: string) {
  router.push('/');
  setTimeout(() => {
    scrollToSection(hash);
  }, 100);
}

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

function CopyableAddress({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs break-all bg-black/40 p-2 rounded select-all">{address}</span>
      <button
        className="text-xs px-2 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition border border-yellow-600 font-bold"
        onClick={() => {
          navigator.clipboard.writeText(address);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        type="button"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <a
        href="https://pumppad.gg/0x82144c93bd531e46f31033fe22d1055af17a514c"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-2 py-1 bg-green-400 text-black rounded hover:bg-green-300 transition border border-green-600 font-bold"
        style={{ textDecoration: 'none' }}
      >
        Buy
      </a>
    </div>
  );
}

export default function Whitepaper() {
  const [active, setActive] = useState(sections[0].id);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: "RoadMap", href: "/roadmap" },
    { name: "Whitepaper", href: "/whitepaper" },
    { name: "How2Penk", href: "#how2penk-section" },
    { name: "SuperBridge", href: "#superbridge" },
    { name: "About", href: "#faq-section" },
  ];

  const exploreLinks = [
    { name: "Penking", href: "#penking" },
    { name: "Penkgame", href: "#penkgame" },
    { name: "Penk Market", href: "#penkmarket" },
  ];

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
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (hash) {
      scrollToSection(hash);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [typeof window !== 'undefined' ? window.location.hash : '']);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-10 w-full bg-black/80 backdrop-blur-md border-b border-yellow-500/20 md:left-64">
        {/* Desktop Header (nav center, connect right) */}
        <div className="hidden sm:flex items-center w-full justify-start px-40 gap-x-8 py-3">
          {/* Nav rectangle, only as wide as content */}
          <div className="inline-flex bg-[#181b1c] bg-opacity-95 border border-yellow-500/60 shadow items-center justify-start px-4 py-1 max-w-xl h-12 backdrop-blur-md" style={{ borderRadius: '0px', borderWidth: '2px' }}>
            <nav className="flex items-center gap-3 text-white font-medium text-xs sm:text-sm">
              <div className="relative">
                <button
                  className="text-white font-medium text-sm px-2 py-1 hover:text-yellow-400 focus:outline-none flex items-center gap-1"
                  onClick={() => setExploreOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setExploreOpen(false), 150)}
                >
                  Explore
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {exploreOpen && (
                  <div className="absolute left-0 mt-1 w-36 bg-[#232526] border border-yellow-500/40 shadow-lg text-left rounded py-1 z-30">
                    {exploreLinks.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {navLinks.map((link) => (
                link.name === 'RoadMap' ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-yellow-400 transition-colors duration-200"
                    onClick={e => {
                      e.preventDefault();
                      router.push('/roadmap');
                    }}
                  >
                    {link.name}
                  </a>
                ) : link.href.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-yellow-400 transition-colors duration-200"
                    onClick={e => {
                      e.preventDefault();
                      goToSection(router, link.href);
                    }}
                  >
                    {link.name}
                  </a>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-yellow-400 transition-colors duration-200"
                    onClick={e => {
                      e.preventDefault();
                      router.push(link.href);
                    }}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </nav>
          </div>
          {/* Connect at far right */}
          <div className="flex items-center">
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  type="button"
                  className="bg-yellow-400 text-black font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-none shadow hover:bg-yellow-300 transition border-2 border-yellow-600 text-sm sm:text-base min-w-[80px] sm:min-w-[110px] tracking-wide"
                >
                  Connect
                </button>
              )}
            </ConnectButton.Custom>
          </div>
        </div>
        {/* Mobile Header (simplified for sidebar compatibility) */}
        <div className="flex sm:hidden items-center w-full justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/pepubank-logo.png"
              alt="Pepu Bank Logo"
              width={40}
              height={14}
              className="shadow"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  type="button"
                  className="bg-yellow-400 text-black font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-none shadow hover:bg-yellow-300 transition border-2 border-yellow-600 text-sm sm:text-base min-w-[80px] sm:min-w-[110px] tracking-wide"
                >
                  Connect
                </button>
              )}
            </ConnectButton.Custom>
            {/* Mobile sidebar toggle button */}
            <button
              className="bg-yellow-400 text-black font-bold px-3 py-1 rounded shadow-lg text-xs"
              onClick={() => setSidebarOpen(true)}
            >
              ☰ Contents
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar (full screen, expandable Explore, logo at top) */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 flex sm:hidden">
          {/* Sidebar (full screen) */}
          <div className="w-full bg-[#181b1c] border-r border-yellow-500/30 flex flex-col">
            {/* Logo at top */}
            <div className="flex items-center justify-between p-4 border-b border-yellow-500/30">
              <Image
                src="/pepubank-logo.png"
                alt="Pepu Bank Logo"
                width={40}
                height={14}
                className="shadow"
              />
              <button
                className="text-yellow-500 text-2xl font-bold"
                onClick={() => setMobileNavOpen(false)}
              >
                &times;
              </button>
            </div>
            {/* Mobile nav links */}
            <nav className="flex-1 flex flex-col p-4 space-y-4">
              <div className="space-y-2">
                <div className="text-yellow-400 font-bold text-sm mb-2">Explore</div>
                {exploreLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors rounded"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="space-y-2">
                <div className="text-yellow-400 font-bold text-sm mb-2">Navigation</div>
                {navLinks.map((link) => (
                  link.name === 'RoadMap' ? (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors rounded"
                      onClick={e => {
                        e.preventDefault();
                        setMobileNavOpen(false);
                        router.push('/roadmap');
                      }}
                    >
                      {link.name}
                    </a>
                  ) : link.href.startsWith('#') ? (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors rounded"
                      onClick={e => {
                        e.preventDefault();
                        setMobileNavOpen(false);
                        goToSection(router, link.href);
                      }}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors rounded"
                      onClick={e => {
                        e.preventDefault();
                        setMobileNavOpen(false);
                        router.push(link.href);
                      }}
                    >
                      {link.name}
                    </a>
                  )
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col bg-[#101112] md:w-64 w-64 h-screen sticky top-0 z-30 border-r border-yellow-400`}>
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
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 md:py-16 md:ml-0 pt-24 md:pt-20" style={{ scrollBehavior: 'smooth' }}>
        <div className="flex justify-center mb-6">
          <Image src="/logo_pepu_bank.jpg" alt="Pepu Bank Logo" width={128} height={128} className="h-32 w-auto rounded shadow-lg border border-yellow-400 bg-[#181b1c] p-2" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 text-center">Pepu Bank Whitepaper</h1>
        <section id="executive-summary" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🟧 Executive Summary</h2>
          <div className="text-center space-y-6">
            <p className="text-lg leading-relaxed">
              <span className="font-bold text-yellow-300">The bridge to financial freedom?</span> Start with <span className="font-bold text-yellow-400">PEPU BANK</span>.
            </p>
            <p className="text-base leading-relaxed">
              <span className="font-bold text-yellow-300">PEPU BANK</span> was born to offer <span className="font-semibold">solidity, speed, and creativity</span> in the decentralized world. With a <span className="font-bold text-yellow-400">SuperBridge</span> that eliminates waiting times and with exclusive services for those who hold <span className="font-bold text-yellow-400">$PENK</span>, we position ourselves as the real alternative to the limits of Pepe Unchained&apos;s Layer 2.
            </p>
            <p className="text-base leading-relaxed">
              <span className="font-bold text-yellow-300">Our vision?</span> Building a meme-banking infrastructure that combines <span className="font-semibold">technology, community and fun</span>.
            </p>
            <p className="text-base leading-relaxed">
              <span className="font-bold text-yellow-400">PEPU BANK</span> is a next-gen decentralized protocol built on the new Pepe Unchained Layer 2 network, powered by the utility token <span className="font-bold text-yellow-400">$PENK</span>. Our mission is to deliver seamless access to the PEPU ecosystem through tools like the <span className="font-bold text-yellow-400">SuperBridge</span>, L2-native token purchases, and gamified community features.
            </p>
            <p className="text-base leading-relaxed font-semibold">
              We believe in tech for the people — focused on <span className="text-yellow-300">ease of use, fairness, and community ownership</span>.
            </p>
          </div>
        </section>
        <section id="problem-solution" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🔍 The Problem & Solution</h2>
          <div className="space-y-8">
            <div className="bg-black/20 rounded-lg p-6 border border-yellow-400/20">
              <h3 className="text-xl font-bold text-red-400 mb-4 text-center">❌ Problem</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <span><span className="font-semibold">Slow bridging:</span> Up to 7 days, 6 hours from L2 to L1.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <span><span className="font-semibold">Complex $PEPU purchases</span> on Layer 2.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-3 mt-1">•</span>
                  <span><span className="font-semibold">Unstable projects:</span> many pretend to be solid — we are, like a bank.</span>
                </li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-6 border border-green-400/20">
              <h3 className="text-xl font-bold text-green-400 mb-4 text-center">✅ Solution</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">SuperBridge:</span> Fast L2 &lt;-&gt; L1 transfers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">Direct $PEPU purchase</span> on L2: via ETH, BTC, USDC on-site.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">$PENK-powered services:</span> priority access, lower fees, future features.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">PEPU Game:</span> Multiplayer experience to drive value and community.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="technology-team" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🤖 Technology, Team & Collaborations</h2>
          <div className="space-y-8">
            <div className="bg-black/20 rounded-lg p-6 border border-blue-400/20">
              <h3 className="text-xl font-bold text-blue-400 mb-4 text-center">🔧 Technology Stack</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">Blockchain:</span> Ethereum + Pepe Unchained (L2)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">Smart Contracts:</span> Bridge, Purchase, Rewards, Services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">Upcoming:</span> DAO Governance, dApps</span>
                </li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-6 border border-purple-400/20">
              <h3 className="text-xl font-bold text-purple-400 mb-4 text-center">👥 Team and Collaborations</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">Founder:</span> <a href="https://t.me/PEPU_BANK1" className="text-blue-400 hover:underline" target="_blank">@PEPU_BANK1</a></span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">Admin/Investors:</span> <a href="https://t.me/CryptoConnoisseurOG" className="text-blue-400 hover:underline" target="_blank">@CryptoConnoisseurOG</a>, <a href="https://t.me/BougiesVertes" className="text-blue-400 hover:underline" target="_blank">@BougiesVertes</a>, <a href="https://t.me/REAL_VOLDEMORT" className="text-blue-400 hover:underline" target="_blank">@REAL_VOLDEMORT</a>, <a href="https://t.me/kjkqqp" className="text-blue-400 hover:underline" target="_blank">@kjkqqp</a>, <a href="https://t.me/DineroG90" className="text-blue-400 hover:underline" target="_blank">@DineroG90</a>, <a href="https://t.me/blabla0020" className="text-blue-400 hover:underline" target="_blank">@blabla0020</a></span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">Graphic Designer:</span> <a href="https://t.me/V_for_Venom" className="text-blue-400 hover:underline" target="_blank">@V_for_Venom</a></span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">Developer:</span> <a href="https://t.me/PepuBankDev" className="text-blue-400 hover:underline" target="_blank">@PepuBankDev</a>, <a href="https://t.me/d2eakpan" className="text-blue-400 hover:underline" target="_blank">@d2eakpan</a></span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">Collaborations:</span>Degen Time ($DGT) & Crypto Barn ($BARN)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="tokenomics" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">💰 Tokenomics</h2>
          <div className="space-y-8">
            <div className="bg-black/20 rounded-lg p-6 border border-yellow-400/20">
              <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">🪙 Token Details</h3>
              <div className="grid md:grid-cols-2 gap-6 text-white/90">
                <div>
                  <p className="mb-2"><span className="font-bold text-yellow-400">Token:</span> $PENK</p>
                  <p className="mb-2"><span className="font-bold text-yellow-400">Supply:</span> 1 Billion $PENK</p>
                  <p className="mb-2"><span className="font-bold text-yellow-400">Contract:</span></p>
                  <CopyableAddress address="0x82144C93bd531E46F31033FE22D1055Af17A514c" />
                </div>
                <div>
                  <h4 className="font-bold text-yellow-300 mb-3">Utility:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2 mt-1">•</span>
                      <span>SuperBridge access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2 mt-1">•</span>
                      <span>Reduced transaction/purchase fees</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2 mt-1">•</span>
                      <span>Participation in rewards system</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-6 border border-green-400/20">
              <h3 className="text-xl font-bold text-green-400 mb-4 text-center">🚀 Launch Type</h3>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span><span className="font-bold text-yellow-400">100% Fair Launch</span> on Pepe&apos;s Pump Pad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>No presales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>No airdrops</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <span>No early team allocations</span>
                </li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-6 border border-blue-400/20">
              <h3 className="text-xl font-bold text-blue-400 mb-4 text-center">📊 Team Allocation: 150M $PENK (15%)</h3>
              <div className="grid md:grid-cols-2 gap-4 text-white/90">
                <div>
                  <p className="flex items-center"><span className="text-blue-400 mr-2">•</span>Marketing</p>
                  <p className="flex items-center"><span className="text-blue-400 mr-2">•</span>Development</p>
                </div>
                <div>
                  <p className="flex items-center"><span className="text-blue-400 mr-2">•</span>Liquidity</p>
                  <p className="flex items-center"><span className="text-blue-400 mr-2">•</span>Bank reserves</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="roadmap" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">📅 Roadmap</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-black/20 rounded-lg p-6 border border-yellow-400/20">
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl mr-3">✅</span>
                <span className="font-semibold text-yellow-400 text-lg">Phase 1 – July 2025 🎉</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-white/90">
                <li>Website + SuperBridge launch</li>
                <li>Exclusive SuperBridge access for $PENK holders</li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-6 border border-yellow-400/20">
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl mr-3">🛒</span>
                <span className="font-semibold text-yellow-400 text-lg">Phase 2 – August 2025 💰</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-white/90">
                <li>Direct $PEPU purchase on L2</li>
                <li>ETH, BTC, USDC accepted</li>
                <li>Discounted token pricing</li>
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-6 border border-yellow-400/20">
              <div className="flex items-center justify-center mb-4">
                <span className="text-2xl mr-3">🎮</span>
                <span className="font-semibold text-yellow-400 text-lg">Phase 3 – December 2025 🔥</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-white/90">
                <li>PEPU-themed multiplayer game</li>
                <li>Scoring + Grand Prize</li>
                <li>Community engagement + utility</li>
              </ul>
            </div>
          </div>
        </section>
        <section id="superbridge-whitepaper" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">🌉 SuperBridge Explained</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-black/20 rounded-lg p-6 border border-yellow-400/20">
              <p className="mb-4 text-center">The SuperBridge enables instant $PEPU transfer from L2 → L1, bypassing long wait periods.</p>
              <div className="mb-4">
                <div className="font-semibold text-yellow-300 mb-2">How it Works:</div>
                <ul className="list-disc list-inside space-y-2 text-white/90">
                  <li>User sends $PEPU to L2 smart contract</li>
                  <li>L1 wallet receives same amount instantly</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-yellow-300 mb-2">Key Features:</div>
                <ul className="list-disc list-inside space-y-2 text-white/90">
                  <li>Instant delivery</li>
                  <li>Exclusive to $PENK holders</li>
                  <li>User-friendly</li>
                  <li>Bridge fee in $PEPU (TBD)</li>
                  <li>L1 pool pre-funded and managed by PEPU BANK</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="direct-l2-purchase" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">💸 Direct L2 Purchase of $PEPU Explained</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-black/20 rounded-lg p-6 border border-yellow-400/20">
              <div className="mb-4">
                <div className="font-semibold text-yellow-300 mb-2">Problem:</div>
                <p className="mb-4">Bridging from L1 to L2 = high fees, delay, complexity</p>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-yellow-300 mb-2">Solution:</div>
                <p className="mb-4">Buy $PEPU directly on L2 using funds from L1</p>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-yellow-300 mb-2">Payment Options:</div>
                <ul className="list-disc list-inside space-y-2 text-white/90">
                  <li>ETH</li>
                  <li>BTC</li>
                  <li>USDC</li>
                </ul>
              </div>
              <div className="mb-4">
                <div className="font-semibold text-yellow-300 mb-2">Advantages:</div>
                <ul className="list-disc list-inside space-y-2 text-white/90">
                  <li>Zero gas fees (PEPU BANK covers backend costs)</li>
                  <li>Discounted token pricing</li>
                  <li>No bridging steps</li>
                  <li>Simple UX on official site</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-yellow-300 mb-2">Why Buy on L2:</div>
                <ul className="list-disc list-inside space-y-2 text-white/90">
                  <li>Direct purchase</li>
                  <li>Cheaper</li>
                  <li>Gas-free</li>
                  <li>Seamless process</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="disclaimer" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">⚠ Disclaimer</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/20 rounded-lg p-6 border border-yellow-400/20">
              <ul className="list-disc list-inside space-y-2 text-white/90">
                <li>$PENK is a meme utility token — not financial advice or a security.</li>
                <li>No guarantees of profits, ownership rights, or governance.</li>
                <li>Users must ensure legal compliance based on jurisdiction.</li>
                <li>Crypto risk warning: Participation is at your own discretion.</li>
              </ul>
            </div>
          </div>
        </section>
        <section id="links" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">📎 Official Links</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/20 rounded-lg p-6 border border-yellow-400/20">
              <ul className="list-disc list-inside space-y-2 text-white/90">
                <li><a href="https://x.com/PepuBank" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline hover:text-yellow-400">x.com/PepuBank</a></li>
                <li><a href="https://t.me/Pepu_BANK" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline hover:text-yellow-400">t.me/Pepu_BANK</a></li>
              </ul>
            </div>
          </div>
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