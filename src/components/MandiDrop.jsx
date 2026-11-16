import React, { useState } from 'react';
import { Send, Sparkles, Bell, Users, CheckCircle2, Clock, Smartphone, QrCode, X, Share2, DollarSign } from 'lucide-react';
import { sfx } from '../utils/sfx';
import { addLedgerTransaction } from '../utils/storage';

const COMMUNITY_SOCIETIES = [
  { id: 'soc-1', name: 'Silver Oaks Apartments', distance: '120m away', residents: 480, whatsappGroup: 'Silver Oaks Residents (Official)' },
  { id: 'soc-2', name: 'Greenwood Enclave', distance: '240m away', residents: 320, whatsappGroup: 'Greenwood Food & Daily Needs' },
  { id: 'soc-3', name: 'Gulmohar Park Society', distance: '380m away', residents: 650, whatsappGroup: 'Gulmohar Community Market' },
];

export default function MandiDrop({ t, lang }) {
  const [selectedDiscount, setSelectedDiscount] = useState(35);
  const [itemType, setItemType] = useState('Fresh Leafy Greens & Soft Tomatoes');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [claimedUnits, setClaimedUnits] = useState(2);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const basePrice = 80;
  const discountedPrice = Math.round(basePrice * (1 - selectedDiscount / 100));

  const handleBroadcast = () => {
    sfx.mandiPing();
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      sfx.success();
      setClaimedUnits(0);
      const interval = setInterval(() => {
        setClaimedUnits(prev => {
          if (prev >= 6) {
            clearInterval(interval);
            return 6;
          }
          return prev + 1;
        });
      }, 1200);
    }, 1200);
  };

  // Generate real WhatsApp deep link
  const getWhatsAppShareUrl = () => {
    const text = `*🍅 ThelaOS Evening Mandi Drop!*\n\nOffer: *${itemType}*\nFlash Price: *₹${discountedPrice}* (Regular ₹${basePrice}, -${selectedDiscount}% OFF)\nLocation: Cart #01 at Society Main Gate\nValid till: 6:30 PM today.\n\n_Generated via ThelaOS (Google Fund My Crazy 2026)_`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const handleSimulatePayment = () => {
    sfx.upiChime();
    setPaymentSuccess(true);
    
    // Play voice announcement: "Google Pay par ₹X prapt hue"
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(`गूगल पे पर ₹${discountedPrice} प्राप्त हुए!`);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }

    // Add to ledger
    addLedgerTransaction({
      type: 'Mandi Drop UPI Sale',
      description: `Sold ${itemType} via Mandi Drop QR`,
      valueSaved: discountedPrice,
      weightSavedKg: 2.0
    });

    setClaimedUnits(prev => Math.min(6, prev + 1));

    setTimeout(() => {
      setPaymentSuccess(false);
      setShowUpiModal(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-carbon-800 via-carbon-850 to-carbon-800 border border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-mandi-emerald/10 text-mandi-emerald border border-mandi-emerald/20">
              {t.mandiDrop.tag}
            </span>
            <span className="text-xs font-mono text-zinc-400">&bull; Hyperlocal Community Dispersal</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{t.mandiDrop.title}</h2>
          <p className="text-sm text-zinc-400 mt-0.5">{t.mandiDrop.desc}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-carbon-900 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-2">
            <Clock className="size-3.5 text-mandi-amber" />
            <span>{t.mandiDrop.optimalWindow}</span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Vendor Configurator (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="tactile-card p-6 rounded-2xl border border-white/10 bg-carbon-800 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Sparkles className="size-4 text-mandi-emerald" />
              <span>{t.mandiDrop.configTitle}</span>
            </h3>

            {/* Produce Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 uppercase">{t.mandiDrop.produceBundle}</label>
              <select
                value={itemType}
                onChange={(e) => { sfx.click(); setItemType(e.target.value); }}
                className="w-full p-3 rounded-xl bg-carbon-900 border border-white/10 text-white text-xs focus:outline-none focus:border-mandi-emerald font-sans"
              >
                <option value="Fresh Leafy Greens & Soft Tomatoes">Combo: 2kg Ripe Tomatoes + 2 Bundles Spinach</option>
                <option value="Palak & Methi Flash Crate">Fresh Leafy Greens (4 Bundles Methi + 3 Palak)</option>
                <option value="Ready-to-Eat Bananas">Ready-to-Eat Spotted Sweet Bananas (2 Dozen)</option>
              </select>
            </div>

            {/* Discount Percentage Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">{t.mandiDrop.markdownDiscount}</span>
                <span className="text-mandi-emerald font-bold text-sm">-{selectedDiscount}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="50"
                step="5"
                value={selectedDiscount}
                onChange={(e) => { sfx.click(); setSelectedDiscount(parseInt(e.target.value)); }}
                className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-mandi-emerald"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                <span>-20% (Break-even + 15%)</span>
                <span>-35% (Sweet Spot)</span>
                <span>-50% (Emergency Liquidation)</span>
              </div>
            </div>

            {/* Target Societies */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 uppercase">{t.mandiDrop.targetCommunities}</label>
              <div className="space-y-2">
                {COMMUNITY_SOCIETIES.map((soc) => (
                  <div key={soc.id} className="p-2.5 rounded-xl bg-carbon-900/60 border border-white/[0.06] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Users className="size-3.5 text-mandi-cyan" />
                      <div>
                        <strong className="text-white block">{soc.name}</strong>
                        <span className="text-[10px] text-zinc-500">{soc.distance} &bull; {soc.residents} Flats</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Connected
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Broadcast & Real WhatsApp Link */}
            <div className="space-y-2">
              <button
                onClick={handleBroadcast}
                disabled={isBroadcasting}
                className="w-full py-3 rounded-xl bg-mandi-emerald hover:bg-emerald-400 text-black font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-mandi-emerald/20 disabled:opacity-50"
              >
                <Send className={`size-4 ${isBroadcasting ? 'animate-bounce' : ''}`} />
                <span>{isBroadcasting ? 'Broadcasting via WhatsApp API...' : t.mandiDrop.dispatchBroadcast}</span>
              </button>

              <a
                href={getWhatsAppShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sfx.click()}
                className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Share2 className="size-3.5 text-emerald-400" />
                <span>{t.mandiDrop.shareWhatsApp}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: WhatsApp Preview & UPI QR Simulation (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="tactile-card p-6 rounded-2xl border border-white/10 bg-carbon-900 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Smartphone className="size-4" /> {t.mandiDrop.consumerPreview}
              </span>
              <span>Lajpat Nagar Node</span>
            </div>

            {/* WhatsApp Chat Message Mock */}
            <div className="p-4 rounded-2xl bg-[#0b141a] border border-white/[0.06] space-y-3 shadow-inner">
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold border-b border-white/[0.06] pb-2">
                <Bell className="size-3.5 text-emerald-400 animate-bounce" />
                <span>MandiDrop Alert &bull; Silver Oaks Residents</span>
              </div>

              <div className="space-y-2 text-xs text-zinc-200">
                <p className="font-semibold text-white">
                  🍅 Evening Fresh Mandi Drop! (Direct from Cart #01 at Gate 2)
                </p>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  Ram Prasad is at the society gate with <strong>{itemType}</strong> harvested this morning.
                </p>

                <div className="p-2.5 rounded-xl bg-carbon-950/80 border border-white/10 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Deal:</span>
                    <span className="text-mandi-emerald font-bold">{itemType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Price:</span>
                    <span>
                      <s className="text-zinc-500">₹{basePrice}</s> <strong className="text-white text-sm">₹{discountedPrice}</strong> ({selectedDiscount}% OFF)
                    </span>
                  </div>
                  <div className="flex justify-between text-amber-400">
                    <span>Valid until:</span>
                    <span>6:30 PM (or till stock ends)</span>
                  </div>
                </div>
              </div>

              {/* Real-time claim progress */}
              <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-zinc-400">{t.mandiDrop.claimedByNeighbours}:</span>
                  <span className="text-mandi-emerald font-bold">{claimedUnits} of 6 Bundles Reserved</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    style={{ width: `${(claimedUnits / 6) * 100}%` }}
                    className="h-full bg-mandi-emerald transition-all duration-500 rounded-full"
                  />
                </div>
              </div>

              {/* UPI Reserve & Pay Button */}
              <button
                onClick={() => { sfx.click(); setShowUpiModal(true); }}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow"
              >
                <QrCode className="size-4" />
                <span>{t.mandiDrop.reserveUpi}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* UPI QR Code Payment Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-white/15 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <QrCode className="size-4 text-mandi-emerald" />
                <span>BHARAT UPI SOUNDBOX</span>
              </span>
              <button onClick={() => setShowUpiModal(false)} className="text-zinc-400 hover:text-white">
                <X className="size-4" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-xl inline-block shadow-lg">
              {/* Synthetic Vector QR Code */}
              <svg viewBox="0 0 100 100" className="size-44 mx-auto">
                <rect width="100" height="100" fill="white" />
                <rect x="5" y="5" width="30" height="30" fill="black" />
                <rect x="10" y="10" width="20" height="20" fill="white" />
                <rect x="15" y="15" width="10" height="10" fill="black" />

                <rect x="65" y="5" width="30" height="30" fill="black" />
                <rect x="70" y="10" width="20" height="20" fill="white" />
                <rect x="75" y="15" width="10" height="10" fill="black" />

                <rect x="5" y="65" width="30" height="30" fill="black" />
                <rect x="10" y="70" width="20" height="20" fill="white" />
                <rect x="15" y="75" width="10" height="10" fill="black" />

                <rect x="42" y="12" width="6" height="18" fill="black" />
                <rect x="52" y="24" width="8" height="14" fill="black" />
                <rect x="42" y="44" width="16" height="16" fill="black" />
                <rect x="65" y="45" width="12" height="6" fill="black" />
                <rect x="75" y="55" width="18" height="18" fill="black" />
                <rect x="45" y="72" width="14" height="14" fill="black" />
              </svg>
            </div>

            <div>
              <span className="text-xs text-zinc-400 block">Pay to: <strong>Ram Prasad (Thela #01)</strong></span>
              <div className="text-2xl font-bold font-mono text-mandi-emerald">₹{discountedPrice}</div>
              <span className="text-[10px] font-mono text-zinc-500">UPI ID: thela01@okhdfcbank</span>
            </div>

            <button
              onClick={handleSimulatePayment}
              disabled={paymentSuccess}
              className="w-full py-2.5 rounded-xl bg-mandi-emerald hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {paymentSuccess ? (
                <>
                  <CheckCircle2 className="size-4 text-black" />
                  <span>Payment Received! Voice Announced</span>
                </>
              ) : (
                <>
                  <DollarSign className="size-4" />
                  <span>Simulate Customer Scan & Voice Alert</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
