import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from "../../components/layout";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FunctionComponent } from 'react';

type Props = {
    frontMatter: any,
    slug: string,
    mdxSource: any
}

const EventPage: FunctionComponent<Props> = ({frontMatter: { title, date }, slug, mdxSource}) => {
    return (
        <Layout>
            <Container className='my-4'>
                <Row>
                    <h1>{title}</h1>
                    <h3 className='text-muted'>{date}</h3>
                    <hr />
                </Row>
                <Row>
                    <Col sm={8}>
                        <MDXRemote {...mdxSource}  />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export const getStaticPaths = async () => {
    const files = fs.readdirSync(path.join('events'))
    const paths = files.map(filename => ({
      params: {
        slug: filename.replace('.mdx', '')
      }
    }))
    return {
      paths,
      fallback: false
    }
  }

  export const getStaticProps = async ({ params: { slug } }) => {
    const markdownWithMeta = fs.readFileSync(path.join('events',
      slug + '.mdx'), 'utf-8')
    const { data: frontMatter, content } = matter(markdownWithMeta)
    const mdxSource = await serialize(content)
    return {
      props: {
        frontMatter,
        slug,
        mdxSource
      }
    }
  }

export default EventPage;