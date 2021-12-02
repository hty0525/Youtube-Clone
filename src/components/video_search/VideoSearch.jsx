import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';



const VideoSearch = ({youtube}) => {

    let searchRoute = useNavigate();
    const searchVideo = useDispatch();
    const searchInput = useRef();

    function submitHandle(e){
        e.preventDefault();
        searchRoute('/searchVideo')
        const keyword = searchInput.current.value;
        youtube.searchId(keyword)//
        .then(item=>{
            youtube.searchVideo(item)
            .then(item=>{
                searchVideo({
                    type:'query',
                    video:item
                })
                localStorage.setItem('videosSet', JSON.stringify(item));
            })
        })
}

    return (
        <form
            onSubmit={(e)=>{submitHandle(e)}}
            className="searchForm"
            >
            <input
            placeholder='검색어를 입력해주세요'
            className='searchInput'
            type="text"
            ref={searchInput}
            />
        </form>
    );
};

export default VideoSearch;