import Layout from "../components/layout"
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const Faq = () => {
  return (
    <Layout>
      <Container className="my-4">
        <Row>
          <h1>FAQs</h1>
          <p>Here is a list of questions that we frequently get from people. If you have any questions about Troop 68 you are welcome to email <a href="mailto:jeremy@tsg68.org">jeremy@tsg68.org</a> or <a href="mailto:micah@tsg68.org">micah@tsg68.org</a>.</p>
        </Row>
        <Row>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>How old must my son be to join?</Accordion.Header>
              <Accordion.Body>
                <p>
                  Boys ages 6-18 are welcome to join. 6-10 year olds are junior cadets and 11-18 year olds are senior cadets.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How much does it cost?</Accordion.Header>
              <Accordion.Body>
                <p>
                  Right now we are not charging local dues. National dues are $40 per person joining with a cap of $120.
                </p>
                <ul>
                  <li>Father and 1 son: $80</li>
                  <li>Father and 2+ sons: $120</li>
                </ul>
                <p>
                  Since we are not charging local dues we are going to have each person be responsible for their own expenses at events. This will likely change as we mature as a troop.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>How often will you be meeting?</Accordion.Header>
              <Accordion.Body>
                <p>
                  We are planning on having two meetings a month. One that is a sort of learning session and the other will be an outing. For the first year we are planning on having two campouts.
                </p>
                <p>
                  We have not set defined days for our gatherings yet, as we get started we will find a stable schedule and report that information here.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Where will you be meeting?</Accordion.Header>
              <Accordion.Body>
                <p>
                  For right now, our meetings will be at the homes of one of the troop members. It's possible that this will change, but this keeps our operating costs down and helps people share the travel time.
                </p>
                <p>
                  Locations for the outings will depend on what we will be doing that day. But will not exceed more than 1 hour drive time from Indianapolis. I expect that the actual drive time will actually be nowhere near 1 hour.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>What options are there for my son if he has no father?</Accordion.Header>
              <Accordion.Body>
                <p>
                  The Troops of Saint George is a father/son organization and generally requires fathers to accompany their sons to all TSG events. However, we do recognize that there are circumstances where a father has either passed away or is no longer present. For these situations you will need to fill out the Parental Power of Attorney Form and give it to the troop Captain.
                </p>
                <p>
                  The Parental Power of Attorney Form is a recognition that another person may stand in as a legal guardian for your son as if he was his father. Please take care to read and understand fully what is being signed over with the Parental Power of Attorney Form before you do so. Filling out this form will allow your son to be able to stay overnight with his guardian.
                </p>
                <a href="/parental-power-of-attorney.pdf">Parental Power of Attorney Form</a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>What if I am not able to attend a meeting with my son?</Accordion.Header>
              <Accordion.Body>
                <p>
                  The Troops of Saint George is a father/son organization and generally requires fathers to accompany their sons to all TSG events. However, we do recognize that there are times when a father may not be able to attend an event, but still wish for their son to. For these situations you will need to fill out the Parental Authorization Form and give it to the troop Captain.
                </p>
                <p>
                  The Parental Recognition is a recognition that someone else may temporarily stand in for a single event when a father is not able to be present. Please take care to read and understand fully what is being signed over with the Parental Authorization Form before you do so. Filling out this form will not allow the designated chaperone to stay overnight with your son. If there is an overnight event, your son will need to be picked up by the appropriate person before or at lights out.
                </p>
                <p>
                  The chaperone for your child must be male.
                </p>
                <a href="/parental-authorization-form.pdf">Parental Authorization Form</a>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>Can my son and I join if we are not St. John's parishioners?</Accordion.Header>
              <Accordion.Body>
                <p>
                  Yes. While we are sponsored by St. John the Evangelist you are not required to be a parishioner there. You just have to be a Catholic man in good standing with the Catholic Church.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
      </Container>
    </Layout>
  )
}

export default Faq;