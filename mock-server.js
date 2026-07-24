/**
 * Mock Backend Server for Angular HTTP Application
 * 
 * This server provides mock endpoints for:
 * - User authentication (login, register, logout, refresh)
 * - Course management (CRUD operations)
 * 
 * Run with: node mock-server.js
 * Server runs on: http://localhost:3004
 */

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data storage
let users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'Admin123'
  }
];

let courses = [
  {
    id: 1,
    name: 'Angular Fundamentals',
    description: 'Learn the basics of Angular framework',
    instructor: 'John Smith',
    price: 49.99,
    duration: 40,
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/400x300/667eea/ffffff?text=📐+Angular+Fundamentals',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'TypeScript Mastery',
    description: 'Master TypeScript programming language',
    instructor: 'Jane Doe',
    price: 59.99,
    duration: 50,
    rating: 4.9,
    imageUrl: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=🔷+TypeScript+Mastery',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: 3,
    name: 'RxJS Advanced Patterns',
    description: 'Learn advanced RxJS patterns and operators',
    instructor: 'Mike Johnson',
    price: 69.99,
    duration: 45,
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/400x300/f093fb/ffffff?text=⚡+RxJS+Advanced',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  },
  {
    id: 4,
    name: 'Web Security Essentials',
    description: 'Essential web security concepts and practices',
    instructor: 'Sarah Wilson',
    price: 54.99,
    duration: 35,
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/400x300/4facfe/ffffff?text=🔒+Web+Security',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: 5,
    name: 'Python for Data Science',
    description: 'Comprehensive Python course for data analysis',
    instructor: 'David Chen',
    price: 74.99,
    duration: 60,
    rating: 4.85,
    imageUrl: 'https://via.placeholder.com/400x300/43e97b/ffffff?text=🐍+Python+DataScience',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  },
  {
    id: 6,
    name: 'React.js Complete Guide',
    description: 'Build modern web apps with React',
    instructor: 'Emma Davis',
    price: 64.99,
    duration: 55,
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/400x300/38f9d7/ffffff?text=⚛️+React.js',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 7,
    name: 'Node.js Backend Development',
    description: 'Build scalable backend applications',
    instructor: 'Alex Kumar',
    price: 59.99,
    duration: 48,
    rating: 4.75,
    imageUrl: 'https://via.placeholder.com/400x300/fa709a/ffffff?text=🟩+Node.js+Backend',
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: 8,
    name: 'Docker & Kubernetes',
    description: 'Master containerization and orchestration',
    instructor: 'Chris Thompson',
    price: 79.99,
    duration: 50,
    rating: 4.82,
    imageUrl: 'https://via.placeholder.com/400x300/30cfd0/ffffff?text=🐳+Docker+K8s',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: 9,
    name: 'GraphQL Fundamentals',
    description: 'Learn GraphQL API development',
    instructor: 'Nina Patel',
    price: 54.99,
    duration: 40,
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/400x300/a8edea/ffffff?text=📡+GraphQL+API',
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23')
  },
  {
    id: 10,
    name: 'Machine Learning Basics',
    description: 'Introduction to machine learning',
    instructor: 'Robert Zhang',
    price: 84.99,
    duration: 70,
    rating: 4.88,
    imageUrl: 'https://via.placeholder.com/400x300/ff9a56/ffffff?text=🤖+Machine+Learning',
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-24')
  },
  {
    id: 11,
    name: 'AWS Cloud Architecture',
    description: 'Design scalable AWS solutions',
    instructor: 'Lisa Anderson',
    price: 89.99,
    duration: 55,
    rating: 4.9,
    imageUrl: 'https://via.placeholder.com/400x300/feca57/ffffff?text=☁️+AWS+Cloud',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 12,
    name: 'Microservices Architecture',
    description: 'Build microservices-based systems',
    instructor: 'James Wilson',
    price: 94.99,
    duration: 60,
    rating: 4.85,
    imageUrl: 'https://via.placeholder.com/400x300/48dbfb/ffffff?text=🏗️+Microservices',
    createdAt: new Date('2024-01-26'),
    updatedAt: new Date('2024-01-26')
  },
  {
    id: 13,
    name: 'Mobile Development with Flutter',
    description: 'Create cross-platform mobile apps',
    instructor: 'Maria Garcia',
    price: 69.99,
    duration: 50,
    rating: 4.75,
    imageUrl: 'https://via.placeholder.com/400x300/ff6348/ffffff?text=📱+Flutter+Mobile',
    createdAt: new Date('2024-01-27'),
    updatedAt: new Date('2024-01-27')
  },
  {
    id: 14,
    name: 'Vue.js Complete Course',
    description: 'Master Vue.js framework',
    instructor: 'Kevin Brown',
    price: 59.99,
    duration: 45,
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/400x300/1dd1a1/ffffff?text=💚+Vue.js+Course',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28')
  },
  {
    id: 15,
    name: 'Testing and Quality Assurance',
    description: 'Comprehensive testing strategies',
    instructor: 'Patricia Lee',
    price: 64.99,
    duration: 42,
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/400x300/5f27cd/ffffff?text=✅+Testing+QA',
    createdAt: new Date('2024-01-29'),
    updatedAt: new Date('2024-01-29')
  }
];

// Mock token storage (in real app, use JWT)
const tokens = {};

// ==================== AUTH ENDPOINTS ====================

/**
 * POST /auth/register
 * Register a new user
 */
