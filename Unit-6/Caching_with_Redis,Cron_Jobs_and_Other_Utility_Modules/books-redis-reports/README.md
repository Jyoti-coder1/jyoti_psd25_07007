# Books Redis Reports (Bulk + Reports + Email)

## Summary
Demo app that:
- Accepts bulk book uploads per user, queues them in Redis,
- Cron job processes queues every 2 minutes and writes status per user to Redis,
- Second cron job runs every 5 minutes, generates per-user PDF reports and emails them, then deletes the status.

## Setup
1. Clone repo
2. npm install
3. Create .env from .env.example (no real SMTP necessary; Ethereal used automatically)
4. Start Redis and MongoDB locally (or use Docker)
   - Redis: redis-server or docker run -p 6379:6379 redis
   - Mongo: mongod or docker run -p 27017:27017 -d mongo
5. Start server: npm run dev
   - On first run, if no SMTP configured, Ethereal account credentials will be printed in console.

## Endpoints (for testing)
- POST /signup → { name, email, password }  — creates user
- POST /login → { email, password } — returns token

- POST /books/bulk (authenticated: Authorization: Bearer <token>)
  - body: { "books": [ { "title":"A", "author":"X" }, {...} ] }
  - stores items in Redis list bulkbooks:<userId>

## Cron behavior
- *Every 2 minutes*: bulk job reads bulkbooks:* keys, inserts to Mongo, writes bulkstatus:<userId> (JSON) with insertedCount, failedCount, failures, processedAt.
- *Every 5 minutes*: report job reads bulkstatus:* keys, generates a PDF using pdfkit, emails it to the user's email (Ethereal if no SMTP), deletes bulkstatus:<userId> on success.

## Simulate multiple users
- create user A, login -> token A
- create user B, login -> token B
- Use token A to POST /books/bulk with a list for A
- Use token B to POST /books/bulk with a different list for B
- Wait for cron jobs (2+5 minutes). Observe console logs:
  - [CronBulk] inserted counts for user A & B
  - [CronReport] emailed reports (Ethereal preview URLs printed)

## Notes
- Redis keys:
  - bulkbooks:<userId> - pending list
  - bulkstatus:<userId> - JSON report status
  - books:<userId> - (existing cache key used elsewhere)
- For production replace redis.keys(...) with a scalable discovery pattern (store pending user IDs in a set).
- PDF attachments are streamed to nodemailer and mailed. For some transports you may need to buffer the PDF first.