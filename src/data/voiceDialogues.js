export const VOICE_LANGUAGES = [
  { id: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { id: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳', nativeName: 'தமிழ்' },
  { id: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳', nativeName: 'मराठी' },
  { id: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳', nativeName: 'বাংলা' },
  { id: 'en', name: 'English (India)', flag: '🌐', nativeName: 'English' },
];

export const VOICE_DIALOGUES = {
  hi: [
    {
      id: 'hi-1',
      title: 'टमाटर का भाव और सड़न का खतरा (Tomato Price & Spoilage)',
      vendorQuery: 'जेमिनी भैया, दोपहर की धूप में 4 किलो टमाटर बहुत नरम हो गए हैं। क्या भाव लगाऊँ?',
      geminiResponse: 'राम प्रसाद जी, कैमरे में 3.8 किलो टमाटर में झुर्रियां दिख रही हैं। ये शाम 6 बजे के बाद नहीं बिकेंगे। अभी ₹42 प्रति किलो पर बेचें। पास की गली में सुरेश के पास प्याज़ ज्यादा हैं, आप उनसे 3 किलो टमाटर के बदले 2 किलो प्याज़ की अदला-बदली कर सकते हैं। क्या मैं सुरेश को आवाज़ भेज दूँ?',
      action: 'Trigger Barter Request with Suresh',
      confidence: 98.4,
      latencyMs: 380,
      tags: ['Barter', 'Freshness', 'Pricing']
    },
    {
      id: 'hi-2',
      title: 'पालक और हरी पत्तेदार सब्ज़ी (Leafy Greens Moisture Loss)',
      vendorQuery: 'पालक मुरझाने लगी है, शाम की मंडी में कोई लेगा क्या?',
      geminiResponse: 'सुनीता जी, पालक में 46% नमी कम हुई है। तुरंत ठंडे पानी का छींटा मारें। मैंने सिल्वर ओक्स सोसाइटी के गेट के लिए ₹40 में 2 गड्डी का "मंडी ड्रॉप" ऑफर जनरेट कर दिया है। 5 मिनट में 3 खरीदार आ सकते हैं।',
      action: 'Publish Mandi Drop Notification',
      confidence: 99.1,
      latencyMs: 320,
      tags: ['Mandi Drop', 'Hydration', 'Hyperlocal']
    },
    {
      id: 'hi-3',
      title: 'दिन का हिसाब और कल की मंडी खरीदारी (Evening P&L & Restocking)',
      vendorQuery: 'आज कितना मुनाफा हुआ और कल सुबह ओखला मंडी से क्या उठाना चाहिए?',
      geminiResponse: 'आज आपने ₹2,140 की बिक्री की, जिसमें ₹480 का शुद्ध मुनाफा हुआ और ज़ीरो वेस्ट बचा! कल मंगलवार को व्रत होने के कारण सीताफल और केले की मांग 35% बढ़ेगी। कल 4 दर्जन केले और 15 किलो आलू उठाना सबसे फायदेमंद रहेगा।',
      action: 'Mandi Procurement Forecast',
      confidence: 97.6,
      latencyMs: 410,
      tags: ['Procurement', 'P&L', 'Demand Forecast']
    }
  ],
  ta: [
    {
      id: 'ta-1',
      title: 'தக்காளி விலை & கெட்டுப்போகும் எச்சரிக்கை (Tomato Valuation)',
      vendorQuery: 'ஜெமினி அண்ணா, வெயிலில் தக்காளி மென்மையாகிவிட்டது. என்ன விலை வைக்கலாம்?',
      geminiResponse: 'முருகன் அவர்களே, உங்கள் கூடையில் 4 கிலோ தக்காளி இன்னும் 3 மணி நேரத்தில் பயன்படுத்த வேண்டும். கிலோ ₹40-க்கு மாற்றவும். பக்கத்து தெருவில் உள்ள ரமேஷிடம் வெங்காயம் அதிகம் உள்ளது, பண்டமாற்று செய்யலாமா?',
      action: 'Initiate P2P Barter',
      confidence: 98.2,
      latencyMs: 395,
      tags: ['Barter', 'Urgent Action']
    }
  ],
  mr: [
    {
      id: 'mr-1',
      title: 'मेथी आणि पालकाचा ताजापणा (Methi Greens Preservation)',
      vendorQuery: 'भाऊ, मेथी सुकायला लागली आहे, संध्याकाळच्या बाजारात खपेल का?',
      geminiResponse: 'भाऊ, मेथीवर लगेच गार पाण्याचा हबका मारा. जवळच्या गृहनिर्माण संस्थेसाठी ₹30 मध्ये 2 जुड्यांचा "मंडी ड्रॉप" संदेश पाठवला आहे. अर्ध्या तासात पूर्ण साठा संपेल.',
      action: 'Mandi Drop Broadcast',
      confidence: 97.9,
      latencyMs: 360,
      tags: ['Mandi Drop', 'Pune Market']
    }
  ],
  bn: [
    {
      id: 'bn-1',
      title: 'কাঁচা লঙ্কা ও টমেটোর হিসাব (Green Chillies & Tomato Barter)',
      vendorQuery: 'দাদা, বিকেল হয়ে এল, এখনো অনেক বেগুন আর টমেটো বাকি। কী করব?',
      geminiResponse: 'সুভাষ বাবু, ৪ নম্বর গলির নিখিলদার কাছে আলুর স্টক শেষ হয়ে গেছে। আপনি উনার সাথে ৫ কেজি বেগুনের বদলে ৬ কেজি আলু অদলবদল করে নিন। দুজনেরই ক্ষতি বাঁচবে!',
      action: 'Execute Swarm Trade',
      confidence: 98.7,
      latencyMs: 375,
      tags: ['Kolkata Haat', 'Zero Waste']
    }
  ],
  en: [
    {
      id: 'en-1',
      title: 'Multimodal Freshness Audit & Dynamic Micro-Barter',
      vendorQuery: 'Gemini, I have 4kg softening tomatoes left at 4:30 PM. How do I avoid distress sale loss?',
      geminiResponse: 'Camera telemetry detects cellular turgor loss in 3.8kg of tomatoes (shelf life: 2.2 hrs). Nearby vendor Suresh (Cart #04, 180m away) is stocked with dry onions but completely stocked out of tomatoes. I have calculated an optimal barter ratio: swap 3kg tomatoes for 2.2kg onions to preserve ₹140 in net cart value. Shall I dispatch voice approval?',
      action: 'Approve Hyperlocal Barter',
      confidence: 99.4,
      latencyMs: 290,
      tags: ['Gemini 1.5 Flash', 'Multimodal', 'Barter']
    }
  ]
};