app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      error: true,
      message: 'Name, email, and password are required'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: true,
      message: 'Password must be at least 6 characters long'
    });
  }

  // Check if email already exists
  if (users.some(u => u.email === email)) {
    return res.status(409).json({
      error: true,
      message: 'Email already exists'
    });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password
  };

  users.push(newUser);

  res.status(201).json({
    error: false,
    message: 'User registered successfully',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
});

/**
 * POST /auth/login
 * Login user and return token
 */
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: 'Email and password are required'
    });
  }

  // Find user
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({
      error: true,
      message: 'Invalid email or password'
    });
  }

  // Generate mock token
  const token = `token_${user.id}_${Date.now()}`;
  tokens[token] = user.id;

  res.json({
    error: false,
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

/**
 * POST /auth/logout
 * Logout user
 */
app.post('/auth/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    delete tokens[token];
  }

  res.json({
    error: false,
    message: 'Logout successful'
  });
});

/**
 * POST /auth/refresh
 * Refresh user token
 */
app.post('/auth/refresh', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token || !tokens[token]) {
    return res.status(401).json({
      error: true,
      message: 'Invalid or expired token'
    });
  }

  const userId = tokens[token];
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(401).json({
      error: true,
      message: 'User not found'
    });
  }

  // Generate new token
  const newToken = `token_${user.id}_${Date.now()}`;
  delete tokens[token]; // Remove old token
  tokens[newToken] = user.id;

  res.json({
    error: false,
    message: 'Token refreshed',
    token: newToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

/**
 * GET /auth/userinfo
 * Get current user information (requires auth token)
 */
app.get('/auth/userinfo', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token || !tokens[token]) {
    return res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
  }

  const userId = tokens[token];
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      error: true,
      message: 'User not found'
    });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: 'ADMIN'
  });
});

// ==================== COURSES ENDPOINTS ====================

/**
 * GET /courses
 * Get all courses with pagination
 */
app.get('/courses', (req, res) => {
  const count = Math.min(parseInt(req.query.count) || 3, 10); // Max 10
  const offset = parseInt(req.query.offset) || 0;

  const paginatedCourses = courses.slice(offset, offset + count);

  res.json({
    error: false,
    data: paginatedCourses,
    count: paginatedCourses.length,
    offset,
    total: courses.length
  });
});

/**
 * GET /courses/search
 * Search courses
 */
app.get('/courses/search', (req, res) => {
  const searchTerm = (req.query.search || '').toLowerCase();
  const count = Math.min(parseInt(req.query.count) || 3, 10); // Max 10
  const offset = parseInt(req.query.offset) || 0;

  const filtered = courses.filter(c =>
    c.name.toLowerCase().includes(searchTerm) ||
    c.description.toLowerCase().includes(searchTerm) ||
    c.instructor.toLowerCase().includes(searchTerm)
  );

  const paginatedCourses = filtered.slice(offset, offset + count);

  res.json({
    error: false,
    data: paginatedCourses,
    count: paginatedCourses.length,
    offset,
    total: filtered.length
  });
});

/**
 * GET /courses/:id
 * Get single course by ID
 */
app.get('/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).json({
      error: true,
      message: 'Course not found'
    });
  }

  res.json({
    error: false,
    data: course
  });
});

/**
 * POST /courses
 * Create new course (requires auth token)
 */
app.post('/courses', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  // Check authentication
  if (!token || !tokens[token]) {
    return res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
  }

  const { name, description, price, duration, instructor, imageUrl } = req.body;

  // Validation
  if (!name || !description || !price || !duration || !instructor || !imageUrl) {
    return res.status(400).json({
      error: true,
      message: 'All fields are required'
    });
  }

  const newCourse = {
    id: courses.length + 1,
    name,
    description,
    price: parseFloat(price),
    duration: parseInt(duration),
    instructor,
    imageUrl,
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  courses.push(newCourse);

  res.status(201).json({
    error: false,
    message: 'Course created successfully',
    data: newCourse
  });
});

/**
 * PUT /courses/:id
 * Update course (requires auth token)
 */
app.put('/courses/:id', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  // Check authentication
  if (!token || !tokens[token]) {
    return res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
  }

  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).json({
      error: true,
      message: 'Course not found'
    });
  }

  // Update course
  Object.assign(course, req.body, { updatedAt: new Date() });

  res.json({
    error: false,
    message: 'Course updated successfully',
    data: course
  });
});

/**
 * DELETE /courses/:id
 * Delete course (requires auth token)
 */
app.delete('/courses/:id', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  // Check authentication
  if (!token || !tokens[token]) {
    return res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
  }

  const index = courses.findIndex(c => c.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      error: true,
      message: 'Course not found'
    });
  }

  const deletedCourse = courses.splice(index, 1);

  res.json({
    error: false,
    message: 'Course deleted successfully',
    data: deletedCourse[0]
  });
});

// ==================== ERROR HANDLING ====================

app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: 'Endpoint not found'
  });
});

// ==================== START SERVER ====================

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║   Mock Backend Server Running                         ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║   URL: http://localhost:${PORT}                      ║
║                                                        ║
║   Available Endpoints:                                ║
║   ─────────────────────────────────────────────────   ║
║   POST   /auth/register                              ║
║   POST   /auth/login                                 ║
║   POST   /auth/logout                                ║
║   POST   /auth/refresh                               ║
║                                                        ║
║   GET    /courses                                     ║
║   GET    /courses/search                             ║
║   GET    /courses/:id                                ║
║   POST   /courses                                     ║
║   PUT    /courses/:id                                ║
║   DELETE /courses/:id                                ║
║                                                        ║
║   Ready to accept requests!                          ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});
