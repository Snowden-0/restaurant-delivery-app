import * as cuisineService from '../services/cuisineService.js';

const NO_RESTAURANTS_ERROR = 'No restaurants found for this cuisine.';
const SERVER_ERROR = 'Internal server error.';

export const getAllCuisines = async (req, res) => {
  try {
    const cuisines = await cuisineService.getAllCuisines();
    res.status(200).json(cuisines);
  } catch (error) {
    //console.error('Error in getAllCuisines controller:', error);
    res.status(500).json({ message: {SERVER_ERROR} });
  }
};


export const getRestaurantsByCuisine = async (req, res) => {
  try {
    const { cuisineId } = req.params; // Get cuisineId from URL parameters
    const restaurants = await cuisineService.getRestaurantsByCuisineId(cuisineId);

    if (restaurants.length === 0) {
      return res.status(404).json({ message: {NO_RESTAURANTS_ERROR} });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    //console.error('Error in getRestaurantsByCuisine controller:', error);
    res.status(500).json({ message: {SERVER_ERROR} });
  }
};