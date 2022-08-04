import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import campBackground from '../public/camp.jpg'
import FullWidthImageContainer from '../components/fullWidthImageContainer'
import PostCard from '../components/postCard';

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type Props = {
  posts: {
    frontMatter: {
      [key: string]: any
    },
    slug: string
  }[]
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <Layout>
        <FullWidthImageContainer
          image={campBackground}
          quality={65}
          alt="Bonfire"
        >
          <Row>
            <Col sm={5}>
                <h1>TSG - Troop 68</h1>
                <p>"He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God."</p>
                <p>- Micah 6:8</p>
            </Col>
          </Row>
        </FullWidthImageContainer>
        <Container className="pt-3">
          <Row>
            <h2>Welcome</h2>
            <p>Troop 68 is the first troop in the Indianapolis area for Troops of Saint George. Our home parish is St. John the Evangelist Catholic Church in downtown Indianapolis, but we are open to members from other parishes at this time.</p>
          </Row>
        </Container>
        <Container className="pb-3">
          <h2>Upcoming Events</h2>
          <Row>
            {posts.map((post, index) => (
              <Col sm={4} key={post.slug}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join('events'))
  const posts = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('events', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)
    return {
      frontMatter,
      slug: filename.split('.')[0]
    }
  })
  return {
    props: {
      posts
    }
  }
}

export default Home
