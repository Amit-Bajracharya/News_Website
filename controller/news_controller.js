const axios = require("axios");

//GET THE LATEST NEWS
const getLatestNews = async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res
        .status(400)
        .json({ successful: false, message: "API key not configured" });
    }
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );

    return res.status(200).json({
      successful: true,
      message: "News Fetched Sucessfully",
      totalResults: response.data.totalResults,
      articles: response.data.articles,
    });
  } catch (error) {
    res.status(400).json({ successful: false, message: error.message });
  }
};

//GET NEWS BY CATEGORY
const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const apiKey = process.env.NEWS_API_KEY;
  
    if (!apiKey) {
      return res
        .status(400)
        .json({ successful: false, message: "API key not configured" });
    }
  
    const response = await axios.get(
       `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    );
  
    return res.status(200).json({
      successful: true,
      message: `News Fetced with ${category}`,
      totalResults: response.data.totalResults,
      articles: response.data.articles,
    });
  } catch (error) {
    res.status(400).json({successful: false, message: error.message})
  }
};

//GET NEWS BY QUERY
const getNewsByQuery = async (req, res)=>{
    try {
        const {query} = req.query
        const apiKey = process.env.NEWS_API_KEY

    if (!apiKey) {
      return res
        .status(400)
        .json({ successful: false, message: "API key not configured" });
    }

    if(!query){
        return res.status(400).json({
            successful: false, 
            message: "Please provide a search query"
        })
    }
        
    const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&sortBy=publishedAt&pageSize=20`
    )

   return res.status(200).json({
      successful: true,
      message: `Search results for "${query}"`,
      totalResults: response.data.totalResults,
      articles: response.data.articles
    });

    } catch (error) {
          res.status(400).json({successful: false, message: error.message})
    }
}

module.exports = {getLatestNews, getNewsByCategory, getNewsByQuery}
