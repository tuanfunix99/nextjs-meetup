
import Card from '../ui/Card';
import Image from 'next/image';
import { useRouter } from 'next/router';

import classes from './MeetupItem.module.css';

function MeetupItem(props) {

  const router = useRouter();

  const nagigateMeetupDetailPage = (id) => {
    router.push("/" + id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={() => nagigateMeetupDetailPage(props.id)}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
