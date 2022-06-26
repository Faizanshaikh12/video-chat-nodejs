import {useContext} from "react";
import {SocketContext} from "../socket/SocketContext";
import {Button} from "react-bootstrap";

const Notifications = () => {
    const {
        call,
        callAccepted,
        callEnded,
        stream,
        myVideo,
        userVideo,
        setName,
        name,
        me,
        callUser,
        leaveCall,
        answerCall
    } = useContext(SocketContext);
    return (
        <>
            {call && call.isReceiveCall && !callAccepted && (
                <div className="d-flex justify-content-center align-items-center">
                    <h1>{call.name} is calling:</h1>
                    <Button onClick={answerCall}>
                        Answer
                    </Button>
                </div>
            )

            }
        </>
    )
}

export default Notifications;
