import { Meta } from "./types";

export const articlesPrincipal = [
  { 
    id: 1,
    label: "Pasta",
    img: "https://static01.nyt.com/images/2025/01/17/multimedia/CR-Lemony-Hummus-Pasta-wtkj/CR-Lemony-Hummus-Pasta-wtkj-threeByTwoMediumAt2X.jpg",
    tags: [1, 3],
    category: 2, // Lunch
    description: "A delicious pasta dish with a creamy sauce and fresh herbs.",
    date_updated: 1677664800000, // Timestamp for "2023-03-01T10:00:00Z"
    price: 1299
  },
  { 
    id: 2,
    label: "Salad",
    img: "https://www.eatingwell.com/thmb/S2NGMEcgm11dtdBJ6Hwprwq-nVk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eat-the-rainbow-chopped-salad-with-basil-mozzarella-beauty-185-278133-4000x2700-56879ac756cd46ea97944768847b7ea5.jpg",
    tags: [2],
    category: 1, // Lunch
    description: "A fresh and healthy salad with a variety of colorful vegetables.",
    date_updated: 1677760200000, // Timestamp for "2023-03-02T12:30:00Z"
    price: 849
  },
  { 
    id: 3,
    label: "Pizza",
    img: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
    tags: [1],
    category: 2, // Lunch
    description: "A classic cheese pizza with a crispy crust and rich tomato sauce.",
    date_updated: 1677848700000, // Timestamp for "2023-03-03T15:45:00Z"
    price: 1099
  },
  { 
    id: 4,
    label: "Burger",
    img: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
    tags: [1],
    category: 4, // Snack
    description: "A juicy burger with melted cheese and fresh toppings.",
    date_updated: 1677951600000, // Timestamp for "2023-03-04T18:20:00Z"
    price: 999
  },
  { 
    id: 5,
    label: "Sushi",
    img: "https://i0.wp.com/christinapotvin.com/wp-content/uploads/2021/12/miniature-youtube-2.jpg?resize=1080%2C675&ssl=1",
    tags: [3],
    category: 3, // Lunch
    description: "A selection of fresh sushi rolls with a variety of fillings.",
    date_updated: 1678008600000, // Timestamp for "2023-03-05T09:10:00Z"
    price: 1599
  },
  { 
    id: 6,
    label: "Soup",
    img: "https://ichef.bbc.co.uk/ace/standard/1600/food/recipes/goodvegetablesoup_73412_16x9.jpg.webp",
    tags: [2, 3],
    category: 1, // Breakfast
    description: "A warm and comforting vegetable soup, perfect for any time of day.",
    date_updated: 1678100400000, // Timestamp for "2023-03-06T11:00:00Z"
    price: 699
  },
  {
    id: 7,
    label: "Steaks marinés à la sauce soja et aux herbes",
    img: "https://www.kikkoman.fr/fileadmin/_processed_/c/5/csm_1111-recipe-page-Herby-Soy-Marinated-Steaks_desktop_c51d610179.webp",
    tags: [4],
    category: 4, // Dinner
    description: "A perfectly cooked steak, seasoned to perfection.",
    date_updated: 1678192200000, // Timestamp for "2023-03-07T14:30:00Z"
    price: 1999
  },
  { 
    id: 8,
    label: "Tacos",
    img: "https://brandsitesplatform-res.cloudinary.com/image/fetch/w_auto:100,c_scale,q_auto:eco,f_auto,fl_lossy,dpr_auto,e_sharpen:85/https://assets.brandplatform.generalmills.com%2F-%2Fmedia%2Fproject%2Fgmi%2Foldelpaso%2Foldelpaso-ch%2Foepp%2Frecipes-2017%2Fchicken-ranch-tacos-16-9.jpg%3Frev%3D8c8abc95c25f4fb29021e2f3394b8223",
    tags: [1, 3],
    category: 3, // Dinner
    description: "Delicious tacos filled with seasoned meat and fresh toppings.",
    date_updated: 1678284600000, // Timestamp for "2023-03-08T16:50:00Z"
    price: 1149
  },
  // Petit-déjeuner (Breakfast) - 2e plat
  {
    id: 9,
    label: "Omelette aux fines herbes",
    img: "https://fr.frije.com/content/recipes/139103/800-1.jpg",
    tags: [1],
    category: 1, // Breakfast
    description: "Omelette moelleuse aux œufs frais et fines herbes.",
    date_updated: 1678371000000, // 2023-03-09T11:30:00Z
    price: 799
  },
  // Petit-déjeuner (Breakfast) - 3e plat
  {
    id: 13,
    label: "Granola maison et yaourt",
    img: "https://cache.marieclaire.fr/data/photo/w1000_ci/4z/granola-maison-yaourt-et-bananes.jpg",
    tags: [1],
    category: 1, // Breakfast
    description: "Granola croustillant servi avec du yaourt nature et des fruits frais.",
    date_updated: 1678700000000, // 2023-03-13T08:00:00Z
    price: 599
  },
  // Déjeuner (Lunch) - 2e plat
  {
    id: 10,
    label: "Poulet rôti et légumes du soleil",
    img: "https://lille.compagnonsdessaisons.com/wp-content/uploads/2023/10/poulet-plat-pommes-terre-orange.jpg",
    tags: [2],
    category: 2, // Lunch
    description: "Poulet fermier rôti accompagné de légumes grillés.",
    date_updated: 1678457400000, // 2023-03-10T13:30:00Z
    price: 1499
  },
  // Déjeuner (Lunch) - 3e plat
  {
    id: 14,
    label: "Salade César au poulet",
    img: "https://www.recettesetcabas.com/data/recettes/179-1-fiche@67EA55AD-salade-caesar-au-poulet-croustillant-pommes-de-terre-sautees.webp",
    tags: [2],
    category: 2, // Lunch
    description: "Salade fraîche avec poulet rôti, croûtons et parmesan.",
    date_updated: 1678786400000, // 2023-03-14T12:00:00Z
    price: 1299
  },
  // Goûter (Snack) - 2e plat
  {
    id: 11,
    label: "Muffin aux myrtilles",
    img: "https://img.cuisineaz.com/1200x675/2023/12/15/i196925-muffins-a-la-myrtille.jpg",
    tags: [3],
    category: 3, // Snack
    description: "Muffin moelleux garni de myrtilles fraîches.",
    date_updated: 1678543800000, // 2023-03-11T16:00:00Z
    price: 499
  },
  // Goûter (Snack) - 3e plat
  {
    id: 15,
    label: "Cookies aux pépites de chocolat",
    img: "https://fr.rc-cdn.community.thermomix.com/recipeimage/dkf9c40p-9850e-860759-cfcd2-v49usz4k/44ca7131-0492-4ed2-a053-31332710649c/main/cookies-aux-pepites-de-chocolat.jpg",
    tags: [3],
    category: 3, // Snack
    description: "Cookies moelleux aux pépites de chocolat noir.",
    date_updated: 1678872800000, // 2023-03-15T16:00:00Z
    price: 399
  },
  // Dîner (Dinner) - 2e plat
  {
    id: 12,
    label: "Saumon grillé et quinoa",
    img: "https://images.ricardocuisine.com/services/recipes/4x3/g-ricardo-hiver2-202031139-cmyk-mc.jpg",
    tags: [4],
    category: 4, // Dinner
    description: "Filet de saumon grillé servi avec du quinoa et des légumes verts.",
    date_updated: 1678630200000, // 2023-03-12T19:00:00Z
    price: 1799
  },
  // Dîner (Dinner) - 3e plat
  {
    id: 16,
    label: "Curry de légumes et riz basmati",
    img: "https://kissmychef.com/wp-content/uploads/2023/03/curry.png",
    tags: [4],
    category: 4, // Dinner
    description: "Curry doux de légumes accompagné de riz basmati parfumé.",
    date_updated: 1678959200000, // 2023-03-16T19:30:00Z
    price: 1399
  },
];
export const articlesSupplement = [
  { 
    id: 9,
    label: "Fries",
    img: "https://cdn.britannica.com/34/206334-050-7637EB66/French-fries.jpg",
    tags: [4],
    description: "Crispy golden fries, perfect as a side or snack.",
    date_updated: 1678368900000, // Timestamp for "2023-03-09T13:15:00Z"
    price: 399
  },
  { 
    id: 10,
    label: "Garlic Bread",
    img: "https://www.spicebangla.com/wp-content/uploads/2020/12/Garlic-Bread.webp",
    tags: [1],
    description: "Warm and buttery garlic bread, a perfect accompaniment.",
    date_updated: 1678472400000, // Timestamp for "2023-03-10T17:40:00Z"
    price: 499
  },
  { 
    id: 11,
    label: "Coleslaw",
    img: "https://www.allrecipes.com/thmb/pkvntUo7EjqVoI30UknFWy4jwL8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-222218-nanas-southern-coleslaw-VAT-4x3-d44d1396eb3e47e5b5a9db5a33213c92.jpg",
    tags: [1, 2],
    description: "A creamy and tangy coleslaw, perfect as a side dish.",
    date_updated: 1678525500000, // Timestamp for "2023-03-11T08:25:00Z"
    price: 549
  },
  { 
    id: 12,
    label: "Mashed Potatoes",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cEEe-7FUem_O54y7dAQzx1zBTgoepmohZQ&s",
    tags: [1],
    description: "Creamy mashed potatoes, a classic comfort food.",
    date_updated: 1678647600000, // Timestamp for "2023-03-12T19:00:00Z"
    price: 799
  },
  { 
    id: 13,
    label: "Rice",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Ekd569S5P5FvhDaXui2LiA96YF07CWvtoQ&s",
    tags: [1, 3],
    description: "Fluffy white rice, a versatile side dish.",
    date_updated: 1678704300000, // Timestamp for "2023-03-13T10:45:00Z"
    price: 299
  },
];
export const articlesBoisson = [
  { 
    id: 14,
    label: "Orange Juice",
    img: "https://thumbs.dreamstime.com/b/transparent-orange-juice-plastic-bottle-transparent-orange-juice-plastic-bottle-334739106.jpg",
    tags: [1, 2, 3, 4],
    description: "Freshly squeezed orange juice, full of vitamin C.",
    date_updated: 1678788600000, // Timestamp for "2023-03-14T07:30:00Z"
    price: 349
  },
  { 
    id: 15,
    label: "Apple Juice",
    img: "https://images.sks-bottle.com/images/AppleJuiceBottles_2021_UPDATEnewLRG.webp",
    tags: [1, 2, 3, 4],
    description: "Sweet and refreshing apple juice, perfect for any meal.",
    date_updated: 1678863600000, // Timestamp for "2023-03-15T09:20:00Z"
    price: 399
  },
  { 
    id: 16,
    label: "Grape Juice",
    img: "https://t3.ftcdn.net/jpg/03/31/57/10/360_F_331571006_Sv6xzovHgADbtCjwMooiY7VgiX6zxjMF.jpg",
    tags: [1, 2, 3, 4],
    description: "Rich and flavorful grape juice, a delightful drink.",
    date_updated: 1678926600000, // Timestamp for "2023-03-16T11:10:00Z"
    price: 449
  },
];

