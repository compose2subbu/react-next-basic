// /api/new-meetup
//mongodb+srv://devsubbu:<password>@rajucluster.lmjsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if(req.method == 'POST') {
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://devsubbu:learnisfun@rajucluster.lmjsq.mongodb.net/meetupDB?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        console.log(data);
        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({message: 'insert done!'});
    }
}

export default handler;