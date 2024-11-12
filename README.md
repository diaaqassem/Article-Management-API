<p align="center">
  <a href="https://nodejs.org/en/" target="blank"><img src="https://th.bing.com/th/id/R.d42672d4d185739d26257ed5c653c740?rik=dvh0VB%2fEWz20hQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fnodejs-logo-png-nice-images-collection-node-js-desktop-wallpapers-370.png&ehk=bMmyN3n62enzXql6L4A5EzHc90tJxK%2bKcr6GMACTfRk%3d&risl=&pid=ImgRaw&r=0" width="200" alt="Node.js Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nodejs/node/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nodejs/node

<p align="center">A fast, unopinionated, and minimalist <a href="https://nodejs.org/en/" target="_blank">Node.js</a> framework for building web applications and APIs with <a href="https://expressjs.com/" target="_blank">Express</a>.</p>
<p align="center">
<a href="https://www.npmjs.com/package/express" target="_blank"><img src="https://img.shields.io/npm/v/express.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/express" target="_blank"><img src="https://img.shields.io/npm/l/express.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/express" target="_blank"><img src="https://img.shields.io/npm/dm/express.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nodejs/node" target="_blank"><img src="https://img.shields.io/circleci/build/github/nodejs/node/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nodejs/node?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nodejs/node/badge.svg?branch=master" alt="Coverage" /></a>
<a href="https://discord.gg/nodejs" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/expressjs#backer" target="_blank"><img src="https://opencollective.com/expressjs/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/expressjs#sponsor" target="_blank"><img src="https://opencollective.com/expressjs/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/nodejs" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
<a href="https://opencollective.com/expressjs#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nodejs" target="_blank"><img src="https://img.shields.io/twitter/follow/nodejs.svg?style=social&label=Follow"></a>
</p>





# Article Management API

This project provides a simple **Article Management API** using **Node.js** and **Express.js**. The API supports CRUD operations for both articles and comments, as well as functionality to like an article.

---

## Project Structure

```plaintext
Article/
│
├── config/
│   └── database.config.js       # MongoDB connection configuration
│
├── controllers/
│   ├── article.controller.js    # Logic for handling article routes
│   └── comment.controller.js    # Logic for handling comment routes
│
├── models/
│   ├── article.schema.js        # Mongoose schema for Article
│   └── comment.schema.js        # Mongoose schema for Comment
│
├── routers/
│   ├── article.route.js         # Routes for Article API
│   └── comment.route.js         # Routes for Comment API
│
├── .env                         # Environment variables (e.g., MongoDB URI)
├── package.json                 # Project dependencies
├── server.js                    # Entry point of the application
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/diaaqassem/article-management-api.git
   ```

2. Install dependencies:

   ```bash
   cd article-management-api
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   MONGODB_NAME="Articles"
   ```

4. Start the server:

   ```bash
   npm start
   ```

---

## API Endpoints

### **Article Routes**

| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| GET    | `api/articles`       | Get all articles           |
| GET    | `api/articles/:id`   | Get article by ID          |
| POST   | `api/articles`       | Create a new article       |
| PUT    | `api/articles/:id`   | Update an article by ID    |
| DELETE | `api/articles/:id`   | Delete an article by ID    |
| PUT    | `api/articles/:id/like` | Like an article        |

### **Comment Routes**

| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | `api/comments`           | Create a new comment       |
| PUT    | `api/comments/:id`       | Update a comment by ID     |
| DELETE | `api/comments/:id`       | Delete a comment by ID     |

---

## Sample Requests

### 1. Get All Articles

**Request**:

```http
GET api/articles
```

**Response**:

```json
[
  {
    "_id": "articleId1",
    "title": "First Article",
    "content": "This is the content of the first article.",
    "likes": 5
  },
  {
    "_id": "articleId2",
    "title": "Second Article",
    "content": "This is the content of the second article.",
    "likes": 2
  }
]
```

### 2. Like an Article

**Request**:

```http
PUT api/articles/:id/like
```

**Response**:

```json
{
  "message": "Article liked successfully!",
  "article": {
    "_id": "articleId1",
    "title": "First Article",
    "likes": 6
  }
}
```

---

## Virtual Relation
```http
GET /api/articles/67331fb41a0233384bf12f87
```

**Response**:

```json
{
  "message": "Article liked successfully!",
  "article": {
    "_id": "articleId1",
    "title": "First Article",
    "likes": 6
    "comments": [
        {
            "_id": "673326fe9e332683f691e122",
            "content": "Excellent",
            "articleId": "67331fb41a0233384bf12f87",
            "createdAt": "2024-11-12T09:59:26.490Z",
            "updatedAt": "2024-11-12T10:01:35.675Z",
        },
        {
            "_id": "6733270c9e332683f691e124",
            "content": " very nice",
            "articleId": "67331fb41a0233384bf12f87",
            "createdAt": "2024-11-12T09:59:40.468Z",
            "updatedAt": "2024-11-12T09:59:40.468Z",
        },
     ]
  }
}
```

---

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool
- **dotenv**: For environment variable management

---
