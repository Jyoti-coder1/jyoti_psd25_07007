# Multi-User Shopping Cart

This project implements a *Multi-User Shopping Cart* using HTML, CSS, and JavaScript with localStorage.

## Features

- Users log in with a unique username
- Each user has their own shopping cart stored in localStorage
- Users can:
  - Add items to their cart
  - Edit quantity
  - Remove items
  - View total cost
- Data is saved in localStorage as:
   json
{
  "user1": [
    { "itemName": "Laptop", "price": 50000, "quantity": 1 },
    { "itemName": "Mouse", "price": 1000, "quantity": 2 }
  ]
}