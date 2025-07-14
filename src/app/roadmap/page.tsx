"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

// Helper to set hash and trigger scroll after navigation
function goToSection(router: any, hash: string) {
  router.push('/');
  setTimeout(() => {
    window.location.hash = hash;
  }, 50);
}

function Roadmap() {
  const router = useRouter();
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Listen for hash in URL and scroll
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      scrollToSection(window.location.hash);
    }
  }, [typeof window !== 'undefined' && window.location.hash]);

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
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Responsive Header Row */}
      <div className="absolute top-0 left-0 right-0 z-30 w-full pointer-events-none">
        {/* Desktop Header (logo left, nav center, connect right) */}
        <div className="hidden sm:flex items-center w-full pointer-events-auto justify-center gap-x-60">
          {/* Logo at far left */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/pepubank-logo.png"
                alt="Pepu Bank Logo"
                width={48}
                height={16}
                className="shadow"
                priority
              />
            </Link>
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
        {/* Mobile Header (logo, connect, menu) */}
        <div className="flex sm:hidden items-center w-full justify-between pointer-events-auto px-4 py-3 bg-black/80 backdrop-blur-md border-b border-yellow-500/20">
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/pepubank-logo.png"
                alt="Pepu Bank Logo"
                width={40}
                height={14}
                className="shadow"
                priority
              />
            </Link>
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
      {/* Mobile background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 md:hidden"></div>
      {/* Desktop background */}
      <div className="absolute inset-0 hidden md:block" style={{ 
        backgroundImage: "url('/6026276859811056705.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>
      <div className="relative z-10 flex flex-col w-full px-0 pt-20 md:pt-2 pb-2">
        <h1 className="text-2xl md:text-5xl font-extrabold text-yellow-400 mb-3 md:mb-1 drop-shadow-lg text-left ml-4 md:ml-24">Roadmap</h1>
        <div className="w-full text-white text-sm md:text-base space-y-3 md:space-y-3 text-left ml-2 md:ml-24 px-2 md:px-0 mt-1 md:mt-2">
          <div className="mb-4">
            <div className="bg-black/40 rounded-lg p-3 border border-yellow-400/30 md:bg-transparent md:border-none md:p-0">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">✅</span>
                <span className="font-semibold font-permanent-marker text-yellow-400">Phase 1 — July 2025 🎉</span>
              </div>
              <div className="font-permanent-marker space-y-0.5">
                Official Website Launch + SuperBridge<br/>
            The SuperBridge is here: fast, secure, and built for the community<br/>
            Exclusive access for $PENK holders<br/>
            The first building block of the new PEPU infrastructure
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="bg-black/40 rounded-lg p-3 border border-yellow-400/30 md:bg-transparent md:border-none md:p-0">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">🛒</span>
                <span className="font-semibold font-permanent-marker text-yellow-400">Phase 2 — August 2025 💰</span>
              </div>
              <div className="font-permanent-marker space-y-0.5">
                Easier $PEPU Purchasing on Layer 2<br/>
            New website feature: direct $PEPU purchases on L2 Accepted payments: ETH, BTC, USDC<br/>
            Discounted prices compared to the market
              </div>
            </div>
          </div>
          <div>
            <div className="bg-black/40 rounded-lg p-3 border border-yellow-400/30 md:bg-transparent md:border-none md:p-0">
              <div className="flex items-center mb-2">
                <span className="text-xl mr-2">🎮</span>
                <span className="font-semibold font-permanent-marker text-yellow-400">Phase 3 — December 2025🔥</span>
              </div>
              <div className="font-permanent-marker space-y-0.5">
                Launch of PEPU-themed Multiplayer Game<br/>
            Holders compete in a fun and strategic environment Players<br/>
            battle for a final prize pool<br/>
            Boosted community engagement and token utility
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap; 