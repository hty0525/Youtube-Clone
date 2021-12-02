import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Video = ({youtube,video,video:{snippet},video:{statistics}}) => {
    const setVideo = useDispatch();

    let palyVideo = useNavigate();
    const [channelBanner,setBanner] = useState(null);
    const [channel,setChannel] = useState(null);
    let uploadDay = new Date(snippet.publishedAt);

    let getDay ={
        year : uploadDay.getFullYear(),
        month : ('0' + (uploadDay.getMonth() + 1)).slice(-2),
        day : ('0' + uploadDay.getDate()).slice(-2)
    };
    function view(view){
        let count = view.length;
        if(count<4){
            return `${view.substring(0,3)}`;
        }
        if(count<5){
            return `${view.substring(0,1)}천`;
        }if(count<6){

            return `${view.substring(0,1)}만`;
        }
        if(count<7){
            return `${view.substring(0,2)}만`;
        }
        if(count<8){
            return `${view.substring(0,3)}만`;
        }
        if(count<9){
            return `${view.substring(0,4)}만`;
        }
        if(count<10){
            return `${view.substring(0,5)}만`;
        }
        return 4
    };

    let channelId = snippet.channelId;
    useEffect(()=>{
        youtube.channelId(channelId)//
        .then(item=>{
            setBanner(item[0].snippet.thumbnails.medium.url);
            setChannel(item[0].statistics.subscriberCount);
        })
    },[])

    const selectVideo = ()=>{
        setVideo({
            type:'select',
            videoId:video.id,
            channelImg:channelBanner,
            channelView:channel
        })

        palyVideo('/playVideo');
        setTimeout(()=>{
            window.scrollTo(0,0)
        },500)
    }    

    return (
        <li
            onClick={selectVideo}>
            <div className="imgBox">
                <img src={snippet.thumbnails.medium.url} alt="" />
            </div>
            <div className="textBox">
            <img src={channelBanner} alt="" />
                <div className="videoInfo">
                    <p className='videoTitle'>{snippet.title}</p>
                    <p className='videoChannelId'>{snippet.channelTitle}</p>
                    <p className='videoView'>{view(statistics.viewCount)}회</p>
                    <p>{`${getDay.year}년 ${getDay.month}월 ${getDay.day}일`}</p>
                </div>
            </div>
        </li>
    );
};

export default Video;