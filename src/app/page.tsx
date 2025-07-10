"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "RoadMap", href: "#roadmap" },
  { name: "Whitepaper", href: "#whitepaper" },
  { name: "How2Penk", href: "#how2penk-section" },
  { name: "About", href: "#about" },
];

const exploreLinks = [
  { name: "Penking", href: "#penking" },
  { name: "Penkgame", href: "#penkgame" },
  { name: "Penk Market", href: "#penkmarket" },
];

// (AnimatedNumber is not used and has been removed)

// Countdown component for SuperBridge launch
function Countdown({ targetDate, small = false, hideComingSoon = false }: { targetDate: Date, small?: boolean, hideComingSoon?: boolean }) {
  const [timeLeft, setTimeLeft] = useState<{d:number,h:number,m:number,s:number}>({d:0,h:0,m:0,s:0});
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    let raf: number;
    function update() {
      const now = new Date();
      const diff = Math.max(0, targetDate.getTime() - now.getTime());
      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor((diff / (1000*60*60)) % 24);
      const m = Math.floor((diff / (1000*60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({d,h,m,s});
      setIsDone(diff <= 0);
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [targetDate]);
  if (isDone && hideComingSoon) return null;
  return (
    <div className={`flex items-center gap-1 ${small ? '' : 'mt-2'}`} style={small ? { minWidth: 0 } : {}}>
      {[{v:timeLeft.d,l:'D'},{v:timeLeft.h,l:'H'},{v:timeLeft.m,l:'M'},{v:timeLeft.s,l:'S'}].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className={small ? "text-base font-extrabold text-white" : "text-2xl font-extrabold text-white"}>{item.v.toString().padStart(2,'0')}</span>
          <span className={small ? "text-[10px] text-white/70 mt-0.5" : "text-xs text-white/70 mt-1"}>{item.l}</span>
        </div>
      ))}
      {!isDone && !hideComingSoon && (
        <span className="text-yellow-400 font-bold text-base ml-2">Coming Soon!</span>
      )}
    </div>
  );
}

export default function Home() {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  // Bridge state
  const [fromNetwork, setFromNetwork] = useState("Pepe Unchained V2");
  const [toNetwork, setToNetwork] = useState("Ethereum");
  const networks = [
    { name: "Pepe Unchained V2", icon: "/peuchain-logo.jpg" },
    { name: "Ethereum", icon: "/ethereum-logo.png" },
  ];

  // Token balance state
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [balanceError, setBalanceError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBalance() {
      setBalanceLoading(true);
      setBalanceError(null);
      try {
        const res = await fetch("/api/token-balance");
        const data = await res.json();
        if (res.ok && data.balance) {
          // Convert from wei to PEPU (assume 18 decimals)
          const formatted = (BigInt(data.balance) / 10n ** 14n).toString();
          const display = `${Number(formatted) / 10000}`;
          setTokenBalance(display);
        } else {
          setBalanceError("Error fetching balance");
        }
      } catch (e) {
        setBalanceError("Error fetching balance");
      } finally {
        setBalanceLoading(false);
      }
    }
    fetchBalance();
  }, []);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/pepubank-site-bg.jpg')" }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />
      {/* Responsive Header Row */}
      <div className="relative top-3 left-0 right-0 z-30 w-full pointer-events-none">
        {/* Desktop Header (logo left, nav center, connect right) */}
        <div className="hidden sm:flex items-center w-full pointer-events-auto justify-center gap-x-60">
          {/* Logo at far left */}
          <div className="flex items-center">
        <Image
              src="/pepubank-logo.png"
              alt="Pepu Bank Logo"
              width={48}
              height={16}
              className="shadow"
          priority
        />
          </div>
          {/* Nav rectangle, only as wide as content */}
          <div className="inline-flex bg-[#181b1c] bg-opacity-95 border border-yellow-500/60 shadow items-center justify-start px-4 py-1 max-w-xl h-12 backdrop-blur-md pointer-events-auto" style={{ borderRadius: '0px', borderWidth: '2px' }}>
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
              <a
                href="#superbridge"
                className="hover:text-yellow-400 transition-colors duration-200"
              >
                SuperBridge
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-yellow-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          {/* Connect at far right */}
          <div className="flex items-center">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-3 py-1 rounded transition-colors shadow border border-yellow-600/60 text-xs sm:text-sm">
              Connect
            </button>
          </div>
        </div>
        {/* Mobile Header (logo, SuperBridge, How2Penk, connect, menu) */}
        <div className="flex sm:hidden items-center w-full justify-between pointer-events-auto">
          <div className="flex items-center gap-2">
            <Image
              src="/pepubank-logo.png"
              alt="Pepu Bank Logo"
              width={40}
              height={14}
              className="shadow"
              priority
            />
            {/* SuperBridge and How2Penk links (mobile only) */}
            <a href="#superbridge" className="text-white font-medium text-xs px-2 py-1 hover:text-yellow-400 transition-colors">SuperBridge</a>
            <a href="#how2penk-section" className="text-white font-medium text-xs px-2 py-1 hover:text-yellow-400 transition-colors">How2Penk</a>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-3 py-1 rounded transition-colors shadow border border-yellow-600/60 text-xs">
              Connect
            </button>
            {/* Fancier Hamburger: animated to X on open, staggered bars */}
            <button
              className="relative w-10 h-10 flex flex-col items-center justify-center group focus:outline-none"
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-label="Open navigation menu"
            >
              <span className={`block w-7 h-1 bg-yellow-500 rounded transition-all duration-300 ${mobileNavOpen ? 'rotate-45 translate-y-2' : 'rotate-2'}`}></span>
              <span className={`block w-7 h-1 bg-yellow-500 rounded mt-1.5 mb-1.5 transition-all duration-300 ${mobileNavOpen ? 'opacity-0' : '-rotate-2'}`}></span>
              <span className={`block w-7 h-1 bg-yellow-500 rounded transition-all duration-300 ${mobileNavOpen ? '-rotate-45 -translate-y-2' : 'rotate-1'}`}></span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar (full screen, expandable Explore, logo at top) */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Sidebar (full screen) */}
          <div className="w-full h-full bg-[#181b1c] border-r border-yellow-500/60 shadow-lg flex flex-col pt-8 px-6 animate-fade-in relative">
            <div className="flex items-center justify-between mb-6">
              <Image
                src="/pepubank-logo.png"
                alt="Pepu Bank Logo"
                width={40}
                height={14}
                className="shadow"
                priority
              />
              <button
                className="text-yellow-500 hover:text-yellow-400 text-2xl font-bold focus:outline-none"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-white font-medium text-lg">
              {/* Expandable Explore */}
              <button
                className="flex items-center justify-between text-left hover:text-yellow-400 transition-colors duration-200"
                onClick={() => setMobileExploreOpen((v) => !v)}
              >
                <span>Explore</span>
                <svg className={`w-5 h-5 ml-2 transition-transform duration-200 ${mobileExploreOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
              {mobileExploreOpen && (
                <div className="flex flex-col gap-2 ml-4 mt-1">
                  {exploreLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-2 py-1 text-base text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-colors rounded"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
              {navLinks.filter(link => link.name !== "How2Penk").map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-yellow-400 transition-colors duration-200"
                  onClick={() => setMobileNavOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#how2penk-section"
                className="hover:text-yellow-400 transition-colors duration-200"
                onClick={() => setMobileNavOpen(false)}
              >
                How2Penk
              </a>
            </nav>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-24 bg-gradient-to-b from-black/80 via-black/60 to-transparent animate-fade-in">
        <h1 className="text-xl sm:text-7xl font-extrabold text-yellow-400 drop-shadow-lg mb-4 tracking-tight animate-slide-in-down">BREAK THE <span className="text-white">BANK VAULT</span></h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 animate-fade-in-up delay-200">Welcome to PEPU BANK <span className="inline-block">🚀</span></h2>
        <p className="max-w-2xl text-lg sm:text-xl text-white/90 mb-8 font-medium animate-fade-in-up delay-300">
          Your go-to platform for everything PEPU! Seamlessly bridge, buy, and explore the PEPU ecosystem with our powerful SuperBridge and exclusive services.
        </p>
        <a href="#how2penk-section" className="inline-block bg-yellow-400 text-black font-bold px-4 py-2 sm:px-8 sm:py-3 rounded-full shadow-lg hover:bg-yellow-300 transition animate-fade-in-up delay-400 text-base max-w-xs mx-auto">Get Started</a>
      </section>
      {/* How It Works: Visually Connected Steps + Video, Modern Design */}
      <section id="how2penk-section" className="w-full flex flex-col items-center mt-32 mb-24 scroll-mt-24">
        <div className="w-full max-w-4xl flex flex-col md:flex-row items-ceter md:items-stretch gap-8 bg-[#181b1c]/80 rounded-3xl shadow-2xl p-8 relative overflow-hidden border-2 border-yellow-400 animate-border-glow">
          {/* Steps: Animated, visually connected to video */}
          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="flex-1 flex flex-col justify-center gap-6 z-10"
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">How it works</h2>
            {[
              { title: 'Visit', desc: <a href='https://pepubridge.com' className='text-yellow-400 underline' target='_blank'>pepubridge.com</a> },
              { title: 'Connect your wallet', desc: 'Use a wallet that supports custom networks.' },
              { title: 'Enter the amount to bridge', desc: 'Choose how many tokens to move to Layer 2.' },
              { title: 'Review and accept terms', desc: '' },
              { title: 'Confirm in your wallet', desc: 'Processing may take a few minutes.' },
              { title: 'Done!', desc: 'Your tokens will appear on Layer 2.' },
            ].map((step, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.1 } },
                }}
                className="flex items-start gap-4"
              >
                <span className="bg-yellow-400 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-yellow-500/60">{i+1}</span>
                <div>
                  <span className="font-semibold">{step.title} {step.desc && <span className="block text-sm text-white/80 font-normal">{step.desc}</span>}</span>
                </div>
              </motion.li>
            ))}
          </motion.ol>
          {/* Video: Visually connected, slightly overlapping on desktop */}
          <div className="relative flex justify-center items-center flex-shrink-0 md:-mr-8 z-20 mt-8 md:mt-0">
            <div className="absolute -inset-4 bg-yellow-400/10 blur-2xl rounded-2xl z-0" />
            <div className="relative z-10">
              <Image
                src="/6012603865783978394.jpg"
                alt="How2Penk Guide"
                width={480}
                height={300}
                className="rounded-2xl shadow-xl w-full h-auto object-cover max-w-lg"
                priority={false}
              />
              <div className="absolute" style={{ top: '22%', left: '50%', transform: 'translate(-50%, 0)', width: 270, height: 90 }}>
                <video
                  src="/HOW2PENK%20FULL.mov"
                  controls
                  className="w-full h-full rounded-xl shadow-xl bg-black/90 animate-fade-in-up"
                  style={{ objectFit: 'cover', aspectRatio: '19/6' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Pepu Bank: Unified Feature Highlight, Modern Design */}
      <section className="w-full flex flex-col items-center mt-8 mb-24 animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-yellow-400 mb-10 tracking-tight text-center">Why Pepu Bank?</h2>
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-stretch bg-[#181b1c]/80 rounded-3xl shadow-2xl p-10 relative" style={{ overflow: 'visible' }}>
          {/* Floating image OUTSIDE the container, absolutely positioned */}
          <div className="hidden md:block" style={{ position: 'absolute', right: '-140px', top: '45%', transform: 'translateY(-50%)', zIndex: 30, pointerEvents: 'none' }}>
            <Image src="/image__2_-removebg-preview.png" alt="Pepu Bank Logo" width={300} height={300} className="rounded-full shadow-2xl" />
          </div>
          {/* Left: Text about SuperBridge, visually connected to bridge interface */}
          <div className="flex-1 flex flex-col gap-6 justify-center z-10">
            <h3 className="text-xl font-bold text-white mb-2"><span className="text-yellow-400">SuperBridge</span>: The Future of Asset Movement</h3>
            <p className="text-white/80 text-base"><span className="text-yellow-400">SuperBridge</span> is Pepu Bank&#39;s next-generation cross-chain bridge, enabling seamless, secure, and lightning-fast transfers of assets between networks. With industry-leading security, low fees, and a user-friendly experience, <span className="text-yellow-400">SuperBridge</span> empowers you to move your assets with confidence.</p>
            <ul className="list-disc list-inside text-white/70 text-sm pl-2">
              <li>Instant bridging between supported chains</li>
              <li>Low fees, high reliability</li>
              <li>Trusted by 100+ users</li>
              <li>24/7 support and monitoring</li>
            </ul>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <a href="#superbridge" className="inline-flex items-center gap-2 bg-yellow-400 text-black font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition">Bridge Assets Soon <ArrowRightLeft size={18} /></a>
                <span className="ml-2">
                  <Countdown targetDate={new Date('2025-07-31T23:59:00Z')} small hideComingSoon />
                </span>
              </div>
            </div>
          </div>
          {/* Right: Bridge Interface, vertically stacked */}
          <div className="flex-1 flex flex-col gap-6 justify-center items-center md:items-end z-10">
            <div className="w-full flex items-center justify-center">
                <div className="w-full max-w-xs bg-[#232526] rounded-2xl shadow-lg p-6 flex flex-col gap-4 border-2 border-yellow-400">
                <div className="w-full flex items-center justify-center mb-2">
                  <span className="text-yellow-400 font-extrabold text-lg tracking-wide">SuperBridge</span>
                </div>
                {/* From/To selectors as static labels, one-way L2 to L1 only */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-[#181b1c] flex items-center justify-center border border-yellow-400 overflow-hidden">
                        <Image src="/peuchain-logo.jpg" alt="Pepe Unchained V2" width={20} height={20} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </span>
                      <span className="text-white font-semibold text-xs">From</span>
                      <span className="text-white font-bold text-xs ml-2">Pepe Unchained V2</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-1 mt-1">
                    <div className="flex items-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-[#181b1c] flex items-center justify-center border border-yellow-400 overflow-hidden">
                        <Image src="/ethereum-logo.png" alt="Ethereum" width={20} height={20} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </span>
                      <span className="text-white font-semibold text-xs">To</span>
                      <span className="text-white font-bold text-xs ml-2">Ethereum</span>
                    </div>
                  </div>
                </div>
                {/* Progress bar for L1 pool balance */}
                <div className="mb-4">
                  {balanceLoading ? (
                    <div className="w-full h-4 bg-[#181b1c] rounded-full border border-yellow-400 flex items-center justify-center">
                      <span className="text-xs text-white/60">Loading pool balance...</span>
                    </div>
                  ) : balanceError ? (
                    <div className="w-full h-4 bg-[#181b1c] rounded-full border border-yellow-400 flex items-center justify-center">
                      <span className="text-xs text-red-400">{balanceError}</span>
                    </div>
                  ) : (
                    (() => {
                      const totalSupply = 35_000_000;
                      const balance = Number(tokenBalance || 0);
                      const percent = Math.min(100, (balance / totalSupply) * 100);
                      return (
                        <div className="w-full flex flex-col gap-1">
                          <div className="relative w-full h-4 bg-[#181b1c] rounded-full border border-yellow-400 overflow-hidden">
                            <div
                              className="absolute left-0 top-0 h-full bg-green-500"
                              style={{ width: `${percent}%`, transition: 'width 0.5s' }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold text-black drop-shadow" style={{ textShadow: '0 1px 2px #fff8' }}>{percent.toFixed(2)}%</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-white/60 mt-0.5">
                            <span>0</span>
                            <span>35,000,000</span>
                          </div>
                          <div className="text-xs text-white/80 text-center font-semibold mt-1">
                            SuperBridge Pool: {balance.toLocaleString()} PEPU
                          </div>
                        </div>
                      );
                    })()
                  )}
                </div>
                {/* Amount input */}
                <div className="flex flex-col gap-1">
                  <label className="text-white/70 text-xs mb-1">You Send</label>
                  <input
                    type="number"
                    min="0"
                    value="100000"
                    disabled
                    className="w-full bg-[#181b1c] text-white text-base font-bold rounded-lg px-3 py-2 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/40"
                    style={{ appearance: 'textfield' }}
                  />
                  <div className="flex items-center justify-between mt-1 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#181b1c] flex items-center justify-center border border-yellow-400 overflow-hidden">
                        <Image src="/peuchain-logo.jpg" alt="PEPU" width={24} height={24} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </span>
                      <span className="text-white font-semibold text-sm">PEPU</span>
                    </div>
                    <span className="text-white/60 text-xs">
                      {balanceLoading ? "Loading balance..." : balanceError ? balanceError : `${Math.floor(Math.random() * 1_000_000).toLocaleString()} PEPU available`}
                    </span>
                  </div>
                  <label className="text-white/70 text-xs mb-1 mt-2">You Receive</label>
                  <input
                    type="number"
                    min="0"
                    value="95000"
                    disabled
                    className="w-full bg-[#181b1c] text-white text-base font-bold rounded-lg px-3 py-2 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/40"
                    style={{ appearance: 'textfield' }}
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-6 h-6 rounded-full bg-[#181b1c] flex items-center justify-center border border-yellow-400 overflow-hidden">
                      <Image src="/peuchain-logo.jpg" alt="PEPU" width={24} height={24} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </span>
                    <span className="text-white font-semibold text-sm">PEPU</span>
                  </div>
                </div>
                {/* CTA Button */}
                <button className="w-full bg-[#1a2e1a] text-white font-bold py-3 rounded-xl mt-2 shadow transition cursor-not-allowed border-2 border-yellow-400" disabled>Coming Soon</button>
              </div>
            </div>
          </div>
          {/* Visual connector (background gradient or shape) */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/5 pointer-events-none rounded-3xl" />
        </div>
      </section>
      {/* FAQ Section: Full Width, Animated */}
      <section className="w-full flex flex-col items-center mt-8 mb-24 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-yellow-400 mb-8 w-full max-w-5xl text-left pl-2">Frequently Asked Questions</h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="w-full max-w-5xl flex flex-col gap-8 items-start"
        >
          {[
            { q: "What is Pepu Bank?", a: "Pepu Bank is a platform for bridging, buying, and exploring the PEPU ecosystem with advanced tools like SuperBridge." },
            { q: "How do I use SuperBridge?", a: "Connect your wallet, select the amount and network, and confirm the transaction. Your assets will be bridged instantly." },
            { q: "Is Pepu Bank secure?", a: "Yes, we use industry-leading security practices and 24/7 monitoring to keep your assets safe." },
            { q: "What networks are supported?", a: "Currently, bridging is available exclusively to Pepe Unchained V2, offering fast transactions and low fees. Additional Layer 2 networks will be added in the future." },
            { q: "Where can I get support?", a: "Join our community on Telegram or contact us via the support page for help anytime." },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } },
              }}
              className="bg-[#181b1c]/80 rounded-xl shadow-lg p-6 border-2 border-yellow-400 text-left w-full"
            >
              <div className="font-bold text-white mb-2">{item.q}</div>
              <div className="text-white/80 text-base">{item.a.replace(/'/g, "&#39;")}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* Footer: Multi-Column, Professional */}
      <footer className="w-full bg-[#181b1c] border-t border-yellow-500/30 py-8 sm:py-12 md:py-16 animate-fade-in-up mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-5 gap-6 md:gap-10 px-4 sm:px-6">
          {/* About */}
          <div className="flex flex-col gap-2">
            <Image src="/pepubank-logo.png" alt="Pepu Bank Logo" width={48} height={16} className="mb-2" />
            <span className="text-white/80 text-sm">PEPU BANK is your gateway to the PEPU ecosystem. Bridge, buy, and explore with confidence.</span>
          </div>
          {/* Products (from Explore) */}
          <div className="flex flex-col gap-2">
            <span className="text-yellow-400 font-bold mb-2">Products</span>
            {exploreLinks.map(link => (
              <a key={link.name} href={link.href} className="text-white/80 hover:text-yellow-400 transition">{link.name}</a>
            ))}
          </div>
          {/* Resources (from nav) */}
          <div className="flex flex-col gap-2">
            <span className="text-yellow-400 font-bold mb-2">Resources</span>
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-white/80 hover:text-yellow-400 transition">{link.name}</a>
            ))}
          </div>
          {/* Community */}
          <div className="flex flex-col gap-2">
            <span className="text-yellow-400 font-bold mb-2">Community</span>
            <a href="https://t.me/Pepu_BANK" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-yellow-400 transition">Telegram</a>
            <a href="https://x.com/PepuBank" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-yellow-400 transition">X</a>
            <a href="https://www.instagram.com/pepubank?igsh=c2FndHNubGk4Zzk2" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-yellow-400 transition">Instagram</a>
          </div>
          {/* Contact */}
          <div className="flex flex-col gap-2">
            <span className="text-yellow-400 font-bold mb-2">Contact</span>
            <a href="#" className="text-white/80 hover:text-yellow-400 transition">Support</a>
            <a href="#" className="text-white/80 hover:text-yellow-400 transition">Email</a>
          </div>
        </div>
        <div className="text-white/40 text-xs text-center mt-8">&copy; {new Date().getFullYear()} Pepu Bank. All rights reserved.</div>
        <div className="text-white/40 text-xs text-center mt-2">Not financial advice. Cryptocurrency involves risk. Do your own research.</div>
      </footer>
    </div>
  );
}
