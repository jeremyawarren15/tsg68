import { FunctionComponent } from "react"
import { Container, Row } from "react-bootstrap";
import Layout from "../components/layout"

const About:FunctionComponent = () => {
  return (
    <Layout>
      <Container className="my-3">
        <Row>
          <h2>Troops of St. George Mission Statement</h2>
          <p>"The Troops of Saint George apostolate aims to use the outdoors as our canvas and the sacraments as our path to light the way for the formation of Holy Catholic men and boys. Whether called to the vocation of the priesthood, the religious life, or that of Holy fatherhood, our fathers and sons will take a prayerful pilgrimage together to fulfill Christ's desire for them to grow in virtue and in their Holy Catholic faith as they journey toward heaven."</p>
        </Row>
      </Container>
    </Layout>
  );
}

export default About;