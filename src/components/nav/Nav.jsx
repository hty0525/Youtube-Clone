import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import VideoSearch from '../video_search/VideoSearch';
import './nav.css'
import logo from './logo.png'

const Nav = ({youtube}) => {
    const videoDisplay = useDispatch()
    function selectVideo(){
        youtube.mostPop()//
        .then(item=>videoDisplay({
            type:'most',
            video:item
        }))
    }

    return (
        <nav className='nav'>
            <Link to='/'
                onClick={selectVideo}
                >
                <h1>
                    <img src={logo} alt="youtube logo" />
                    <span>Youtube</span>
                </h1>
            </Link>
            <VideoSearch youtube={youtube}/>
        </nav>
    );
};

export default Nav;