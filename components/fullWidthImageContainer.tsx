import { ReactNode } from "react";
import { FunctionComponent } from "react";
import { Row, Col, Container } from 'react-bootstrap'
import Image, { StaticImageData } from 'next/image'

type Props = {
    children: ReactNode
    image: StaticImageData
    quality?: string | number
    alt?: string
}

const FullWidthImageContainer: FunctionComponent<Props> = ({ children, image, quality, alt }) => {
    return (
        <Container fluid>
            <Row style={{ color: "white", position: "relative" }}>
                <Col>
                    <Image
                        placeholder='blur'
                        alt={alt}
                        src={image}
                        layout="fill"
                        objectFit="cover"
                        quality={quality}
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