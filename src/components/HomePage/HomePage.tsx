import React from 'react';
import Header from 'components/Header/Header';
import SetupBlock from 'components/SetupBlock/SetupBlock';
import MainBlock from 'components/MainBlock/MainBlock';
import './homePage.scss'

const HomePage: React.FC<any> = () => {
    return(
        <div className="home">
            <Header></Header>
            <div className="home__main-part">
                <SetupBlock></SetupBlock>
                <MainBlock></MainBlock>
            </div>
        </div>
    )
}

export default HomePage
