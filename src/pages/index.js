import React from "react";
import FullWidthLayout from "../components/fullWidthLayout";
import Row from "react-bootstrap/Row";
import "../styles/index.module.css";

export default function Home() {
  return (
    <FullWidthLayout>
      <Row>
        <h1>Troops of Saint George Troop 68</h1>
        <p>Troop 68 is the first troop in the Indianapolis area for Troops of Saint George. Our home parish is St. John the Evangelist Catholic Church in downtown Indianapolis, but we are open to members from other parishes at this time.</p>
      </Row>
    </FullWidthLayout>
  )
}
