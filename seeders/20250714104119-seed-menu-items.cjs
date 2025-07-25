const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch existing restaurant IDs
    const [restaurants] = await queryInterface.sequelize.query(
      'SELECT id FROM restaurant;'
    );
    const restaurantIds = restaurants.map(r => r.id);
    const now = new Date();

    // Define raw item templates without IDs and restaurant_id
    const itemTemplates = [
      // Starters
      { name: 'Bruschetta', description: 'Grilled bread topped with diced tomatoes, garlic, and basil.', price: 6.5, image_url: null, is_available: true, category: 'Starters', created_at: now, updated_at: now },
      { name: 'Stuffed Mushrooms', description: 'Button mushrooms filled with cheese and herbs, baked to perfection.', price: 7.0, image_url: null, is_available: true, category: 'Starters', created_at: now, updated_at: now },
      { name: 'Chicken Wings', description: 'Crispy wings tossed in your choice of buffalo or BBQ sauce.', price: 8.25, image_url: null, is_available: true, category: 'Starters', created_at: now, updated_at: now },
      { name: 'Calamari', description: 'Lightly fried squid rings served with marinara sauce.', price: 9.5, image_url: null, is_available: true, category: 'Starters', created_at: now, updated_at: now },
      { name: 'Loaded Nachos', description: 'Tortilla chips topped with cheese, jalapeños, and sour cream.', price: 8.75, image_url: null, is_available: true, category: 'Starters', created_at: now, updated_at: now },
      { name: 'Spring Rolls', description: 'Crispy rolls filled with vegetables.', price: 5.5, image_url: null, is_available: true, category: 'Starters', created_at: now, updated_at: now },
      { name: 'Samosas', description: 'Spiced potato and pea pastry.', price: 4.0, image_url: null, is_available: true, category: 'Starters', created_at: now, updated_at: now },
      { name: 'Mozzarella Sticks', description: 'Fried cheese sticks with marinara.', price: 7.0, image_url: null, is_available: true, category: 'Starters', created_at: now, updated_at: now },
      { name: 'Shrimp Cocktail', description: 'Chilled shrimp with cocktail sauce.', price: 9.0, image_url: null, is_available: true, category: 'Starters', created_at: now, updated_at: now },
      { name: 'Buffalo Cauliflower', description: 'Cauliflower florets in buffalo sauce.', price: 7.5, image_url: null, is_available: true, category: 'Starters', created_at: now, updated_at: now },

      // Side Dish
       { name: 'French Fries', description: 'Crispy golden fries with a side of ketchup.', price: 3.5, image_url: null, is_available: true, category: 'Side Dish', created_at: now, updated_at: now },
      { name: 'Onion Rings', description: 'Battered onion rings served with ranch dip.', price: 4.25, image_url: null, is_available: true, category: 'Side Dish', created_at: now, updated_at: now },
      { name: 'Coleslaw', description: 'Creamy cabbage and carrot slaw.', price: 2.75, image_url: null, is_available: true, category: 'Side Dish', created_at: now, updated_at: now },
      { name: 'Garlic Bread', description: 'Toasted bread with garlic butter and parsley.', price: 3.0, image_url: null, is_available: true, category: 'Side Dish', created_at: now, updated_at: now },
      { name: 'Mashed Potatoes', description: 'Creamy mashed potatoes with gravy.', price: 4.0, image_url: null, is_available: true, category: 'Side Dish', created_at: now, updated_at: now },
      { name: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing and croutons.', price: 7.5, image_url: null, is_available: true, category: 'Side Dish', created_at: now, updated_at: now },
      { name: 'Garden Salad', description: 'Mixed greens with house dressing.', price: 6.0, image_url: null, is_available: true, category: 'Side Dish', created_at: now, updated_at: now },
      { name: 'Potato Wedges', description: 'Seasoned potato wedges with dip.', price: 4.5, image_url: null, is_available: true, category: 'Side Dish', created_at: now, updated_at: now },
      { name: 'Sweet Potato Fries', description: 'Crispy sweet potato fries.', price: 4.75, image_url: null, is_available: true, category: 'Side Dish', created_at: now, updated_at: now },
      { name: 'Steamed Rice', description: 'Plain steamed white rice.', price: 2.5, image_url: null, is_available: true, category: 'Side Dish', created_at: now, updated_at: now },

      // Main Course
      { name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella and basil.', price: 12.0, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Cheeseburger', description: 'Beef patty with cheddar, lettuce, and tomato.', price: 10.5, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Grilled Salmon', description: 'Salmon fillet with lemon butter sauce.', price: 15.75, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Chicken Alfredo', description: 'Fettuccine pasta with creamy Alfredo sauce and chicken.', price: 13.5, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Steak Frites', description: 'Grilled steak with fries and herb butter.', price: 18.0, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Beef Tacos', description: 'Soft tacos with seasoned beef and toppings.', price: 9.0, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Chicken Curry', description: 'Spicy chicken curry with rice.', price: 11.0, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Veggie Wrap', description: 'Grilled veggies in tortilla wrap.', price: 8.5, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Beef Lasagna', description: 'Layers of pasta with beef and cheese.', price: 13.0, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Pad Thai', description: 'Rice noodles with shrimp, egg, and peanuts.', price: 12.5, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Fish and Chips', description: 'Fried fish with fries and tartar sauce.', price: 14.0, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Lamb Chops', description: 'Grilled lamb chops with mint sauce.', price: 19.0, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },
      { name: 'Falafel Plate', description: 'Falafel balls with hummus and pita.', price: 9.5, image_url: null, is_available: true, category: 'Main Course', created_at: now, updated_at: now },

      // Dessert
      { name: 'Tiramisu', description: 'Coffee-flavored Italian dessert with mascarpone.', price: 6.0, image_url: null, is_available: true, category: 'Dessert', created_at: now, updated_at: now },
      { name: 'Cheesecake', description: 'Rich and creamy cheesecake with a graham crust.', price: 6.5, image_url: null, is_available: true, category: 'Dessert', created_at: now, updated_at: now },
      { name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten center.', price: 7.25, image_url: null, is_available: true, category: 'Dessert', created_at: now, updated_at: now },
      { name: 'Apple Pie', description: 'Classic apple pie with a flaky crust and ice cream.', price: 5.5, image_url: null, is_available: true, category: 'Dessert', created_at: now, updated_at: now },
      { name: 'Creme Brulee', description: 'Burnt sugar crème with a creamy custard base.', price: 6.75, image_url: null, is_available: true, category: 'Dessert', created_at: now, updated_at: now },
      { name: 'Panna Cotta', description: 'Italian cream dessert with berry coulis.', price: 6.25, image_url: null, is_available: true, category: 'Dessert', created_at: now, updated_at: now },
      { name: 'Baklava', description: 'Layered pastry with nuts and honey.', price: 5.75, image_url: null, is_available: true, category: 'Dessert', created_at: now, updated_at: now },
      { name: 'Gulab Jamun', description: 'Fried dough balls in rose syrup.', price: 4.5, image_url: null, is_available: true, category: 'Dessert', created_at: now, updated_at: now },
      { name: 'Brownie', description: 'Chocolate brownie with walnuts.', price: 5.0, image_url: null, is_available: true, category: 'Dessert', created_at: now, updated_at: now },
      { name: 'Ice Cream Sundae', description: 'Ice cream with toppings and syrup.', price: 5.5, image_url: null, is_available: true, category: 'Dessert', created_at: now, updated_at: now },

      // Beverages
      { name: 'Coca-Cola', description: 'Classic soda.', price: 2.0, image_url: null, is_available: true, category: 'Beverages', created_at: now, updated_at: now },
      { name: 'Orange Juice', description: 'Freshly squeezed orange juice.', price: 3.25, image_url: null, is_available: true, category: 'Beverages', created_at: now, updated_at: now },
      { name: 'Lemonade', description: 'Refreshing lemonade with mint.', price: 2.75, image_url: null, is_available: true, category: 'Beverages', created_at: now, updated_at: now },
      { name: 'Iced Tea', description: 'Cold brewed iced tea.', price: 2.5, image_url: null, is_available: true, category: 'Beverages', created_at: now, updated_at: now },
      { name: 'Espresso', description: 'Strong espresso shot.', price: 2.25, image_url: null, is_available: true, category: 'Beverages', created_at: now, updated_at: now },
      { name: 'Latte', description: 'Espresso with steamed milk.', price: 3.5, image_url: null, is_available: true, category: 'Beverages', created_at: now, updated_at: now },
      { name: 'Cappuccino', description: 'Espresso with frothed milk.', price: 3.5, image_url: null, is_available: true, category: 'Beverages', created_at: now, updated_at: now },
      { name: 'Green Tea', description: 'Hot brewed green tea.', price: 2.0, image_url: null, is_available: true, category: 'Beverages', created_at: now, updated_at: now },
      { name: 'Herbal Tea', description: 'Hot brewed herbal infusion.', price: 2.25, image_url: null, is_available: true, category: 'Beverages', created_at: now, updated_at: now },
      { name: 'Smoothie', description: 'Fruit blend smoothie.', price: 4.0, image_url: null, is_available: true, category: 'Beverages', created_at: now, updated_at: now }
    ];
    
    // Generate full records with UUIDs and distribute restaurant IDs round-robin
    const menuItems = itemTemplates.map((item, index) => ({
      id: uuidv4(),
      ...item,
      restaurant_id: restaurantIds[index % restaurantIds.length]
    }));

    await queryInterface.bulkInsert('menu_item', menuItems, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('menu_item', null, {});
  }
};