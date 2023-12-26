import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm  from '../components/Login';
export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container>
        <Row>
          <Col lg={6} className='p-5 ' id='button-border' style={{ marginRight:'10px'}}  >
            <h1 className="text-primary mt-5">SnapSync</h1>
            <h4>
              Go-to destination for photo enthusiasts to seamlessly share and
              synchronize their snapshots with a vibrant community. Capture,
              connect, and celebrate the art of photography in a single click!
            </h4>
          </Col>
          <Col  lg={4} className='p-4'  id='button-border'>
            <div>
                {/* <Row> */}
                    <LoginForm/>
                {/* </Row> */}
                {/* <hr className="my-2 bg-secondary" /> */}

                {/* <Row className='d-flex justify-content-center mb-2'>
                    <Button style={{width:"80%"}} variant='success' id='button-border'>
                        <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/signup">
                            SignUp
                        </Link>
                    </Button>
                </Row>       */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
