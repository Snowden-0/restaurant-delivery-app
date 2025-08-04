import * as service from '../services/restaurantService.js';

export const getAll = async (req, res) => {
  try {
    let filters = { ...req.query };
    
    if (req.query.cuisines) {
      if (typeof req.query.cuisines === 'string') {
        filters.cuisines = req.query.cuisines.split(',').map(id => id.trim());
      } else if (Array.isArray(req.query.cuisines)) {

        filters.cuisines = req.query.cuisines;
      }
      
      filters.cuisines = filters.cuisines.filter(id => id && id.length > 0);
      
      if (filters.cuisines.length === 0) {
        delete filters.cuisines;
      }
    }

    if (req.query.minRating) {
      const rating = parseFloat(req.query.minRating);
      if (isNaN(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ 
          error: 'minRating must be a number between 1 and 5' 
        });
      }
      filters.minRating = rating;
    }

    if (req.query.isOpen && !['true', 'false'].includes(req.query.isOpen)) {
      return res.status(400).json({ 
        error: 'isOpen must be either "true" or "false"' 
      });
    }

    const restaurants = await service.getAllRestaurants(filters);
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

export const getCuisines = async (req, res) => {
  try {
    const cuisines = await service.getRestaurantCuisines(req.params.id);
    return res.json(cuisines);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getMenu = async (req, res) => {
  try {
    const menuItems = await service.getRestaurantMenu(req.params.id);
    return res.json(menuItems);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAllCuisines = async (req, res) => {
  try {
    const cuisines = await service.getAllCuisines();
    return res.json(cuisines);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};