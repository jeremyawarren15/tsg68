import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../styles/index.css";
import DefaultLayout from "../components/defaultLayout";
import styled from "styled-components";
import { graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";
const CampBackgroundImage = styled(BackgroundImage)`
  opacity: 1 !important;
  background-size: cover;
  background: radial-gradient(
    rgba(0,0,0,0.25) 0%,
    rgba(0,0,0,.65) 100%
  );
  background-size: cover;
`;

export default function Home({ data }) {
  return (
    <DefaultLayout>
      <Container fluid ps-0>
        <Row style={{color: "white"}}>
          <CampBackgroundImage
            fluid={data.file.childImageSharp.fluid}
          >
            <div style={{padding: "10rem"}}>
              <h1>TSG - Troop 68</h1>
              <p style={{maxWidth: "35rem"}}>"He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God."</p>
              <p>- Micah 6:8</p>
            </div>
          </CampBackgroundImage>
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
    </DefaultLayout>
  );
};

export const query = graphql`
  query {
    file(relativePath: {eq: "camp.jpg"}) {
      id
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`