//dari sc neoxr

const axios = require('axios');

async function generateQuoteImage(text, pic, name) {
   const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": "#FFFFFF",
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": name,
            "photo": {
               "url": pic
            }
         },
         "text": text,
         "replyMessage": {}
      }]
   };

   try {
      const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
         headers: {
            'Content-Type': 'application/json'
         }
      });
      return json.data.result.image;
   } catch (error) {
      console.log(error);
      throw new Error("Unable to generate sticker.");
   }
}

module.exports = {
   generateQuoteImage
};
