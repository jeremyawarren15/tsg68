import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import campBackground from '../public/camp.jpg'

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Container fluid>
          <Row style={{ color: "white", position: "relative" }}>
            <Col>
            <Image
              placeholder='blur'
              alt="Bonfire"
              src={campBackground}
              layout="fill"
              objectFit="cover"
              quality={100}
              style={{
                zIndex: -1,
                filter: "blur(3px) brightness(0.70)",
                transform: "scale(1.1)",
              }}
            />
            <Container style={{ display: "flex", minHeight: "50vh", alignItems: "center" }}>
              <Row>
                <Col sm={5}>
                  <h1>TSG - Troop 68</h1>
                  <p>"He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God."</p>
                  <p>- Micah 6:8</p>
                </Col>
              </Row>
            </Container>
            </Col>
          </Row>
        </Container>
        <Container className="py-5">
          <Row>
            <h2>What is Troops of Saint George?</h2>
            <p>Pulling from the Troops of Saint George website</p>
            <p>"The Troops of Saint George is a fraternal Catholic nonprofit apostolate for priests, men, and young men looking for a life of adventure coupled with virtue."</p>
            <p>Troop 68 is the first troop in the Indianapolis area for Troops of Saint George. Our home parish is St. John the Evangelist Catholic Church in downtown Indianapolis, but we are open to members from other parishes at this time.</p>

            <h2>Troops of St. George Mission Statement</h2>
            <p>"The Troops of Saint George apostolate aims to use the outdoors as our canvas and the sacraments as our path to light the way for the formation of Holy Catholic men and boys. Whether called to the vocation of the priesthood, the religious life, or that of Holy fatherhood, our fathers and sons will take a prayerful pilgrimage together to fulfill Christ's desire for them to grow in virtue and in their Holy Catholic faith as they journey toward heaven."</p>
          </Row>
        </Container>
      </Layout>
    </>
  )
}

export default Home
