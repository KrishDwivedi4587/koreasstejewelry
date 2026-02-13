import Product from '../models/Product.js';

export const productsData = [
  {
    name: "Ethereal Pearl Drop",
    category: "Earrings",
    price: 3790,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
    description: "Luminous freshwater pearls suspended from delicate gold vermeil chains. These drop earrings capture the essence of fluidity and grace, moving gently with every turn. Perfect for adding a touch of sophisticated romance to your evening attire.",
    stock: 15
  },
  {
    name: "Gilded Chain Link",
    category: "Necklaces",
    price: 7490,
    image: "https://images.unsplash.com/photo-1599643477877-537ef527848f?q=80&w=2070&auto=format&fit=crop",
    description: "A bold statement of modern luxury. This chunky chain link necklace is plated in 18k gold, featuring a high-polish finish that catches the light from every angle. Its substantial weight feels luxurious, yet it remains comfortable for all-day wear.",
    stock: 8
  },
  {
    name: "Obsidian Signet Set",
    category: "Full Sets",
    price: 2950,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
    description: "A contemporary take on the classic signet, this set features a striking black obsidian stone set in recycled sterling silver. The sleek, minimalist profile makes it a versatile addition to any jewelry rotation, offering a touch of noir elegance.",
    stock: 12
  },
  {
    name: "Celestial Pendant",
    category: "Necklaces",
    price: 9990,
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop",
    description: "Inspired by the night sky, this pendant features a scattering of cubic zirconia crystals embedded in a gold-plated disc. The textured surface mimics the moon's cratered beauty, creating a piece that is both cosmic and grounded.",
    stock: 6
  },
  {
    name: "Rose Quartz Studs",
    category: "Earrings",
    price: 2350,
    image: "https://images.unsplash.com/photo-1635767798638-3e2523926371?q=80&w=1000&auto=format&fit=crop",
    description: "Soft pink rose quartz stones are bezel-set in rose gold to create these tender stud earrings. Known as the stone of unconditional love, they bring a gentle warmth to your complexion and a subtle pop of color to your daily look.",
    stock: 20
  },
  {
    name: "Minimalist Gold Set",
    category: "Full Sets",
    price: 4590,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
    description: "Effortless elegance defined. This set of three stacking rings ranges from a simple band to a twisted rope texture, all dipped in 18k gold. Wear them stacked for impact or spread across multiple fingers for a curated handscape.",
    stock: 14
  },
  {
    name: "Vintage Filigree Cuff",
    category: "Bracelets",
    price: 5450,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop",
    description: "Intricate lace-like patterns define this vintage-inspired cuff. Crafted with precision, the filigree work allows skin to peek through, creating a tattoo-like effect of gold on the wrist. Adjustable sizing ensures a perfect fit.",
    stock: 10
  },
  {
    name: "Luna Crescent Necklace",
    category: "Necklaces",
    price: 4200,
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?q=80&w=1000&auto=format&fit=crop",
    description: "A delicate crescent moon pendant suspended from a fine 14k gold chain. This piece celebrates the ethereal beauty of the lunar cycle, serving as a subtle reminder of constant change and renewal.",
    stock: 9
  },
  {
    name: "Sapphire Halo Hoops",
    category: "Earrings",
    price: 6800,
    image: "https://images.unsplash.com/photo-1630019019621-59754f44b1b8?q=80&w=1000&auto=format&fit=crop",
    description: "Deep blue lab-grown sapphires surrounded by a halo of shimmering crystals. These architectural hoops provide a sophisticated silhouette that transitions perfectly from the boardroom to a candlelit dinner.",
    stock: 7
  },
  {
    name: "Artisanal Bangle Set",
    category: "Bracelets",
    price: 3900,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
    description: "A set of five hand-hammered bangles in varying widths. The irregular texture of the metal reflects light in a soft, organic way, embodying the beauty of perfectly imperfect craftsmanship.",
    stock: 11
  },
  {
    name: "Regal Emerald Set",
    category: "Full Sets",
    price: 12500,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop",
    description: "The ultimate expression of Koreasste luxury. This set includes a teardrop emerald pendant and matching stud earrings, all encased in intricate gold filigree. A heritage collection piece designed to be passed down through generations.",
    stock: 4
  },
  {
    name: "Geometric Gold Climbers",
    category: "Earrings",
    price: 2850,
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1000&auto=format&fit=crop",
    description: "Modern minimalism at its finest. These ear climbers feature a series of geometric bars that follow the natural curve of the lobe, creating an avant-garde look without the need for multiple piercings.",
    stock: 16
  },
  {
    name: "Diamond-Cut Curb Chain",
    category: "Necklaces",
    price: 8200,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop",
    description: "A precision-engineered curb chain with diamond-cut facets that shimmer with unparalleled brilliance. This necklace is the perfect foundation for stacking or a powerful standalone piece for a minimalist look.",
    stock: 5
  },
  {
    name: "Velvet Ribbon Choker",
    category: "Necklaces",
    price: 1950,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop",
    description: "Soft black velvet meets a central gilded medallion. This choker brings a touch of 19th-century romanticism to modern fashion, providing a striking contrast between the matte fabric and polished metal.",
    stock: 18
  },
  {
    name: "Crystal Tennis Bracelet",
    category: "Bracelets",
    price: 5200,
    image: "https://images.unsplash.com/photo-1596944210900-34d21078b1ce?q=80&w=1000&auto=format&fit=crop",
    description: "A classic reborn. Dozens of precision-cut crystals are individually set in a flexible silver-plated chain. This tennis bracelet is designed to catch the light with every flick of the wrist, adding instant glamour.",
    stock: 8
  },
  {
    name: "Mother of Pearl Duo",
    category: "Full Sets",
    price: 4800,
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=1000&auto=format&fit=crop",
    description: "Iridescent mother of pearl slices are framed in hammered rose gold. This set includes a delicate pendant and matching stud earrings, celebrating the natural variations and organic beauty of the sea.",
    stock: 13
  },
  {
    name: "Silver Huggie Set",
    category: "Earrings",
    price: 2450,
    image: "https://images.unsplash.com/photo-1590548784585-645d8b75e8b8?q=80&w=1000&auto=format&fit=crop",
    description: "Three pairs of varying size huggie hoops in polished sterling silver. Designed for the multi-pierced ear, this set allows you to curate your own unique ear stack with ease and versatility.",
    stock: 17
  },
  {
    name: "Malachite Bar Necklace",
    category: "Necklaces",
    price: 5900,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    description: "A horizontal bar of genuine green malachite, known for its protective properties and striking banded patterns. Set in a sleek gold frame, it's a modern talisman for the sophisticated explorer.",
    stock: 6
  },
  {
    name: "Gold Snake Chain",
    category: "Bracelets",
    price: 3100,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
    description: "A liquid-like snake chain that drapes effortlessly around the wrist. The high-polish finish and seamless links provide a touch of 70s-inspired glamour that feels entirely contemporary today.",
    stock: 12
  },
  {
    name: "Oceanic Turquoise Set",
    category: "Full Sets",
    price: 6400,
    image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop",
    description: "Vivid turquoise stones are paired with warm copper accents in this bohemian-luxe set. Includes a layered necklace and drop earrings, perfect for capturing the spirit of a summer getaway.",
    stock: 9
  },
  {
    name: "Art Deco Studs",
    category: "Earrings",
    price: 2200,
    image: "https://images.unsplash.com/photo-1635767798638-3e2523926371?q=80&w=1000&auto=format&fit=crop",
    description: "Geometric symmetry meets vintage flair. These art deco-inspired studs feature a mix of baguette and round-cut crystals in a sunburst pattern, adding a touch of Gatsby-era elegance to your daily look.",
    stock: 19
  },
  {
    name: "Hammered Disc Lariat",
    category: "Necklaces",
    price: 4600,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    description: "A versatile lariat necklace featuring two hammered gold discs. The adjustable slider allows you to change the drop length, making it the perfect companion for everything from a high-neck sweater to a plunging blouse.",
    stock: 7
  },
  {
    name: "Tassel Silk Earrings",
    category: "Earrings",
    price: 1850,
    image: "https://images.unsplash.com/photo-1590548784585-645d8b75e8b8?q=80&w=1000&auto=format&fit=crop",
    description: "Hand-strung silk tassels in a rich champagne hue, topped with a small gold stud. These statement earrings are incredibly lightweight, offering maximum movement and impact without the discomfort.",
    stock: 14
  },
  {
    name: "Minimalist Infinity Ring",
    category: "Bracelets",
    price: 2700,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
    description: "A slender chain bracelet featuring a polished infinity symbol at the center. A symbol of eternal connection, this piece makes for a thoughtful gift or a delicate daily signature for yourself.",
    stock: 11
  },
  {
    name: "Zodiac Coin Necklace",
    category: "Necklaces",
    price: 3950,
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?q=80&w=1000&auto=format&fit=crop",
    description: "An antiqued gold coin featuring celestial engravings and a central crystal representing your sign. A personalized piece of jewelry that feels like an ancient artifact discovered in a modern world.",
    stock: 8
  },
  {
    name: "Rose Gold Knot Set",
    category: "Full Sets",
    price: 5100,
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop",
    description: "Symbolizing the strength of bonds, this set features a sculptural knot design in warm rose gold. Includes a delicate necklace and matching earrings, perfect for daily wear or special occasions.",
    stock: 10
  },
  {
    name: "Midnight Spinel Bracelet",
    category: "Bracelets",
    price: 3800,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop",
    description: "Dark and mysterious black spinel beads alternate with silver spacers in this adjustable bracelet. The deep black stones provide a sophisticated alternative to traditional bright gems.",
    stock: 6
  },
  {
    name: "Aura Quartz Choker",
    category: "Necklaces",
    price: 3200,
    image: "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?q=80&w=1000&auto=format&fit=crop",
    description: "Iridescent aura quartz crystal points set on a slim gold choker. A piece that captures the light and reflects the full spectrum of the rainbow.",
    stock: 9
  },
  {
    name: "Heritage Jhumka Earrings",
    category: "Earrings",
    price: 5800,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
    description: "Traditional Indian-inspired bell earrings with intricate filigree work and a dangling pearl finish. Modern artificial jewelry with a classic heritage soul.",
    stock: 5
  },
  {
    name: "Bohemian Beaded Bracelet",
    category: "Bracelets",
    price: 1500,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
    description: "Hand-threaded glass beads in earth tones, finished with a rustic copper clasp. Perfect for layering and adding a touch of nomadic charm.",
    stock: 22
  },
  {
    name: "Sun & Moon Set",
    category: "Full Sets",
    price: 6900,
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop",
    description: "A dual-pendant necklace set representing the harmony of day and night. Includes matching stud earrings for a complete celestial look.",
    stock: 7
  },
  {
    name: "Minimalist Wave Bangle",
    category: "Bracelets",
    price: 2400,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
    description: "A single, continuous line of gold that curves like a gentle ocean wave. A symbol of resilience and the ebb and flow of life.",
    stock: 13
  },
  {
    name: "Braided Gold Bangle",
    category: "Bracelets",
    price: 4200,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop",
    description: "Heavy-gauge gold wire intricately braided to create a substantial, textural wrist piece. A statement of strength and artisanal skill.",
    stock: 8
  },
  {
    name: "Lapis Lazuli Drop Necklace",
    category: "Necklaces",
    price: 4900,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000&auto=format&fit=crop",
    description: "Royal blue lapis lazuli stone with golden pyrite inclusions, suspended as a teardrop from a 14k gold chain. A stone of wisdom and truth.",
    stock: 6
  },
  {
    name: "Hammered Metal Studs",
    category: "Earrings",
    price: 1900,
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1000&auto=format&fit=crop",
    description: "Circular silver discs with a hand-hammered finish that creates a multi-faceted shimmer. Modern, industrial, and effortlessly cool.",
    stock: 15
  },
  {
    name: "Pearl & Gold Layered Set",
    category: "Full Sets",
    price: 7200,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop",
    description: "A curated three-tier necklace set combining fine chains and baroque pearls. Includes matching drop earrings for a look of effortless sophistication.",
    stock: 6
  },
  {
    name: "Dainty Heart Bracelet",
    category: "Bracelets",
    price: 2100,
    image: "https://images.unsplash.com/photo-1596944210900-34d21078b1ce?q=80&w=1000&auto=format&fit=crop",
    description: "A tiny, hollow heart charm on a gossamer-thin silver chain. A perfect token of affection or a subtle daily reminder of love.",
    stock: 16
  },
  {
    name: "Architectural Bar Earrings",
    category: "Earrings",
    price: 3100,
    image: "https://images.unsplash.com/photo-1630019019621-59754f44b1b8?q=80&w=1000&auto=format&fit=crop",
    description: "Brushed gold bars that hang vertically, creating a clean, modern silhouette that elongates the neck and frame.",
    stock: 10
  },
  {
    name: "Vintage Coin Choker",
    category: "Necklaces",
    price: 3800,
    image: "https://images.unsplash.com/photo-1599643477877-537ef527848f?q=80&w=2070&auto=format&fit=crop",
    description: "A series of small, antiqued coins linked together to form a choker. Inspired by ancient Mediterranean jewelry found in sun-drenched markets.",
    stock: 7
  },
  {
    name: "Rose Petal Stud Earrings",
    category: "Earrings",
    price: 2500,
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=1000&auto=format&fit=crop",
    description: "Delicate petals crafted from matte rose gold, forming a blooming flower on the ear. Soft, feminine, and eternally romantic.",
    stock: 12
  },
  {
    name: "Midnight Velvet Set",
    category: "Full Sets",
    price: 5400,
    image: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop",
    description: "Black spinel stones set in dark rhodium-plated silver. Includes a pendant necklace and matching huggie earrings for a touch of gothic elegance.",
    stock: 8
  },
  {
    name: "Twisted Rope Chain",
    category: "Necklaces",
    price: 4500,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop",
    description: "A classic rope chain with a unique twisted texture that catches the light in a spiral pattern. A durable and stylish staple for any collection.",
    stock: 9
  },
  {
    name: "Constellation Ear Climbers",
    category: "Earrings",
    price: 2900,
    image: "https://images.unsplash.com/photo-1590548784585-645d8b75e8b8?q=80&w=1000&auto=format&fit=crop",
    description: "Tiny crystals scattered along a curved gold wire, mimicking the stars of the Big Dipper as they climb up your earlobe.",
    stock: 11
  },
  {
    name: "Hand-Forged Silver Cuff",
    category: "Bracelets",
    price: 6100,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop",
    description: "Thick sterling silver, hand-beaten to create a rugged, organic texture. A unisex piece that feels like a modern archaeological find.",
    stock: 5
  },
  {
    name: "Amethyst Point Necklace",
    category: "Necklaces",
    price: 3400,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    description: "A raw amethyst crystal point suspended from a long, blackened silver chain. Brings a sense of calm and clarity to your everyday life.",
    stock: 10
  },
  {
    name: "Geometric Hoop Trio",
    category: "Earrings",
    price: 2200,
    image: "https://images.unsplash.com/photo-1635767798638-3e2523926371?q=80&w=1000&auto=format&fit=crop",
    description: "Three pairs of small hoops in square, triangle, and circular shapes. Mix and match to create an architectural ear stack.",
    stock: 14
  },
  {
    name: "Radiant Bloom Set",
    category: "Full Sets",
    price: 8900,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop",
    description: "A centerpiece floral pendant with a sparkling crystal heart, paired with matching statement earrings. The perfect gift for someone special.",
    stock: 5
  },
  {
    name: "ageLOC LumiSpa iO",
    category: "Device Tech",
    price: 22500,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop",
    description: "Experience the next level of skincare with ageLOC LumiSpa iO. This smart beauty device uses Micropulse Oscillation technology to deliver seven clinically proven skin benefits in just two minutes. It deep cleanses, purifies pores, and leaves skin feeling incredibly smooth.",
    stock: 3
  },
  {
    name: "Glacial Marine Mud",
    category: "Masks",
    price: 3200,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
    description: "Draw out impurities and toxins with this nutrient-rich mud mask. Sourced from a remote glacial estuary in British Columbia, this skin-renewing formula contains more than 50 skin-beneficial minerals to nurture and soften your complexion.",
    stock: 25
  },
  {
    name: "ageLOC Tru Face Essence",
    category: "Anti-Aging",
    price: 15400,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop",
    description: "A powerful serum encapsulated in single-use pearls. Formulated with FirmPlex and ageLOC technology, it targets the sources of aging to firm, contour, and define your skin for a more youthful appearance.",
    stock: 8
  },
  {
    name: "Nutricentials Dewy Afterglow",
    category: "Moisturizers",
    price: 4100,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop",
    description: "Lock in moisture and glow. This protective moisturizer helps your skin recover from everyday stressors like blue light and environmental pollution while providing deep, long-lasting hydration.",
    stock: 18
  },
  {
    name: "Polishing Peel",
    category: "Exfoliators",
    price: 2800,
    image: "https://images.unsplash.com/photo-1570172619914-468af3805364?q=80&w=1000&auto=format&fit=crop",
    description: "Get the benefits of professional microdermabrasion at home. Formulated with pumpkin enzymes and bentonite clay, this peel instantly resurfaces skin for a smooth, radiant finish without harsh irritation.",
    stock: 20
  },
  {
    name: "ageLOC Radiant Day",
    category: "Anti-Aging",
    price: 6800,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop",
    description: "A lightweight daily lotion that provides SPF 22 protection while stimulating cell turnover for a younger-looking skin texture. Part of the ageLOC transformation system for brighter, smoother skin.",
    stock: 15
  }
];

export const seedProducts = async () => {
  try {
    const existingCount = await Product.countDocuments();
    if (existingCount === 0) {
      await Product.insertMany(productsData);
      console.log('Products seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding products:', error.message);
  }
};
