export const HARDWARE_SPEC = {
  totalRetrofitCostInr: 1380, // ~$16 USD
  components: [
    {
      id: 'mount',
      name: 'Anti-Vibration Bamboo Clamp Phone Rig',
      cost: '₹140',
      description: 'Handcrafted local treated bamboo rod with dual spring phone clamp. Eliminates road vibration from uneven cobblestones during transit.',
      source: 'Local Carpenter / Scrap Pipe'
    },
    {
      id: 'solar',
      name: '10W Monocrystalline Flexible Solar Sheet + 5V Buck Converter',
      cost: '₹620',
      description: 'Mounted onto the cart shade tarp. Delivers 5V 2A continuous USB trickle charge keeping the vendor\'s Android phone powered all day.',
      source: 'Standard Indian Solar Wholesale'
    },
    {
      id: 'soundbox',
      name: 'ThelaOS 3W Rugged Bluetooth Soundbox',
      cost: '₹380',
      description: 'IP65 splash-proof acoustic box with 105dB horn speaker. Loud enough to be heard over busy bazaar traffic and honking auto-rickshaws.',
      source: 'Modified Generic UPI Soundbox hardware'
    },
    {
      id: 'cooler',
      name: 'Janta Wet-Sack Sub-Bed Evaporative Liner',
      cost: '₹240',
      description: 'Double-walled jute gunny sack lining beneath vegetable crates with gravity-fed micro water dripper. Lowers ambient crate temp by 6°C - 8°C.',
      source: 'Standard APMC Jute Bags'
    }
  ]
};

export const JANTA_COOLER_STEPS = [
  {
    step: 1,
    title: 'Dual Jute Liner Installation',
    hindiTitle: 'दोहरी बोरी की बिछावन',
    desc: 'Line the wooden cart base with two layers of clean burlap jute sacks soaked in water. This acts as a wet heat-sink under the vegetable crates.',
    tempDrop: '2.5°C'
  },
  {
    step: 2,
    title: 'Clay Pot Water Wick (Gravity Dripper)',
    hindiTitle: 'मटके का प्राकृतिक ड्रिप सिस्टम',
    desc: 'Place an unglazed earthenware matka (clay pot) at the cart corner with a cotton rope wick resting on the jute lining to provide continuous passive moisture.',
    tempDrop: '3.0°C'
  },
  {
    step: 3,
    title: 'Airflow Ventilation Shading',
    hindiTitle: 'हवादार तिरपाल की छांव',
    desc: 'Tilt the cotton tarp at a 25-degree angle to create an aerodynamic wind tunnel that accelerates evaporative cooling as the vendor pushes the cart.',
    tempDrop: '2.0°C'
  }
];

export const JUDGE_FAQS = [
  {
    q: 'How does ThelaOS work in crowded Indian bazaars where 4G/5G connectivity drops to zero?',
    a: 'ThelaOS utilizes a dual-tier architecture: on-device Gemini Nano (via Android AICore / WebNN) handles real-time camera inference and acoustic siren/voice triggers locally with zero cellular data. High-latency swarm calculations (P2P Barter & Mandi Drop) synchronize via compressed SMS fallback payloads or opportunistic Bluetooth peer-to-peer relay when connectivity dips.'
  },
  {
    q: 'How do you prevent dishonest vendors from swapping rotten produce for good produce in the barter network?',
    a: 'Both carts perform a mandatory 3-second Gemini camera verification at the moment of swap. Gemini\'s bounding box checks that the item quality matches the algorithmic barter terms before triggering the audio confirmation code. Furthermore, each hawker builds a neighborhood "Vyapaari Karma" reputation score backed by local peer vouching.'
  },
  {
    q: 'Why would an illiterate or elderly vendor adopt this instead of continuing their traditional habits?',
    a: 'Zero keyboard interaction. Indian street vendors already use UPI voice soundboxes (Paytm/PhonePe) daily. ThelaOS talks back in their native dialect like a knowledgeable co-worker, giving clear financial advice: "Ramesh, exchange 3kg tomatoes with Suresh for onions before 5 PM to save ₹140". The tangible ₹350–₹500 daily profit uplift drives organic viral adoption.'
  },
  {
    q: 'How does this compare to quick-commerce dark stores like Zepto and Blinkit?',
    a: 'Quick-commerce requires air-conditioned warehouses, high burn rates, and expensive packaging. ThelaOS empowers the existing 10 million vendors who already operate within 50 meters of every residential doorstep with zero delivery fees, zero packaging waste, and freshest morning harvest produce.'
  },
  {
    q: 'What is the unit economics and monetization model for ThelaOS?',
    a: 'The core platform is free for vendors under public digital infrastructure (aligning with PM SVANidhi). Revenue models include: 1) 1.5% micro-convenience fee paid by residential buyers on Mandi Drop WhatsApp reservations; 2) Anonymous aggregate wholesale demand telemetry sold back to APMC mandis for supply chain forecasting.'
  }
];
