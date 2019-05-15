import React, { Component } from 'react';
import styled from 'styled-components';
import { device } from '../media queries/deviceName';
import '../style.css';
let colorfulCat = require('../public/colorfulCat.jpeg');

const HomePageContent = styled.div`
    letter-spacing: 5px;
    line-height: 1.5;
    .virticleLine1 {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 130px;
        border-right: 1px solid lightGrey;
        z-index: -10;
        @media ${device.laptop} {
            width: 100px;
        }
        @media ${device.tablet} {
            width: 80px;
        }
    }
    .topSideFixedLine {
        position: fixed;
        top: 0;
        width: 100vw;
        height: 125px;
        border-bottom: 1px solid lightgrey;
        z-index: -10;
        @media ${device.laptop} {
            height: 95px;
        }
        @media ${device.tablet} {
            height: 75px;
        }
    }
    .bottomSideFixedLine {
        position: fixed;
        top: 0;
        width: 100vw;
        height: 575px;
        border-bottom: 1px solid lightgrey;
        z-index: -10;
        @media ${device.laptopL} {
            height: 545px;
        }
        @media ${device.tablet} {
            height: 525px;
        }
    }
`;


const Section_1 = styled.div`
    position: relative;
    height: 100vh; 
    .rightColorBlock {
        position: absolute;
        top: -4px;
        right: 0px;
        height: calc(100vh - 124px); 
        width: 58vw;
        z-index: -11;
        background-color: #E8E7E2;
        @media ${device.laptop} {
            height: 90vh;
        }
    }
    .slogan {
        font-family: 'Permanent Marker', cursive;
        position: absolute;
        top: 60px;
        left: 15%;
        font-size: 60px;
        z-index:1;
        text-shadow: 10px 10px 10px lightgray;
        @media ${device.tablet} {
            font-size: 40px;
        }
        @media ${device.mobileL} {
            font-size: 32px;
        }
        @media ${device.mobileS} {
            top: 25px;
        }
    }
    .colorfullCat_picture {
        position: absolute;
        top: 20vh;
        right: 15vw;
        -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
        -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
        box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
        @media ${device.laptop} {
            width: 70vw;
            top: 25vh;
        }
        @media ${device.mobileS} {
            top: 30vh;
        }
    }
    .circleOutline_div {
        width: 450px;
        height: 450px;
        border: 1px solid lightgrey;
        border-radius: 50%;
        margin-left: -95px;
        @media ${device.laptop} {
            margin-left: -125px;
        }
        @media ${device.tablet} {
            margin-left: -145px;
        }
    }
    .aboutMe_btn {
        position: absolute;
        left: 15%;
        top: 45vh;
        height: 50px;
        width: 200px;
        border-radius: 25px;
        background-color: rgb(144, 116, 0);
        z-index: 5;
        color: #fff;
        font-size: 20px;
        letter-spacing: 5px;
        border: none;
        -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
        -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
        box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
        cursor: pointer;
        :hover {
            background-color: rgb(144, 116, 0, 0.9);
        }
        @media ${device.laptop} {
            top: 80vh;
        }
        @media ${device.mobileL} {
            top: 70vh;
            font-size: 14px;
            height: 30px;
            width: 100px;
            border-radius: 15px;
            letter-spacing: 2px;
        }
        @media ${device.mobileS} {
            top: 75vh;
        }
    }
`;

