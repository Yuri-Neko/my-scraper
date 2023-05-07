const axios = require('axios');
const cheerio = require('cheerio');
const BaseURL = 'https://www.animebatch.id';
const Batch = async () => {
  try {
    const response = await axios.get(BaseURL);
    const html = response.data;
    const $ = cheerio.load(html);
    const posts = [];

    $('.box-blog').each(function(i, elem) {
      const postTitle = $(this).find('h2 > a').text().trim();
      const postLink = $(this).find('h2 > a').attr('href');
      const postImage = $(this).find('img').attr('src');
      const postDescription = $(this).find('.exp > p').text().trim();
      const postDate = $(this).find('.auth > i').text().trim();

      const post = {
        title: postTitle,
        link: postLink,
        image: postImage,
        description: postDescription,
        date: postDate
      };

      posts.push(post);
    });

    return posts;
  } catch (error) {
    console.log(error);
  }
}
const Ongoing = async () => {
  try {
    const response = await axios.get(BaseURL);
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
const Movie = async () => {
  try {
    const response = await axios.get(BaseURL);
    const html = response.data;
    const $ = cheerio.load(html);
    const movies = [];
    $('.widget_senction:contains("Movies") .box-blog').each((i, el) => {
      const title = $(el).find('.data h2 a').text().trim();
      const url = $(el).find('.data h2 a').attr('href');
      const image = $(el).find('.img img').attr('src');
      const desc = $(el).find('.exp p').text().trim();
      const date = $(el).find('.auth i').text().trim();

      const movie = {
        title,
        url,
        image,
        desc,
        date
      };

      movies.push(movie);
    });

    return movies;
  });
} catch (error) {
    console.log(error);
  }
}

module.exports = { Batch, Ongoing, Movie };
