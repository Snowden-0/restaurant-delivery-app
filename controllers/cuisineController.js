import * as cuisineService from '../services/cuisineService.js';

const NO_RESTAURANTS_ERROR = 'No restaurants found for this cuisine.';
const SERVER_ERROR = 'Internal server error.';

export const getAllCuisines = async (req, res) => {
  try {
    const cuisines = await cuisineService.getAllCuisines();
    return res.status(200).json(cuisines);
  } catch (error) {
    return res.status(500).json({ message: SERVER_ERROR });
  }
};


export const getRestaurantsByCuisine = async (req, res) => {
  try {
    const { cuisineId } = req.params; 
    const restaurants = await cuisineService.getRestaurantsByCuisineId(cuisineId);

    if (restaurants.length === 0) {
      return res.status(404).json({ message: NO_RESTAURANTS_ERROR });
    }

    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: SERVER_ERROR});
  }
};