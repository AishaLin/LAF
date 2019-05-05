import React, { Component } from 'react';

class UpLoadFile extends React.Component {

    render() {
        return (
                <input id="uploadFileInput" type="file" accept="image/*" style={{display: 'none'}} onChange={(e) => this.props.fileSelect(e)} />
        )
    }
}

export default UpLoadFile;


