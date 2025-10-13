# Redis Caching Demo

## Description
This project demonstrates how to use Redis as a caching layer in a Node.js + Express app. It caches GET requests for /items and invalidates cache on data changes.

## Setup Instructions

1. Open terminal
Open the file
cd redis-caching-app

2. Install dependencies

npm install

3. Start Redis server

redis-server

4. Start Node.js server

node server.js

5. Test API

GET /items

POST /items → invalidates cache

PUT /items/:id → invalidates cache

DELETE /items/:id → invalidates cache


## Notes

Cache TTL is 60 seconds.

Console logs indicate cache hits and misses.