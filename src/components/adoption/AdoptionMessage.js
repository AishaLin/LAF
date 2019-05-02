import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { sendAdoptMessage } from "../../actions/adoptionAction";

class AdoptionMessage extends React.Component {
    state = {
        foster: '',
        requester: '',
        project: '',
        phoneNumber: '',
        email: '',
        lineID: '',
        facebook: ''
    }
    handleChange = (e) => {
        const parameters = location.hash.split("?")[1].split("&")
        this.setState({
            [e.target.id]: e.target.value,
            foster: parameters[1].split("=")[1],
            requester: this.props.auth.uid,
            project: parameters[0].split("=")[1]
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.phoneNumber === "" && this.state.email === "" 
        && this.state.lineID === "" && this.state.facebook === "" && this.state.content === "") {
           return alert("請擇一填入聯絡方式")
        } else {
            this.props.dispatch(sendAdoptMessage(this.state));
        }
    }
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/authentication/signin' />
        return (
            <div className='seartch-Bar-Content ui segment'>
                <form className='ui form' onSubmit={this.onFormSubmit}>
                    <p>請主動與送養人聯繫</p>
                    <p>以下聯絡方式請至少擇一提供（選填），以利送養人回電接洽</p>
                    <div className="input-field">
                        <label htmlFor="phoneNumber">電話</label>
                        <textarea id="phoneNumber" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">E-mail</label>
                        <textarea id="email" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lineID">Line ID</label>
                        <textarea id="lineID" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="facebook">Facebook</label>
                        <textarea id="facebook" className="materialize-textarea" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>送出</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, null)(AdoptionMessage);


