import { PrismaClient } from "@prisma/client";
import connectionsSeed from "./connectionsSeed";

export const rawArticles = [
  { id: 1, label: "Pasta", img: "https://static01.nyt.com/images/2025/01/17/multimedia/CR-Lemony-Hummus-Pasta-wtkj/CR-Lemony-Hummus-Pasta-wtkj-threeByTwoMediumAt2X.jpg", tags: [1, 3], category: 2, type: 1, description: "A delicious pasta dish with a creamy sauce and fresh herbs.", price: 1299 },
  { id: 2, label: "Salad", img: "https://www.eatingwell.com/thmb/S2NGMEcgm11dtdBJ6Hwprwq-nVk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eat-the-rainbow-chopped-salad-with-basil-mozzarella-beauty-185-278133-4000x2700-56879ac756cd46ea97944768847b7ea5.jpg", tags: [2, 3], category: 1, type: 1, description: "A fresh and healthy salad with a variety of colorful vegetables.", price: 849 },
  { id: 3, label: "Pizza", img: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg", tags: [1, 4], category: 2, type: 1, description: "A classic cheese pizza with a crispy crust and rich tomato sauce.", price: 1099 },
  { id: 4, label: "Burger", img: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg", tags: [1, 4, 5, 6], category: 4, type: 1, description: "A juicy burger with melted cheese and fresh toppings.", price: 999 },
  { id: 5, label: "Sushi", img: "https://i0.wp.com/christinapotvin.com/wp-content/uploads/2021/12/miniature-youtube-2.jpg?resize=1080%2C675&ssl=1", tags: [3, 4, 5, 6], category: 3, type: 1, description: "A selection of fresh sushi rolls with a variety of fillings.", price: 1599 },
  { id: 6, label: "Soup", img: "https://ichef.bbc.co.uk/ace/standard/1600/food/recipes/goodvegetablesoup_73412_16x9.jpg.webp", tags: [2, 3, 4, 5, 6], category: 1, type: 1, description: "A warm and comforting vegetable soup, perfect for any time of day.", price: 699 },
  { id: 7, label: "Steaks marinés à la sauce soja et aux herbes", img: "https://www.kikkoman.fr/fileadmin/_processed_/c/5/csm_1111-recipe-page-Herby-Soy-Marinated-Steaks_desktop_c51d610179.webp", tags: [4, 5, 6, 7], category: 4, type: 1, description: "A perfectly cooked steak, seasoned to perfection.", price: 1999 },
  { id: 8, label: "Tacos", img: "https://brandsitesplatform-res.cloudinary.com/image/fetch/w_auto:100,c_scale,q_auto:eco,f_auto,fl_lossy,dpr_auto,e_sharpen:85/https://assets.brandplatform.generalmills.com%2F-%2Fmedia%2Fproject%2Fgmi%2Foldelpaso%2Foldelpaso-ch%2Foepp%2Frecipes-2017%2Fchicken-ranch-tacos-16-9.jpg%3Frev%3D8c8abc95c25f4fb29021e2f3394b8223", tags: [1, 3, 4, 5, 6, 7], category: 3, type: 1, description: "Delicious tacos filled with seasoned meat and fresh toppings.", price: 1149 },
  { id: 9, label: "Omelette aux fines herbes", img: "https://fr.frije.com/content/recipes/139103/800-1.jpg", tags: [1, 2, 3, 4, 5, 6, 7], category: 1, type: 1, description: "Omelette moelleuse aux œufs frais et fines herbes.", price: 799 },
  { id: 10, label: "Granola maison et yaourt", img: "https://cache.marieclaire.fr/data/photo/w1000_ci/4z/granola-maison-yaourt-et-bananes.jpg", tags: [1, 2, 3, 4, 5, 6, 7], category: 1, type: 1, description: "Granola croustillant servi avec du yaourt nature et des fruits frais.", price: 599 },
  { id: 11, label: "Poulet rôti et légumes du soleil", img: "https://lille.compagnonsdessaisons.com/wp-content/uploads/2023/10/poulet-plat-pommes-terre-orange.jpg", tags: [2, 3, 4, 5, 6, 7, 8], category: 2, type: 1, description: "Poulet fermier rôti accompagné de légumes grillés.", price: 1499 },
  { id: 12, label: "Salade César au poulet", img: "https://www.recettesetcabas.com/data/recettes/179-1-fiche@67EA55AD-salade-caesar-au-poulet-croustillant-pommes-de-terre-sautees.webp", tags: [2, 3, 4, 5, 6, 7, 8], category: 2, type: 1, description: "Salade fraîche avec poulet rôti, croûtons et parmesan.", price: 1299 },
  { id: 13, label: "Muffin aux myrtilles", img: "https://img.cuisineaz.com/1200x675/2023/12/15/i196925-muffins-a-la-myrtille.jpg", tags: [3, 4, 5, 6, 7, 8, 9], category: 3, type: 1, description: "Muffin moelleux garni de myrtilles fraîches.", price: 499 },
  { id: 14, label: "Saumon grillé et quinoa", img: "https://images.ricardocuisine.com/services/recipes/4x3/g-ricardo-hiver2-202031139-cmyk-mc.jpg", tags: [4, 5, 6, 7, 8, 9, 10], category: 4, type: 1, description: "Filet de saumon grillé servi avec du quinoa et des légumes verts.", price: 1799 },
  { id: 15, label: "Cookies aux pépites de chocolat", img: "https://fr.rc-cdn.community.thermomix.com/recipeimage/dkf9c40p-9850e-860759-cfcd2-v49usz4k/44ca7131-0492-4ed2-a053-31332710649c/main/cookies-aux-pepites-de-chocolat.jpg", tags: [3, 4, 5, 6, 7, 8, 9], category: 3, type: 1, description: "Cookies moelleux aux pépites de chocolat noir.", price: 399 },
  { id: 16, label: "Curry de légumes et riz basmati", img: "https://kissmychef.com/wp-content/uploads/2023/03/curry.png", tags: [4, 5, 6, 7, 8, 9, 10, 11], category: 4, type: 1, description: "Curry doux de légumes accompagné de riz basmati parfumé.", price: 1399 },
  { id: 17, label: "Djèwô (Amiwô)", price: 1200, tags: [8, 9, 10, 11], description: "Pâte de maïs rouge cuite à l\'huile de palme, accompagnée souvent de sauce tomate et protéines.", img: "https://monkadi.com/cdn/shop/products/Amiwo_850x560.jpg?v=1669849161", type: 1, category: 2 },
  { id: 18, label: "Atassi (Watché)", price: 1300, tags: [8, 9, 10, 11], description: "Mélange de riz et haricots, servi avec sauce tomate, œuf ou viande.", img: "https://grandmarche.xyz/cdn/shop/products/IMG-20220302-WA0013_1_800x.jpg?v=1650391190", type: 1, category: 2 },
  { id: 19, label: "Djongoli", price: 1500, tags: [8, 9, 10, 11], description: "Purée de haricots et farine de maïs cuite à l\'huile de palme.", img: "https://i.ytimg.com/vi/8uSBWExgSSk/sddefault.jpg", type: 1, category: 2 },
  { id: 20, label: "Mantindjan", price: 1400, tags: [8, 9, 10, 11], description: "Sauce riche en légumes et viandes, servie avec pâte de maïs.", img: "https://i0.wp.com/www.lesdelicesdejessy.com/wp-content/uploads/2020/09/gboma-7-scaled.jpg?fit=710%2C474&ssl=1", type: 1, category: 2 },
  { id: 21, label: "Kpètè", price: 1100, tags: [8, 9, 10, 11], description: "Sauce au sang de mouton ou de porc et farine de maïs, servie avec pâte.", img: "https://recettes.le-coyote.com/wp-content/uploads/2018/09/ragout-mouton.jpg", type: 1, category: 2 },
  { id: 22, label: "Fufu d\'igname", price: 1000, tags: [8, 9, 10, 11], description: "Pâte d\'igname pilée, accompagnée de sauce arachide ou légumes.", img: "https://i0.wp.com/www.fasoamazone.net/wp-content/uploads/2024/09/IMG-20240901-WA0007.jpg?fit=1080%2C810&ssl=1", type: 1, category: 2 },
  { id: 23, label: "Akassa", price:900,tags:[8,9,10, 11],description:"Pâte de maïs fermentée, servie avec sauce gombo ou arachide.",img:"https://pbs.twimg.com/media/EXXZLYZU4AAqh78.jpg",type:1,category:2},
  { id: 24, label: "Come (pâte de maïs)",price:800,tags:[8,9,10, 11],description:"Pâte neutre de maïs, servie avec différentes sauces.",img:"https://i.pinimg.com/736x/13/38/bc/1338bc217489c666beaed65c3b4333ed.jpg",type:1,category:2},
  
]
export const rawArticles2 = [

  { id: 1,label: "Aloko", price:500,tags:[8,9,10, 11],description:"Bananes plantains frites, servies chaudes en accompagnement.",img:"https://africa-cuisine.com/wp-content/uploads/2022/01/alloco-bananes-plantains-frites-recette-senegalaise.jpeg",type:2,category:5},
  { id: 2,label: "Yovo Doko", price:300,tags:[8,9,10, 11],description:"Beignets sucrés béninois, populaires au petit-déjeuner ou goûter.",img:"https://i0.wp.com/www.lesdelicesdejessy.com/wp-content/uploads/2020/05/Botocoin-Final_-scaled.jpg?fit=2000%2C1333&ssl=1",type:2,category:5},
  { id: 3,label: "Kuli Kuli", price:400,tags:[8,9,10, 11],description:"Snack croustillant à base d\'arachides grillées et épicées.",img:"https://i.ytimg.com/vi/v5YG18c0qVI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB8AqB2EvV9ZZ-VfNp6mvVZluuDtg",type:2,category:5},
  { id: 4,label: "Akkara (Ata)", price:350,tags:[8,9,10, 11],description:"Beignets salés de haricots blancs.",img:"https://www.cameroun24.net/images/news/beignets_koki_640.jpg",type:2,category:5},
  { id: 5,label: "Ablo", price:450,tags:[8,9,10, 11],description:"Galettes de riz vapeur, légèrement sucrées.",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ISeRL7IiLzfWWdom_9pyxm0_mF1_tDxEmA&s",type:2,category:5},
  { id: 6,label: "Tévi (igname frit)", price:550,tags:[8,9,11],description:"Frites d\'igname, souvent accompagnées de piment.",img:"https://img.freepik.com/photos-gratuite/delicieuse-pomme-terre-frite-assiette-bois-sauce-trempee-concept-restauration-rapide-traditionnelle_1150-9057.jpg?semt=ais_hybrid&w=740",type:2,category:5},
  { id: 7,label: "Akpan", price:400,tags:[8,9,10, 11],description:"Boules de maïs fermenté, dessert ou en-cas.",img:"https://lanouvelletribune.info/wp-content/uploads/2020/01/akpan.jpg",type:2,category:5},
  { id: 8,label: "Garri (Èba)",price:600,tags:[8,9,10, 11],description:"Pâte de manioc, consommée avec sauce.",img:"https://afrokitchennl.ca/wp-content/uploads/2021/02/EBA-1.jpg",type:2,category:5},
  { id: 9,label: "Moyo",price:700,tags:[8,9,10, 11],description:"Sauce froide à base de tomates, oignons et piments.",img:"https://pbs.twimg.com/media/EXXZLYZU4AAqh78.jpg",type:2,category:5},
  { id: 10,label: "Wagasi",price:800,tags:[8,9,10, 11],description:"Fromage local à croûte rouge, souvent frit.",img:"https://ms-tradingfoods.com/wp-content/uploads/2021/08/B779C5F7-F63D-4B7B-9FB5-EA1854CDD4BE-925x540-1.jpeg",type:2,category:5},
  { id: 11,label: "Fries",img: "https://cdn.britannica.com/34/206334-050-7637EB66/French-fries.jpg",tags: [4, 5, 6, 7, 8, 9, 10, 11],category: 5,type: 2,description: "Crispy golden fries, perfect as a side or snack.",price: 399},
  { id: 12,label: "Garlic Bread",img: "https://www.spicebangla.com/wp-content/uploads/2020/12/Garlic-Bread.webp",tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],category: 5,type: 2,description: "Warm and buttery garlic bread, a perfect accompaniment.",price: 499},
  { id: 13,label: "Coleslaw",img: "https://www.allrecipes.com/thmb/pkvntUo7EjqVoI30UknFWy4jwL8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-222218-nanas-southern-coleslaw-VAT-4x3-d44d1396eb3e47e5b5a9db5a33213c92.jpg",tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],category: 5,type: 2,description: "A creamy and tangy coleslaw, perfect as a side dish.",price: 549},
  { id: 14,label: "Mashed Potatoes",img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cEEe-7FUem_O54y7dAQzx1zBTgoepmohZQ&s",tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],category: 5,type: 2,description: "Creamy mashed potatoes, a classic comfort food.",price: 799},
  { id: 15,label: "Rice",img: "https://encrypted-tbn0.gstatic.com/images?q=ttbn:ANd9GcR6Ekd569S5P5FvhDaXui2LiA96YF07CWvtoQ&s",tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],category: 5,type: 2,description: "Fluffy white rice, a versatile side dish.",price: 799},
  { id: 16,label: "Orange Juice",img: "https://thumbs.dreamstime.com/b/transparent-orange-juice-plastic-bottle-transparent-orange-juice-plastic-bottle-334739106.jpg",tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],category: 5,type: 3,description: "Freshly squeezed orange juice, full of vitamin C.",price: 349},
  { id: 17,label: "Apple Juice",img: "https://images.sks-bottle.com/images/AppleJuiceBottles_2021_UPDATEnewLRG.webp",tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],category: 5,type: 3,description: "Sweet and refreshing apple juice, perfect for any meal.",price: 399},
  { id: 18,label: "Grape Juice",img: "https://t3.ftcdn.net/jpg/03/31/57/10/360_F_331571006_Sv6xzovHgADbtCjwMooiY7VgiX6zxjMF.jpg",tags: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],category: 5,type: 3,description: "Sweet and refreshing apple juice, perfect for any meal.",price: 399}
];
const articlesSeed = async (prisma: PrismaClient, articles: {id: number, label: string, img: string, tags: number[], category: number, type: number, description: string, price: number}[]) => {
  await Promise.all(
    articles.map(async (article) => {
      const createdArticle = await prisma.articles.create({
        data: {
          name: article.label || "",
          image: article.img || "",
          description: article.description || "",
          price: article.price || 0,
          type: {
            connect: {
              id: article.type,
            },
          },
          category: {
            connect: {
              id: article.category,
            },
          },
        },
      });

      // Crée les relations dans articleTags
      await connectionsSeed(prisma, createdArticle.id, article.tags);

      console.log(`✅ Article [ID: ${createdArticle.id}] créé avec succès.`);
    })
  );

  console.log("✅ Articles principaux créés.");
}

export default articlesSeed;