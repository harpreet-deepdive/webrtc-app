import React, {useEffect, useState, useRef} from "react";
import addStream from "../store/actions/addStream";
import {useDispatch,useSelector} from "react-redux";
import createPeerConnection from "../utils/createPeerConnection";
import ActionsBar from "../components/ActionsBar";
import socket from "../utils/socketConnection";
import updateCallStatus from "../store/actions/updateCallStatus";


const Home = () => {
    const largeFeedEl = useRef()
    const smallFeedEl = useRef()
    const dispatch = useDispatch()
    const meetingId = window.location.pathname.split('video/')[1]
    const [apptInfo, setApptInfo] = useState({
        meetingId:meetingId
    })
    const callStatus = useSelector(state=>state.callStatus)
    const streams = useSelector(state=>state.streams)

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const constraints = {
                    video: true,
                    audio: false
                }
                const stream = await navigator.mediaDevices.getUserMedia(constraints)

                // smallFeedEl.current.srcObject = stream

                dispatch(addStream('localStream', stream))

                const {
                    peerConnection,
                    remoteStream
                } = await createPeerConnection()

                dispatch(addStream('remote1', remoteStream, peerConnection))

            } catch (err) {
            }
        }

        fetchMedia()
    }, []);


    useEffect(() => {
        const createOfferAsync = async () => {
            for (const s in streams) {
                if (s !== "localStream") {
                    try {
                        const pc = streams[s].peerConnection;
                        const offer = await pc.createOffer()
                        pc.setLocalDescription(offer);

                        //get the socket from socketConnection

                        socket.send(JSON.stringify({
                            type: 'newOffer',
                            payload: {
                                newOffer: {
                                    offer,
                                    apptInfo
                                }
                            }
                        }))
                        //add our event listeners
                    } catch (err) {
                        console.log(err);
                    }

                }
            }
            dispatch(updateCallStatus('haveCreatedOffer', true));
        }
        if ( callStatus.video === "enabled" && !callStatus.haveCreatedOffer) {
            createOfferAsync()
        }
    }, [callStatus.audio, callStatus.video, callStatus.haveCreatedOffer])


    useEffect(()=>{
        const setAsyncOffer = async()=>{

          for(const s in streams){
              if(s !== 'localstream'){
                  const pc = streams[s].peerConnection

                  await pc.setRemoteDescription(callStatus.offer)
              }
          }
        }
        if(callStatus.offer && streams.remote1 && streams.remote1.peerConnection){
            setAsyncOffer()
        }
    },[callStatus.offer,streams.remote1])

    useEffect(() => {

        const createAnswerAsync = async() => {
            console.log('im running i`dont know why')

            for(const s in streams){
                if(s !== 'localStream'){
                    const pc = streams[s].peerConnection
                    console.log('sending answer')
                    const answer = await pc.createAnswer()
                    await pc.setLocalDescription(answer)

                    dispatch(updateCallStatus('haveCreatedAnswer',true))
                    dispatch(updateCallStatus('answer',answer))

                    const meetingId = window.location.pathname.split('video/')[1]
                    socket.send(JSON.stringify({
                        type:'newAnswer',
                        payload:{
                            answer,
                            roomId: meetingId

                        }
                    }))

                }
            }
        }


        if(!callStatus.haveCreatedOffer && callStatus.video === "enabled" && !callStatus.haveCreatedAnswer){
            createAnswerAsync()
        }
    }, [callStatus.audio, callStatus.video, callStatus.haveCreatedAnswer]);


    return <div className={'flex h-[100vh] gap-4 w-full overflow-hidden p-4 roundex-xl'}>
        <div className={'h-full w-2.3/3 relative rounded-xl overflow-hidden'}>
            <video id="large-feed" className={'w-full h-full z-1 bg-gray-400  '} ref={largeFeedEl} autoPlay
                   playsInline></video>
            <video id="own-feed" className={'absolute bg-gray-700 right-10 top-8 w-60 h-auto rounded-xl z-100'}
                   ref={smallFeedEl}
                   autoPlay></video>
            <ActionsBar smallFeedEl={smallFeedEl}/>
        </div>
        <div className={'h-full w-1/3  flex flex-col gap-4'}>
            <div className={'bg-white border  p-4 w-full h-full  rounded-xl '}>
                <h4 className={'font-bold text-xl'}>Participants</h4>
            </div>
            <div className={'bg-white  border w-full p-4 h-full rounded-xl'}>
                <h4 className={'font-bold text-xl'}>Live Chat</h4></div>
        </div>
    </div>

};
export default Home;
