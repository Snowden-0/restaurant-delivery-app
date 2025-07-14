import * as service from '../services/restaurantService.js';

export const getAll = async (req, res) => {
  try {
    const restaurants = await service.getAllRestaurants(req.query);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const [restaurant] = await service.getRestaurantById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: 'Not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMenu = async (req, res) => {
  try {
    const items = await service.getRestaurantMenu(req.params.id);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCuisines = async (req, res) => {
  try {
    const cuisines = await service.getRestaurantCuisines(req.params.id);
    res.json(cuisines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAvailable = async (req, res) => {
  try {
    const restaurants = await service.getAvailableRestaurants();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};