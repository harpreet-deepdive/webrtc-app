import React, {useState, useEffect} from 'react'
import {Dropdown} from "flowbite-react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import updateCallStatus from "../../store/actions/updateCallStatus";
import startLocalVideoStream from "./startLocalVideoStream";
import getDevices from "./getDevices";
import addStream from "../../store/actions/addStream";

const VideoButton = ({smallFeedEl}) => {
    const callStatus = useSelector(state => state.callStatus)
    const streams = useSelector(state => state.streams)
    const [pendingUpdate, setPendingUpdate] = useState(false)
    const dispatch = useDispatch()
    const [dropdownIsOpen, setDropDownIsOpen] = useState(false)
    const [videoDevicesList, setVideoDevicesList] = useState([])


    getDevices()

    function handleVideo() {
        const stream = streams.localStream.stream

        console.log(callStatus)
        if (callStatus.video === "enabled") {
            dispatch(updateCallStatus('video', "disabled"));
            const tracks = stream.getVideoTracks();
            tracks.forEach(t => t.enabled = false);
        } else if (callStatus.video === "disabled") {
            dispatch(updateCallStatus('video', "enabled"));
            const tracks = streams.localStream.stream.getVideoTracks();
            tracks.forEach(t => t.enabled = true);
        } else if (callStatus.haveMedia) {
            smallFeedEl.current.srcObject = stream
            startLocalVideoStream(streams, dispatch)
        } else {
            setPendingUpdate(true);
        }


    }


    useEffect(() => {
        if (pendingUpdate) {
            setPendingUpdate(false) // switch back to false
            smallFeedEl.current.srcObject = streams.localStream.stream
            startLocalVideoStream(streams, dispatch)
        }
    }, [pendingUpdate, callStatus.haveMedia])


    useEffect(() => {
        const fetchDevices = async () => {

            if (dropdownIsOpen) {
                const devices = await getDevices()
                setVideoDevicesList(devices.videoDevices)
            }

        }

        fetchDevices()
    }, [dropdownIsOpen])

   async function handleDeviceChange(e){
        const deviceId = e;
        const newConstraints = {
            audio: callStatus.audioDevice === "default" ? false : {deviceId: {exact: callStatus.audioDevice}},
            video: {deviceId: {exact: deviceId}}
        }
        const stream = await navigator.mediaDevices.getUserMedia(newConstraints)

       dispatch(updateCallStatus('videoDevice',deviceId));

        smallFeedEl.current.srcObject = stream

       dispatch(addStream('localStream',stream))
    }
    return (
        <>
            <button onClick={handleVideo} type="button"
                    className="ml-2 text-white bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <span>{callStatus.video === "enabled" ? "Stop" : "Start"} Video</span>
            </button>

            <Dropdown  size={'lg'} renderTrigger={() =>
                <button onClickCapture={() => setDropDownIsOpen(!dropdownIsOpen)} type="button"
                        className="ml-2 text-white bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span> Video Options</span>
                    <svg className="fill-white ml-2 w-4 h-4 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M5 13V1m0 0L1 5m4-4 4 4"/>
                    </svg>
                </button>
            }>
                {
                    videoDevicesList.length > 0 && videoDevicesList.map(device => {
                        return <Dropdown.Item key={device.deviceId} onClick={()=> handleDeviceChange(device.deviceId)} className={''}>{device.label}</Dropdown.Item>
                    })
                }

            </Dropdown>

        </>
    )
}
export default VideoButton
