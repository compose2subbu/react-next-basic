
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';
import Head from 'next/head'

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Chennai_-_bird%27s-eye_view.jpg',
//         address: '6, Marina Beach, Chennai',
//         description:'This is a description for first meetup'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Chennai_High_Court.jpg/1280px-Chennai_High_Court.jpg',
//         address: '8, High Court, Chennai',
//         description: 'This is a description for second meetup'
//     }
// ];

function HomePage(props)  {

    //const [loadedMeetups, setLoadedMeetups] = useState([]);

    //

    return <Fragment>
        <Head>
            <title>Meetups Page</title>
            <meta
            name='description'
            content='This is a page where we log our meetups' />
        </Head>
        <MeetupList meetups={props.meetups}/>
        </Fragment>;
}

// export async function getServerSideProps(context) {

//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb+srv://devsubbu:learnisfun@rajucluster.lmjsq.mongodb.net/meetupDB?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const meetups = await meetupsCollection.find().toArray();
        console.log(meetups);

        client.close();



    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    };
}

export default HomePage;