const books = [
  {
    id: 1,
    title: "பொன்னியின் செல்வன்",
    searchTitle: "Ponniyin Selvan",
    author: "கல்கி",
    category: "Historical Fiction",
    language: "Tamil",
    year: 1954,
    rating: 4.9,
    reviews: 1250,
    image: "/books/ponniyin-selvan.jpg",
    readLink: "https://freetamilebooks.com/ebooks/ponniyin_selvan/",
    description:
      "சோழர் வரலாற்றுப் பின்னணியில் அமைந்த கல்கியின் புகழ்பெற்ற வரலாற்று நாவல். அருள்மொழி வர்மன், வந்தியத்தேவன், குந்தவை மற்றும் நந்தினி போன்ற கதாபாத்திரங்களைச் சுற்றி கதை நகர்கிறது."
  },

  {
    id: 2,
    title: "சிலப்பதிகாரம்",
    searchTitle: "Silappathikaram",
    author: "இளங்கோ அடிகள்",
    category: "Literary Fiction",
    language: "Tamil",
    year: 1800,
    rating: 4.8,
    reviews: 980,
    image: "/books/silapathikaram.jpg",
    readLink: "https://ta.wikisource.org/wiki/சிலப்பதிகாரம்",
    description:
      "இளங்கோ அடிகள் இயற்றிய தமிழின் ஐம்பெரும் காப்பியங்களில் ஒன்றான சிலப்பதிகாரம். கண்ணகி, கோவலன் மற்றும் மாதவி ஆகியோரின் வாழ்க்கையை மையமாகக் கொண்டு அறம், நீதி மற்றும் சமூக வாழ்வை எடுத்துரைக்கும் புகழ்பெற்ற காப்பியம்."
  },

  {
    id: 3,
    title: "பார்த்திபன் கனவு",
    searchTitle: "Parthiban Kanavu",
    author: "கல்கி",
    category: "Historical Fiction",
    language: "Tamil",
    year: 1941,
    rating: 4.7,
    reviews: 850,
    image: "/books/parthiban-kanavu.jpg",
    readLink:
      "https://store.pothi.com/book/ebook-kalki-r-krishnamurthy-%E0%AE%AA%E0%AE%BE%E0%AE%B0%E0%AF%8D%E0%AE%A4%E0%AF%8D%E0%AE%A4%E0%AE%BF%E0%AE%AA%E0%AE%A9%E0%AF%8D-%E0%AE%95%E0%AE%A9%E0%AE%B5%E0%AF%81/",
    description:
      "சோழர்களின் எதிர்கால எழுச்சியை மையமாகக் கொண்ட கல்கியின் வரலாற்று நாவல். பார்த்திப சோழனின் கனவும் அதனை நிறைவேற்றும் முயற்சிகளும் கதையின் மையமாக அமைகின்றன."
  },

  {
    id: 4,
    title: "அலை ஓசை",
    searchTitle: "Alai Osai",
    author: "கல்கி",
    category: "Historical Fiction",
    language: "Tamil",
    year: 1948,
    rating: 4.7,
    reviews: 760,
    image: "/books/alai-osai.jpg",
    readLink:
      "https://freetamilebooks.com/ebooks/alai_oosai_1_2/",
    description:
      "இந்திய விடுதலைப் போராட்டத்தின் பின்னணியில் தனிமனித வாழ்க்கை, சமூக மாற்றம் மற்றும் நாட்டுப்பற்று ஆகியவற்றை எடுத்துரைக்கும் நாவல்."
  },

  {
    id: 5,
    title: "சில நேரங்களில் சில மனிதர்கள்",
    searchTitle: "Sila Nerangalil Sila Manithargal",
    author: "ஜெயகாந்தன்",
    category: "Fiction",
    language: "Tamil",
    year: 1970,
    rating: 4.6,
    reviews: 690,
    image: "/books/sila-nerangalil-sila-manithargal.jpg",
    readLink:
      "https://books.kalachuvadu.com/catalogue/SilaNerankalilSilaManitharkal_1650/",
    description:
      "மனித உறவுகள், சமூக மதிப்பீடுகள் மற்றும் தனிமனித வாழ்க்கையின் சிக்கல்களை ஆராயும் ஜெயகாந்தனின் முக்கியமான நாவல்."
  },

  {
    id: 6,
    title: "ஒரு மனிதன் ஒரு வீடு ஒரு உலகம்",
    searchTitle: "Oru Manithan Oru Veedu Oru Ulagam",
    author: "ஜெயகாந்தன்",
    category: "Fiction",
    language: "Tamil",
    year: 1973,
    rating: 4.6,
    reviews: 620,
    image: "/books/oru-manithan-oru-veedu-oru-ulagam.jpg",
    readLink: "",
    description:
      "ஒரு மனிதனின் வாழ்க்கை, அவனது உறவுகள் மற்றும் சமூகத்துடனான தொடர்பை மையமாகக் கொண்டு எழுதப்பட்ட இலக்கிய நாவல்."
  },

  {
    id: 7,
    title: "அக்னிச் சிறகுகள்",
    searchTitle: "Agni Siragugal",
    author: "ஏ. பி. ஜே. அப்துல் கலாம்",
    category: "Autobiography",
    language: "Tamil",
    year: 1999,
    rating: 4.9,
    reviews: 1950,
    image: "/books/agni-siragugal.jpg",
    readLink:
      "https://www.commonfolks.in/books/d/agni-siragugal-kalachuvadu",
    description:
      "ஏ. பி. ஜே. அப்துல் கலாமின் வாழ்க்கைப் பயணத்தை எடுத்துரைக்கும் சுயசரிதை நூல். அவரது குழந்தைப் பருவம், கல்வி, அறிவியல் வாழ்க்கை மற்றும் இந்தியாவின் விண்வெளி மற்றும் ஏவுகணைத் துறையில் பெற்ற அனுபவங்களைப் பதிவு செய்கிறது."
  },

  {
    id: 8,
    title: "கருக்கு",
    searchTitle: "Karukku",
    author: "பாமா",
    category: "Autobiography",
    language: "Tamil",
    year: 1992,
    rating: 4.7,
    reviews: 720,
    image: "/books/karukku.jpg",
    readLink:
      "https://www.kobo.com/in/en/ebook/karukku",
    description:
      "பாமாவின் வாழ்க்கை அனுபவங்களை அடிப்படையாகக் கொண்ட சுயசரிதைத் தன்மை கொண்ட முக்கியமான தமிழ் படைப்பு. சமூக அனுபவங்கள் மற்றும் தனிமனிதப் போராட்டங்கள் இதில் வெளிப்படுகின்றன."
  },

  {
    id: 9,
    title: "சிவகாமியின் சபதம்",
    searchTitle: "Sivagamiyin Sabatham",
    author: "கல்கி",
    category: "Historical Fiction",
    language: "Tamil",
    year: 1948,
    rating: 4.8,
    reviews: 980,
    image: "/books/sivagamiyin-sabadham.jpg",
    readLink:
      "https://ta.wikisource.org/wiki/சிவகாமியின்_சபதம்",
    description:
      "பல்லவர் கால வரலாற்றை அடிப்படையாகக் கொண்டு எழுதப்பட்ட வரலாற்று நாவல். நரசிம்மவர்மன், சிவகாமி மற்றும் மாமல்லபுரம் ஆகியவற்றை மையமாகக் கொண்ட கதை."
  },

  {
    id: 10,
    title: "வனவாசம்",
    searchTitle: "Vanavasam",
    author: "கண்ணதாசன்",
    category: "Autobiography",
    language: "Tamil",
    year: 1965,
    rating: 4.6,
    reviews: 700,
    image: "/books/vanavasam.jpg",
    readLink:
      "https://books.google.com/books?id=LrIdCAAAQBAJ",
    description:
      "கவிஞர் கண்ணதாசனின் சுயசரிதை நூல். 1943 முதல் 1961 ஏப்ரல் வரையிலான அவரது வாழ்க்கைப் பயணம், அனுபவங்கள் மற்றும் தனிப்பட்ட சிந்தனைகளைப் பதிவு செய்கிறது."
  },

  {
    id: 11,
    title: "கொற்கை",
    searchTitle: "Korkai",
    author: "ஜோ டி குரூஸ்",
    category: "Historical Fiction",
    language: "Tamil",
    year: 2009,
    rating: 4.6,
    reviews: 640,
    image: "/books/korkai.jpg",
    readLink: "",
    description:
      "தமிழகத்தின் கடலோரப் பகுதிகள் மற்றும் பரதவர் சமூகத்தின் வரலாற்று வாழ்க்கையைப் பின்னணியாகக் கொண்டு எழுதப்பட்ட நாவல்."
  },

  {
    id: 12,
    title: "விஷ்ணுபுரம்",
    searchTitle: "Vishnupuram",
    author: "ஜெயமோகன்",
    category: "Literary Fiction",
    language: "Tamil",
    year: 1997,
    rating: 4.7,
    reviews: 830,
    image: "/books/vishnupuram.jpg",
    readLink: "",
    description:
      "தத்துவம், வரலாறு, ஆன்மிகம் மற்றும் மனித வாழ்க்கையின் பல்வேறு பரிமாணங்களை இணைக்கும் விரிவான தமிழ் இலக்கியப் படைப்பு."
  },

  {
    id: 13,
    title: "கடல் புறா",
    searchTitle: "Kadal Pura",
    author: "சாண்டில்யன்",
    category: "Historical Fiction",
    language: "Tamil",
    year: 1967,
    rating: 4.8,
    reviews: 910,
    image: "/books/kadal-pura.jpg",
    readLink: "",
    description:
      "சோழர் கால கடற்பயணங்கள், அரசியல் நிகழ்வுகள் மற்றும் சாகசங்களை மையமாகக் கொண்ட பிரபலமான வரலாற்று நாவல்."
  },

  {
    id: 14,
    title: "யவன ராணி",
    searchTitle: "Yavana Rani",
    author: "சாண்டில்யன்",
    category: "Historical Fiction",
    language: "Tamil",
    year: 1960,
    rating: 4.7,
    reviews: 870,
    image: "/books/yavan-rani.jpg",
    readLink: "",
    description:
      "பண்டைய தமிழகத்தின் அரசியல் மற்றும் கடல் வாணிபப் பின்னணியில் அமைந்த சாண்டில்யனின் வரலாற்றுச் சாகச நாவல்."
  },

  {
    id: 15,
    title: "அன்புள்ள மகளே!",
    searchTitle: "Anbulla Magale",
    author: "இரா. தட்சிணாமூர்த்தி",
    category: "Literary Fiction",
    language: "Tamil",
    year: 2024,
    rating: 4.5,
    reviews: 580,
    image: "/books/anbulla-magale.jpg",
    readLink: "",
    description:
      "பெண் கல்வி, சமூக சமத்துவம், அறிவியல் சிந்தனை மற்றும் சமூக மாற்றம் போன்ற கருத்துகளை கடிதங்கள் மற்றும் சிறுகதைகள் வழியாக எடுத்துரைக்கும் தமிழ் நூல்."
  },
{
  id: 16,
  title: "பூக்குழி",
  searchTitle: "Pookuzhi",
  author: "பெருமாள் முருகன்",
  category: "Domestic Fiction",
  language: "Tamil",
  year: 2013,
  rating: 4.2,
  reviews: 350,
  image: "/books/pyre.jpg",
  readLink: "https://en.wikipedia.org/wiki/Pyre_(novel)",
  description:
    "பெருமாள் முருகன் எழுதிய பூக்குழி (Pyre) 2013 ஆம் ஆண்டு வெளியான தமிழ் நாவல். குமரேசன் மற்றும் சரோஜாவின் காதல் மற்றும் கலப்புத் திருமணத்தை மையமாகக் கொண்டு சாதி அடிப்படையிலான சமூக அழுத்தம், பாகுபாடு மற்றும் வன்முறையைப் பற்றி நாவல் எடுத்துரைக்கிறது. ஆங்கில மொழிபெயர்ப்பு Aniruddhan Vasudevan அவர்களால் 2016 ஆம் ஆண்டு வெளியிடப்பட்டது."
}
];

export default books;
