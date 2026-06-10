# FIFA World Cup 2026 - Ticket Sales Platform

A premium bilingual (Arabic/English) ticketing platform for FIFA World Cup 2026. Features a dark luxury design with full RTL support, real-time seat selection, order management, and a complete admin panel.

## Features

- **Bilingual Support**: Full Arabic and English language support with RTL/LTR switching
- **Dark Luxury Design**: Premium dark theme with gold accents
- **Real-time Seat Selection**: Interactive seat map with availability status
- **Order Management**: Complete order tracking and management
- **Admin Panel**: Dashboard with statistics and CRUD operations
- **Persistent Storage**: SQLite database for local data storage
- **Production Ready**: Works on Local, Render, VPS without any configuration

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=worldcup2026
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

## Project Structure

```
world-cup-hub-simple/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Styling
│   └── app.js          # Frontend JavaScript
├── src/                # Source files (if needed)
├── database.db         # SQLite database (auto-created)
├── server.js           # Express server with SQLite
├── package.json        # Dependencies
├── .env                # Environment variables
└── .env.example        # Environment variables template
```

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/matches` - List all matches
- `GET /api/matches/:id` - Get match details
- `GET /api/matches/:id/tickets` - Get match tickets
- `POST /api/orders` - Create order
- `GET /api/posts` - List posts
- `GET /api/stats/summary` - Get statistics
- `GET /api/stats/featured-matches` - Get featured matches

### Admin Endpoints
- `POST /api/admin/login` - Admin login
- `POST /api/matches` - Create match
- `PATCH /api/matches/:id` - Update match
- `DELETE /api/matches/:id` - Delete match
- `POST /api/tickets` - Create ticket
- `PATCH /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket
- `PATCH /api/orders/:id` - Update order status
- `POST /api/posts` - Create post
- `PATCH /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## Admin Credentials

Default credentials:
- Username: `admin`
- Password: `worldcup2026`

You can change these in the `.env` file using `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

## Deployment

### Render
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Add environment variables
4. Deploy

### VPS
1. Clone the repository
2. Run `npm install`
3. Set environment variables in `.env`
4. Run `npm start` (or use PM2 for production)

## Database

The application uses SQLite for data storage. The database file (`database.db`) is automatically created on first run. No external database configuration is required.

### Tables
- `matches` - Match information
- `tickets` - Ticket information with seat selection
- `orders` - Customer orders
- `posts` - News and updates

## Telegram Notifications (Optional)

To receive order notifications on Telegram:
1. Create a bot via @BotFather
2. Add `TELEGRAM_BOT_TOKEN` to your `.env`
3. Add `TELEGRAM_CHAT_ID` to your `.env`
4. Notifications will be sent automatically for new orders

## Development

The project is designed to work out-of-the-box without any build steps. Simply run:
```bash
npm install
npm start
```

## License

MIT
