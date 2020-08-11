import React, { Component } from 'react';

export default class FilesUploadComponent extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form>
                        <h5>Upload CV</h5>
                        <div className="form-group">
                            <input type="file" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}