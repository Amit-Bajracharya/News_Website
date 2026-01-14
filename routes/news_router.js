const {getLatestNews, getNewsByCategory, getNewsByQuery} = require('../controller/news_controller.js')
const express = require('express')
const news_router = express.Router()

// LATEST NEWS
news_router.get('/', getLatestNews)

// NEWS BY CATEGORY
news_router.get('/category/:category', getNewsByCategory)

//NEWS BY SEARCH QUERY 
news_router.get('/search', getNewsByQuery)


module.exports = news_router