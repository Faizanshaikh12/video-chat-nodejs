import {useContext, useState} from "react";
import {SocketContext} from "../socket/SocketContext";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {FaClipboardList, FaCopy, FaPhoneAlt, FaPhoneSlash} from "react-icons/fa";

const Options = ({children}) => {
    const {
        callAccepted,
        callEnded,
        setName,
        name,
        me,
        callUser,
        leaveCall,
    } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');

    return (
        <Container>
            <Form noValidate autoComplete="off">
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <h6>Account Info</h6>
                            <Form.Control
                                className="mb-2 w-50"
                                type="text"
                                value={name}
                                placeholder="Enter name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <CopyToClipboard text={me} className={''}>
                                <Button className="text-uppercase">
                                    <FaClipboardList className="me-2"/>
                                    Copy Your Id
                                </Button>
                            </CopyToClipboard>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <h6>Make a Call</h6>
                            <Form.Control
                                className="mb-2 w-50"
                                type="text"
                                placeholder="Id to Call"
                                value={idToCall}
                                onChange={(e) => setIdToCall(e.target.value)}
                            />
                            {callAccepted && !callEnded ? (
                                <Button className="text-uppercase" onClick={leaveCall}>
                                    <FaPhoneSlash className="me-2"/>
                                    Hang Up
                                </Button>
                            ) : (
                                <Button onClick={() => callUser(idToCall)} className="text-uppercase">
                                    <FaPhoneAlt className="me-2"/>
                                    Call
                                </Button>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            {children}
        </Container>
    )
}

export default Options;
