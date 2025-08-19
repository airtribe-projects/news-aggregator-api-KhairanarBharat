const axios = require('axios');
const getNews = async (req, res) => {
    try {
        const news = await getNewsFromAPI();
        res.status(200).send({ news });
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

const getNewsFromAPI = async () => {
    const response = await axios.get(process.env.NEWS_API_URL);
    return response.data.articles;
};

module.exports = {
    getNews
};