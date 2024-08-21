import adamame from "../assets/adamame.jpg"
import awaze from "../assets/awaze.jpg";
import banner from "../assets/banner.png";
import batata from "../assets/batata.jpg";
import berbere from "../assets/berbere.jpg";
import beyaynetu from "../assets/beyaynetu.jpg";
import bowlChicken from "../assets/bowl-chicken.jpg";
import buna from "../assets/buna.jpg";
import cake from "../assets/cake.jpg";
import cookies from "../assets/cookies.jpg";
import dessert from "../assets/dessert.jpg";
import enjera from "../assets/enjera.jpg";
import enqulalFirfir from "../assets/enqulal-firfir.jpg";
import firfir from "../assets/firfir.jpg";
import freshFruites from "../assets/fresh-fruites.jpg";
import freshSalad from "../assets/fresh-salad.jpg";
import habashBeer from "../assets/habash-beer.jpg";
import hamutsim from "../assets/hamutsim.jpg";
import hotShiro from "../assets/hot-shiro.jpg";
import hotVegtables from "../assets/hot-vegtables.jpg";
import hummus from "../assets/hummus.jpg";
import injeraTibis from "../assets/injera-tibis.jpg";
import kik from "../assets/kik.jpg";
import kimem from "../assets/kimem.jpg";
import kimem2 from "../assets/kimem-2.jpg";
import kitfo from "../assets/kitfo.jpg";
import krep2 from "../assets/krep-2.jpg";
import krep3 from "../assets/krep-3.jpg";
import krep from "../assets/krep.jpg";
import kurkum from "../assets/kurkum.jpg";
import mainPhoto from "../assets/main-photo.jpg";
import malabi from "../assets/malabi.jpg";
import menu from "../assets/menu.jpg";
import menu2 from "../assets/menu-2.jpg";
import mojito from "../assets/mojito.jpg";
import mushrooms from "../assets/mushrooms.jpg";
import musli from "../assets/musli.jpg";
import omlet from "../assets/omlet.jpg";
import orangeJuice from "../assets/orange-juice.jpg";
import pasta from "../assets/pasta.jpg";
import rollInjera from "../assets/roll-injera.jpg";
import salad from "../assets/salad.jpg";
import shawarma from "../assets/shawarma.jpg";
import shiro from "../assets/shiro.jpg";
import soup from "../assets/soup.jpg";
import spices from "../assets/spices.jpg";
import tavlinim from "../assets/tavlinim.jpg";
import tibs from "../assets/tibs.jpg";
import veggie from "../assets/veggie.svg";
import testimonial from "../assets/testimonial.svg";
import productPagePhoto from "../assets/singlePagePhoto.png";
import wine from "../assets/wine.jpg";

export {
  productPagePhoto,
  testimonial,
  adamame,
  awaze,
  banner,
  batata,
  berbere,
  beyaynetu,
  bowlChicken,
  buna,
  cake,
  cookies,
  dessert,
  enjera,
  enqulalFirfir,
  firfir,
  freshFruites,
  freshSalad,
  habashBeer,
  hamutsim,
  hotShiro,
  hotVegtables,
  hummus,
  injeraTibis,
  kik,
  kimem,
  kimem2,
  kitfo,
  krep2,
  krep3,
  krep,
  kurkum,
  mainPhoto,
  malabi,
  menu,
  menu2,
  mojito,
  mushrooms,
  musli,
  omlet,
  orangeJuice,
  pasta,
  rollInjera,
  salad,
  shawarma,
  shiro,
  soup,
  spices,
  tavlinim,
  tibs,
  veggie,
  wine,
};

