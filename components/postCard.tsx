import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/Link';
import { FunctionComponent } from 'react';

type Props = {
  post: {
    frontMatter: {
      [key: string]: any
    },
    slug: string
  }
};

const PostCard: FunctionComponent<Props> = ({ post: { frontMatter, slug } }) => {

    return (
      <Card style={{ width: '18rem' }}>
          <Card.Body>
              <Card.Title>{frontMatter.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{frontMatter.date}</Card.Subtitle>
              <Card.Text>{frontMatter.description}</Card.Text>
              <Link href={"/events/" + slug} passHref>
                <Card.Link>Read More</Card.Link>
              </Link>
          </Card.Body>
      </Card>
    );
}

export default PostCard;