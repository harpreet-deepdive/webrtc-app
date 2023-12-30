import peerConfiguration from "./stunServers";

const createPeerConnection = () => {

    return new Promise(async (resolve, reject) => {
        const peerConnection = await new  RTCPeerConnection(peerConfiguration)

        const remoteStream= new MediaStream()

        peerConnection.addEventListener('signalingstatechange',e => {
            console.log('signaling state changed')
            console.log(e)
        })

        peerConnection.addEventListener('icecandidate',e => {
            console.log('found ice candidates')

            if(e){

            }
        })

        resolve({
            peerConnection,
            remoteStream
        })
    })



}

export default createPeerConnection