export const productsForMongo = [
  {
    name: "Berbere በርበሬ",
    shortDescription: "A spicy and aromatic Ethiopian spice blend essential for traditional dishes.",
    price: 12.99,
    InStock: 150,
    images: [
      "http://localhost:8080/files/berbere.jpg",
      "http://localhost:8080/files/berbere.jpg",
    ],
    weights: ["100g", "250g", "500g"],
    categories: ["Spices"],
    rate: 5,
    benefits: [
      "Rich in antioxidants",
      "Boosts metabolism",
      "Supports digestive health",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 1200,
  },
  {
    name: "Injera እንጀራ",
    shortDescription: "Traditional Ethiopian flatbread made from teff flour, a staple in every Ethiopian meal.",
    price: 15.99,
    InStock: 200,
    images: [
      "http://localhost:8080/files/injera.jpg",
      "http://localhost:8080/files/injera.jpg",
    ],
    weights: ["10 pieces", "20 pieces"],
    categories: ["Breads", "Staples"],
    rate: 4,
    benefits: [
      "Gluten-free",
      "Rich in iron",
      "High in fiber",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 1500,
  },
  {
    name: "Teff Flour ጤፍ ዱቄት",
    shortDescription: "A gluten-free ancient grain flour, perfect for making Injera and other Ethiopian dishes.",
    price: 10.99,
    InStock: 300,
    images: [
      "http://localhost:8080/files/kik.jpg",
      "http://localhost:8080/files/kik.jpg",
    ],
    weights: ["500g", "1kg"],
    categories: ["Flours", "Staples"],
    rate: 5,
    benefits: [
      "High in protein",
      "Rich in iron",
      "Low glycemic index",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 800,
  },
  {
    name: "Shiro Powder ሽሮ",
    shortDescription: "A seasoned chickpea flour used to make a popular Ethiopian stew.",
    price: 8.99,
    InStock: 180,
    images: [
      "http://localhost:8080/files/shiro.jpg",
      "http://localhost:8080/files/shiro.jpg",
    ],
    weights: ["250g", "500g"],
    categories: ["Flours", "Spices"],
    rate: 4,
    benefits: [
      "Rich in protein",
      "Good source of fiber",
      "Low in fat",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 950,
  },
  {
    name: "Niter Kibbeh ንጥር ቅቤ",
    shortDescription: "Clarified spiced butter used in various Ethiopian dishes, adding depth of flavor.",
    price: 14.99,
    InStock: 100,
    images: [
      "http://localhost:8080/files/niter_kibbeh_1.jpg",
      "http://localhost:8080/files/niter_kibbeh_2.jpg",
    ],
    weights: ["250g", "500g"],
    categories: ["Oils & Butters"],
    rate: 5,
    benefits: [
      "Rich in vitamins A, D, E, and K",
      "High in healthy fats",
      "Enhances flavor in dishes",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 700,
  },
  {
    name: "Mitmita ሚጥሚጣ",
    shortDescription: "A spicy Ethiopian seasoning blend, often used to add heat to dishes.",
    price: 9.99,
    InStock: 220,
    images: [
      "http://localhost:8080/files/mitmita_1.jpg",
      "http://localhost:8080/files/mitmita_2.jpg",
    ],
    weights: ["100g", "200g"],
    categories: ["Spices"],
    rate: 4,
    benefits: [
      "Boosts metabolism",
      "Enhances flavor",
      "Supports digestive health",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 600,
  },
  {
    name: "Doro Wat Sauce ዶሮ ወጥ ስስ",
    shortDescription: "A rich and spicy sauce for making Ethiopia's famous chicken stew, Doro Wat.",
    price: 12.99,
    InStock: 140,
    images: [
      "http://localhost:8080/files/doro_wat_sauce_1.jpg",
      "http://localhost:8080/files/doro_wat_sauce_2.jpg",
    ],
    weights: ["250g", "500g"],
    categories: ["Sauces & Pastes"],
    rate: 5,
    benefits: [
      "Ready-to-use",
      "Authentic flavor",
      "Made with natural ingredients",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 1100,
  },
  {
    name: "Awaze Paste አዋዜ",
    shortDescription: "A spicy paste made from Berbere and other spices, used as a condiment or marinade.",
    price: 11.99,
    InStock: 160,
    images: [
      "http://localhost:8080/files/awaze_paste_1.jpg",
      "http://localhost:8080/files/awaze_paste_2.jpg",
    ],
    weights: ["200g", "400g"],
    categories: ["Sauces & Pastes", "Condiments"],
    rate: 4,
    benefits: [
      "Rich in flavor",
      "Versatile use",
      "Enhances dishes",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 850,
  },
  {
    name: "Kolo ቆሎ",
    shortDescription: "A traditional Ethiopian roasted barley snack, crunchy and full of flavor.",
    price: 7.99,
    InStock: 250,
    images: [
      "http://localhost:8080/files/kolo_1.jpg",
      "http://localhost:8080/files/kolo_2.jpg",
    ],
    weights: ["100g", "250g"],
    categories: ["Snacks"],
    rate: 4,
    benefits: [
      "High in fiber",
      "Rich in minerals",
      "Gluten-free",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 500,
  },
  {
    name: "Ethiopian Coffee ቡና",
    shortDescription: "Premium Ethiopian coffee beans, known for their rich and complex flavor.",
    price: 18.99,
    InStock: 100,
    images: [
      "http://localhost:8080/files/ethiopian_coffee_1.jpg",
      "http://localhost:8080/files/ethiopian_coffee_2.jpg",
    ],
    weights: ["250g", "500g"],
    categories: ["Beverages"],
    rate: 5,
    benefits: [
      "High in antioxidants",
      "Rich, smooth flavor",
      "Sourced from Ethiopian highlands",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 1300,
  },
  {
    name: "Mesir Wat Lentils ምስር ወጥ",
    shortDescription: "Red lentils used to make Mesir Wat, a flavorful and spicy Ethiopian stew.",
    price: 9.99,
    InStock: 180,
    images: [
      "http://localhost:8080/files/mesir_wat_1.jpg",
      "http://localhost:8080/files/mesir_wat_2.jpg",
    ],
    weights: ["500g", "1kg"],
    categories: ["Legumes"],
    rate: 4,
    benefits: [
      "High in protein",
      "Rich in iron",
      "Supports heart health",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 900,
  },
  {
    name: "Gomen ጎመን",
    shortDescription: "Ethiopian-style collard greens, seasoned and ready to cook.",
    price: 7.99,
    InStock: 200,
    images: [
      "http://localhost:8080/files/gomen_1.jpg",
      "http://localhost:8080/files/gomen_2.jpg",
    ],
    weights: ["250g", "500g"],
    categories: ["Vegetables"],
    rate: 5,
    benefits: [
      "Rich in vitamins A and C",
      "High in fiber",
      "Supports bone health",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 600,
  },
  {
    name: "Fitfit ፍትፍት",
    shortDescription: "Shredded Injera mixed with spicy sauces and seasoned butter, a traditional Ethiopian dish.",
    price: 9.99,
    InStock: 150,
    images: [
      "http://localhost:8080/files/fitfit_1.jpg",
      "http://localhost:8080/files/fitfit_2.jpg",
    ],
    weights: ["500g"],
    categories: ["Prepared Foods", "Staples"],
    rate: 4,
    benefits: [
      "Rich in flavor",
      "Quick and easy meal",
      "Gluten-free",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 700,
  },
  {
    name: "Atayef አታይፍ",
    shortDescription: "Traditional Ethiopian sweet pancakes stuffed with nuts and spices, perfect for dessert.",
    price: 8.99,
    InStock: 120,
    images: [
      "http://localhost:8080/files/atayef_1.jpg",
      "http://localhost:8080/files/atayef_2.jpg",
    ],
    weights: ["10 pieces"],
    categories: ["Desserts", "Snacks"],
    rate: 4,
    benefits: [
      "Delicious sweet treat",
      "Rich in flavor",
      "Perfect for special occasions",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 500,
  },
  {
    name: "Firfir ፍርፍር",
    shortDescription: "A savory dish made from leftover Injera mixed with Berbere and Niter Kibbeh.",
    price: 10.99,
    InStock: 100,
    images: [
      "http://localhost:8080/files/firfir_1.jpg",
      "http://localhost:8080/files/firfir_2.jpg",
    ],
    weights: ["500g"],
    categories: ["Prepared Foods"],
    rate: 5,
    benefits: [
      "Comfort food",
      "Quick and easy to prepare",
      "Rich in spices",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 450,
  },
  {
    name: "Kik Alicha ክክ አልጫ",
    shortDescription: "Mild Ethiopian stew made with split peas, perfect for those who prefer less spicy dishes.",
    price: 9.99,
    InStock: 130,
    images: [
      "http://localhost:8080/files/kik_alicha_1.jpg",
      "http://localhost:8080/files/kik_alicha_2.jpg",
    ],
    weights: ["500g"],
    categories: ["Prepared Foods", "Legumes"],
    rate: 4,
    benefits: [
      "High in protein",
      "Low in fat",
      "Rich in flavor",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 550,
  },
  {
    name: "Ethiopian Honey ማር",
    shortDescription: "Organic honey from Ethiopia, known for its unique flavor and health benefits.",
    price: 16.99,
    InStock: 90,
    images: [
      "http://localhost:8080/files/ethiopian_honey_1.jpg",
      "http://localhost:8080/files/ethiopian_honey_2.jpg",
    ],
    weights: ["250g", "500g"],
    categories: ["Sweeteners", "Condiments"],
    rate: 5,
    benefits: [
      "Rich in antioxidants",
      "Natural energy booster",
      "Supports digestive health",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 700,
  },
  {
    name: "Besobela በሶበላ",
    shortDescription: "Ethiopian sacred basil used in traditional stews and as a flavoring herb.",
    price: 6.99,
    InStock: 210,
    images: [
      "http://localhost:8080/files/besobela_1.jpg",
      "http://localhost:8080/files/besobela_2.jpg",
    ],
    weights: ["50g", "100g"],
    categories: ["Herbs & Spices"],
    rate: 4,
    benefits: [
      "Enhances flavor in dishes",
      "Rich in essential oils",
      "Supports respiratory health",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 600,
  },
  {
    name: "Ajwain አውጋይን",
    shortDescription: "A spice with a flavor similar to thyme, used in Ethiopian cuisine for both cooking and medicinal purposes.",
    price: 5.99,
    InStock: 160,
    images: [
      "http://localhost:8080/files/ajwain_1.jpg",
      "http://localhost:8080/files/ajwain_2.jpg",
    ],
    weights: ["50g", "100g"],
    categories: ["Herbs & Spices"],
    rate: 4,
    benefits: [
      "Aids in digestion",
      "Anti-inflammatory properties",
      "Rich in fiber",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 400,
  },
  {
    name: "Selamta Sauce ሰላምታ ስስ",
    shortDescription: "A savory sauce made with Ethiopian spices, perfect for adding flavor to any dish.",
    price: 11.99,
    InStock: 140,
    images: [
      "http://localhost:8080/files/selamta_sauce_1.jpg",
      "http://localhost:8080/files/selamta_sauce_2.jpg",
    ],
    weights: ["250g", "500g"],
    categories: ["Sauces & Pastes", "Condiments"],
    rate: 5,
    benefits: [
      "Rich in flavor",
      "Versatile use",
      "Made with natural ingredients",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 500,
  },
  {
    name: "Timatim ጥማቲም",
    shortDescription: "Ethiopian-style tomato salad dressing, fresh and tangy, perfect for enhancing salads.",
    price: 7.99,
    InStock: 180,
    images: [
      "http://localhost:8080/files/timatim_1.jpg",
      "http://localhost:8080/files/timatim_2.jpg",
    ],
    weights: ["250g", "500g"],
    categories: ["Sauces & Pastes", "Condiments"],
    rate: 4,
    benefits: [
      "Rich in vitamins A and C",
      "Boosts immune system",
      "Low in calories",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 400,
  },
  {
    name: "Abyssinian Tea አቢሲኒያ ሻይ",
    shortDescription: "A traditional Ethiopian herbal tea blend, known for its soothing and aromatic properties.",
    price: 9.99,
    InStock: 130,
    images: [
      "http://localhost:8080/files/abyssinian_tea_1.jpg",
      "http://localhost:8080/files/abyssinian_tea_2.jpg",
    ],
    weights: ["50g", "100g"],
    categories: ["Beverages"],
    rate: 4,
    benefits: [
      "Promotes relaxation",
      "Supports digestive health",
      "Rich in antioxidants",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 300,
  },
  {
    name: "Tibs Sauce ቲብስ ስስ",
    shortDescription: "A spicy and savory sauce used to make Tibs, a popular Ethiopian sautéed meat dish.",
    price: 12.99,
    InStock: 140,
    images: [
      "http://localhost:8080/files/tibs_sauce_1.jpg",
      "http://localhost:8080/files/tibs_sauce_2.jpg",
    ],
    weights: ["250g", "500g"],
    categories: ["Sauces & Pastes"],
    rate: 5,
    benefits: [
      "Authentic flavor",
      "Enhances meat dishes",
      "Made with natural ingredients",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 500,
  },
  {
    name: "Chechebsa ጨጨብሳ",
    shortDescription: "Ethiopian breakfast dish made from shredded flatbread and spices, ready to eat.",
    price: 8.99,
    InStock: 150,
    images: [
      "http://localhost:8080/files/chechebsa_1.jpg",
      "http://localhost:8080/files/chechebsa_2.jpg",
    ],
    weights: ["400g"],
    categories: ["Prepared Foods", "Breakfast"],
    rate: 4,
    benefits: [
      "Quick and easy breakfast",
      "Rich in flavor",
      "High in fiber",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 450,
  },
  {
    name: "Dirkosh ድርቆሽ",
    shortDescription: "Crispy Injera chips, a traditional Ethiopian snack, perfect for dipping or enjoying on their own.",
    price: 6.99,
    InStock: 180,
    images: [
      "http://localhost:8080/files/dirkosh_1.jpg",
      "http://localhost:8080/files/dirkosh_2.jpg",
    ],
    weights: ["150g"],
    categories: ["Snacks", "Prepared Foods"],
    rate: 5,
    benefits: [
      "Crunchy and delicious",
      "Gluten-free",
      "Great for snacking",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 600,
  },
  {
    name: "Shiro Wot ሽሮ ወጥ",
    shortDescription: "Ethiopian chickpea stew mix, made with spices and herbs, a staple dish in Ethiopian cuisine.",
    price: 8.99,
    InStock: 170,
    images: [
      "http://localhost:8080/files/shiro_wot_1.jpg",
      "http://localhost:8080/files/shiro_wot_2.jpg",
    ],
    weights: ["200g", "400g"],
    categories: ["Prepared Foods", "Legumes"],
    rate: 5,
    benefits: [
      "High in protein",
      "Rich in flavor",
      "Vegan-friendly",
    ],

    reviews: [],
    relatedProducts: [],
    totalSales: 750,
  },
]