const Section_2 = styled.div`
    margin-top: 150px;
    position: relative;
    height: 52vw;
    @media ${device.mobileL} {
        height: 100vh;
    } 
    .leftColorBlock {
        position: absolute;
        height: 90%; 
        width: 38vw;
        background-color: #EBE2DE;
        z-index: 2000;
    }
    .mainContent {
        position: absolute;
        top: 8%;
        left: 12%;
        height: 70%;
        width: 80%;
        z-index: 2000;
        padding-top: 30px;
        @media ${device.laptop} {
            height: 80%;
        }
        @media ${device.mobileL} {
            height: 100%;
            top: 0;
            left: 10%;
        }
        .shelterPicture {
            height: 90%;
            width: 60%;
            margin-top: 40px;
            margin-left: 10%;
            background-image: url("../src/public/GirlPuppyDog.jpg");
            background-attachment: scroll;
            background-position: top;
            background-repeat: no-repeat;
            background-size: cover;
            -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
            -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
            box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
            @media ${device.laptop} {
                height: 100%;
                width: 70%;
            }
            @media ${device.mobileL} {
                width: 85vw;
                height: calc(85vw * 0.7);
                margin: 40px auto 0 auto;
                -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.15);
                -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.15);
                box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.15);
            }
        }
        h3 {
            font-size: 32px;
            margin-bottom: 20px;
            @media ${device.tablet} {
                font-size: 24px;
            }
            @media ${device.mobileL} {
                font-size: 18px;
            }
        }
        span,p {
            font-size: 20px;
            margin-bottom: 10px;
            @media ${device.tablet} {
                font-size: 16px;
            }
            @media ${device.mobileL} {
                font-size: 14px;
            }
        }
    }
`;

const Section_3 = styled.div`
    margin-top: 220px;
    @media ${device.laptop} {
        margin-top: 400px;
    }
    @media ${device.mobileL} {
        margin-top: 100px;
    }
    .parallax { 
        height: 600px;
        background-image: url("../src/public/grassDogCat.jpg");
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        @media ${device.tablet} {
            height: 450px;
        }
        @media ${device.mobileL} {
            background-attachment: scroll;
            height: 550px;
        }
    }
    .scrollArea {
        padding-top: 100px;
        padding-bottom: 100px;
        text-align: center;
        font-size: 32px;
        position: relative;
        @media ${device.tablet} {
            font-size: 28px;
        }
        @media ${device.mobileL} {
            font-size: 20px;
        }
        .textInSiteParallaxArea {
            text-align: center;
            margin: -550px 0 150px 0;
            height: 50vh;
            width: 100%;
            @media ${device.laptopL} {
                margin: -520px 0 150px 0;
            }
            @media ${device.laptopL} {
                margin: -520px 0 100px 0;
            }
            @media ${device.tablet} {
                margin: -480px 0 50px 0;
            }
            @media ${device.mobileL} {
                margin: -580px 0 250px 0;
            }
            .textAboutShelter {
                display: flex;
                justify-content: center;
                align-content: center;
                background-color: rgba(255, 255, 255, 0.7);
                line-height: 1.8;
                padding: 45px 0;
                .keepcenter {
                    height: fit-content;
                }
                @media ${device.tablet} {
                    padding: 25px 0;
                }
            }
            h3 {
                font-size: 22px;
                color: #fff;
                text-shadow: 1px 1px 1px #000;
                @media ${device.tablet} {
                    font-size: 18px;
                }
                @media ${device.mobileL} {
                    font-size: 16px;
                }
            }
            h1 {
                font-size: 32px;
                color: #fff;
                text-shadow: 1px 1px 1px #000;
                margin: 10px 0;
                @media ${device.tablet} {
                    font-size: 26px;
                }
                @media ${device.mobileL} {
                    font-size: 20px;
                }
            }
            h2 {
                font-size: 20px;
                color: #444444;
                @media ${device.tablet} {
                    font-size: 16px;
                }
                @media ${device.mobileL} {
                    font-size: 14px;
                }
            }
            h6 {
                font-size: 16px;
                background-color: none;
                padding-top: 15px;
                color: #c74b16;
                @media ${device.tablet} {
                    font-size: 14px;
                }
                @media ${device.mobileL} {
                    font-size: 13px;
                }
            }
        }
        .contactToShelter {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding-top: 50px;
            .shelter {
                font-size: 28px;
                font-weight: bold;
                color: #fff;
                width: 20vw;
                height: 14vw;
                min-width: 250px;
                min-height: 175px;
                margin: 30px 40px;
                background-color: red;
                background-attachment: scroll;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                @media ${device.laptop} {
                    margin: 20px 30px;
                    width: 30vw;
                    height: 20vw;
                }
                @media ${device.tablet} {
                    margin: 25px;
                    width: 38vw;
                    height: 27vw;
                    font-size: 24px;
                }
                @media ${device.mobileL} {
                    font-size: 18px;
                }
                ::before {
                    content:'';
                    display: inline-block;
                    height: 100%;
                    width: 0;
                    vertical-align: middle;
                }
                :hover {
                opacity: 0.7;
                transition: all ease-in .3s;
                }
                .keepcenter {
                    margin: auto 0;
                }
            }
            .north {
                background-image: url("../src/public/ShelterNorth.jpg");
            }
            .central {
                background-image: url("../src/public/ShelterCentral.jpeg");
            }
            .east {
                background-image: url("../src/public/ShelterEast.jpg");
            }
            .south {
                background-image: url("../src/public/ShelterSouth.jpg");
            }
        }
    } 
`;

