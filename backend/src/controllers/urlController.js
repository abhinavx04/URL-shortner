const Url =require('../models/url');
const shortid =require('shortid');



exports.shortenUrl = async (req ,res)=>{
const {url} = req.body;
const baseUrl =process.env.Base_URL || 'http://localhost:5000';


try{
    let urlId =shortid.generate();
    let newUrl =new Url ({
        longUrl:url,
        shortUrl :`${baseUrl}/ ${urlId}`,
        urlId,
        date :new Date()
    });
    await newUrl.save();
    res.json({
        key:urlId,
        long_url:newUrl.longUrl,
        short_url:newUrl.shortUrl,
    });
}
catch (err){
    console.error(err);
    res.status(500).json('Server error');
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
            return res.staus(404).json('no url found');
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json('Server Error');
    }
};