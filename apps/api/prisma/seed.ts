import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ─── Roles ───
  const adminRole = await prisma.role.create({
    data: { name: "ADMIN", description: "Platform administrator" },
  });
  const vendorRole = await prisma.role.create({
    data: { name: "VENDOR", description: "Product vendor" },
  });
  const customerRole = await prisma.role.create({
    data: { name: "CUSTOMER", description: "Regular customer" },
  });
  console.log("Roles created");

  // ─── Permissions ───
  const permissions = await Promise.all(
    [
      ["user", "read"], ["user", "write"], ["user", "delete"],
      ["product", "read"], ["product", "write"], ["product", "delete"],
      ["order", "read"], ["order", "write"], ["order", "update"],
      ["vendor", "read"], ["vendor", "write"], ["vendor", "approve"],
      ["review", "read"], ["review", "write"], ["review", "delete"],
      ["cart", "read"], ["cart", "write"], ["cart", "delete"],
      ["category", "read"], ["category", "write"],
      ["attribute", "read"], ["attribute", "write"], ["attribute", "delete"],
      ["variant", "read"], ["variant", "write"], ["variant", "delete"],
    ].map(([resource, action]) =>
      prisma.permission.create({
        data: { resource, action },
      })
    )
  );
  console.log("Permissions created");

  // ─── Role ↔ Permission ───
  const allPermissions = permissions.map((p) => p.id);
  const productVariantPerms = permissions
    .filter((p) => ["product", "variant", "attribute"].includes(p.resource))
    .map((p) => p.id);
  const customerPerms = permissions
    .filter((p) => ["order", "review", "cart", "product"].includes(p.resource) && ["read", "write"].includes(p.action))
    .map((p) => p.id);

  await Promise.all([
    ...allPermissions.map((permissionId) =>
      prisma.rolePermission.create({
        data: { roleId: adminRole.id, permissionId },
      })
    ),
    ...productVariantPerms.map((permissionId) =>
      prisma.rolePermission.create({
        data: { roleId: vendorRole.id, permissionId },
      })
    ),
    ...customerPerms.map((permissionId) =>
      prisma.rolePermission.create({
        data: { roleId: customerRole.id, permissionId },
      })
    ),
  ]);
  console.log("Role permissions assigned");

  // ─── Users ───
  const hashedPassword = await bcrypt.hash("password123", 12);

  const _adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@e-com.com",
      password: hashedPassword,
      userRoles: { create: { roleId: adminRole.id } },
    },
  });

  const vendor1User = await prisma.user.create({
    data: {
      name: "Fashion Hub",
      email: "vendor1@e-com.com",
      password: hashedPassword,
      userRoles: { create: { roleId: vendorRole.id } },
    },
  });

  const vendor2User = await prisma.user.create({
    data: {
      name: "Style Store",
      email: "vendor2@e-com.com",
      password: hashedPassword,
      userRoles: { create: { roleId: vendorRole.id } },
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "customer1@e-com.com",
      password: hashedPassword,
      userRoles: { create: { roleId: customerRole.id } },
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "customer2@e-com.com",
      password: hashedPassword,
      userRoles: { create: { roleId: customerRole.id } },
    },
  });
  console.log("Users created");

  // ─── Vendor Profiles ───
  const vendor1 = await prisma.vendorProfile.create({
    data: {
      userId: vendor1User.id,
      shopName: "Fashion Hub",
      description: "Premium clothing for men, women, and kids",
      isApproved: true,
    },
  });

  const vendor2 = await prisma.vendorProfile.create({
    data: {
      userId: vendor2User.id,
      shopName: "Style Store",
      description: "Trendy fashion at affordable prices",
      isApproved: true,
    },
  });
  console.log("Vendor profiles created");

  // ─── Categories ───
  const mensClothing = await prisma.category.create({
    data: { name: "Men's Clothing", slug: "mens-clothing" },
  });
  const womensClothing = await prisma.category.create({
    data: { name: "Women's Clothing", slug: "womens-clothing" },
  });
  const kidsClothing = await prisma.category.create({
    data: { name: "Kids' Clothing", slug: "kids-clothing" },
  });
  const shoes = await prisma.category.create({
    data: { name: "Shoes", slug: "shoes" },
  });
  const accessories = await prisma.category.create({
    data: { name: "Accessories", slug: "accessories" },
  });
  const sale = await prisma.category.create({
    data: { name: "Sale", slug: "sale" },
  });
  console.log("Categories created");

  // ─── Products ───
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: "Classic Cotton T-Shirt",
        description: "Comfortable 100% cotton t-shirt for everyday wear",
        price: 29.99,
        inventory: 200,
        vendorId: vendor1.id,
        categoryId: mensClothing.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Slim Fit Denim Jeans",
        description: "Modern slim fit jeans with stretch comfort",
        price: 59.99,
        inventory: 150,
        vendorId: vendor1.id,
        categoryId: mensClothing.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Floral Summer Dress",
        description: "Light and breezy floral print dress",
        price: 49.99,
        inventory: 100,
        vendorId: vendor1.id,
        categoryId: womensClothing.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "High-Waist Leggings",
        description: "Stretchy high-waist leggings for ultimate comfort",
        price: 34.99,
        inventory: 180,
        vendorId: vendor2.id,
        categoryId: womensClothing.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Kids Graphic Tee",
        description: "Fun graphic tee for kids, soft cotton blend",
        price: 19.99,
        inventory: 250,
        vendorId: vendor2.id,
        categoryId: kidsClothing.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Kids Jogger Pants",
        description: "Comfortable jogger pants for active kids",
        price: 24.99,
        inventory: 200,
        vendorId: vendor2.id,
        categoryId: kidsClothing.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Classic Leather Sneakers",
        description: "Versatile leather sneakers for any occasion",
        price: 89.99,
        inventory: 100,
        vendorId: vendor1.id,
        categoryId: shoes.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Canvas Running Shoes",
        description: "Lightweight canvas shoes for everyday comfort",
        price: 44.99,
        inventory: 120,
        vendorId: vendor2.id,
        categoryId: shoes.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Crossbody Shoulder Bag",
        description: "Stylish crossbody bag with adjustable strap",
        price: 39.99,
        inventory: 80,
        vendorId: vendor1.id,
        categoryId: accessories.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Knit Beanie Hat",
        description: "Warm knit beanie for cold weather",
        price: 14.99,
        inventory: 300,
        vendorId: vendor2.id,
        categoryId: accessories.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Oversized Hoodie",
        description: "Cozy oversized hoodie with kangaroo pocket",
        price: 54.99,
        inventory: 130,
        vendorId: vendor1.id,
        categoryId: sale.id,
      },
    }),
    prisma.product.create({
      data: {
        title: "Plaid Flannel Shirt",
        description: "Classic plaid flannel shirt, perfect for layering",
        price: 42.99,
        inventory: 90,
        vendorId: vendor2.id,
        categoryId: sale.id,
      },
    }),
  ]);
  console.log("Products created");

  // ─── Attributes ───
  const sizeAttr = await prisma.attribute.create({
    data: { name: "Size", type: "size" },
  });

  const colorAttr = await prisma.attribute.create({
    data: { name: "Color", type: "color" },
  });

  const materialAttr = await prisma.attribute.create({
    data: { name: "Material", type: "material" },
  });
  console.log("Attributes created");

  // ─── Attribute Values ───
  const sizeValues = await Promise.all([
    prisma.attributeValue.create({ data: { attributeId: sizeAttr.id, value: "XS", slug: "xs" } }),
    prisma.attributeValue.create({ data: { attributeId: sizeAttr.id, value: "S", slug: "s" } }),
    prisma.attributeValue.create({ data: { attributeId: sizeAttr.id, value: "M", slug: "m" } }),
    prisma.attributeValue.create({ data: { attributeId: sizeAttr.id, value: "L", slug: "l" } }),
    prisma.attributeValue.create({ data: { attributeId: sizeAttr.id, value: "XL", slug: "xl" } }),
    prisma.attributeValue.create({ data: { attributeId: sizeAttr.id, value: "XXL", slug: "xxl" } }),
  ]);

  const colorValues = await Promise.all([
    prisma.attributeValue.create({ data: { attributeId: colorAttr.id, value: "Red", slug: "red", hexCode: "#FF0000" } }),
    prisma.attributeValue.create({ data: { attributeId: colorAttr.id, value: "Blue", slug: "blue", hexCode: "#0000FF" } }),
    prisma.attributeValue.create({ data: { attributeId: colorAttr.id, value: "Black", slug: "black", hexCode: "#000000" } }),
    prisma.attributeValue.create({ data: { attributeId: colorAttr.id, value: "White", slug: "white", hexCode: "#FFFFFF" } }),
    prisma.attributeValue.create({ data: { attributeId: colorAttr.id, value: "Green", slug: "green", hexCode: "#00FF00" } }),
  ]);

  const _materialValues = await Promise.all([
    prisma.attributeValue.create({ data: { attributeId: materialAttr.id, value: "Cotton", slug: "cotton" } }),
    prisma.attributeValue.create({ data: { attributeId: materialAttr.id, value: "Polyester", slug: "polyester" } }),
    prisma.attributeValue.create({ data: { attributeId: materialAttr.id, value: "Denim", slug: "denim" } }),
  ]);
  console.log("Attribute values created");

  // ─── Product Variants ───
  // Create variants for first 6 products (clothing items) with size + color combos
  const variantData = [
    { productIndex: 0, colorIndices: [0, 1, 2, 3], sizeIndices: [1, 2, 3, 4], basePrice: 29.99 },
    { productIndex: 1, colorIndices: [2, 1], sizeIndices: [1, 2, 3, 4], basePrice: 59.99 },
    { productIndex: 2, colorIndices: [0, 4], sizeIndices: [0, 1, 2, 3], basePrice: 49.99 },
    { productIndex: 3, colorIndices: [2, 3, 4], sizeIndices: [0, 1, 2, 3, 4], basePrice: 34.99 },
    { productIndex: 4, colorIndices: [0, 1, 3], sizeIndices: [0, 1, 2], basePrice: 19.99 },
    { productIndex: 5, colorIndices: [2, 3], sizeIndices: [0, 1, 2, 3], basePrice: 24.99 },
  ];

  let skuCounter = 1;
  const allVariants = [];

  for (const config of variantData) {
    const product = products[config.productIndex];
    for (const colorIdx of config.colorIndices) {
      for (const sizeIdx of config.sizeIndices) {
        const color = colorValues[colorIdx];
        const size = sizeValues[sizeIdx];
        const sku = `SKU-${String(skuCounter++).padStart(4, "0")}`;
        const priceVariation = (sizeIdx - 1) * 2;
        const inventory = 20 + Math.floor(Math.random() * 80);

        const variant = await prisma.productVariant.create({
          data: {
            productId: product.id,
            sku,
            price: config.basePrice + priceVariation,
            compareAtPrice: config.basePrice + priceVariation + 10,
            inventory,
            variantAttributes: {
              create: [
                { attributeValueId: color.id },
                { attributeValueId: size.id },
              ],
            },
          },
          include: {
            variantAttributes: {
              include: { attributeValue: true },
            },
          },
        });
        allVariants.push(variant);
      }
    }
  }
  console.log(`${allVariants.length} product variants created`);

  // ─── Orders ───
  await prisma.order.create({
    data: {
      userId: customer1.id,
      status: "DELIVERED",
      total: 89.98,
      items: {
        create: [
          { productId: products[0].id, variantId: allVariants[0].id, quantity: 2, price: 29.99 },
          { productId: products[2].id, variantId: allVariants[8].id, quantity: 1, price: 49.99 },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: customer2.id,
      status: "SHIPPED",
      total: 104.98,
      items: {
        create: [
          { productId: products[3].id, variantId: allVariants[12].id, quantity: 2, price: 34.99 },
          { productId: products[6].id, quantity: 1, price: 89.99 },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: customer1.id,
      status: "PENDING",
      total: 64.98,
      items: {
        create: [
          { productId: products[1].id, variantId: allVariants[4].id, quantity: 1, price: 59.99 },
          { productId: products[9].id, quantity: 1, price: 14.99 },
        ],
      },
    },
  });
  console.log("Orders created");

  // ─── Reviews ───
  await Promise.all([
    prisma.review.create({
      data: { userId: customer1.id, productId: products[0].id, rating: 5, comment: "Great quality t-shirt! Fits perfectly." },
    }),
    prisma.review.create({
      data: { userId: customer1.id, productId: products[2].id, rating: 4, comment: "Beautiful dress, runs slightly large." },
    }),
    prisma.review.create({
      data: { userId: customer2.id, productId: products[1].id, rating: 5, comment: "Best jeans I've ever owned." },
    }),
    prisma.review.create({
      data: { userId: customer2.id, productId: products[3].id, rating: 4, comment: "Very comfortable leggings." },
    }),
    prisma.review.create({
      data: { userId: customer1.id, productId: products[6].id, rating: 5, comment: "Stylish and comfortable sneakers." },
    }),
    prisma.review.create({
      data: { userId: customer2.id, productId: products[4].id, rating: 4, comment: "My kids love these tees!" },
    }),
    prisma.review.create({
      data: { userId: customer1.id, productId: products[8].id, rating: 3, comment: "Nice bag but a bit small." },
    }),
    prisma.review.create({
      data: { userId: customer2.id, productId: products[10].id, rating: 5, comment: "Super cozy hoodie, great for winter." },
    }),
  ]);
  console.log("Reviews created");

  // ─── Cart Items ───
  await Promise.all([
    prisma.cartItem.create({
      data: { userId: customer1.id, productId: products[5].id, variantId: allVariants[22].id, quantity: 2 },
    }),
    prisma.cartItem.create({
      data: { userId: customer1.id, productId: products[7].id, quantity: 1 },
    }),
    prisma.cartItem.create({
      data: { userId: customer2.id, productId: products[0].id, variantId: allVariants[0].id, quantity: 1 },
    }),
    prisma.cartItem.create({
      data: { userId: customer2.id, productId: products[11].id, quantity: 3 },
    }),
    prisma.cartItem.create({
      data: { userId: customer2.id, productId: products[9].id, quantity: 2 },
    }),
  ]);
  console.log("Cart items created");

  console.log("\nSeed completed successfully!");
  console.log("\nSample login credentials:");
  console.log("  Admin:    admin@e-com.com / password123");
  console.log("  Vendor 1: vendor1@e-com.com / password123");
  console.log("  Vendor 2: vendor2@e-com.com / password123");
  console.log("  Customer 1: customer1@e-com.com / password123");
  console.log("  Customer 2: customer2@e-com.com / password123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
