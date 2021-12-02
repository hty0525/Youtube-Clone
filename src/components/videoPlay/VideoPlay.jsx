import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './video_play.css'

const VideoPlay = () => {
    let {videos,videoId,channelImg,channelView} = useSelector(state=>({
        videos:state.video,
        videoId:state.selectState[1].id,
        channelImg:state.selectState[2].channelImg,
        channelView:state.selectState[3].channelView
    }))
    if(videoId!=null){
        localStorage.setItem('videosSet', JSON.stringify(videos));
        localStorage.setItem('videoIdSet', JSON.stringify(videoId));
        localStorage.setItem('channelImg', JSON.stringify(channelImg));
        localStorage.setItem('channelView', JSON.stringify(channelView));
    }
    let localVideo = JSON.parse(localStorage.getItem('videosSet'));
    let localId = videoId? videoId : JSON.parse(localStorage.getItem('videoIdSet'));
    let channelLogo = channelImg? channelImg : JSON.parse(localStorage.getItem('channelImg'));
    let channel = channelView? channelView : JSON.parse(localStorage.getItem('channelView'));

    let copy = videoId? [...videos]:[...localVideo]
    const {snippet,statistics} = copy.filter(item=>item.id==localId)[0];
    //새로고침 했을때 로컬스토리지에 배열저장해놓고 나중에 씀

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

    let [more,setMore] = useState(false);

    function moreText(){
        let moreText = document.querySelector('.moreText');

        if(!more){
            moreText.innerHTML='간략히'
        }else{
            moreText.innerHTML='더보기'
        }
        setMore(!more);
    }

    return (
        <div className='videoPlayWrap'>
            <iframe
            src={`https://www.youtube.com/embed/${localId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
            </iframe>
            <div className="videoText">

                <h1 className="videoTitle">
                    {snippet.title}
                </h1>
                <div className="videoViewEtc">
                    <p className="view">
                        <span>조회수 {Number(statistics.viewCount).toLocaleString('ko-KR')}회</span>
                        <span>{`${getDay.year}년 ${getDay.month}월 ${getDay.day}일`}</span>
                    </p>
                    {/* <p className="like">
                        <span>{statistics.likeCount}</span>ㅁㅁㅁㅁㅁ
                        <span>{statistics.dislikeCount}</span>
                    </p> */}
                </div>
                <div className="channelInfo">
                    <img src={channelLogo} alt="채널 로고" />
                    <div className="channelView">
                        <p>{snippet.channelTitle}</p>
                        <p>{view(channel)}명</p>
                    </div>
                </div>
                {snippet.description&&//
                    <p className={`description ${more&&'more'}`}>{snippet.description}</p>
                }
                    {snippet.description&&<p className='moreText' onClick={moreText}>더보기</p>}
            </div>
        </div>
    );
};
export default VideoPlay;