import React, { Component } from 'react';

class UpLoadFile extends React.Component {
    
    render() {
        return (
            <div>
                <input id="uploadFileInput" type="file" accept="image/*" onChange={(e) => this.props.fileSelect(e)} />
            </div>
        )
    }
}

export default UpLoadFile;


