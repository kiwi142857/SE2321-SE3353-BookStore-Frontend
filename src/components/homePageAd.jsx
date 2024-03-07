import React from 'react';
import '../css/global.css';
import { Carousel } from 'antd';

export default function HomePageAd() {
    return (
        <Carousel autoplay style={{ borderRadius: '20px' }}>
            <div >
                <img className='home-ad' src={process.env.PUBLIC_URL + '/Ad/worldBookDay1.png'} alt="worldBookDay.ad" />
            </div>
            <div >
                <img className='home-ad' src={process.env.PUBLIC_URL + '/Ad/worldBookDay2.png'} alt="worldBookDay2.ad" />
            </div>
            <div >
                <img className='home-ad' src={process.env.PUBLIC_URL + '/Ad/backToSchoolDay.png'} alt="backToSchoolDay.ad" />
            </div>
        </Carousel>
    );
}