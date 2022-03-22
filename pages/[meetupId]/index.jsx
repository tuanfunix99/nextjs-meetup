import React, { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head';

const MeetupDetailPage = ({ meetup }) => {
  return (
    <Fragment>
       <Head>
        <title>Meetup Detail</title>
        <meta name="description" content="View detail meetup"/>
      </Head>
      <MeetupDetail
        id={meetup.id}
        image={meetup.image}
        title={meetup.title}
        address={meetup.address}
        description={meetup.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://minggu99:minggu99@cluster0.8ty0e.mongodb.net/meetupdb?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, {_id: 1}).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://minggu99:minggu99@cluster0.8ty0e.mongodb.net/meetupdb?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetupDetail = await meetupCollection.findOne({ _id: new ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetup: {
        id: meetupDetail._id.toString(),
        image: meetupDetail.image,
        title: meetupDetail.title,
        address: meetupDetail.address,
        description: meetupDetail.description,
      },
    },
    revalidate: 1,
  };
};

export default MeetupDetailPage;
