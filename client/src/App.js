import {Container, Navbar} from "react-bootstrap";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

function App() {
    return (
        <div className="mail">
            <Navbar bg="primary" variant="dark" >
                <Container>
                    <Navbar.Brand href="#home" className="text-center">Video Chat App</Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <VideoPlayer/>
                <Options>
                    <Notifications/>
                </Options>
            </Container>
        </div>
    );
}

export default App;
