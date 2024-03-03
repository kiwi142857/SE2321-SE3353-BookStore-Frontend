import React from 'react';
import '../css/global.css';
import { Carousel } from 'antd';

export default function HomePageAd() {
    return (
        <Carousel autoplay>
            <div >
                <img src={process.env.PUBLIC_URL + '/Ad/worldBookDay1.png'} alt="worldBookDay.ad" style={{ width: '90%', marginLeft:"5%" }} />
            </div>
            <div >
                <img src={process.env.PUBLIC_URL + '/Ad/worldBookDay2.png'} alt="worldBookDay2.ad" style={{ width: '90%', marginLeft:"5%" }} />
            </div>
            <div >
                <img src={process.env.PUBLIC_URL + '/Ad/backToSchoolDay.png'} alt="backToSchoolDay.ad" style={{ width: '90%', marginLeft:"5%" }} />
            </div>
        </Carousel>
    );
}