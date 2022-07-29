import { ReactNode } from "react";
import { FunctionComponent } from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container";
import Image, { StaticImageData } from 'next/image'

type Props = {
    children: ReactNode
    image: StaticImageData
}

const FullWidthImageContainer: FunctionComponent<Props> = ({ children, image }) => {
    return (
        <Container fluid>
            <Row style={{ color: "white", position: "relative" }}>
                <Col>
                <Image
                    placeholder='blur'
                    alt="Bonfire"
                    src={image}
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
                    {children}
                </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default FullWidthImageContainer;