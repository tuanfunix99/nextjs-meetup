import React, { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from 'next/head';

import axios from "axios";

const NewMeetUpPage = () => {

  const onAddMeetupHandler = async (meetup) => {
    const res = await axios.post('/api/new-meetup', meetup);
    console.log(res);
  };
  
  return (
    <Fragment>
      <Head>
        <title>New Meetup</title>
        <meta name="description" content="create new meet up"/>
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetUpPage;
