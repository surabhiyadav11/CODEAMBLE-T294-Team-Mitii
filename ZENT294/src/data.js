export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'features', label: 'Features' },
  { id: 'organic', label: 'Organic Farming' },
];

export const homeHighlights = [
  {
    code: '01',
    title: 'Advisory',
    description: 'Receive timely alerts about weather patterns and pest management directly on your phone before crop loss begins.',
  },
  {
    code: '02',
    title: 'Direct Market',
    description: 'Connect with regional buyers and check real-time mandi rates to secure a fair price for your hard-earned harvest.',
  },
  {
    code: '03',
    title: 'Easy Loans',
    description: 'Navigate the complex world of agricultural financing with simplified application assistance for low-interest credit.',
  },
];

export const serviceCards = [
  {
    title: 'Soil Health Cards',
    description: 'Understand your soil\'s unique composition to optimize fertilizer use and improve long-term yield.',
    action: 'Learn more',
  },
  {
    title: 'Crop Insurance',
    description: 'Secure your livelihood against unseasonal rains, drought, and other natural calamities with verified policies.',
    action: 'View schemes',
  },
  {
    title: 'Village Workshops',
    description: 'Join local training sessions on sustainable farming practices and new technology adoption in your block.',
    action: 'Find events',
  },
];

export const featureDashboard = [
  {
    key: 'advisor',
    badge: 'Weather Advisor',
    emoji: '🌾',
    accent: 'from-emerald-100 to-lime-50',
    description: 'Real-time weather + crop-specific farming advice for irrigation, fertilizer, and spraying.',
  },
  {
    key: 'harvest',
    badge: 'Harvest Prediction',
    emoji: '📈',
    accent: 'from-amber-100 to-orange-50',
    description: 'AI predicts the best harvest window weeks in advance using crop and weather signals.',
  },
  {
    key: 'hyperlocal',
    badge: 'Hyperlocal Weather',
    emoji: '🌦️',
    accent: 'from-sky-100 to-cyan-50',
    description: '15-day rainfall and temperature forecasting for your exact field, not just the district.',
  },
  {
    key: 'alerts',
    badge: 'Smart Alerts',
    emoji: '🔔',
    accent: 'from-pink-100 to-rose-50',
    description: 'Early SMS and app alerts for storms, frost, or pest-risk conditions before damage spreads.',
  },
  {
    key: 'satellite',
    badge: 'Satellite Field View',
    emoji: '🛰️',
    accent: 'from-teal-100 to-emerald-50',
    description: 'Weekly NDVI crop-health maps highlight stressed zones so you can act before yield is lost.',
  },
  {
    key: 'soil',
    badge: 'Soil & Irrigation',
    emoji: '💧',
    accent: 'from-violet-100 to-indigo-50',
    description: 'Track soil moisture, irrigation timing, and water-saving suggestions for every field block.',
  },
  {
    key: 'market',
    badge: 'Market Price Link',
    emoji: '💰',
    accent: 'from-fuchsia-100 to-rose-50',
    description: 'Live mandi prices and harvest timing advice to sell when rates are strongest.',
  },
];

export const organicSteps = ['Raw materials', 'Choose preparation', 'Batch size', 'Your recipe'];

export const organicGroups = [
  {
    title: 'Cow-based',
    items: ['Indigenous cow dung', 'Cow urine', 'Cow milk', 'Curd', 'Desi ghee', 'Buttermilk'],
  },
  {
    title: 'Plant-based',
    items: ['Neem leaves', 'Green chilli', 'Garlic', 'Ripe banana', 'Tender coconut water'],
  },
  {
    title: 'Pantry',
    items: ['Jaggery', 'Gram flour (besan)', 'Slaked lime'],
  },
  {
    title: 'Field',
    items: ['Live bund soil', 'Clean water'],
  },
];

