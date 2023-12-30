import React from 'react'
import AudioButton from "./AudioButton";
import VideoButton from "./videoButton";
import ShareScreenButton from "./shareScreenButton";
import HangUpButton from "./hangUpButton";

const ActionsBar = ({smallFeedEl}) => {
    return (
        <div className={'flex w-full z-200 absolute bottom-0'}>
            <AudioButton smallFeedEl={smallFeedEl}/>
            <VideoButton smallFeedEl={smallFeedEl}/>
            <ShareScreenButton />
            <HangUpButton />
        </div>
    )
}
export default ActionsBar
