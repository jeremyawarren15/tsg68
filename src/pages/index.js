import React from "react";
import FullWidthLayout from "../components/fullWidthLayout";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import "../styles/index.module.css";

export default function Home() {
  return (
    <FullWidthLayout>
      <Row>
        <h1>TSG - Troop 68</h1>
        <p>Troop 68 is the first troop in the Indianapolis area for Troops of Saint George. Our home parish is St. John the Evangelist Catholic Church in downtown Indianapolis, but we are open to members from other parishes at this time.</p>
      </Row>
      <Row>
        <p>Most troops pick a number based on a bible verse that is sort of their local motto.</p>
        <Card style={{width: "30rem"}}>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                "He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God."
              </p>

              <footer className="blockquote-footer">
                Micah 6:8
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      </Row>
    </FullWidthLayout>
  );
};
