# News Website Backend API

A backend REST API for a news website built using Node.js, Express.js, and MongoDB.

## Features
- User authentication (JWT)
- News CRUD operations
- Category-based news filtering
- API-based architecture
- Secure password hashing
- User profile management
- File upload support
- Admin dashboard
- Docker support

## Docker Deployment

### Prerequisites
- Docker and Docker Compose installed
- News API key from [NewsAPI.org](https://newsapi.org/)

### Quick Start with Docker

1. **Clone and Setup:**
```bash
git clone <repository-url>
cd news_Website
cp .env.example .env
# Edit .env with your configuration
```

2. **Development Environment:**
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

3. **Production Environment:**
```bash
# Use production compose file
docker-compose -f docker-compose.prod.yml up -d

# Scale application
docker-compose -f docker-compose.prod.yml up -d --scale app=2
```

### Docker Services

#### MongoDB Database
- **Image**: mongo:6.0
- **Port**: 27017
- **Default Admin**: admin / password123
- **Data Persistence**: Automatic volume mounting

#### Node.js Application
- **Base Image**: node:18-alpine
- **Port**: 5000
- **Health Check**: Every 30 seconds
- **File Uploads**: Persistent volume for uploads

#### Optional Nginx Proxy (Production)
- **Image**: nginx:alpine
- **Ports**: 80, 443
- **SSL Support**: Configure with your certificates

### Environment Variables

Create a `.env` file from `.env.example`:

```env
# Database
DATABASE_URL=mongodb://admin:password123@mongodb:27017/news_website?authSource=admin
MONGO_ROOT_PASSWORD=your_secure_password

# Application
NODE_ENV=production
PORT=5000
NEWS_API_KEY=your_news_api_key_here

# Security
JWT_SECRET=your_jwt_secret_key_here
```

### Docker Commands Reference

```bash
# Build images
docker-compose build

# Rebuild without cache
docker-compose build --no-cache

# View running containers
docker-compose ps

# Access application shell
docker-compose exec app sh

# Access MongoDB shell
docker-compose exec mongodb mongo

# View logs for specific service
docker-compose logs app
docker-compose logs mongodb

# Clean up volumes (WARNING: Deletes data)
docker-compose down -v
```

### Manual Docker Build

```bash
# Build image
docker build -t news-website .

# Run container
docker run -d \
  --name news-website \
  -p 5000:5000 \
  -e DATABASE_URL=mongodb://localhost:27017/news_website \
  -e NEWS_API_KEY=your_api_key \
  news-website
```

### Health Checks

The application includes a health check endpoint:
- **Endpoint**: `/health`
- **Response**: JSON with status, timestamp, and uptime
- **Docker Health Check**: Every 30 seconds

### Production Considerations

1. **Security**:
   - Change default MongoDB password
   - Use strong JWT secrets
   - Enable HTTPS with Nginx

2. **Performance**:
   - Use Redis for caching (add to compose)
   - Enable MongoDB indexes
   - Monitor resource usage

3. **Backup**:
   - Regular MongoDB backups
   - Volume snapshots
   - Log rotation

4. **Monitoring**:
   - Container health checks
   - Resource monitoring
   - Application metrics

### Troubleshooting

**Common Issues:**

1. **Port Conflicts**:
   ```bash
   # Check port usage
   netstat -tulpn | grep :5000
   
   # Change port in docker-compose.yml
   ports:
     - "5001:5000"
   ```

2. **Database Connection**:
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Test connection
   docker-compose exec app node -e "require('mongoose').connect(process.env.DATABASE_URL)"
   ```

3. **Build Issues**:
   ```bash
   # Clean build
   docker-compose down
   docker system prune -f
   docker-compose build --no-cache
   ```

4. **Permission Issues**:
   ```bash
   # Fix upload permissions
   sudo chown -R 1001:1001 ./uploads
   ```

## Local Development (Without Docker)

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your settings

# Start MongoDB (local)
mongod

# Start application
npm start

# Development mode
npm run dev
```

## API Documentation

### Authentication Endpoints
- `POST /users/api/login` - User login
- `POST /users/api/register` - User registration
- `POST /admin/api/login` - Admin login

### User Management
- `GET /users/api` - Get all users
- `GET /users/api/:id` - Get user by ID
- `PUT /users/api/:id` - Update user
- `DELETE /users/api/:id` - Delete user
- `POST /users/api/change-password` - Change password

### News Endpoints
- `GET /news/api` - Get latest news
- `GET /news/api/category/:category` - Get news by category
- `GET /news/api/search?q=query` - Search news

### Message Endpoints
- `GET /message/api` - Get all messages
- `POST /message/api` - Send message
- `PUT /message/api/:id` - Update message
- `DELETE /message/api/:id` - Delete message

## License

MIT License

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Installation
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file
4. Run `npm start`

## API Endpoints
POST /api/auth/register  
POST /api/auth/login  
GET /api/news  
POST /api/news  
PUT /api/news/:id  
DELETE /api/news/:id

## Author
Amit Muni Bajracharya
Backend Developer (Node.js/Express)