export const preparations = [
  {
    id: 'jeevamrutha',
    name: 'Jeevamrutha',
    description: 'A powerful liquid fertilizer that acts as a catalyst to promote microbial activity in the soil.',
    baseBatchSize: 200, // Liters
    requirements: ['Indigenous cow dung', 'Cow urine', 'Jaggery', 'Gram flour (besan)', 'Live bund soil', 'Clean water'],
    recipe: [
      { item: 'Indigenous cow dung', qty: 10, unit: 'kg' },
      { item: 'Cow urine', qty: 10, unit: 'Liters' },
      { item: 'Jaggery', qty: 2, unit: 'kg' },
      { item: 'Gram flour (besan)', qty: 2, unit: 'kg' },
      { item: 'Live bund soil', qty: 1, unit: 'handful' },
      { item: 'Clean water', qty: 200, unit: 'Liters' }
    ],
    instructions: [
      'Mix cow dung and cow urine in a drum.',
      'Add Jaggery and Gram flour and mix thoroughly.',
      'Add a handful of undisturbed soil (live bund soil).',
      'Fill the drum with water to reach the required volume.',
      'Stir the mixture well in a clockwise direction twice a day for 48 hours.',
      'Use within 7 days for best results.'
    ]
  },
  {
    id: 'beejamrutha',
    name: 'Beejamrutha',
    description: 'A traditional seed treatment preparation used to protect crops from soil and seed-borne diseases.',
    baseBatchSize: 20, // Liters
    requirements: ['Indigenous cow dung', 'Cow urine', 'Slaked lime', 'Live bund soil', 'Clean water'],
    recipe: [
      { item: 'Indigenous cow dung', qty: 5, unit: 'kg' },
      { item: 'Cow urine', qty: 5, unit: 'Liters' },
      { item: 'Slaked lime', qty: 50, unit: 'grams' },
      { item: 'Live bund soil', qty: 1, unit: 'handful' },
      { item: 'Clean water', qty: 20, unit: 'Liters' }
    ],
    instructions: [
      'Tie cow dung in a cloth and submerge in water overnight.',
      'Extract the cow dung water in the morning.',
      'Add cow urine, slaked lime, and live bund soil to the extract.',
      'Mix well and use this solution for treating seeds before sowing.'
    ]
  },
  {
    id: 'panchagavya',
    name: 'Panchagavya',
    description: 'An organic product that acts as a growth promoter and immunity booster.',
    baseBatchSize: 20, // Liters/kg equivalent
    requirements: ['Indigenous cow dung', 'Cow urine', 'Cow milk', 'Curd', 'Desi ghee', 'Ripe banana', 'Tender coconut water', 'Jaggery'],
    recipe: [
      { item: 'Indigenous cow dung', qty: 5, unit: 'kg' },
      { item: 'Desi ghee', qty: 1, unit: 'Liter' },
      { item: 'Cow urine', qty: 3, unit: 'Liters' },
      { item: 'Cow milk', qty: 2, unit: 'Liters' },
      { item: 'Curd', qty: 2, unit: 'Liters' },
      { item: 'Tender coconut water', qty: 3, unit: 'Liters' },
      { item: 'Jaggery', qty: 3, unit: 'kg' },
      { item: 'Ripe banana', qty: 12, unit: 'pieces' }
    ],
    instructions: [
      'Mix cow dung and desi ghee thoroughly and keep for 3 days.',
      'On the 4th day, add the rest of the ingredients.',
      'Stir twice a day for 15 days.',
      'The mixture is ready to use after 18 days. Filter before spraying.'
    ]
  },
  {
    id: 'neemastra',
    name: 'Neemastra',
    description: 'An effective botanical pesticide against sucking pests and mealybugs.',
    baseBatchSize: 100, // Liters
    requirements: ['Neem leaves', 'Indigenous cow dung', 'Cow urine', 'Clean water'],
    recipe: [
      { item: 'Neem leaves (crushed)', qty: 5, unit: 'kg' },
      { item: 'Indigenous cow dung', qty: 1, unit: 'kg' },
      { item: 'Cow urine', qty: 5, unit: 'Liters' },
      { item: 'Clean water', qty: 100, unit: 'Liters' }
    ],
    instructions: [
      'Crush the neem leaves with branches.',
      'Mix all ingredients in a container and stir well.',
      'Keep it for 48 hours in the shade.',
      'Stir clockwise twice a day.',
      'Filter and spray without any further dilution.'
    ]
  }
];

export const trustLogos = ['Krishi Vigyan', 'NABARD Partner', 'AgroTrust', 'Village Council'];
