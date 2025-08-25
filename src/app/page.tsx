"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { BsCircleFill } from 'react-icons/bs';

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

// (AnimatedNumber is not used and has been removed)



export default function Home() {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);
  const router = useRouter();

  // Native wallet balance (PEPU coin)
  const { address, isConnected } = useAccount();

  return (
    <>
    <div
      className="relative min-h-screen w-full bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/pepubank-site-bg.jpg')" }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />
      {/* Responsive Header Row */}
        <div className="relative top-3 left-0 right-0 z-30 w-full pointer-events-auto">
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
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-yellow-400 transition-colors duration-200"
                    onClick={e => {
                      e.preventDefault();
                      if (window.location.pathname !== '/') {
                        router.push('/');
                        setTimeout(() => {
                          const el = document.querySelector(link.href);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      } else {
                        const el = document.querySelector(link.href);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
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
              {({ openConnectModal, openAccountModal }) => (
                <button
                  onClick={() => {
                    if (isConnected && openAccountModal) {
                      openAccountModal();
                    } else {
                      openConnectModal();
                    }
                  }}
                  type="button"
                  className="bg-yellow-400 text-black font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-none shadow hover:bg-yellow-300 transition border-2 border-yellow-600 text-sm sm:text-base min-w-[80px] sm:min-w-[110px] tracking-wide"
                >
                  {isConnected && address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : 'Connect'}
            </button>
              )}
            </ConnectButton.Custom>
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
          <div className="flex items-center gap-2" style={{ pointerEvents: 'auto', zIndex: 50 }}>
            <ConnectButton.Custom>
              {({ openConnectModal, openAccountModal }) => (
                <button
                  onClick={() => {
                    if (isConnected && openAccountModal) {
                      openAccountModal();
                    } else {
                      openConnectModal();
                    }
                  }}
                  type="button"
                  className="bg-yellow-400 text-black font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-none shadow hover:bg-yellow-300 transition border-2 border-yellow-600 text-sm sm:text-base min-w-[80px] sm:min-w-[110px] tracking-wide"
                >
                  {isConnected && address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : 'Connect'}
            </button>
              )}
            </ConnectButton.Custom>
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
              {navLinks.map((link) => (
                (link.name === 'RoadMap' || link.name === 'Whitepaper') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="hover:text-yellow-400 transition-colors duration-200"
                    onClick={e => {
                      e.preventDefault();
                      setMobileNavOpen(false);
                      router.push(link.href);
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
                      setMobileNavOpen(false);
                      if (window.location.pathname !== '/') {
                        router.push('/');
                        setTimeout(() => {
                          const el = document.querySelector(link.href);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      } else {
                        const el = document.querySelector(link.href);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                    }}
                  >
                    {link.name}
                  </a>
                ) : null
              ))}
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
            className="flex-1 flex flex-col justify-center gap-3 z-10 sm:gap-6"
          >
            <h2 className="text-lg font-bold text-yellow-400 mb-2 sm:text-2xl sm:mb-0 sm:mr-4 sm:min-w-[180px]">How it works</h2>
            {[
              { title: 'Visit', desc: <a href='https://pepubridge.com' className='text-yellow-400 underline' target='_blank'>pepubridge.com</a> },
              { title: 'Connect your wallet', desc: 'Use a wallet that supports custom networks.' },
              { title: 'Enter the amount to bridge', desc: 'Choose how many tokens to move to Layer 2.' },
              { title: 'Review and accept terms', desc: 'Please read and accept the terms before proceeding.' },
              { title: 'Confirm in your wallet', desc: 'Processing may take a few minutes.' },
              { title: 'Done!', desc: 'Your tokens will appear on Layer 2.' },
            ].map((step, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.1 } },
                }}
                className="flex items-start gap-2 px-2 py-2 bg-[#232526] rounded-lg shadow border border-yellow-400/40 hover:bg-yellow-400/10 transition-all duration-200 sm:gap-4 sm:min-w-[180px] sm:px-4 sm:py-3 sm:rounded-xl"
              >
                <span className="bg-yellow-400 text-black font-bold rounded-full w-7 h-7 flex items-center justify-center shadow border border-yellow-500/60 text-base sm:w-8 sm:h-8 sm:text-lg">{i+1}</span>
                <div>
                  <span className="font-semibold text-sm sm:text-base text-yellow-100">{step.title}</span>
                  {step.desc && <span className="block text-xs sm:text-sm text-white/80 font-normal mt-0.5">{step.desc}</span>}
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
               <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                 <iframe
                   src="https://www.youtube.com/embed/TqXo3nHeeDE?si=DruYvtdLPZuSmsmS"
                   allow="autoplay; encrypted-media"
                   allowFullScreen
                   className="rounded-xl shadow-xl bg-black/90 animate-fade-in-up"
                   style={{ width: '100%', maxWidth: 600, height: 90, objectFit: 'cover', aspectRatio: '19/6', border: 0 }}
                   title="HOW2PENK Video"
                />
               </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Pepu Bank: Unified Feature Highlight, Modern Design */}
      <section id="superbridge" className="w-full flex flex-col items-center mt-8 mb-24 animate-fade-in-up">
        <h2 className="text-3xl font-extrabold text-yellow-400 mb-10 tracking-tight text-center">Why Pepu Bank?</h2>
        <div className="w-full max-w-4xl flex flex-col items-center bg-[#181b1c]/80 rounded-3xl shadow-2xl p-10 relative" style={{ overflow: 'visible' }}>
          {/* Floating image OUTSIDE the container, absolutely positioned */}
          <div className="hidden md:block" style={{ position: 'absolute', right: '-140px', top: '55%', transform: 'translateY(-50%)', zIndex: 30, pointerEvents: 'none' }}>
            <Image src="/image__2_-removebg-preview.png" alt="Pepu Bank Logo" width={300} height={300} className="rounded-full shadow-2xl" />
          </div>
          {/* Text about SuperBridge */}
          <div className="flex flex-col gap-6 justify-center z-10 text-left max-w-2xl">
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
                <a href="https://superbridge.pepubank.net" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-yellow-400 text-black font-bold px-6 py-2 rounded-full shadow hover:bg-yellow-300 transition">Bridge Assets <ArrowRightLeft size={18} /></a>
                <span className="ml-2 flex items-center gap-1">
                  <BsCircleFill className="w-2 h-2 text-green-400 animate-pulse" />
                  <span className="text-white font-semibold text-sm">LIVE</span>
                </span>
              </div>
            </div>
          </div>

          {/* Visual connector (background gradient or shape) */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/5 pointer-events-none rounded-3xl" />
        </div>
      </section>
      {/* FAQ Section: Full Width, Animated */}
      <section id="faq-section" className="w-full flex flex-col items-center mt-8 mb-24 animate-fade-in-up">
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
            { q: "What is Pepu Bank?", a: "Pepu Bank is a platform for buying and exploring the PEPU ecosystem with exclusive services and community features." },
            { q: "Is Pepu Bank secure?", a: "Yes, we use industry-leading security practices and 24/7 monitoring to keep your assets safe." },
            { q: "What networks are supported?", a: "We support Pepe Unchained V2 for fast, low-fee transactions. Our SuperBridge enables seamless transfers between L2 and Ethereum Mainnet, while Penk Market provides trading for Ethereum Mainnet assets. More networks coming soon!" },
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
              link.name === "Whitepaper" ? (
                <Link key={link.name} href={link.href} className="text-white/80 hover:text-yellow-400 transition">{link.name}</Link>
              ) : (
                <a key={link.name} href={link.href} className="text-white/80 hover:text-yellow-400 transition">{link.name}</a>
              )
            ))}
          </div>
          {/* Community */}
          <div className="flex flex-col gap-2">
            <span className="text-yellow-400 font-bold mb-2">Community</span>
            <a href="https://t.me/PenkSpring" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-yellow-400 transition">Telegram</a>
            <a href="https://x.com/PepuBank" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-yellow-400 transition">X</a>
            <a href="https://www.instagram.com/pepubank?igsh=c2FndHNubGk4Zzk2" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-yellow-400 transition">Instagram</a>
          </div>
          {/* Contact */}
          <div className="flex flex-col gap-2">
            <span className="text-yellow-400 font-bold mb-2">Contact</span>
            <a href="https://t.me/Pepu_BANK" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-yellow-400 transition">Support</a>
            <a href="mailto:pepubankteam@gmail.com" className="text-white/80 hover:text-yellow-400 transition">Email</a>
          </div>
        </div>
        <div className="text-white/40 text-xs text-center mt-8">&copy; {new Date().getFullYear()} Pepu Bank. All rights reserved.</div>
        <div className="text-white/40 text-xs text-center mt-2">Not financial advice. Cryptocurrency involves risk. Do your own research.</div>
      </footer>
    </div>
    </>
  );
}
