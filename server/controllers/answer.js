

// exports.getAllanswer = async (req, res) => {
//     try {
//         const { question, orderby, sortby } = req.body;

//         // Fetch data from StackOverflow
//         const stackResponse = await fetch(`https://api.stackexchange.com/2.3/search/advanced?order=${orderby}&sort=${sortby}&q=${question}&site=stackoverflow`);
//         const stackData = await stackResponse.json();

//         // Fetch data from Reddit
//         const redditResponse = await fetch(`http://www.reddit.com/search.json?q=${question}&sort=${sortby}&order=${orderby}`);
//         const redditData = await redditResponse.json();

//         // Send response
//         res.status(200).send({
//             status: 200,
//             message: 'Data fetched successfully',
//             stackdata: stackData,
//             redditdata: redditData
//         });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send({
//             status: 500,
//             message: 'An error occurred while fetching data',
//             error: error.message
//         });
//     }
// };

const axios = require('axios');

// exports.getAllanswer = async (req, res) => {
//     console.log("hello from backed");
//     try {
//         const { question, sortby, orderby } = req.params;

//         // Fetch data from StackOverflow
//         const stackResponse = await axios.get(`https://api.stackexchange.com/2.3/search/advanced`, {
//             params: {
//                 q: question,
//                 order: sortby,
//                 sort: orderby,
//                 site: 'stackoverflow'
//             }
//         });

//         // Fetch data from Reddit
//         const redditResponse = await axios.get(`http://www.reddit.com/search.json`, {
//             params: {
//                 q: question,
//                 sort: orderby
                
//             }
//         });

//         const redditPosts = redditResponse.data.data.children.map(post => {
//             return {
//                 title: post.data.title,
//                 author: post.data.author,
//                 url: post.data.url,
//                 score: post.data.score,
//                 subreddit: post.data.subreddit
//             };
//         });

//         // Log the data to the console
//        console.log("stackdata", stackResponse.data);
//         console.log("redditdata", redditPosts);

//         // Send response
//         res.status(200).send({
//             status: 200,
//             message: 'Data fetched successfully',
//             stackdata:stackResponse.data,
//             redditdata: redditPosts
//         });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).send({
//             status: 500,
//             message: 'An error occurred while fetching data',
//             error: error.message
//         });
//     }
// };






  
const Redis = require("ioredis");

const redisClient = new Redis("rediss://default:AVEVAAIjcDFkZWZlNDE0MTE2YTQ0Zjc4YWVlZDAzZmNhNGE3NzQ3ZXAxMA@loving-gazelle-20757.upstash.io:6379");

exports.getAllanswer = async (req, res) => {
    console.log("Hello from backend");

    try {
        const { question, sortby, orderby } = req.params;
        const cacheKey = `qa:${question}:${sortby}:${orderby}`;

        // Check if the data is available in the cache
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            console.log("Returning data from Redis cache");
            return res.status(200).send({
                status: 200,
                message: 'Data fetched successfully from cache',
                ...JSON.parse(cachedData)
            });
        }

        // If not in cache, fetch data from StackOverflow
        const stackResponse = await axios.get(`https://api.stackexchange.com/2.3/search/advanced`, {
            params: {
                q: question,
                order: sortby,
                sort: orderby,
                site: 'stackoverflow'
            }
        });

        // Fetch data from Reddit
        const redditResponse = await axios.get(`http://www.reddit.com/search.json`, {
            params: {
                q: question,
                sort: orderby
            }
        });

        const redditPosts = redditResponse.data.data.children.map(post => ({
            title: post.data.title,
            author: post.data.author,
            url: post.data.url,
            score: post.data.score,
            subreddit: post.data.subreddit
        }));

        // Combine both responses
        const dataToCache = {
            stackdata: stackResponse.data,
            redditdata: redditPosts
        };

        // Log the data to the console
        console.log("StackOverflow data", stackResponse.data);
        console.log("Reddit data", redditPosts);

        // Store the combined data in Redis with an expiration time (e.g., 1 hour)
        await redisClient.set(cacheKey, JSON.stringify(dataToCache), 'EX', 3600);

        // Send response
        res.status(200).send({
            status: 200,
            message: 'Data fetched successfully',
            ...dataToCache
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send({
            status: 500,
            message: 'An error occurred while fetching data',
            error: error.message
        });
    }
};
