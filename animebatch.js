const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeAnimeBatch() {
  try {
    const response = await axios.get('https://www.animebatch.id/');
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $('article').each(function() {
      const article = $(this);
      const title = article.find('.title').text().trim();
      const episode = article.find('.title h2').text().trim();
      const date = article.find('.title span').text().trim();
      const image = article.find('img').attr('src');
      const link = article.find('a').attr('href');

      const anime = {
        title,
        episode,
        date,
        image,
        link
      };

      articles.push(anime);
    });

    return articles;
  } catch (error) {
    console.log(error);
  }
}

module.exports = scrapeAnimeBatch;