class HomePage extends React.Component {
    state = {
        windowWidth: ''
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions = () => {
        this.setState({ windowWidth: window.innerWidth });
    }
    scrollToAboutMe = () => {
        document.querySelector("#aboutMe").scrollIntoView({ behavior: 'smooth' });
    }
    render() {
        return (
            <HomePageContent>
                {this.state.windowWidth >= 768 && <div className="virticleLine1"></div>}
                {this.state.windowWidth >= 768 && <div className="topSideFixedLine"></div>}
                {this.state.windowWidth >= 768 && <div className="bottomSideFixedLine"></div>}
                <Section_1>
                    <div className="rightColorBlock"></div>
                    <div className="slogan">
                        <h1>Love and Find</h1>
                        <h1>Lost and Found</h1>
                    </div>
                    <img className="colorfullCat_picture" src={colorfulCat} />
                    {this.state.windowWidth > 425 &&<div className="circleOutline_div"></div>}
                    <button className="aboutMe_btn" onClick={this.scrollToAboutMe}>關於我們</button>
                </Section_1>
                <Section_2>
                    <div className="leftColorBlock"></div>
                    <div id="aboutMe" className="mainContent">
                        <div>
                            <h3>關於這個平台 我們希望</h3>
                            <div style={{ display: 'flex' }}>
                                <span>➤&nbsp;</span>
                                <p>提供原飼主一段冷靜思考期，讓無法飼養的寵物無須進入動物之家，直接媒合到新飼主。</p>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <span>➤&nbsp;</span>
                                <p>認養人不需提供私人社交帳號，即可於此平台與送養人分享照片與毛孩近況；同時達到保護認養人隱私和送養人追蹤毛孩近況的需求。</p>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <span>➤&nbsp;</span>
                                <p>提供愛心中途與認養人媒合的管道，多一個曝光機會，多一份希望。</p>
                            </div>
                        </div>
                        <div className="shelterPicture" ></div>
                    </div>
                </Section_2>
                <Section_3>
                    <div className="parallax"></div>
                    <div className="scrollArea">
                        <div className="textInSiteParallaxArea">
                            <h3>Let's adopt a pet instead of purchasing one</h3>
                            <h1>以領養代替購買</h1>
                            <div className="textAboutShelter">
                                <div className="keepcenter">
                                    <h2>收容所會為收容動物做健檢和一些基本的醫療，也會對一些偏差行為進行管教。<br />近親繁殖的純種貓狗大多有基因缺陷，相較之下米克斯更健康聰明，照顧起來輕鬆許多！</h2>
                                    <h6>mix breed dogs are also very cooooooool!</h6>
                                </div>
                            </div>
                        </div>
                        <h3>台灣公立收容所連結</h3>
                        <div className="contactToShelter">
                            <a><div className="shelter north">北部</div></a>
                            <a><div className="shelter central">中部</div></a>
                            <a><div className="shelter south">南部</div></a>
                            <a><div className="shelter east">東部及離島區域</div></a>
                        </div>
                    </div>
                </Section_3>
            </HomePageContent>
        );
    }
}
export default HomePage;