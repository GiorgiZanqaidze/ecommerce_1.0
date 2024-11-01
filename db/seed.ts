import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {


  // crete use roles 
   // Clear existing roles (optional)
   await prisma.role.deleteMany();

  const roles = [
    { name: 'admin' },
    { name: 'customer' },
    { name: 'seller' },
  ];

  for (const role of roles) {
    await prisma.role.create({
      data: role,
    });
  }

  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
    },
  });

  // Create sample users
  for (let i = 0; i < 10; i++) {
    await prisma.user.upsert({
      where: { email: faker.internet.email() },
      update: {},
      create: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        isActive: faker.datatype.boolean(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        roles: {
          connect: [
            { id: adminRole.id }, // Connect to the admin role
          ],
        },
      },
    });
  }

  // Create sample categories
  for (let i = 0; i < 5; i++) {
    const categoryId = await prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });
  
    await prisma.category.upsert({
      where: { id: categoryId.id },
      update: {},
      create: {
        name: faker.commerce.department(),
      },
    });
  }

  // Fetch all categories for product relation
  const categories = await prisma.category.findMany();

  // Create sample products
  for (let i = 0; i < 10; i++) {
    const category = categories[faker.number.int({ min: 0, max: categories.length - 1 })];
    await prisma.product.upsert({
      where: { id: faker.number.int({ min: 0, max: 100000 }) },
      update: {},
      create: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        stockQuantity: faker.number.int({ min: 0, max: 100 }),
        categories: { connect: { id: category.id } },
      },
    });
  }

  // Fetch all users and products for order and order items relation
  const users = await prisma.user.findMany();
  const products = await prisma.product.findMany();

  // Create sample orders
  for (let i = 0; i < 20; i++) {
    const user = users[faker.number.int({ min: 0, max: users.length - 1 })];
    const orderItemsData = [];

    for (let j = 0; j < faker.number.int({ min: 1, max: 5 }); j++) {
      const product = products[faker.number.int({ min: 0, max: products.length - 1 })];
      orderItemsData.push({
        product: {
          connect: { id: product.id },
        },
        quantity: faker.number.int({ min: 1, max: 10 }),
        price: product.price,
      });
    }

    await prisma.order.create({
      data: {
        user: {
          connect: { id: user.id },
        },
        totalPrice: orderItemsData.reduce((sum, item) => sum + item.price * item.quantity, 0),
        orderItems: {
          create: orderItemsData,
        },
      },
    });
  }
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
