const axios = require('axios');
const cheerio = require('cheerio');
const BaseURL = 'https://www.animebatch.id';

async function Batch() {
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

async function Ongoing() {
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

async function Movie() {
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
  } catch (error) {
    console.log(error);
  }
}


async function Detail(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('h1.entry-title').text();
    const thumb = $('img[itemprop="image"]').attr('src');
    const episodeCount = $('span.Episodex').text().replace('Jumlah Episode ', '');
    const releaseDate = $('span:contains("Tanggal Rilis")').text().replace('Tanggal Rilis ', '');
    const duration = $('span:contains("Movies") .box-blog').each((i, el) => {
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


async function Detail(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('h1.entry-title').text();
    const thumb = $('img[itemprop="image"]').attr('src');
    const episodeCount = $('span.Episodex').text().replace('Jumlah Episode ', '');
    const releaseDate = $('span:contains("Tanggal Rilis")').text().replace('Tanggal Rilis ', '');
    const duration = $('span:contains("Durasi per Episode")').text().replace('Durasi per Episode ', '');
    const score = $('span.Scorex').text().replace('Skor ', '');
    const views = $('span:contains("Dilihat")').text().replace('Dilihat ', '');
    const genre = $('span.Genrex').text().replace('Genre ', '').replace(/[\r\n\t]+/g, '');
    const studio = $('span.Studiox').text().replace('Studio', '').replace(/[\r\n\t]+/g, '');
    const season = $('span:contains("Musim Rilis")').text().replace('Musim Rilis ', '');
    const status = $('span:contains("Status Anime")').text().replace('Status Anime ', '');
    const description = $('div.downman p').text();

    const downloadList = [];

    $('h4').each(function(i, elem) {
      const episode = $(this).text().trim();
      const episodeDownloads = [];

      $(this).siblings('ul').find('li').each(function() {
        const quality = $(this).find('strong').text().trim();
        const links = $(this).find('span a').map(function() {
          return $(this).attr('href');
        }).get();

        episodeDownloads.push({
          quality,
          links
        });
      });

      downloadList.push({
        episode,
        episodeDownloads
      });
    });

    return {
      title,
      thumb,
      episodeCount,
      releaseDate,
      duration,
      score,
      views,
      genre,
      studio,
      season,
      status,
      description,
      downloadList
    };

  } catch (error) {
    console.log(error);
  }
}


module.exports = { Batch, Ongoing, Movie, Detail };
