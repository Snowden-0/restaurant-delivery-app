import * as service from '../services/restaurantService.js';

export const getAll = async (req, res) => {
  try {
    const restaurants = await service.getAllRestaurants(req.query);
    return res.json(restaurants);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const [restaurant] = await service.getRestaurantById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: 'Not found' });
    return res.json(restaurant);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getMenu = async (req, res) => {
  try {
    const items = await service.getRestaurantMenu(req.params.id);
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