export const tags = [
  { id: null, label: "Tous les Tags", description: "Plats" },
  { id: 1, label: "Végétarien", description: "Plats sans viande ni poisson" },
  { id: 2, label: "Vegan", description: "Plats sans produits animaux" },
  { id: 3, label: "Sans Gluten", description: "Plats sans gluten" },
  { id: 4, label: "Viande", description: "Plats avec viande" },
];

export const types = [
  { id: null, label: "Tous les Types" },
  { id: 1, label: "Plat Principal" }, // dish
  { id: 2, label: "Accompagnement" }, // side
  { id: 3, label: "Boisson" }, // drink
  { id: 4, label: "Supplément" }, // supplement
  { id: 5, label: "Dessert" }, // dessert
];

export const categories = [
  { id: null, label: "Toutes les Catégories" },
  { id: 1, label: "Petit Déjeuner", hour: "07:00" }, // breakfast
  { id: 2, label: "Déjeuner", hour: "12:00" },
  { id: 3, label: "Goûter", hour: "16:00" },
  { id: 4, label: "Dîner", hour: "19:00" },
];
export const listStep = [
  { id: 0, label: "Panier", icon: "check", path: 'cart' }, 
  { id: 1, label: "Plannification", icon: "calendar", path: 'cart/planning' }, 
  { id: 2, label: "Paiement", icon: "credit-card", path: 'cart/checkout' }, 
];
export const methods = [
  { id: 'mtn', label: 'MTN Mobile Money' },
  { id: 'orange', label: 'Orange Money' },
  { id: 'flooz', label: 'Moov Flooz' },
  { id: 'card', label: 'Carte de crédit' },
];
export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const meta: Meta = {total: 0, page: 1, pageCount: 1, limit: 10};

// Constants
export const SHIPPING_RATE = 500.0;
export const TAX = 20.0;