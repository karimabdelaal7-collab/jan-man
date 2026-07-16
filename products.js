// ============================================================
// كيف تضيف منتج جديد أو تحذف منتج (بدون أي خبرة برمجة):
//
// 1. عشان تضيف منتج جديد: انسخ كتلة منتج كاملة من { لحد }, والصقها
//    قبل الـ ] اللي في آخر الملف، وغيّر فيها:
//    - id: رقم فريد (أكبر رقم موجود + 1)
//    - name: اسم المنتج
//    - category: لازم يكون بالظبط واحد من: "Oversized", "Polo", "Linen"
//      (لأن أسماء الصفحات مرتبطة بيه: oversized.html / polo.html / linen.html)
//    - sizeGuide: رابط صورة جدول المقاس (لو مفيش، سيبه فاضي "")
//    - price / description / sizes / colors: عدّلها زي ما تحب
//
// 2. عشان تحذف منتج: امسح الكتلة بتاعته كاملة من { لحد } اللي بعده
//    (بما فيها الفاصلة , اللي بعد الكتلة لو كانت آخر واحدة في القسم)
//
// 3. لازم كل صورة تكون مرفوعة فعلاً في فولدر images/ بنفس المسار
//    اللي بتكتبه هنا، وإلا الصورة هتظهر مكسورة.
//
// 4. عشان تضيف قسم جديد بالكامل (غير Oversized/Polo/Linen):
//    انسخ ملف oversized.html كامل، سمّيه باسم القسم الجديد (مثلاً hoodies.html)،
//    غيّر العنوان والكروت جواه، وضيف رابط ليه في الـ nav في كل الصفحات.
//    كمان ضيف منتجاته هنا بنفس الطريقة فوق مع category مطابق لاسم الملف.
// ============================================================

const products = [
  {
    id: 1,
    code: "32603",

    name: "Oversized Horse",
    category: "Oversized",
    sizeGuide: "images/size-guides/size-tshirt.jpg",

    price: 565,

    description: "Premium oversized t-shirt made from 100% Cotton.",

    image: "images/oversized/h/b-wh-32603.jpg",

    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],

    colors: [
      {
        name: "Black",
        image: "images/oversized/h/b-wh-32603.jpg"
      },
      {
        name: "White",
        image: "images/oversized/h/w-bh-32603.jpg"
      },
      {
        name: "Beige",
        image: "images/oversized/h/bj-bh-32603.jpg"
      },
      {
        name: "Burgundy",
        image: "images/oversized/h/br-bh-32603.jpg"
      },
      {
        name: "Dark Gray",
        image: "images/oversized/h/dg-bh-32603.jpg"
      },
      {
        name: "Gray",
        image: "images/oversized/h/g-bw-32603.jpg"
      },
      {
        name: "Blue",
        image: "images/oversized/h/bl-wh-32603.jpg"
      }
    ]
  },

  {
    id: 2,
    code: "32603",

    name: "Oversized Line",
    category: "Oversized",
    sizeGuide: "images/size-guides/size-tshirt.jpg",

    price: 565,

    description: "Premium oversized t-shirt made from 100% Cotton.",

    image: "images/oversized/li/li-w-32603.jpg",

    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],

    colors: [
      {
        name: "Black",
        image: "images/oversized/li/li-b-32603.jpg"
      },
      {
        name: "White",
        image: "images/oversized/li/li-w-32603.jpg"
      },
      {
        name: "Beige",
        image: "images/oversized/li/li-bj-32603.jpg"
      },
      {
        name: "Burgundy",
        image: "images/oversized/li/li-br-32603.jpg"
      },
      {
        name: "Dark Gray",
        image: "images/oversized/li/li-dg-32603.jpg"
      },
      {
        name: "Gray",
        image: "images/oversized/li/li-g-32603.jpg"
      },
      {
        name: "Blue",
        image: "images/oversized/li/li-bl-32603.jpg"
      }
    ]
  },

  {
    id: 3,
    code: "32603",

    name: "Oversized Milano",
    category: "Oversized",
    sizeGuide: "images/size-guides/size-tshirt.jpg",

    price: 565,

    description: "Premium oversized t-shirt made from 100% Cotton.",

    image: "images/oversized/mi/bj-mi-32603.jpg",

    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],

    colors: [
      {
        name: "Black",
        image: "images/oversized/mi/b-mi-32603.jpg"
      },
      {
        name: "White",
        image: "images/oversized/mi/w-mi-32603.jpg"
      },
      {
        name: "Beige",
        image: "images/oversized/mi/bj-mi-32603.jpg"
      },
      {
        name: "Burgundy",
        image: "images/oversized/mi/br-mi-32603.jpg"
      }
    ]
  },

  {
    id: 4,
    code: "32603",

    name: "Oversized Warrior",
    category: "Oversized",
    sizeGuide: "images/size-guides/size-tshirt.jpg",

    price: 565,

    description: "Premium oversized t-shirt made from 100% Cotton.",

    image: "images/oversized/wr/br-bwr-32603.jpg",

    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],

    colors: [
      {
        name: "Black",
        image: "images/oversized/wr/b-wwr-32603.jpg"
      },
      {
        name: "White",
        image: "images/oversized/wr/w-bwr-32603.jpg"
      },
      {
        name: "Beige",
        image: "images/oversized/wr/bj-wwr-32603.jpg"
      },
      {
        name: "Burgundy",
        image: "images/oversized/wr/br-bwr-32603.jpg"
      },
      {
        name: "Dark Gray",
        image: "images/oversized/wr/dg-bwr-32603.jpg"
      },
      {
        name: "Gray",
        image: "images/oversized/wr/g-bwr-32603.jpg"
      },
      {
        name: "Blue",
        image: "images/oversized/wr/bl-wwr-32603.jpg"
      }
      
    ]
    },

  {
    id: 5,
    code: "32622",
    name: "Polo Striped",
    category: "Polo",
    sizeGuide: "images/size-guides/size-polo.jpg",
    price: 425,
    description: "Premium cotton polo shirt.",

    image: "images/polo/32622/st-lb-32622.jpg",

    sizes: ["S","M","L","XL","2XL"],

    colors: [
        { name: "Black", image: "images/polo/32622/st-b-32622.jpg" },
        { name: "Light Blue", image: "images/polo/32622/st-lb-32622.jpg" },
        { name: "Navy", image: "images/polo/32622/st-nv-32622.jpg" }
    ]
},

