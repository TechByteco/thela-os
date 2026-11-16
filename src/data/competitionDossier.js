export const COMPETITION_DOSSIER = {
  competitionName: 'Google Fund My Crazy 2026',
  prizePool: '₹1,00,00,000 (1 Crore INR)',
  projectTitle: 'ThelaOS',
  subtitle: 'The Gemini-Powered Hyperlocal Swarm for India\'s 10 Million Street Vendors',
  selectedTheme: 'Markets & Local Commerce',
  teamCategory: 'College Students (Open Discipline)',
  submissionDeadline: 'September 15, 2026',
  
  answers: {
    problem: {
      question: 'What is the real problem you are reimagining in your city?',
      answer: `In every Indian city, over 10 million informal street vendors (thelawalas) distribute 30% of urban fresh nutrition. Yet, every single day between 4:30 PM and 6:00 PM, they face the brutal "Perishable Spoilage Cliff": without refrigeration, up to 35-40% of their unsold leafy greens, tomatoes, and fruit rapidly decay under 34°C heat. 

This triggers devastating distress sales (selling at 60-70% losses) or dumping unsold food onto streets. Concurrently, other vendors just 300 meters away have stockouts of the exact items being dumped. This creates severe economic vulnerability for bottom-of-the-pyramid families, rots thousands of tons of edible calories daily, and chokes municipal solid waste landfills.`
    },
    crazySolution: {
      question: 'What is your CRAZY idea to solve this, and how does it reimagine the everyday city?',
      answer: `Instead of trying to replace thelawalas with venture-funded quick-commerce warehouses or unaffordable refrigerated electric vans, our "CRAZY" idea is to turn the 10 million existing wooden pushcarts into a self-balancing, decentralized, zero-emission fresh food internet.

We do this through ThelaOS: any standard ₹6,000 Android smartphone suspended on a bamboo pole above the cart transforms into an autonomous inventory agent. The vendor doesn't type a single word. Using a 3-second camera sweep, Gemini 1.5 Flash Vision automatically counts, inspects, and grades every vegetable for cell turgor and freshness decay curves. 

When the 4:30 PM heat risk is detected, ThelaOS coordinates hyper-local peer-to-peer barter swaps with nearby carts within 500 meters (trading surplus tomatoes for onions to diversify evening sales) and broadcasts dynamic, geo-fenced "Mandi Drops" (evening flash markdowns) directly to nearby apartment gates via WhatsApp. It transforms unorganized street chaos into an intelligent, self-healing urban food swarm.`
    },
    geminiTech: {
      question: 'How specifically does Google Gemini power your solution?',
      answer: `ThelaOS is fundamentally impossible without Google Gemini\'s unique multimodal architecture:
1. Zero-Shot Visual Freshness Grading (Gemini 1.5 Flash Vision): Processes low-resolution camera video sweeps in challenging outdoor lighting. Recognizes 40+ Indian native vegetable varieties, distinguishes Grade-A firmness from Grade-C imminent spoilage, and calculates remaining shelf-life hours.
2. Low-Latency Indic Audio (Gemini Live / Speech-to-Speech): Semi-literate hawkers communicate exclusively via natural conversational audio in 12+ native Indian languages (Hindi, Bhojpuri, Marathi, Tamil, Bengali, Telugu). Gemini acts as a savvy street-trader companion providing voice-based pricing and negotiation advice.
3. Edge Privacy & Offline Resilience (Gemini Nano): Runs lightweight acoustic and visual pre-filtering on-device without consuming costly cellular mobile data in crowded bazaar dead zones.
4. Geospatial Swarm Reasoning (Gemini Function Calling + Google Maps API): Continuously calculates multi-cart micro-logistics barter equilibria across hundreds of roving thelas in dense urban layouts.`
    }
  },

  geminiVisualPrompt: {
    title: 'Gemini Imagen 3 Submission Visual Prompt',
    description: 'Use this exact prompt inside Google Gemini to generate the competition visual representation required for submission:',
    promptText: `A cinematic wide-angle photograph of an authentic Indian street vendor (thelawala) at golden hour in a bustling bazaar like Old Delhi or Bengaluru. A wooden handcart is laden with colorful heaps of fresh tomatoes, crisp spinach, and bananas. A budget Android smartphone mounted to a slender bamboo pole above the cart projects a delicate, high-tech augmented reality overlay across the produce: luminous emerald bounding boxes displaying Hindi script freshness percentages ("ताज़ा 94%") and cyan decaying vectors. In the background, other street carts with subtle interconnected holographic data trails create a synchronized swarm network under warm market streetlights. Photorealistic, warm atmospheric lighting, documentary realism, 8k resolution.`
  },

  rubricChecklist: [
    { criterion: 'Audacious Moonshot ("Crazy Factor")', score: '10/10', justification: 'Turns informal street pushcarts into an autonomous distributed logistics grid instead of replacing them.' },
    { criterion: 'Indian Urban Relevance', score: '10/10', justification: 'Directly tackles urban food waste, the 4:30 PM distress sale cliff, and vendor livelihoods.' },
    { criterion: 'Deep Gemini Synergy', score: '10/10', justification: 'Relies on multimodal vision, Indic speech synthesis, and low-latency reasoning; cannot be built with text-only LLMs.' },
    { criterion: 'Implementation Feasibility', score: '9.5/10', justification: 'Runs on standard Android smartphones already owned by street vendors for UPI payments.' }
  ]
};
