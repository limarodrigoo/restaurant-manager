import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create restaurants
  const restaurant1 = await prisma.restaurant.create({
    data: {
      name: 'Bella Italia',
      address: '123 Main St, Cityville',
    },
  });

  const restaurant2 = await prisma.restaurant.create({
    data: {
      name: 'Sushi Express',
      address: '456 Oak Ave, Townsburg',
    },
  });

  // Create items for Bella Italia
  const italianItems = [
    {
      name: 'Spaghetti Bolognese',
      description: 'Classic Italian pasta with meat sauce',
      price: 12.99,
    },
    {
      name: 'Margherita Pizza',
      description: 'Traditional pizza with tomato, mozzarella, and basil',
      price: 10.99,
    },
    {
      name: 'Lasagna',
      description: 'Layered pasta with beef and cheese',
      price: 14.99,
    },
    {
      name: 'Tiramisu',
      description: 'Italian coffee-flavored dessert',
      price: 6.99,
    },
    {
      name: 'Caprese Salad',
      description: 'Fresh mozzarella, tomatoes, and basil',
      price: 8.99,
    },
    { name: 'Espresso', description: 'Strong Italian coffee', price: 2.99 },
    {
      name: 'Chianti (Glass)',
      description: 'Red wine from Tuscany',
      price: 7.99,
    },
    { name: 'Limoncello', description: 'Italian lemon liqueur', price: 5.99 },
    {
      name: 'San Pellegrino',
      description: 'Sparkling mineral water',
      price: 3.99,
    },
  ];

  for (const item of italianItems) {
    await prisma.item.create({
      data: {
        ...item,
        restaurantId: restaurant1.id,
      },
    });
  }

  // Create items for Sushi Express
  const japaneseItems = [
    {
      name: 'California Roll',
      description: 'Sushi roll with crab, avocado, and cucumber',
      price: 8.99,
    },
    {
      name: 'Miso Soup',
      description: 'Traditional Japanese soup with tofu and seaweed',
      price: 3.99,
    },
    {
      name: 'Tempura Platter',
      description: 'Assorted deep-fried seafood and vegetables',
      price: 15.99,
    },
    {
      name: 'Salmon Nigiri',
      description: 'Fresh salmon over pressed rice',
      price: 6.99,
    },
    {
      name: 'Edamame',
      description: 'Steamed soybeans with sea salt',
      price: 4.99,
    },
    {
      name: 'Green Tea',
      description: 'Traditional Japanese green tea',
      price: 2.99,
    },
    { name: 'Sake (Small)', description: 'Japanese rice wine', price: 6.99 },
    {
      name: 'Ramune',
      description: 'Japanese carbonated soft drink',
      price: 3.99,
    },
    { name: 'Asahi Beer', description: 'Japanese lager beer', price: 5.99 },
  ];

  for (const item of japaneseItems) {
    await prisma.item.create({
      data: {
        ...item,
        restaurantId: restaurant2.id,
      },
    });
  }

  async function getItemPrice(itemId) {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: { price: true },
    });
    return item.price;
  }

  // Create bills
  const bill1 = await prisma.bill.create({
    data: {
      status: 'OPEN',
      restaurantId: restaurant1.id,
    },
  });

  const bill2 = await prisma.bill.create({
    data: {
      status: 'CLOSED',
      restaurantId: restaurant2.id,
    },
  });

  // Create orders and order items
  await prisma.order.create({
    data: {
      billId: bill1.id,
      OrderItens: {
        create: [
          { itemId: 1, quantity: 2, price: await getItemPrice(1) }, // 2 Spaghetti Bolognese
          { itemId: 2, quantity: 1, price: await getItemPrice(2) }, // 1 Margherita Pizza
          { itemId: 6, quantity: 2, price: await getItemPrice(6) }, // 2 Espresso
          { itemId: 7, quantity: 1, price: await getItemPrice(7) }, // 1 Glass of Chianti
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      billId: bill2.id,
      OrderItens: {
        create: [
          { itemId: 10, quantity: 3, price: await getItemPrice(10) }, // 3 California Rolls
          { itemId: 11, quantity: 2, price: await getItemPrice(11) }, // 2 Miso Soups
          { itemId: 16, quantity: 2, price: await getItemPrice(16) }, // 2 Green Teas
          { itemId: 18, quantity: 1, price: await getItemPrice(18) }, // 1 Ramune
        ],
      },
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
