import React, { Component } from 'react';
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import { createDeflate } from 'zlib';
import firebase from "../../config/fbConfig"
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import UpLoadFile from './UpLoadFile';

class CreateProject extends Component {
    state = {
        options: {
            size: ['大型', '中等', '小型'],
            publicationCategory: ['私人送養', '中途送養'],
            species: ['狗', '貓'],
            age: ['< 6 個月', '6 個月 - 2 歲', '3 歲 - 6 歲', '7 歲 - 10 歲', '11 歲 - 14 歲', '> 15 歲'],
            gender: ['女生', '男生'],
            catWeight: ['< 1 kg', '1-2 kg', '3-4 kg', '5-6 kg', '7-8 kg', '> 8 kg'],
            dogWeight: ['< 4 kg', '4-10 kg', '11-20 kg', '21-30 kg', '31-40 kg', '> 40 kg'],
            ligation: ['已結紮', '尚未結紮'],
        },
        ligation: '',
        publicationCategory: '',
        nickName: '',
        size: '',
        species: '',
        age: '',
        gender: '',
        weight: '',
        variety: '',
        physicalCondition: '',
        currentLocation: '',
        character: '',
        reason: '',
        requirement: '',
        connectMethods: '',
        file: '',
        fileName: '',
        adoptionStage: 0,
        adopterID: '',
        coatColor: '',
        feature: ''
    }
    setSelectedData = (event, el) => {
        this.setState({
            [event.target.dataset.item]: el
        })
        console.log('this.state', this.state)
    }
    // 貓狗體重區間不同，為避免使用者選擇體重後才重選動物種類，另外增加判定是否須清除體重資訊，並提示重新選擇
    // 初始狀態
    // 尚未選擇體重，在種類間切換
    // 已選擇體重後切換種類
    // 重複點選同一種類
    setSelectedSpecies = (event, el) => {
        if (this.state.species === '') {
            this.setState({
                species: el,
            })
        } else if (this.state.species != el && this.state.weight === '') {
            this.setState({
                species: el,
            })
        } else if (this.state.species != el && this.state.weight !== '') {
            this.setState({
                species: el,
                weight: ''
            })
            return alert('請重新選擇體重')
        } else if (this.state.species == el) {
            console.log("使用者重複點選一樣的種類，不更新資料")
        }
        console.log('this.state', this.state)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.fileName) {
            return alert('請上傳一張照片')
        } else {
            this.props.dispatch(createProject(this.state));
        }
    }
    handleFileSelect = (e) => {
        this.setState({ file: e.target.files[0] }, () => this.setFileName())
    }
    setFileName = () => {
        this.setState({ fileName: this.state.file.name + new Date().getTime() }, () => console.log(this.state.fileName))
    }

    render() {
        const { auth } = this.props;
        const { size,
            publicationCategory,
            species,
            age,
            gender,
            catWeight,
            dogWeight,
            ligation
        } = this.state.options;
        if (!auth.uid) return <Redirect to='/authentication/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <UpLoadFile fileSelect={this.handleFileSelect} />
                    <h5 className="grey-text text-darken-3">發文</h5>
                    <div className="input-field">
                        <label htmlFor="publicationCategory">刊登類別</label>
                        <div>
                            {
                                publicationCategory.map((el, index) => {
                                    return (
                                        <div
                                            data-item='publicationCategory'
                                            key={index}
                                            onClick={(event) => this.setSelectedData(event, el)}
                                        >
                                            {el}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="nickName">小名</label>
                        <input type="text" id="nickName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="coatColor">毛色</label>
                        <textarea id="coatColor" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="variety">品種</label>
                        <textarea id="variety" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="microchipsNumber">晶片號碼</label>
                        <textarea id="microchipsNumber" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field" id="species">
                        <label htmlFor="species">種類</label>
                        <div>
                            {
                                species.map((el, index) => {
                                    return (
                                        <div
                                            data-item='species'
                                            key={index}
                                            onClick={(event) => this.setSelectedSpecies(event, el)}
                                        >
                                            {el}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="gender">性別</label>
                        <div>
                            {
                                gender.map((el, index) => {
                                    return (
                                        <div
                                            data-item='gender'
                                            key={index}
                                            onClick={(event) => this.setSelectedData(event, el)}
                                        >
                                            {el}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="age">年齡</label>
                        <div>
                            {
                                age.map((el, index) => {
                                    return (
                                        <div
                                            data-item='age'
                                            key={index}
                                            onClick={(event) => this.setSelectedData(event, el)}
                                        >
                                            {el}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="ligation">結紮狀況</label>
                        <div>
                            {
                                ligation.map((el, index) => {
                                    return (
                                        <div
                                            data-item='ligation'
                                            key={index}
                                            onClick={(event) => this.setSelectedData(event, el)}
                                        >
                                            {el}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="size">體型</label>
                        <div>
                            {
                                size.map((el, index) => {
                                    return (
                                        <div
                                            data-item='size'
                                            key={index}
                                            onClick={(event) => this.setSelectedData(event, el)}
                                        >
                                            {el}
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="weight">體重</label>
                        <div>
                            {this.state.species === '' &&
                                <p>請先選擇動物種類</p>
                            }
                        </div>
                        <div>
                            {this.state.species == '貓' &&
                                catWeight.map((el, index) => {
                                    return (
                                        <div
                                            data-item='weight'
                                            key={index}
                                            onClick={(event) => this.setSelectedData(event, el)}
                                        >
                                            {el}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            {this.state.species == '狗' &&
                                dogWeight.map((el, index) => {
                                    return (
                                        <div
                                            data-item='weight'
                                            key={index}
                                            onClick={(event) => this.setSelectedData(event, el)}
                                        >
                                            {el}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="currentLocation">目前所在地</label>
                        <textarea id="currentLocation" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="feature">特徵</label>
                        <textarea id="feature" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="physicalCondition">健康狀況</label>
                        <textarea id="physicalCondition" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="character">個性</label>
                        <textarea id="character" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="reason">送養原因</label>
                        <textarea id="reason" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="requirement">認養條件</label>
                        <textarea id="requirement" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="connectMethods">聯絡方式</label>
                        <textarea id="connectMethods" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">送出</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(CreateProject);
