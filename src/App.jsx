import React, { useEffect, memo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Route,Routes} from 'react-router-dom';
import VideoList from './components/videoList/VideoList.jsx';
import VideoPlay from './components/videoPlay/VideoPlay.jsx';
import Nav from './components/nav/Nav.jsx';


const App = memo(({youtube})=>{
  const {displayFlex} = useSelector(state=>({
    displayFlex:state.selectState[0]
  }))
  const videoSet = useDispatch();
  useEffect(()=>{
    youtube.mostPop()//
    .then(video => videoSet({
      type :'most',
      video : video
    }))
    let nowUrl = document.location.href;
    if(nowUrl.match(/searchVideo/)||nowUrl.match(/playVideo/)){
      if(nowUrl.match(/playVideo/)){
        videoSet({
          type: 'local'
        })
      }
      let localVideo = JSON.parse(localStorage.getItem('videosSet'));
      videoSet({
        type:'most',
        video: localVideo
      })
      return false;
    }
  },[])
  return (
    <div className="App">
        <Nav youtube={youtube}/>
      <Routes>
        <Route path='/'
          element={
            <>
              <VideoList youtube={youtube}/>
          </>
        }/>
        <Route path='playVideo'
          element={
            <>
              <section
                className={`videoWrap ${displayFlex&&'displayFlex'}`}>
                <VideoPlay youtube={youtube}/>
                <VideoList youtube={youtube}/>
              </section>
            </>
        }/>
        <Route path='searchVideo'
          element={
            <>
                <VideoList youtube={youtube}/>
            </>
        }/>
      </Routes>
    </div>
  );
},[])

export default App;
