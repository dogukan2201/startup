import onBoardingImage1 from "@/assets/images/onBoardingImage1.jpg";
import onBoardingImage2 from "@/assets/images/onBoardingImage2.svg";
import onBoardingImage3 from "@/assets/images/onBoardingImage3.jpg";
import signUpImage from "@/assets/images/signUpImage.jpg";
export const images = {
  onBoardingImage1,
  onBoardingImage2,
  onBoardingImage3,
  signUpImage,
};
export const days = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

export const onBoardingArray = [
  {
    id: 1,
    title: "Style Your Look, Book with Ease!",
    description:
      "Meet professional barbers and enjoy the best haircut and grooming experience.",
    image: images.onBoardingImage1,
  },
  {
    id: 2,
    title: "Effortless Booking, No Waiting!",
    description:
      "Schedule your appointment in seconds and skip the long waiting lines.",
    image: images.onBoardingImage1,
  },
  {
    id: 3,
    title: "Top-Quality Grooming Services!",
    description:
      "From haircuts to beard trims, get premium services tailored to your style.",
    image: images.onBoardingImage3,
  },
];
//Normalde Database'den çekilecek veriler şu anlık uı için böyle

export const Models = [
  {
    id: 1,
    name: "Modern Kesim",
    image:
      "https://images.unsplash.com/photo-1614465000772-1b302f406c47?q=80&w=2070&auto=format&fit=crop",
    description: "Şık ve modern görünüm için ideal kesim",
    category: "men",
  },
  {
    id: 2,
    name: "Klasik Tarz",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop",
    description: "Zamansız ve şık klasik saç modeli",
    category: "men",
  },
  {
    id: 3,
    name: "Dalgalı Model",
    image:
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2074&auto=format&fit=crop",
    description: "Doğal ve hacimli görünüm",
    category: "women",
  },
  {
    id: 4,
    name: "Kısa Bob Kesim",
    image:
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=2067&auto=format&fit=crop",
    description: "Modern ve bakımı kolay kesim",
    category: "women",
  },
  {
    id: 5,
    name: "Uzun Katmanlı",
    image:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop",
    description: "Hareketli ve feminen görünüm",
    category: "women",
  },
  {
    id: 6,
    name: "Pixie Kesim",
    image:
      "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=2070&auto=format&fit=crop",
    description: "Cesur ve modern kısa kesim",
    category: "women",
  },
  {
    id: 7,
    name: "Asimetrik Kesim",
    image:
      "https://images.unsplash.com/photo-1584297091622-af8e5bd80b13?q=80&w=2080&auto=format&fit=crop",
    description: "Dikkat çekici modern tarz",
    category: "women",
  },
  {
    id: 8,
    name: "Retro Dalgalar",
    image:
      "https://images.unsplash.com/photo-1596384361947-a9b26b051695?q=80&w=1974&auto=format&fit=crop",
    description: "Vintage görünümlü zarif model",
    category: "women",
  },
  {
    id: 9,
    name: "Fransız Manikür",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop",
    description: "Klasik ve zarif tırnak tasarımı",
    category: "nail",
  },
  {
    id: 10,
    name: "Geometrik Desen",
    image:
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1974&auto=format&fit=crop",
    description: "Modern ve şık geometrik desenler",
    category: "nail",
  },
  {
    id: 11,
    name: "Simli Ombre",
    image:
      "https://images.unsplash.com/photo-1607779097040-26e80aa4576f?q=80&w=1974&auto=format&fit=crop",
    description: "Göz alıcı simli geçişler",
    category: "nail",
  },
  {
    id: 12,
    name: "Minimal Art",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1974&auto=format&fit=crop",
    description: "Sade ve şık minimal tasarımlar",
    category: "nail",
  },
];
//Normalde Database'den çekilecek veriler şu anlık uı için böyle
export const barbers = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    rating: 4.8,
    reviews: 127,
    description:
      "Uzun yıllara dayanan tecrübesiyle klasik ve modern kesim teknikleri konusunda uzman",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop",
    specialty: ["Saç Kesimi", "Saç Boyama", "Keratin Bakım"],
    location: {
      address: "Caferağa Mah. Moda Cad. No:15/A",
      district: "Kadıköy",
      city: "İstanbul",
    },
    phone: "+90 532 123 45 67",
    experience: 12,
    workingHours: { start: "09:00", end: "19:00" },
    services: [
      { name: "Saç Kesimi", price: 150 },
      { name: "Sakal Tıraşı", price: 80 },
      { name: "Saç Yıkama", price: 50 },
      { name: "Fön", price: 70 },
    ],
    workDays: [
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
    languages: ["Türkçe", "İngilizce"],
    gender: "Erkek",
  },
  {
    id: 2,
    name: "Mehmet Demir",
    rating: 4.6,
    reviews: 98,
    description:
      "Modern kesim ve saç boyama konusunda uzmanlaşmış, yenilikçi yaklaşımları benimseyen stilist",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop",
    specialty: ["Saç Kesimi", "Sakal Tıraşı", "Modern Kesimler"],
    location: {
      address: "Sinanpaşa Mah. Beşiktaş Cad. No:25",
      district: "Beşiktaş",
      city: "İstanbul",
    },
    phone: "+90 533 234 56 78",
    experience: 8,
    workingHours: { start: "10:00", end: "20:00" },
    services: [
      { name: "Saç Boyama", price: 300 },
      { name: "Modern Kesim", price: 200 },
      { name: "Saç Bakımı", price: 250 },
      { name: "Keratin", price: 900 },
    ],
    workDays: ["Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
    languages: ["Türkçe"],
    gender: "Erkek",
  },
  {
    id: 3,
    name: "Can Yıldız",
    rating: 4.9,
    reviews: 500,
    description:
      "Özel tasarım kesimler ve sakal şekillendirmede İstanbul'un önde gelen isimlerinden",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop",
    specialty: ["Saç Kesimi", "Sakal Tıraşı", "Özel Tasarım"],
    location: {
      address: "Kadife Sok. No:15",
      district: "Şişli",
      city: "İstanbul",
    },
    phone: "+90 535 345 67 89",
    experience: 15,
    workingHours: { start: "11:00", end: "21:00" },
    services: [
      { name: "Özel Tasarım", price: 350 },
      { name: "Sakal Şekillendirme", price: 120 },
      { name: "Saç Boyama", price: 400 },
      { name: "Fön", price: 100 },
    ],
    workDays: [
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
    languages: ["Türkçe", "İngilizce", "Almanca"],
    gender: "Erkek",
  },
  {
    id: 4,
    name: "Burak Özdemir",
    rating: 3.0,
    reviews: 89,
    description:
      "Çocuk kesimlerinde uzmanlaşmış, sabırlı ve titiz çalışan genç kuaför",
    image:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=2070&auto=format&fit=crop",
    specialty: ["Saç Kesimi", "Sakal Tıraşı", "Çocuk Kesimi"],
    location: {
      address: "İncirli Cad. No:35/B",
      district: "Bakırköy",
      city: "İstanbul",
    },
    phone: "+90 536 456 78 90",
    experience: 2,
    workingHours: { start: "09:00", end: "18:00" },
    services: [
      { name: "Çocuk Kesimi", price: 80 },
      { name: "Klasik Tıraş", price: 120 },
      { name: "Saç Yıkama", price: 40 },
    ],
    workDays: ["Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
    languages: ["Türkçe"],
    gender: "Erkek",
  },
  {
    id: 5,
    name: "Asya Kaya",
    rating: 4.9,
    reviews: 203,
    description:
      "Gelin saçı ve özel gün saç tasarımlarında uzmanlaşmış, yaratıcı dokunuşlarıyla tanınan stilist",
    gender: "Kadın",
    image:
      "https://images.unsplash.com/photo-1504703395950-b89145a5425b?q=80&w=2070&auto=format&fit=crop",
    specialty: ["Saç Kesimi", "Kadın Saç Tasarımı", "Gelin Saçı"],
    location: {
      address: "Atatürk Mah. Meriç Cad. No:55",
      district: "Ataşehir",
      city: "İstanbul",
    },
    phone: "+90 537 567 89 01",
    experience: 5,
    workingHours: { start: "10:00", end: "22:00" },
    services: [
      { name: "Saç Bakımı", price: 300 },
      { name: "Keratin Tedavisi", price: 800 },
      { name: "Saç Boyama", price: 450 },
      { name: "Fön", price: 150 },
    ],
    workDays: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Pazar"],
    languages: ["Türkçe", "İngilizce"],
  },
  {
    id: 6,
    name: "Zeynep Yalın",
    rating: 4.7,
    reviews: 156,
    description:
      "Örgü modelleri ve topuz tasarımlarında uzman, özel gün saç modellerinde tercih edilen kuaför",
    gender: "Kadın",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=2070&auto=format&fit=crop",
    specialty: ["Saç Boyama", "Örgü Modelleri", "Topuz"],
    location: {
      address: "Mimar Sinan Mah. Çavuşdere Cad. No:85",
      district: "Üsküdar",
      city: "İstanbul",
    },
    phone: "+90 538 678 90 12",
    experience: 7,
    workingHours: { start: "11:00", end: "20:00" },
    services: [
      { name: "Saç Örgüsü", price: 200 },
      { name: "Gelin Başı", price: 1000 },
      { name: "Maşa", price: 180 },
      { name: "Fön", price: 120 },
    ],
    workDays: ["Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
    languages: ["Türkçe", "Rusça"],
  },
  {
    id: 7,
    name: "Deniz Aydın",
    rating: 4.2,
    reviews: 78,
    description:
      "Modern erkek saç kesimi ve sakal tasarımında yenilikçi yaklaşımlarıyla öne çıkan stilist",
    gender: "Erkek",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
    specialty: ["Modern Kesimler", "Sakal Tasarımı"],
    location: {
      address: "Barış Mah. Beylikdüzü Cad. No:95",
      district: "Beylikdüzü",
      city: "İstanbul",
    },
    phone: "+90 539 789 01 23",
    experience: 3,
    workingHours: { start: "12:00", end: "21:00" },
    services: [
      { name: "Trend Kesimler", price: 180 },
      { name: "Sakal Bakımı", price: 100 },
      { name: "Cilt Bakımı", price: 150 },
    ],
    workDays: ["Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
    languages: ["Türkçe"],
  },
  {
    id: 8,
    name: "Ayşe Demir",
    rating: 5.0,
    reviews: 320,
    description:
      "20 yıllık deneyimiyle saç boyama ve keratin bakımında İstanbul'un en deneyimli isimlerinden",
    gender: "Kadın",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    specialty: ["Renklendirme", "Gelin Saçı", "Kalıcı Fön"],
    location: {
      address: "Bağlarbaşı Mah. Maltepe Cad. No:75",
      district: "Maltepe",
      city: "İstanbul",
    },
    phone: "+90 531 890 12 34",
    experience: 20,
    workingHours: { start: "09:00", end: "20:00" },
    services: [
      { name: "Saç Boyama", price: 500 },
      { name: "Keratin", price: 1200 },
      { name: "Kaynak", price: 800 },
      { name: "Perma", price: 600 },
    ],
    workDays: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"],
    languages: ["Türkçe", "İngilizce", "Fransızca"],
  },
  {
    id: 9,
    name: "Emre Kılıç",
    rating: 3.5,
    reviews: 45,
    description:
      "Klasik erkek kesimlerinde uzmanlaşan, uygun fiyatlı hizmet sunan kuaför",
    gender: "Erkek",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2070&auto=format&fit=crop",
    specialty: ["Klasik Kesim", "Çocuk Tıraşı"],
    location: {
      address: "Velibaba Mah. Pendik Cad. No:65",
      district: "Pendik",
      city: "İstanbul",
    },
    phone: "+90 532 901 23 45",
    experience: 1,
    workingHours: { start: "10:00", end: "19:00" },
    services: [
      { name: "Temel Kesim", price: 100 },
      { name: "Saç Yıkama", price: 30 },
      { name: "Fön", price: 50 },
    ],
    workDays: ["Perşembe", "Cuma", "Cumartesi", "Pazar"],
    languages: ["Türkçe"],
  },
  {
    id: 10,
    name: "Selin Yıldırım",
    rating: 4.5,
    reviews: 167,
    description:
      "Maşa ve fön teknikleriyle müşterilerine doğal ve kalıcı sonuçlar sunan deneyimli stilist",
    gender: "Kadın",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2070&auto=format&fit=crop",
    specialty: ["Saç Kesimi", "Maşa", "Topuz"],
    location: {
      address: "Yalı Mah. Beykoz Cad. No:105",
      district: "Beykoz",
      city: "İstanbul",
    },
    phone: "+90 533 012 34 56",
    experience: 9,
    workingHours: { start: "11:00", end: "21:00" },
    services: [
      { name: "Saç Bakımı", price: 250 },
      { name: "Fön", price: 100 },
      { name: "Maşa", price: 150 },
      { name: "Topuz", price: 200 },
    ],
    workDays: ["Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
    languages: ["Türkçe", "İngilizce"],
  },
];
export const PRICE_RANGES = [
  { label: "100-200 TL", min: 100, max: 200 },
  { label: "200-300 TL", min: 200, max: 300 },
  { label: "300-400 TL", min: 300, max: 400 },
  { label: "400-500 TL", min: 400, max: 500 },
  { label: "500-600 TL", min: 500, max: 600 },
  { label: "600+ TL", min: 600, max: 999999 },
];
export const EXPERIENCE_RANGES = [
  { min: 1, max: 3 },
  { min: 3, max: 5 },
  { min: 5, max: null },
];
export const LOCATIONS = ["Kadıköy", "Beşiktaş", "Şişli", "Üsküdar"];
export const SPECIALTIES = ["Saç Kesimi", "Sakal Tıraşı", "Saç Boyama"];
export const GENDERS = ["Erkek", "Kadın"];
export const CATEGORIES = [
  { id: "men", name: "Erkek Saç" },
  { id: "women", name: "Kadın Saç" },
  { id: "nail", name: "Tırnak" },
];
export const TURKISH_CHAR_MAP = {
  ı: "i",
  ş: "s",
  ö: "o",
  ç: "c",
  ğ: "g",
  ü: "u",
};
export const SERVICES = [
  "Saç Kesimi",
  "Sakal Tıraşı",
  "Saç Boyama",
  "Cilt Bakımı",
];
export const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];
export const APPOINTMENTS = [
  {
    id: 1,
    time: "09:00",
    date: "12 Mart 2024",
    customerName: "Mehmet Kaya",
    customerPhone: "+90 532 123 45 67",
    service: ["Saç Kesimi", "Sakal Tıraşı"],
    price: 150,
    status: "Tamamlandı",
    notes: "Yanları 3 numara, üstler makasla",
  },
  {
    id: 2,
    time: "10:00",
    date: "12 Mart 2024",
    customerName: "Ali Demir",
    customerPhone: "+90 533 234 56 78",
    service: ["Saç Kesimi", "Sakal Tıraşı"],
    price: 100,
    status: "Devam Ediyor",
    notes: "Her zamanki model",
  },
  {
    id: 3,
    time: "11:30",
    date: "12 Mart 2024",
    customerName: "Mustafa Çelik",
    customerPhone: "+90 535 345 67 89",
    service: ["Saç Kesimi", "Sakal Tıraşı"],
    price: 80,
    status: "Yaklaşan",
    notes: "Kirli sakal modeli",
  },
  {
    id: 4,
    time: "14:00",
    date: "12 Mart 2024",
    customerName: "Kerem Can",
    customerPhone: "+90 536 456 78 90",
    service: ["Saç Kesimi", "Sakal Tıraşı"],
    price: 200,
    status: "Yaklaşan",
    notes: "Cilt hassasiyeti var",
  },
];
export const APPOINTMENTS_FILTERS = [
  "Tümü",
  "Tamamlandı",
  "Devam Ediyor",
  "Yaklaşan",
];
