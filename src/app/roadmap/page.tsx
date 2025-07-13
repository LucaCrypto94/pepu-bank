"use client";

function Roadmap() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Mobile background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 md:hidden"></div>
      {/* Desktop background */}
      <div className="absolute inset-0 hidden md:block" style={{ 
        backgroundImage: "url('/6026276859811056705.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>
      <div className="relative z-10 flex flex-col w-full px-0 pt-0 pb-2 -mt-2">
        <h1 className="text-2xl md:text-6xl font-extrabold text-yellow-400 mb-4 md:mb-1 drop-shadow-lg text-left ml-4 md:ml-24">Roadmap</h1>
        <div className="w-full text-white text-xs md:text-sm space-y-3 md:space-y-3 text-left ml-2 md:ml-24 px-2 md:px-0">
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