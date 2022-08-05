import type { NextPage } from 'next'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import PostCard from '../../components/postCard';

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from '../../components/layout';

type Props = {
  upcomingEvents: {
    frontMatter: {
      [key: string]: any
    },
    slug: string
  }[],
  expiredEvents: {
    frontMatter: {
      [key: string]: any
    },
    slug: string
  }[]
};

const EventsIndex: NextPage<Props> = ({ upcomingEvents, expiredEvents }) => {
    const renderUpcomingEvents = () => {
      if (upcomingEvents.length < 1) return (<h4>There are no upcoming events scheduled</h4>);

      return upcomingEvents.map((post) => (
          <Col sm={4} key={post.slug} className="mb-3">
              <PostCard post={post} />
          </Col>
      ));
    };

    const renderPastEvents = () => {
      if (expiredEvents.length < 1) return;

      return (
        <>
          <h1 className="my-4">Past Events</h1>
          {expiredEvents.map((post) => (
            <Col sm={4} key={post.slug} className="mb-3">
                <PostCard post={post} />
            </Col>
          ))}
        </>
      );
    }

    return (
        <Layout>
            <Container>
                <Row>
                  <h1 className="my-4">Upcoming Events</h1>
                  {renderUpcomingEvents()}
                </Row>
                <Row>
                  {renderPastEvents()}
                </Row>
            </Container>
        </Layout>
    );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('events'))
  const allPosts =
    files
      .map(filename => {
        const markdownWithMeta = fs.readFileSync(path.join('events', filename), 'utf-8')
        const { data: frontMatter } = matter(markdownWithMeta)
        return {
          frontMatter,
          slug: filename.split('.')[0]
        }
      })
      .sort((a, b) => new Date(a.frontMatter.date).getTime() - new Date(b.frontMatter.date).getTime())

  const upcomingEvents = allPosts.filter(post => new Date(post.frontMatter.date) >= new Date());
  const expiredEvents = allPosts.filter(post => new Date(post.frontMatter.date) < new Date());

  return {
    props: {
      upcomingEvents,
      expiredEvents
    }
  }
}

export default EventsIndex;