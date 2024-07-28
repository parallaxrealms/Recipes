// src/store.js
import { writable } from 'svelte/store';

export const selectedRecipeList = writable(null);
export const recipes = writable({
  'Recipe List 1': [
    {
      name: 'Spaghetti Bolognese',
      image: '/images/spaghetti.jpg',
      ingredients: [
        { name: 'Spaghetti', measurement: 'g', amount: 200 },
        { name: 'Minced beef', measurement: 'g', amount: 100 },
        { name: 'Onion', measurement: 'unit', amount: 1 },
        { name: 'Garlic cloves', measurement: 'unit', amount: 2 },
        { name: 'Canned tomatoes', measurement: 'g', amount: 400 },
      ],
    },
    {
      name: 'Mashed Potatoes',
      image: '/images/Mashed-Potatoes.jpg',
      ingredients: [
        { name: 'Potatoes', measurement: 'g', amount: 500 },
        { name: 'Butter', measurement: 'g', amount: 50 },
        { name: 'Milk', measurement: 'ml', amount: 100 },
        { name: 'Salt', measurement: 'tsp', amount: 1 },
        { name: 'Pepper', measurement: 'tsp', amount: 0.5 },
      ],
    },
  ],
  'Recipe List 2': [
    {
      name: 'Tomato Soup',
      image: '/images/tomato-soup.jpg',
      ingredients: [
        { name: 'Tomatoes', measurement: 'g', amount: 500 },
        { name: 'Onion', measurement: 'unit', amount: 1 },
        { name: 'Garlic cloves', measurement: 'unit', amount: 2 },
        { name: 'Vegetable broth', measurement: 'ml', amount: 500 },
        { name: 'Basil', measurement: 'tbsp', amount: 1 },
      ],
    },
  ],
});