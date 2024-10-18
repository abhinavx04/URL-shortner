const Url =require('../models/url');
const shortid =require('shortid');



exports.shortenUrl = async (req, res) => {
    const { longUrl } = req.body;
    const baseUrl = process.env.BASE_URL;
  
    try {
      console.log('Received request to shorten URL:', longUrl);
      
      let url = await Url.findOne({ longUrl });
      console.log('Existing URL found:', url);
  
      if (url) {
        res.json(url);
      } else {
        const urlId = shortid.generate();
        const shortUrl = `${baseUrl}/${urlId}`;
  
        url = new Url({
          longUrl,
          shortUrl,
          urlId,
          date: new Date()
        });
  
        console.log('Saving new URL:', url);
        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error('Error in shortenUrl:', err);
      res.status(500).json({ error: 'Server Error', details: err.message });
    }
  };
exports.redirectUrl =async (req ,res) => {
    try{
        const url = await Url.findOne({urlId:req.params.urlId});
        if(url){
            await Url.findByIdAndUpdate(url._id,{$inc : { clicks: 1}});
            return res.redirect(url.longUrl);
        }
        else{
            return res.status(404).json('no url found');
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json('Server Error');
    }
};