import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Meeting from "./pages/Meeting";
import socket from "./utils/socketConnection";
import {useDispatch} from "react-redux";
import updateCallStatus from "./store/actions/updateCallStatus";
import {useEffect} from "react";

function App() {
    const searchParams = new URLSearchParams(window.location.search)
    const meetingId = window.location.pathname.split('video/')[1]
    const dispatch = useDispatch()



    socket.onopen = () => {
        socket.send(JSON.stringify({
            type: 'join',
            payload: {
                roomId: meetingId
            }
        }));
    }

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'newOfferWaiting') {
            dispatch(updateCallStatus('offer', data.payload.offer))
            dispatch(updateCallStatus('myrole', 'answerer'))
        }
    }


    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} exact/>
                    <Route path="/join-video/:meetingId" element={<Meeting/>} exact/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
