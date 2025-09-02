import axios from "axios";
import createApp from "../../util/express-app";
import { Request, Response } from "express";
import createGiphyHandler from "../../util/create-giphy-handler";

const app = createApp();
export const handler = createGiphyHandler(app);

app.get('/giphy-search', async (req: Request, res: Response) => {
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_SEARCH_APP}&q=${req.query.searchQuery}`)
        .then(function (giphyResponse) {
            res.json(giphyResponse.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    return;
});