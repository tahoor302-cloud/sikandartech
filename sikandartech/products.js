// Advanced tech & gadgets catalogue. Add, remove, or edit items here.
// Each product: name, category, icon (emoji), and short features.
const PRODUCTS = [
  // Smart Wearables
  { name: "AMOLED Smart Watch", category: "Smart Wearables", icon: "⌚", features: "Bluetooth calling, heart rate, SpO2, GPS" },
  { name: "Kids GPS Smart Watch", category: "Smart Wearables", icon: "⌚", features: "4G video call, SOS, live location" },
  { name: "Smart Fitness Band", category: "Smart Wearables", icon: "💪", features: "Sleep, steps, 14-day battery" },
  { name: "Smart Ring", category: "Smart Wearables", icon: "💍", features: "Health tracking, titanium body" },
  { name: "Smart Glasses", category: "Smart Wearables", icon: "🕶️", features: "Open-ear audio, camera, voice assistant" },

  // Audio
  { name: "ANC Wireless Earbuds (TWS)", category: "Audio", icon: "🎧", features: "Active noise cancelling, BT 5.3" },
  { name: "Open-Ear Bone Conduction Headphones", category: "Audio", icon: "🎧", features: "Sports, waterproof" },
  { name: "Over-Ear ANC Headphones", category: "Audio", icon: "🎧", features: "40h battery, hi-res audio" },
  { name: "Portable Bluetooth Speaker", category: "Audio", icon: "🔊", features: "IPX7, RGB lights, TWS pairing" },
  { name: "Party Speaker with Karaoke Mic", category: "Audio", icon: "🎤", features: "High power, LED, wireless mics" },
  { name: "Wireless Lavalier Microphone", category: "Audio", icon: "🎙️", features: "For phones & cameras, noise reduction" },

  // Mobile Accessories
  { name: "Magnetic Wireless Power Bank", category: "Mobile Accessories", icon: "🔋", features: "MagSafe compatible, 10,000 mAh" },
  { name: "GaN Fast Charger 65W–140W", category: "Mobile Accessories", icon: "🔌", features: "Multi-port USB-C PD" },
  { name: "3-in-1 Wireless Charging Station", category: "Mobile Accessories", icon: "⚡", features: "Phone, watch, earbuds" },
  { name: "Gimbal Stabilizer for Phones", category: "Mobile Accessories", icon: "📱", features: "3-axis, AI face tracking" },
  { name: "AI Tracking Phone Holder", category: "Mobile Accessories", icon: "📱", features: "360° auto face tracking" },
  { name: "Selfie Stick Tripod with Remote", category: "Mobile Accessories", icon: "🤳", features: "Bluetooth remote, LED fill light" },

  // Cameras & Drones
  { name: "Foldable Camera Drone", category: "Cameras & Drones", icon: "🚁", features: "4K camera, GPS, obstacle avoidance" },
  { name: "FPV Racing Drone", category: "Cameras & Drones", icon: "🚁", features: "HD goggles, high speed" },
  { name: "4K Action Camera", category: "Cameras & Drones", icon: "📷", features: "Waterproof, EIS stabilization" },
  { name: "360° Panoramic Camera", category: "Cameras & Drones", icon: "📸", features: "5.7K video, invisible selfie stick" },
  { name: "Dash Cam (Front & Rear)", category: "Cameras & Drones", icon: "🚗", features: "4K, night vision, Wi-Fi" },
  { name: "Mini Instant Print Camera", category: "Cameras & Drones", icon: "📷", features: "Thermal printing, kids friendly" },

  // Smart Home
  { name: "Wi-Fi Security Camera", category: "Smart Home", icon: "📹", features: "PTZ, 2K, two-way audio, app control" },
  { name: "Solar 4G Outdoor Camera", category: "Smart Home", icon: "📹", features: "No wiring, PIR detection" },
  { name: "Video Doorbell", category: "Smart Home", icon: "🔔", features: "HD video, motion alert, chime" },
  { name: "Smart Fingerprint Door Lock", category: "Smart Home", icon: "🔐", features: "Fingerprint, face, card, app" },
  { name: "Smart Plug & Switches", category: "Smart Home", icon: "💡", features: "Alexa / Google, energy monitor" },
  { name: "Smart LED Strip Lights", category: "Smart Home", icon: "🌈", features: "RGBIC, music sync, app" },
  { name: "Smart Projector Lamp", category: "Smart Home", icon: "🌌", features: "Galaxy / star projection" },

  // Home Appliances (Smart)
  { name: "Robot Vacuum & Mop", category: "Smart Appliances", icon: "🤖", features: "LiDAR navigation, auto-empty" },
  { name: "Cordless Wet & Dry Vacuum", category: "Smart Appliances", icon: "🧹", features: "Self-cleaning, high suction" },
  { name: "Smart Air Purifier", category: "Smart Appliances", icon: "🌬️", features: "HEPA H13, air quality sensor" },
  { name: "Smart Air Fryer", category: "Smart Appliances", icon: "🍟", features: "Touch screen, app recipes" },
  { name: "Portable Blender", category: "Smart Appliances", icon: "🥤", features: "USB-C rechargeable" },
  { name: "Bladeless Neck Fan", category: "Smart Appliances", icon: "🌀", features: "Rechargeable, 3 speeds" },

  // Computer & Gaming
  { name: "Mini PC", category: "Computer & Gaming", icon: "🖥️", features: "Intel / AMD, 16GB RAM, Windows 11" },
  { name: "Mechanical RGB Keyboard", category: "Computer & Gaming", icon: "⌨️", features: "Hot-swap, wireless tri-mode" },
  { name: "Wireless Gaming Mouse", category: "Computer & Gaming", icon: "🖱️", features: "26K DPI, lightweight" },
  { name: "Retro Handheld Game Console", category: "Computer & Gaming", icon: "🎮", features: "IPS screen, thousands of games" },
  { name: "Wireless Game Controller", category: "Computer & Gaming", icon: "🎮", features: "PC / Switch / mobile, hall effect sticks" },
  { name: "Portable Monitor", category: "Computer & Gaming", icon: "🖥️", features: "15.6\" FHD, USB-C, touch" },
  { name: "USB-C Docking Station", category: "Computer & Gaming", icon: "🔗", features: "HDMI 4K, PD, LAN, SD" },
  { name: "Portable SSD", category: "Computer & Gaming", icon: "💾", features: "1TB–4TB, 1050 MB/s" },
  { name: "VR Headset", category: "Computer & Gaming", icon: "🥽", features: "All-in-one, 4K display" },

  // Display & Entertainment
  { name: "Smart Mini Projector", category: "Display & Entertainment", icon: "📽️", features: "Android TV, 1080p, auto focus" },
  { name: "Android TV Box", category: "Display & Entertainment", icon: "📺", features: "4K HDR, Wi-Fi 6" },
  { name: "Digital Photo Frame", category: "Display & Entertainment", icon: "🖼️", features: "Wi-Fi, app sharing" },
  { name: "E-Book Reader", category: "Display & Entertainment", icon: "📖", features: "E-ink, warm light" },
  { name: "LCD Writing Tablet", category: "Display & Entertainment", icon: "✏️", features: "Kids drawing board" },

  // Mobility & Outdoor
  { name: "Electric Scooter", category: "Mobility & Outdoor", icon: "🛴", features: "Foldable, 30–45 km range" },
  { name: "Self-Balancing Hoverboard", category: "Mobility & Outdoor", icon: "🛹", features: "Bluetooth speaker, LED" },
  { name: "Electric Bike", category: "Mobility & Outdoor", icon: "🚲", features: "Foldable, pedal assist" },
  { name: "Portable Power Station", category: "Mobility & Outdoor", icon: "🔋", features: "LiFePO4, 300W–2000W, solar input" },
  { name: "Foldable Solar Panel", category: "Mobility & Outdoor", icon: "☀️", features: "100W–200W, USB & DC output" },
  { name: "Car Wireless CarPlay Screen", category: "Mobility & Outdoor", icon: "🚘", features: "Portable, Android Auto" },
  { name: "Portable Tire Inflator", category: "Mobility & Outdoor", icon: "🛞", features: "Digital gauge, cordless" },

  // Personal Care Tech
  { name: "Massage Gun", category: "Personal Care Tech", icon: "💆", features: "Deep tissue, 6 heads" },
  { name: "Smart Eye Massager", category: "Personal Care Tech", icon: "😌", features: "Heat, Bluetooth music" },
  { name: "Electric Toothbrush", category: "Personal Care Tech", icon: "🪥", features: "Sonic, 5 modes" },
  { name: "High-Speed Hair Dryer", category: "Personal Care Tech", icon: "💨", features: "110,000 RPM, ionic" },
  { name: "IPL Hair Removal Device", category: "Personal Care Tech", icon: "✨", features: "Ice cooling, home use" },

  // Tools & Innovation
  { name: "3D Printer", category: "Tools & Innovation", icon: "🖨️", features: "Auto leveling, high speed" },
  { name: "Laser Engraving Machine", category: "Tools & Innovation", icon: "🔦", features: "Wood, leather, acrylic" },
  { name: "Portable Label Printer", category: "Tools & Innovation", icon: "🏷️", features: "Bluetooth, thermal" },
  { name: "Mini Thermal Printer", category: "Tools & Innovation", icon: "🧾", features: "Photos, notes, stickers" },
  { name: "Electric Screwdriver Set", category: "Tools & Innovation", icon: "🪛", features: "Precision bits, rechargeable" },
  { name: "AI Translator Device", category: "Tools & Innovation", icon: "🗣️", features: "Two-way voice, 130+ languages" },
  { name: "Smart Key / Item Tracker", category: "Tools & Innovation", icon: "📍", features: "Find My compatible" },
  { name: "STEM Robot Kit", category: "Tools & Innovation", icon: "🤖", features: "Programmable, for kids" }
];
