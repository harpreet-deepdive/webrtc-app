import updateCallStatus from "../../store/actions/updateCallStatus";

const startLocalVideoStream = (streams,dispatch) => {
const localStream = streams.localStream

    for(const s in streams){
        if(s !== "localStream") {
            const currStream = streams[s]

            localStream.stream.getVideoTracks().forEach(track => {
                currStream.peerConnection.addTrack(track, localStream.stream)
            })
        }
    }

    dispatch(updateCallStatus('video','enabled'))

}

export default startLocalVideoStream