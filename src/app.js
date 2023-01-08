import express from "express";
import cors from 'cors';

const TWEETS = [];
const USERS = [];
const PORT = 5000;
const MAXTWEETS = 10;
const server = express();
server.use(cors());
server.use(express.json());

server.post("/sign-up", (req, res) =>{
    const userdata = req.body
    if(!userdata.username || !userdata.avatar) return res.status(400).send("Todos os campos são obrigatórios!")

    USERS.push(userdata);
    return res.status(201).send("CREATED");
})

server.get("/tweets", (req, res) => {
    const page = req.query.page ? Number(req.query.page):1;
    const tweets = [];
    const max = TWEETS.length < MAXTWEETS * page ? TWEETS.length : MAXTWEETS * page;
    const min = (MAXTWEETS * (page - 1)) + 0;

    if(page < 1) return res.status(400).send("Informe uma página válida!");
    for(let i = min; i < max; i++){
        const tweetAvatar = USERS.find(element => element.username === TWEETS[i].username).avatar
        tweets.push({
            ...TWEETS[i],
            avatar: tweetAvatar
        })
        tweets.reverse();
    }
    return res.send(tweets);
})

server.get("/tweets/:username", (req,res) => {
    const username = req.params.username;
    const tweets = []
    let tweetUser = TWEETS.filter((t) => t.username === username);
    const avatar = USERS.find(u => u.username === tweetUser[0].username).avatar;
    for (let i = tweetUser.length - 1; i >= 0; i--) {
        tweets.push({
          username: tweetUser[i].username,
          avatar: avatar,
          tweet: tweetUser[i].tweet,
        });
    }

    tweets.reverse();
    res.status(201).send(tweets);
})

server.post("/tweets", (req, res) => {  
    const username = req.header("user");
    const tweet = req.body;
    if(!username || !tweet) return res.status(400).send("Todos os campos são obrigatórios!")
    if(!USERS.find((e) => e.username === username)) return res.status(401).send("UNAUTHORIZED");
    TWEETS.push({
        username,
        tweet: tweet.tweet,
        id: TWEETS.length + 1});
    res.status(201).send("CREATED");
})

server.listen(5000, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
  })