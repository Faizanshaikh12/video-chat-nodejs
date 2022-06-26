import {Col, Container, Row} from "react-bootstrap";
import {useContext} from "react";
import {SocketContext} from "../socket/SocketContext";

const VideoPlayer = () => {
    const {
        call, callAccepted, callEnded, stream, myVideo, userVideo, name
    } = useContext(SocketContext);
    return (<div>
            {/*our video*/}
            <Row className="p-0 m-0 mt-3">
                {stream && (<Col>
                        <h5>{name || 'Name'}</h5>
                        <video height="200px" playsInline muted ref={myVideo} autoPlay
                               className="bg-light border border-2"/>
                    </Col>)}
                {/*user video*/}
                {callAccepted && !callEnded && (<Col>
                        <h5>{call?.name || 'Name'}</h5>
                        <video height="200px" playsInline muted ref={userVideo} autoPlay
                               className="bg-light border border-2"/>
                    </Col>)}
            </Row>
        </div>)
}

export default VideoPlayer;
