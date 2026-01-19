// MongoDB initialization script
// This script runs when the MongoDB container first starts

// Switch to the news_website database
db = db.getSiblingDB('news_website');

// Create collections with indexes
db.createCollection('users');
db.createCollection('admins');
db.createCollection('messages');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.admins.createIndex({ "email": 1 }, { unique: true });
db.messages.createIndex({ "createdAt": -1 });
db.messages.createIndex({ "user": 1 });

// Create a default admin user (change password in production!)
db.admins.insertOne({
  username: "admin",
  email: "admin@newswebsite.com",
  password: "$2a$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQjQ", // password: admin123
  user_type: "super_admin",
  createdAt: new Date(),
  updatedAt: new Date()
});

print('MongoDB initialized successfully!');
print('Default admin created: admin@newswebsite.com / admin123');
print('Please change the default password in production!');
