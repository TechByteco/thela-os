import React, { useState, useRef, useEffect } from 'react';
import { CARTS_DATA, TIME_SIMULATION_STEPS } from '../data/cartsData';
import { CITIES_WEATHER } from '../data/mandiTicker';
import { Camera, RefreshCw, Zap, Thermometer, Clock, Eye, CheckCircle2, AlertTriangle, Upload, Video, Plus, X, Sun, CloudRain } from 'lucide-react';
import { sfx } from '../utils/sfx';
import { getStoredCustomItems, saveCustomItem } from '../utils/storage';

export default function VisionScanner({ t, lang }) {
  const [mode, setMode] = useState('simulated'); // 'simulated' | 'webcam' | 'upload'
  const [selectedCartIndex, setSelectedCartIndex] = useState(0);
  const [activeBoxId, setActiveBoxId] = useState(null);
  const [timeStepIndex, setTimeStepIndex] = useState(2); // Mid-afternoon default
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [isScanning, setIsScanning] = useState(false);
  const [customItems, setCustomItems] = useState(getStoredCustomItems());
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Custom item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemHindi, setNewItemHindi] = useState('');
  const [newItemWeight, setNewItemWeight] = useState(5.0);
  const [newItemCost, setNewItemCost] = useState(30);

  // Webcam stream refs
  const videoRef = useRef(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const cart = CARTS_DATA[selectedCartIndex];
  const currentTime = TIME_SIMULATION_STEPS[timeStepIndex];
  const cityWeather = CITIES_WEATHER[selectedCity] || CITIES_WEATHER.Delhi;

  // Time decay factor modified by city weather
  const timeDecayFactor = (timeStepIndex - 2) * 12 * cityWeather.decayMultiplier;

  // Cleanup webcam on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  const startWebcam = async () => {
    sfx.click();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsWebcamActive(true);
        setMode('webcam');
      }
    } catch (err) {
      alert("Unable to access camera: " + err.message + ". You can use Simulated Carts or Upload Photo instead.");
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsWebcamActive(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      sfx.click();
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result);
        setMode('upload');
        stopWebcam();
        triggerScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerScan = () => {
    sfx.scanSweep();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      sfx.success();
    }, 1500);
  };

  const handleAddCustomProduce = (e) => {
    e.preventDefault();
    if (!newItemName) return;
    sfx.click();
    const item = {
      id: `custom-${Date.now()}`,
      label: newItemName,
      hindiLabel: newItemHindi || newItemName,
      weightKg: parseFloat(newItemWeight),
      freshness: 92,
      shelfLifeHours: 12,
      bbox: { x: 25, y: 30, width: 45, height: 40 },
      recommendation: `Target margin +25%. Wholesale cost: ₹${newItemCost}/kg.`,
      color: '#10b981'
    };
    const updated = saveCustomItem(item);
    setCustomItems(updated);
    setShowAddModal(false);
    setNewItemName('');
    setNewItemHindi('');
  };

  // Combine default cart items with custom user items
  const activeItems = [...cart.items, ...customItems];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Mode Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-carbon-800 via-carbon-850 to-carbon-800 border border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-mandi-emerald/10 text-mandi-emerald border border-mandi-emerald/20">
              {t.vision.tag}
            </span>
            <span className="text-xs font-mono text-zinc-400">&bull; Gemini 1.5 Flash (48ms inference)</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{t.vision.title}</h2>
          <p className="text-sm text-zinc-400 mt-0.5">{t.vision.desc}</p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 bg-carbon-900/90 p-1.5 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => { sfx.click(); setMode('simulated'); stopWebcam(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'simulated' ? 'bg-mandi-emerald text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {t.vision.modes.simulated}
          </button>
          <button
            onClick={isWebcamActive ? stopWebcam : startWebcam}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              mode === 'webcam' && isWebcamActive ? 'bg-red-500 text-white font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Video className="size-3.5" />
            <span>{isWebcamActive ? t.vision.stopCamera : t.vision.modes.webcam}</span>
          </button>
          <button
            onClick={() => { sfx.click(); fileInputRef.current?.click(); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              mode === 'upload' ? 'bg-mandi-cyan text-black font-semibold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Upload className="size-3.5" />
            <span>{t.vision.modes.upload}</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* 2. Micro-Climate City Selector & Cart Presets */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-carbon-800/80 border border-white/[0.06] text-xs">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-mono text-[11px] uppercase">City Climate:</span>
          {Object.keys(CITIES_WEATHER).map((c) => (
            <button
              key={c}
              onClick={() => { sfx.click(); setSelectedCity(c); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCity === c
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-zinc-400 hover:text-white bg-white/[0.03]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Add Custom Item Button */}
        <button
          onClick={() => { sfx.click(); setShowAddModal(true); }}
          className="px-3 py-1.5 rounded-lg bg-mandi-emerald/15 hover:bg-mandi-emerald/25 text-mandi-emerald border border-mandi-emerald/30 text-xs font-semibold flex items-center gap-1 transition-all"
        >
          <Plus className="size-3.5" />
          <span>{t.vision.addCustomItem}</span>
        </button>
      </div>

      {/* 3. Main Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Viewport (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-carbon-950 aspect-[4/3] sm:aspect-[16/10] shadow-2xl flex flex-col justify-between">
            {/* Viewfinder Header HUD */}
            <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-mono">
                  <span className="size-2 rounded-full bg-red-500 animate-ping" />
                  <span>{mode === 'webcam' ? 'LIVE FEED' : 'GEMINI HUD'} &bull; 1080p</span>
                </div>
                <span className="text-xs font-mono text-zinc-300 hidden sm:inline-block">
                  CAM_01: {cart.vendor} &bull; {selectedCity} Market
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-1">
                  <Thermometer className="size-3.5 text-amber-400" />
                  <span>{cityWeather.temp}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-3.5 text-mandi-cyan" />
                  <span>{currentTime.hour}</span>
                </div>
              </div>
            </div>

            {/* Backdrops based on active mode */}
            {mode === 'webcam' && (
              <video
                ref={videoRef}
                playsInline
                muted
                className="absolute inset-0 size-full object-cover z-0"
              />
            )}

            {mode === 'upload' && uploadedImage && (
              <img
                src={uploadedImage}
                alt="User Uploaded Cart"
                className="absolute inset-0 size-full object-cover z-0"
              />
            )}

            {mode === 'simulated' && (
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-carbon-900 via-zinc-900 to-carbon-950 flex items-center justify-center p-6">
                <svg viewBox="0 0 800 500" className="w-full h-full object-contain opacity-85">
                  <defs>
                    <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#451a03" />
                      <stop offset="100%" stopColor="#290f02" />
                    </linearGradient>
                    <radialGradient id="tomatoGrad" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#991b1b" />
                    </radialGradient>
                  </defs>
                  <rect x="50" y="80" width="700" height="340" rx="16" fill="url(#woodGrad)" stroke="#78350f" strokeWidth="6" />
                  <line x1="50" y1="200" x2="750" y2="200" stroke="#78350f" strokeWidth="3" strokeDasharray="6 4" />
                  <line x1="400" y1="80" x2="400" y2="420" stroke="#78350f" strokeWidth="4" />
                  {/* Produce Representation */}
                  <g transform="translate(100, 110)">
                    {[...Array(28)].map((_, i) => (
                      <circle key={i} cx={(i % 6) * 36} cy={Math.floor(i / 6) * 34} r="18" fill="url(#tomatoGrad)" stroke="#7f1d1d" strokeWidth="1.5" />
                    ))}
                  </g>
                  <g transform="translate(450, 110)">
                    {[...Array(24)].map((_, i) => (
                      <circle key={i} cx={(i % 5) * 40} cy={Math.floor(i / 5) * 35} r="18" fill={timeStepIndex >= 3 ? '#b45309' : 'url(#tomatoGrad)'} stroke="#78350f" strokeWidth="1.5" />
                    ))}
                  </g>
                </svg>
              </div>
            )}

            {/* Bounding Box Overlays */}
            <div className="absolute inset-0 z-10 p-4 pointer-events-auto">
              {activeItems.map((item) => {
                const effectiveFreshness = Math.max(15, Math.min(99, Math.round(item.freshness - timeDecayFactor)));
                const isSelected = activeBoxId === item.id;
                let boxColor = '#10b981';
                if (effectiveFreshness < 70) boxColor = '#f59e0b';
                if (effectiveFreshness < 50) boxColor = '#ef4444';

                return (
                  <div
                    key={item.id}
                    onClick={() => { sfx.click(); setActiveBoxId(item.id); }}
                    style={{
                      left: `${item.bbox.x}%`,
                      top: `${item.bbox.y}%`,
                      width: `${item.bbox.width}%`,
                      height: `${item.bbox.height}%`,
                      borderColor: boxColor,
                    }}
                    className={`absolute cursor-pointer rounded-xl border-2 transition-all duration-300 group ${
                      isSelected ? 'bg-white/10 shadow-2xl scale-[1.02] z-30' : 'bg-black/20 hover:bg-white/5 hover:border-white z-20'
                    }`}
                  >
                    <div
                      style={{ backgroundColor: boxColor }}
                      className="absolute -top-3.5 left-2 px-2 py-0.5 rounded text-[10px] font-bold text-black flex items-center gap-1.5 shadow-md"
                    >
                      <span>{lang === 'hi' ? item.hindiLabel : item.label}</span>
                      <span className="font-mono">{effectiveFreshness}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scanning Laser Line Effect */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-mandi-emerald to-transparent shadow-[0_0_20px_#10b981] animate-scan z-30 pointer-events-none" />
            )}

            {/* Viewfinder Bottom Controls */}
            <div className="relative z-20 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={triggerScan}
                  disabled={isScanning}
                  className="px-3.5 py-1.5 rounded-lg bg-mandi-emerald hover:bg-emerald-400 text-black font-semibold text-xs transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`size-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? t.vision.scanning : t.vision.runScan}</span>
                </button>

                <div className="text-xs font-mono text-zinc-400 hidden sm:flex items-center gap-1 bg-white/[0.05] px-2.5 py-1 rounded-lg border border-white/10">
                  <Zap className="size-3 text-amber-400" />
                  <span>Model: <strong>Gemini 1.5 Flash (Edge)</strong></span>
                </div>
              </div>

              <div className="text-xs font-mono text-zinc-300">
                Weather Impact: <strong className="text-amber-400">{cityWeather.alert}</strong>
              </div>
            </div>
          </div>

          {/* Time-Lapse Slider */}
          <div className="p-4 rounded-xl bg-carbon-800 border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-mandi-cyan" />
                <span className="font-semibold text-white">{t.vision.timeSimulator}</span>
              </div>
              <span className={`font-mono font-semibold px-2 py-0.5 rounded text-[11px] ${
                timeStepIndex >= 3 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {currentTime.hour} &bull; {currentTime.riskLevel}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max={TIME_SIMULATION_STEPS.length - 1}
              value={timeStepIndex}
              onChange={(e) => { sfx.click(); setTimeStepIndex(parseInt(e.target.value)); }}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-mandi-emerald"
            />
          </div>
        </div>

        {/* Right: Inspection & Unit Economics (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-carbon-800 border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <Eye className="size-4 text-mandi-emerald" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">{t.vision.inspectedSegment}</span>
              </div>
            </div>

            {(() => {
              const activeItem = activeItems.find(i => i.id === activeBoxId) || activeItems[0];
              const effFresh = Math.max(15, Math.min(99, Math.round(activeItem.freshness - timeDecayFactor)));
              const remainingHours = Math.max(0.8, (activeItem.shelfLifeHours - (timeStepIndex * 2)).toFixed(1));

              return (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{lang === 'hi' ? activeItem.hindiLabel : activeItem.label}</h3>
                    <p className="text-xs text-mandi-emerald font-semibold">{activeItem.hindiLabel}</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">Cellular Turgor (Freshness)</span>
                      <strong className={effFresh > 70 ? 'text-mandi-emerald' : effFresh > 50 ? 'text-amber-400' : 'text-red-400'}>
                        {effFresh}%
                      </strong>
                    </div>
                    <div className="w-full h-2 rounded-full bg-carbon-950 overflow-hidden p-0.5 border border-white/10">
                      <div
                        style={{ width: `${effFresh}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${
                          effFresh > 70 ? 'bg-mandi-emerald' : effFresh > 50 ? 'bg-amber-400' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-carbon-900 border border-white/[0.06]">
                      <span className="text-zinc-500 block text-[10px]">{t.vision.weightEst}</span>
                      <strong className="text-white text-sm">{activeItem.weightKg} kg</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-carbon-900 border border-white/[0.06]">
                      <span className="text-zinc-500 block text-[10px]">{t.vision.shelfLife}</span>
                      <strong className="text-amber-400 text-sm">{remainingHours} {t.vision.hours}</strong>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                    effFresh < 60 ? 'bg-red-500/10 border-red-500/30 text-red-200' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  }`}>
                    <div className="flex items-center gap-2 font-semibold">
                      {effFresh < 60 ? <AlertTriangle className="size-4 text-red-400" /> : <CheckCircle2 className="size-4 text-emerald-400" />}
                      <span>{t.vision.advisoryTitle}</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11px]">
                      {effFresh < 60
                        ? `URGENT: 4:30 PM Cliff reached. Ambient temp in ${selectedCity} is ${cityWeather.temp}. Initiate P2P Barter or post Mandi Drop immediately.`
                        : activeItem.recommendation}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Add Custom Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-carbon-900 border border-white/15 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="size-4 text-mandi-emerald" />
                <span>Add Custom Produce to Cart</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white">
                <X className="size-4" />
              </button>
            </div>
            <form onSubmit={handleAddCustomProduce} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Item Name (English)</label>
                <input
                  type="text"
                  placeholder="e.g. Bhindi (Okra)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-carbon-800 border border-white/10 text-white focus:outline-none focus:border-mandi-emerald"
                  required
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">Item Name (Hindi / Local)</label>
                <input
                  type="text"
                  placeholder="e.g. ताज़ा भिंडी"
                  value={newItemHindi}
                  onChange={(e) => setNewItemHindi(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-carbon-800 border border-white/10 text-white focus:outline-none focus:border-mandi-emerald"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-400 block mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newItemWeight}
                    onChange={(e) => setNewItemWeight(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-carbon-800 border border-white/10 text-white focus:outline-none focus:border-mandi-emerald"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Cost Rate (₹/kg)</label>
                  <input
                    type="number"
                    value={newItemCost}
                    onChange={(e) => setNewItemCost(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-carbon-800 border border-white/10 text-white focus:outline-none focus:border-mandi-emerald"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-mandi-emerald hover:bg-emerald-400 text-black font-bold text-xs transition-all shadow-lg"
              >
                Add to Cart & Start Gemini Tracking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
