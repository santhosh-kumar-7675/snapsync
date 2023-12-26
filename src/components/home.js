import { Button, Container } from "react-bootstrap";
import {Link} from "react-router-dom";
export default function Home() {
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center text-center">
        <Container>
          <h2>User Management Application</h2>
          <h2>Welcome!</h2>
          <div className="d-flex  justify-content-center">
            <Button><Link style={{color:'inherit' , textDecoration:'none'}} to="/signup">SignUp</Link></Button>
            <Button><Link style={{color:'inherit' , textDecoration:'none'}} to="/login">Login</Link></Button>
          </div>
        </Container>
      </Container>
    </div>
  );
}
