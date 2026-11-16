export const MANDI_TICKER = [
  { mandi: 'Azadpur (Delhi)', commodity: 'Tomato (Hybrid)', price: '₹28 - ₹34/kg', delta: '+4.2%', trend: 'up' },
  { mandi: 'Azadpur (Delhi)', commodity: 'Onion (Nashik)', price: '₹32 - ₹38/kg', delta: '-1.5%', trend: 'down' },
  { mandi: 'Vashi (Mumbai)', commodity: 'Potato (Indore)', price: '₹22 - ₹26/kg', delta: '0.0%', trend: 'neutral' },
  { mandi: 'Koyambedu (Chennai)', commodity: 'Palak / Spinach', price: '₹14 - ₹18/bunch', delta: '+8.0%', trend: 'up' },
  { mandi: 'Bowenpally (Hyderabad)', commodity: 'Banana (Robusta)', price: '₹30 - ₹35/doz', delta: '-2.1%', trend: 'down' },
  { mandi: 'Keshopur (Delhi)', commodity: 'Cauliflower (Gobi)', price: '₹25 - ₹30/kg', delta: '+5.0%', trend: 'up' },
  { mandi: 'APMC Pune', commodity: 'Green Chilli', price: '₹45 - ₹52/kg', delta: '-3.4%', trend: 'down' },
];

export const CITIES_WEATHER = {
  Delhi: {
    temp: '34.5°C',
    humidity: '62%',
    uvIndex: '8.4 (Very High)',
    decayMultiplier: 1.25,
    alert: 'Heatwave Alert: Accelerated leafy decay between 13:00 - 17:00 IST',
    status: 'Severe Afternoon Heat'
  },
  Mumbai: {
    temp: '31.2°C',
    humidity: '84%',
    uvIndex: '6.8 (Moderate)',
    decayMultiplier: 1.15,
    alert: 'High Moisture: Fungal spotting risk on soft nightshades',
    status: 'Humid Coastal Heat'
  },
  Bengaluru: {
    temp: '27.4°C',
    humidity: '55%',
    uvIndex: '5.2 (Moderate)',
    decayMultiplier: 0.90,
    alert: 'Favorable Ambient Temp: +2.5 hrs shelf life extension',
    status: 'Mild Plateau Weather'
  },
  Hyderabad: {
    temp: '33.0°C',
    humidity: '58%',
    uvIndex: '7.9 (High)',
    decayMultiplier: 1.20,
    alert: 'Dry Heat: Surface moisture depletion on beans & spinach',
    status: 'Dry Heat'
  },
  Kolkata: {
    temp: '32.6°C',
    humidity: '79%',
    uvIndex: '7.1 (High)',
    decayMultiplier: 1.22,
    alert: 'Sweltering Humidity: Hastens ethylene generation in bananas',
    status: 'High Wet Bulb'
  }
};
