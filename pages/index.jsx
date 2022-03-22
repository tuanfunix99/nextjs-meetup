import React, { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head';

const HomePage = ({ meetups }) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetup</title>
        <meta name="description" content="Browse a huge list of highly active Recat meetup" />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://minggu99:minggu99@cluster0.8ty0e.mongodb.net/meetupdb?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
