const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurants = [
      {
        id: uuidv4(),
        name: 'The Spice Route',
        address: '123 Curry St, Karachi',
        phone: '0300-1234567',
        description: 'A journey through bold flavors of South Asia.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Ocean Bites',
        address: '456 Marine Drive, Lahore',
        phone: '0321-7654321',
        description: 'Fresh seafood and coastal cuisine.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Burger Empire',
        address: '789 Fast Lane, Islamabad',
        phone: '0345-1122334',
        description: 'Classic American burgers with a local twist.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Green Garden Cafe',
        address: '101 Veggie Blvd, Rawalpindi',
        phone: '0302-2233445',
        description: 'A haven for vegetarian and vegan lovers.',
        image_url: null,
        is_available: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Tandoori Tales',
        address: '55 Flame Road, Peshawar',
        phone: '0313-5544667',
        description: 'Authentic tandoori grilled delicacies.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Urban Pasta',
        address: '77 Italia Ave, Karachi',
        phone: '0333-9988776',
        description: 'Modern Italian comfort food.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Sweet Cravings',
        address: '212 Dessert St, Lahore',
        phone: '0346-8877665',
        description: 'Desserts that satisfy every sweet tooth.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'BBQ Junction',
        address: '808 Grill Road, Islamabad',
        phone: '0307-4466553',
        description: 'Smoky flavors and tender meats.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Cafe Mocha',
        address: '99 Brew Street, Quetta',
        phone: '0312-8899774',
        description: 'Coffee, conversations, and more.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Roll Express',
        address: '18 Wrap Ln, Multan',
        phone: '0331-7766554',
        description: 'Delicious rolls and quick bites.',
        image_url: null,
        is_available: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Sushi Central',
        address: '112 Tokyo Rd, Karachi',
        phone: '0355-1100223',
        description: 'A fresh take on Japanese sushi.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Health Bowl',
        address: '61 Organic Rd, Islamabad',
        phone: '0315-3322114',
        description: 'Nutritious bowls and smoothies.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Waffle World',
        address: '44 Sweet Rd, Lahore',
        phone: '0360-5566778',
        description: 'Waffles, pancakes, and breakfast delights.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'The Grill House',
        address: '66 BBQ Blvd, Karachi',
        phone: '0330-4411223',
        description: 'Juicy grilled favorites and sides.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Pizza Palace',
        address: '250 Cheese St, Islamabad',
        phone: '0309-6677889',
        description: 'Stone-baked pizzas with fresh toppings.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Tea Time',
        address: '77 Chai Rd, Karachi',
        phone: '0322-5544332',
        description: 'A variety of teas and light snacks.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Pak Diner',
        address: '555 Iqbal St, Rawalpindi',
        phone: '0308-4455662',
        description: 'Traditional Pakistani dining.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Health Bowl',
        address: '61 Organic Rd, Islamabad',
        phone: '0315-3322114',
        description: 'Nutritious bowls and smoothies.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Waffle World',
        address: '44 Sweet Rd, Lahore',
        phone: '0360-5566778',
        description: 'Waffles, pancakes, and breakfast delights.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'The Grill House',
        address: '66 BBQ Blvd, Karachi',
        phone: '0330-4411223',
        description: 'Juicy grilled favorites and sides.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        name: 'Dumplings & Co.',
        address: '15 Steam Lane, Lahore',
        phone: '0350-7788992',
        description: 'Asian dumplings and bao buns.',
        image_url: null,
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    await queryInterface.bulkInsert('restaurant', restaurants, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('restaurant', null, {});
  }
};
