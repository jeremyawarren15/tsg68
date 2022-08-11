import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { EventType } from '../types/EventType';
import { Routes } from '../constants/routes';

type Props = {
  post: EventType
};

const PostCard: FunctionComponent<Props> = ({ post: { title, eventDate , description, slug}}) => {
  return (
    <Card className="bg-light">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{new Date(eventDate).toDateString()}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Link href={Routes.Events + "/" + slug} passHref>
          <Card.Link>Read More</Card.Link>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default PostCard;