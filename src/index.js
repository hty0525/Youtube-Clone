import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import Youtube from './youtube/youtube';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import axios from 'axios';


const getYoutube = axios.create({
  baseURL:'https://youtube.googleapis.com/youtube/v3',
  params:{
    key:process.env.REACT_APP_YOUTUBE_API_KEY_C
  }//https://youtube.googleapis.com/youtube/v3/key=process.env.REACT_APP_YOUTUBE_API_KEY 이런식으로 셋팅 되있는것
})

const youtube = new Youtube(getYoutube);
// youtube.mostPop().then(item=>item.map(item=>item.snippet.channelId).join()).then(
//   item=> youtube.channel(item).then(item=>item.map(item=>channel.push(item)))
// )

let videos = [];

let selectVideo = [
    false,
    {id:null},
    {channelImg:null},
    {channelView:null},
  ];

function selectState (state=selectVideo , action){
  switch(action.type){
    case 'select' :
      selectVideo = [true,
        {id:action.videoId},
        {channelImg:action.channelImg},
        {channelView:action.channelView}
      ]
      return selectVideo
    case 'display':
      selectVideo[0] = false;
      return selectVideo
    case 'local':
      selectVideo[0] = true;
      return selectVideo
    default:
      return selectVideo
  }
}

function video (state=videos , action){
  switch (action.type) {
    case 'most':
      videos = [...action.video]
      return videos
    case 'query':
      videos =[];
      videos =[...action.video]
      return videos
    default:
      break;
  }
  return videos
}
let store = createStore(combineReducers({video,selectState}));
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App youtube={youtube}/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
