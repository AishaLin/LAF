import React, { Component } from 'react';
import styled from 'styled-components';
import '../style.css'

const HomePageContent = styled.div`
    font-family: 'Permanent Marker', cursive;
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
    }
    .topSideFixedLine {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 125px;
    border-bottom: 1px solid lightgrey;
    z-index: -10;
    }
    .bottomSideFixedLine {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 575px;
    border-bottom: 1px solid lightgrey;
    z-index: -10;
    }
`;


const Section_1 = styled.div`
    position: relative;
    height: 100vh; 
    .rightColorBlock {
        /* background-image: url("../src/public/${props => props.part1 ? 'grass-dog-cat.jpg' : (props.part2 ? 'IMG_3690.jpg' : '154072.jpg')}"); */
        position: absolute;
        top: -4px;
        right: 0px;
        height: calc(100vh - 124px); 
        width: 58vw;
        z-index: -11;
        background-color: #E8E7E2;
    }
    .slogan {
        position: absolute;
        top: 60px;
        left: 15%;
        font-size: 60px;
        z-index:1;
        text-shadow: 10px 10px 10px lightgray;
    }
    .colorfullCat_picture {
        position: absolute;
        top: 20vh;
        right: 15vw;
        -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
        -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
        box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
    }
    .circleOutline_div {
        width: 450px;
        height: 450px;
        border: 1px solid lightgrey;
        border-radius: 50%;
        margin-left: -95px;
    }
    .aboutMe_btn {
        position: absolute;
        left: 15%;
        top: 45vh;
        font-family: 'Neue Helvetica W01', 'AXIS Font Japanese W55', 'Helvetica Neue', sans-serif;
        height: 50px;
        width: 200px;
        background-color: rgb(144, 116, 0);
        z-index: 5;
        border-radius: 25px;
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
    }
`;

const Section_2 = styled.div`
    margin-top: 150px;
    position: relative;
    height: 52vw; 
    .leftColorBlock {
        position: absolute;
        height: 90%; 
        width: 38vw;
        background-color: #EBE2DE;
        z-index: 2000;
    }
    .mainContent {
        font-family: 'Neue Helvetica W01', 'AXIS Font Japanese W55', 'Helvetica Neue', sans-serif;
        position: absolute;
        top: 8%;
        left: 12%;
        height: 70%;
        width: 80%;
        z-index: 2000;
        padding-top: 30px;
        .shelterPicture {
            height: 80%;
            width: 60%;
            margin-top: 40px;
            margin-left: 10%;
            background-image: url("../src/public/nature-girl-kid-puppy-dog-cute-680162-pxhere.com.jpg");
            background-attachment: scroll;
            background-position: top;
            background-repeat: no-repeat;
            background-size: cover;
            -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
            -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
            box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.4);
        }
        h3 {
            font-size: 32px;
            margin-bottom: 20px;
        }
        span,p {
            font-size: 20px;
            margin-bottom: 10px;
        }
    }
`;

const Section_3 = styled.div`
    margin-top: 180px;
    .parallax { 
        height: 80vh;
        background-image: url("../src/public/grass-dog-cat.jpg");
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .scrollArea {
        padding-top: 100px;
        padding-bottom: 100px;
        text-align: center;
        font-family: 'Neue Helvetica W01', 'AXIS Font Japanese W55', 'Helvetica Neue', sans-serif;
        font-size: 32px;
        position: relative;
        .textInSiteParallaxArea {
            text-align: center;
            position: absolute;
            top: 20vh;
            left: 0;
            height: 50vh;
            width: 100%;
            margin-top: calc(-100px - 65vh);
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
            }
            h3 {
                font-size: 22px;
                color: #fff;
                text-shadow: 1px 1px 1px #000;
            }
            h1 {
                font-size: 32px;
                color: #fff;
                text-shadow: 1px 1px 1px #000;
                margin: 10px 0;
            }
            h2 {
                font-size: 20px;
                color: #444444;
            }
            h6 {
                font-size: 16px;
                background-color: none;
                padding-top: 15px;
                color: #c74b16;
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
                background-image: url("../src/public/Shelter_north.jpg");
            }
            .central {
                background-image: url("../src/public/Shelter_central.jpeg");
            }
            .east {
                background-image: url("../src/public/Shelter_east.jpg");
            }
            .south {
                background-image: url("../src/public/Shelter_south.jpg");
            }
        }
    } 
`;


class HomePage extends React.Component {
    scrollToAboutMe = () => {
        document.querySelector("#aboutMe").scrollIntoView({ behavior: 'smooth' });
    }
    render() {
        return (
            <HomePageContent>
                <div className="virticleLine1"></div>
                <div className="topSideFixedLine"></div>
                <div className="bottomSideFixedLine"></div>
                <Section_1>
                    <div className="rightColorBlock"></div>
                    <div className="slogan">
                        <h1>Love and Find</h1>
                        <h1>Lost and Found</h1>
                    </div>
                    <img className="colorfullCat_picture" src="../src/public/colorful-cat.jpeg" />
                    <div className="circleOutline_div"></div>
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