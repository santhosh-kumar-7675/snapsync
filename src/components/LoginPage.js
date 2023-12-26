import { Container } from "react-bootstrap";
import LoginForm from './Login';
export default function LoginPage(){
    return(
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Container id="button-border" style={{ maxWidth: '400px' }}>
                <LoginForm/>
            </Container>      
        </Container>
    );
}