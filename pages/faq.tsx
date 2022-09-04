import { ReactNode } from "react";
import Layout from "../components/layout"
import { Accordion, Container, Row } from 'react-bootstrap'
import { getAllFaqs } from '../services/faqService';
import FaqType from "../types/FaqType";
import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown';
import { NextPageWithLayout } from "./_app";

type Props = {
  faqs: FaqType[]
}

const Faq: NextPageWithLayout<Props> = ({ faqs }) => {
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
    return faqs.map((question, index) => renderQuestion(index, question.title, question.body))
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

export const getStaticProps:GetStaticProps = async () => {
  const allFaqs = await getAllFaqs();
  const faqs = allFaqs.sort((a, b) => a.title.localeCompare(b.title));

  return {
    props: {
      faqs
    }
  }
}

Faq.getLayout = (page: ReactNode) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Faq;