import Layout from "../components/layout"
import { Accordion, Container, Row } from 'react-bootstrap'
import FaqType from "../types/FaqType";
import ReactMarkdown from 'react-markdown';
import { NextPageWithLayout } from "./_app";
import { GetServerSidePropsContext } from "next";
import initPocketBase from "../helpers/initPocketbase";
import authHelper from "../helpers/authHelper";
import { ReactElement } from "react-markdown/lib/react-markdown";

type Props = {
  allFaqs: FaqType[]
}

const Faq: NextPageWithLayout<Props> = ({allFaqs}) => {
  const renderQuestion = (index: number, title: string, body:any) => {
    return (
      <Accordion.Item key={title} eventKey={index.toString()}>
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>
          <ReactMarkdown>
            { body }
          </ReactMarkdown>
        </Accordion.Body>
      </Accordion.Item>
    );
  };

  const renderAllQuestions = () => {
    return allFaqs.map((question, index) => renderQuestion(index, question.title, question.body))
  }

  return (
    <Container className="my-4">
      <Row>
        <h1>FAQs</h1>
        <p>Here is a list of questions that we frequently get from people. If you have any questions about Troop 68 you are welcome to email <a href="mailto:jeremy@tsg68.org">jeremy@tsg68.org</a>.</p>
      </Row>

      <Row>
        <Accordion>
          { renderAllQuestions() }
        </Accordion>
      </Row>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pb = await initPocketBase(context);
  const faqs = await pb.collection('faqs').getFullList(undefined, {
    sort: '+title',
  })
  const allFaqs = faqs.map(faq => faq.export() as FaqType);
  return {
    props: {
      authData: authHelper(pb),
      allFaqs
    }
  }
}

Faq.getLayout = (page) => {
  return (
    <Layout authData={page.props.authData}>
      {page}
    </Layout>
  )
}

export default Faq;