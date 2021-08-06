import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from 'next/router'
import { Fragment } from 'react';
import Head from 'next/head';

function NewMeetupPage() {

    const router = useRouter();

    const addMeetupHandler = async (enteredMeetupData) => {

        console.log(enteredMeetupData);

        const response = await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
        router.push('/');
    };

    return <Fragment>
        <Head>
            <title>Meetups Page</title>
            <meta
            name='description'
            content='This is a page where we log our meetups' />
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>;

}

export default NewMeetupPage;