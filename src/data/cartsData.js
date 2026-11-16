export const CARTS_DATA = [
  {
    id: 'cart-1',
    name: 'Desi Tamatar (Tomatoes)',
    category: 'Nightshades & Soft Veggies',
    vendor: 'Ram Prasad',
    location: 'Gali 4, Lajpat Nagar Market, New Delhi',
    timestamp: '14:32:05 IST',
    ambientTemp: '34.2°C',
    humidity: '68%',
    totalWeightKg: 18.5,
    wholesaleCost: 32, // ₹/kg
    baseRetailPrice: 50, // ₹/kg
    currentRetailPrice: 42,
    decayRatePerHour: 7.2, // % loss per hour at current temperature
    items: [
      {
        id: 'box-1',
        label: 'Grade A Firm Tomatoes',
        hindiLabel: 'ताज़ा देशी टमाटर (ठोस)',
        count: 42,
        weightKg: 8.5,
        freshness: 94,
        status: 'Optimal',
        shelfLifeHours: 14,
        bbox: { x: 8, y: 15, width: 38, height: 42 },
        color: '#10b981',
        recommendation: 'Maintain premium ₹50/kg price. Peak skin firmness.'
      },
      {
        id: 'box-2',
        label: 'Grade B Semi-Ripe Tomatoes',
        hindiLabel: 'पके हुए टमाटर (मध्यम)',
        count: 36,
        weightKg: 6.2,
        freshness: 76,
        status: 'Ripe',
        shelfLifeHours: 5,
        bbox: { x: 52, y: 12, width: 40, height: 38 },
        color: '#f59e0b',
        recommendation: 'Mark down to ₹42/kg. Target domestic dal/curry buyers.'
      },
      {
        id: 'box-3',
        label: 'Softening Tomatoes (Imminent Spoilage)',
        hindiLabel: 'नरम टमाटर (जल्दी बेचें)',
        count: 22,
        weightKg: 3.8,
        freshness: 48,
        status: 'Critical Spoilage Risk',
        shelfLifeHours: 2.2,
        bbox: { x: 22, y: 58, width: 56, height: 36 },
        color: '#ef4444',
        recommendation: 'TRIGGER BARTER or MANDI DROP! Offer 3kg swap to Suresh for Dry Onions.'
      }
    ]
  },
  {
    id: 'cart-2',
    name: 'Palak & Methi (Leafy Greens)',
    category: 'Perishable Green Foliage',
    vendor: 'Sunita Devi',
    location: 'Corner 2, Indiranagar 100ft Rd, Bengaluru',
    timestamp: '15:10:22 IST',
    ambientTemp: '29.8°C',
    humidity: '52%',
    totalWeightKg: 12.0,
    wholesaleCost: 20, // ₹/bundle
    baseRetailPrice: 35,
    currentRetailPrice: 28,
    decayRatePerHour: 11.5,
    items: [
      {
        id: 'box-leaf-1',
        label: 'Crisp Palak Bundles',
        hindiLabel: 'ताज़ा पालक गड्डी',
        count: 24,
        weightKg: 6.0,
        freshness: 88,
        status: 'Crisp',
        shelfLifeHours: 4.5,
        bbox: { x: 10, y: 18, width: 42, height: 45 },
        color: '#10b981',
        recommendation: 'Sprinkle cold water mist. Maintain ₹35/bundle.'
      },
      {
        id: 'box-leaf-2',
        label: 'Wilting Methi & Coriander',
        hindiLabel: 'मुरझाई हुई मेथी व धनिया',
        count: 18,
        weightKg: 4.2,
        freshness: 54,
        status: 'Wilting (Turgor Loss)',
        shelfLifeHours: 2.0,
        bbox: { x: 56, y: 22, width: 36, height: 48 },
        color: '#ef4444',
        recommendation: 'Evening Mandi Drop: Bundle 2 for ₹40 to local apartment gate.'
      }
    ]
  },
  {
    id: 'cart-3',
    name: 'Robusta & Elaichi Bananas',
    category: 'Ethylene-Active Tropical Fruit',
    vendor: 'Mohd. Imran',
    location: 'Charminar East Gate, Hyderabad',
    timestamp: '16:04:11 IST',
    ambientTemp: '33.1°C',
    humidity: '60%',
    totalWeightKg: 28.0,
    wholesaleCost: 35, // ₹/dozen
    baseRetailPrice: 60,
    currentRetailPrice: 50,
    decayRatePerHour: 6.0,
    items: [
      {
        id: 'box-banana-1',
        label: 'Yellow-Green Firm Bananas',
        hindiLabel: 'कच्चे-पके केले (ठोस)',
        count: 14, // dozens
        weightKg: 15.0,
        freshness: 92,
        status: 'Optimal',
        shelfLifeHours: 28,
        bbox: { x: 12, y: 15, width: 42, height: 60 },
        color: '#10b981',
        recommendation: 'Safe overnight inventory. Keep shaded.'
      },
      {
        id: 'box-banana-2',
        label: 'Sugar-Spotted Ready-to-Eat',
        hindiLabel: 'चित्तीदार मीठे केले',
        count: 10,
        weightKg: 11.0,
        freshness: 65,
        status: 'High Sugar / Peak Flavor',
        shelfLifeHours: 4.0,
        bbox: { x: 58, y: 20, width: 34, height: 55 },
        color: '#f59e0b',
        recommendation: 'Target gym-goers / smoothie vendors nearby. Offer at ₹45/dozen.'
      }
    ]
  }
];

export const TIME_SIMULATION_STEPS = [
  { hour: '10:00 AM', label: 'Morning Fresh Arrivals', temp: '26°C', avgFreshness: 96, riskLevel: 'Minimal' },
  { hour: '12:30 PM', label: 'Midday Heat Peak', temp: '33°C', avgFreshness: 86, riskLevel: 'Low' },
  { hour: '03:30 PM', label: 'Pre-Evening Transition', temp: '35°C', avgFreshness: 72, riskLevel: 'Moderate' },
  { hour: '05:30 PM', label: 'The Spoilage Cliff (Critical)', temp: '32°C', avgFreshness: 55, riskLevel: 'High Risk' },
  { hour: '07:00 PM', label: 'Post-Sunset Distress Phase', temp: '30°C', avgFreshness: 41, riskLevel: 'Severe Distress' },
];
