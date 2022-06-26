import {createContext, useRef, useState, useEffect} from "react";
import * as Peer from "simple-peer";
import {io} from "socket.io-client";

const SocketContext = createContext();
const socket = io('http://localhost:5000');
const ContextProvider = ({children}) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((currentStream) => {
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });

        socket.on('me', (id) => setMe(id));

        socket.on('call', ({from, name, signal}) => {
            setCall({isReceiveCall: true, from, name, signal});
        })
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({initiator: false, trickle: false, stream});

        peer.on('signal', (data) => {
            socket.emit("answer", {signal: data, to: call.from});
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({initiator: true, trickle: false, stream});

        peer.on('signal', (data) => {
            socket.emit("call", {userToCall: id, signalData: data, from: me, name});
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }
return(
    <SocketContext.Provider value={{
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
    }}>
        {children}
    </SocketContext.Provider>
)
}
export {ContextProvider, SocketContext};