{
    id: 6,
    code: "32623",
    name: "Polo HB",
    category: "Polo",
    sizeGuide: "images/size-guides/size-polo.jpg",
    price: 490,
    description: "Premium cotton polo shirt.",

    image: "images/polo/32623/hb-mg-32623.jpg",

    sizes: ["S","M","L","XL","2XL"],

    colors: [
        { name: "Black", image: "images/polo/32623/hb-b-32623.jpg" },
        { name: "Burgundy", image: "images/polo/32623/hb-br-32623.jpg" },
        { name: "Light Blue", image: "images/polo/32623/hb-lb-32623.jpg" },
        { name: "Light Gray", image: "images/polo/32623/hb-lg-32623.jpg" },
        { name: "Mint", image: "images/polo/32623/hb-mg-32623.jpg" },
        { name: "Navy", image: "images/polo/32623/hb-nv-32623.jpg" },
        { name: "Olive", image: "images/polo/32623/hb-ol-32623.jpg" },
        { name: "White", image: "images/polo/32623/hb-w-32623.jpg" }
    ]
},

{
    id: 7,
    code: "32624",
    name: "Polo Zip",
    category: "Polo",
    sizeGuide: "images/size-guides/size-polo.jpg",
    price: 550,
    description: "Premium cotton zip polo shirt.",

    image: "images/polo/32624/zip-ol-32624.jpg",

    sizes: ["S","M","L","XL","2XL"],

    colors: [
        { name: "Black", image: "images/polo/32624/zip-b-32624.jpg" },
        { name: "Burgundy", image: "images/polo/32624/zip-br-32624.jpg" },
        { name: "Dark Gray", image: "images/polo/32624/zip-dg-32624.jpg" },
        { name: "Light Blue", image: "images/polo/32624/zip-lb-32624.jpg" },
        { name: "Mint", image: "images/polo/32624/zip-mg-32624.jpg" },
        { name: "Olive", image: "images/polo/32624/zip-ol-32624.jpg" },
        { name: "White", image: "images/polo/32624/zip-w-32624.jpg" }
    ]
},

{
    id: 8,
    code: "32625",
    name: "Polo Jacquard",
    category: "Polo",
    sizeGuide: "images/size-guides/size-polo.jpg",
    price: 590,
    description: "Premium jacquard polo shirt.",

    image: "images/polo/32625/jt-br-32625.jpg",

    sizes: ["S","M","L","XL","2XL"],

    colors: [
        { name: "Black", image: "images/polo/32625/jt-b-32625.jpg" },
        { name: "Burgundy", image: "images/polo/32625/jt-br-32625.jpg" },
        { name: "Dark Green", image: "images/polo/32625/jt-dgn-32625.jpg" }
    ]
    
}
,

    {
    id: 9,
    code: "32651",
    name: "Spanish Linen Pants",
    category: "Linen",
    sizeGuide: "images/size-guides/size-pants.jpg",
    price: 499,
    description: "Premium Spanish Linen Pants.",
    image: "images/linen/lp/lp-w-32651.jpg",
    sizes: ["M","L","XL","2XL","3XL"],
    colors: [
        { name:"Black", image:"images/linen/lp/lp-b-32651.jpg" },
        { name:"Beige", image:"images/linen/lp/lp-bj-32651.jpg" },
        { name:"Light Blue", image:"images/linen/lp/lp-lb-32651.jpg" },
        { name:"White", image:"images/linen/lp/lp-w-32651.jpg" }
    ]
},

{
    id: 10,
    code: "32632",
    name: "Spanish Linen Shirt",
    category: "Linen",
    sizeGuide: "images/size-guides/size-shirt.jpg",
    price: 499,
    description: "Premium Spanish Linen Short Sleeve Shirt.",
    image: "images/linen/ls/ls-b-32632.jpg",
    sizes: ["M","L","XL","2XL","3XL"],
    colors: [
        { name:"Black", image:"images/linen/ls/ls-b-32632.jpg" },
        { name:"Beige", image:"images/linen/ls/ls-bj-32632.jpg" },
        { name:"Light Blue", image:"images/linen/ls/ls-lb-32632.jpg" },
        { name:"White", image:"images/linen/ls/ls-w-32632.jpg" }
    ]
},

{
    id: 11,
    code: "32641",
    name: "Spanish Linen Shorts",
    category: "Linen",
    sizeGuide: "images/size-guides/size-shorts.jpg",
    price: 425,
    description: "Premium Spanish Linen Shorts.",
    image: "images/linen/lsh/lsh-lb-32641.jpg",
    sizes: ["M","L","XL","2XL","3XL"],
    colors: [
        { name:"Black", image:"images/linen/lsh/lsh-b-32641.jpg" },
        { name:"Beige", image:"images/linen/lsh/lsh-bj-32641.jpg" },
        { name:"Light Blue", image:"images/linen/lsh/lsh-lb-32641.jpg" },
        { name:"White", image:"images/linen/lsh/lsh-w-32641.jpg" }
    ]
}
];