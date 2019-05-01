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
        publicationCategory: '',
        nickName: '',
        species: '',
        age: '',
        gender: '',
        size: '',
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
        // fileUrl: '',
        // uploading: false,
        // percent: 0,
        // error: '',
        adoptionStage: 0,
        adopterID: '',
        coatColor: '',
        feature: ''
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
    // handleFileUpload = () => {
    //     if (this.state.file) {
    //         var storageRef = firebase.storage().ref();
    //         this.setState({ uploading: true })
    //         storageRef.child(`images/${this.state.file.name}${new Date().getTime()}`)
    //             .put(this.state.file)
    //             .then(snap => {
    //                 this.setState({ uploading: false })
    //                 this.getFileUrl();
    //             })
    //             .catch((err) => { this.setState({ error: err.message }); console.log("err.message") })
    //     }
    // }
    // getFileUrl = () => {
    //     var storageRef = firebase.storage().ref();
    //     storageRef.child(`/images/${this.state.file.name}${JSON.stringify(new Date())}`).getDownloadURL().then(function (url) {
    //         this.setState({ fileUrl: url });
    //     }).catch(function (error) {
    //         console.log('error: ', error);
    //     });
    // }

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/authentication/signin' />
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <UpLoadFile fileSelect={this.handleFileSelect} />
                    <h5 className="grey-text text-darken-3">發文</h5>
                    <div className="input-field">
                        <label htmlFor="publicationCategory">刊登類別</label>
                        <input type="text" id="publicationCategory" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="nickName">動物小名</label>
                        <input type="text" id="nickName" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="species">動物種類</label>
                        <textarea id="species" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="age">年齡/生日</label>
                        <textarea id="age" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="gender">性別</label>
                        <textarea id="gender" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="size">體型</label>
                        <textarea id="size" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="coatColor">毛色</label>
                        <textarea id="coatColor" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="feature">特徵</label>
                        <textarea id="feature" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="weight">體重</label>
                        <textarea id="weight" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="variety">品種</label>
                        <textarea id="variety" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="physicalCondition">健康狀況</label>
                        <textarea id="physicalCondition" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="microchipsNumber">晶片號碼</label>
                        <textarea id="microchipsNumber" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="currentLocation">目前所在地</label>
                        <textarea id="currentLocation" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="character">個性</label>
                        <textarea id="character" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="reason">送養原因/其他想說的話</label>
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
