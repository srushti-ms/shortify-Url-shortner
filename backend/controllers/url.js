import { nanoid } from "nanoid";
import Url from "../models/url.js";

export async function generateNewUrl(req, res) {
  try {
    const userId = req.user.id;
    const body = req.body;
    if (!body.redirectUrl) {
      return res.status(400).json({ error: "url required" });
    }

    let shortId = nanoid(3);
    let exists = Url.findOne({ shortId });
    while (exists) {
      shortId = nanoid(3);
      exists = await Url.findOne({ shortId });
    }

    if(req.body.days>100){
      return res.status(400).json({message: 'Days cannot be more than 100'});
    }

    const newUrl = await Url.create({
      shortId: shortId,
      user: userId,
      redirectUrl: body.redirectUrl,
      visitHistory: [],
      expires: new Date(
        Date.now() + (req.body.days == undefined ? 3 : req.body.days) * 24 * 60 * 60 * 1000
      ),
      
    });

    await newUrl.save();

    res.status(200).json({ shortId: shortId });
  } catch (error) {
    console.log(error);
  }
}

export async function redirectUrl(req, res) {

  try{
    const shortId = req.params.shortId;
    console.log(shortId);
    const url = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if(!url){
      return res.status(404).json({message: "Url not found"})
    }

    if(Date.now() > url.expires.getTime()){
      await Url.findByIdAndDelete(url._id)
      return res.status(400).json({message: "Url expired"})
    }

    return res.redirect(url.redirectUrl);
  }catch(error){
    console.error(error);
  }
}
  

export function getcount(req, res) {
  const shortId = req.params.shortId;
  Url.findOne({ shortId }).then((url) => {
    res.status(200).json({ count: url.visitHistory.length });
  });
}
