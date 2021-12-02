import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Video from '../video/Video';
import './video_list.css'

const VideoList = ({youtube}) => {
    const {videos,display} = useSelector(state=>({
        videos:state.video,
        display:state.selectState[0]
    }))
    return (
        <ul className={`videoList ${display&&'listBlock'}`}>
            {
                videos.map(video =>{
                    return <Video
                        key={video.id}
                        title={video.title}
                        video={video}
                        youtube={youtube}
                    />
                })
            }
        </ul>
    );
}

export default VideoList;