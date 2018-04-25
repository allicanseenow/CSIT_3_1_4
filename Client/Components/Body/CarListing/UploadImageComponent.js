import React, { Component }                     from 'react';
import PropTypes                                from 'prop-types';
import { Upload, Button, Icon, message, Modal } from 'antd';


export default class UploadImageComponent extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    maximumImageAllowed: PropTypes.number,
  };

  static defaultProps = {
    maximumImageAllowed: 1,
  };

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    uploading: false,
  };

  handleCancel = () => {
    this.setState({ previewVisible: false, })
  };

  handlePreview = (file) => {
    console.log("file in handle preview is ")
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  };

  handleChange = ({ file, fileList }) => {
    const { onChange } = this.props;
    this.setState({ fileList }, () => {
      onChange(this.state.fileList);
    });
  };

  customRequest = (event) => {
    console.log("customRequest is ", event)
  };

  // handleUpload = () => {
  //   const { fileList } = this.state;
  //   const formData = new FormData();
  //   fileList.forEach((file) => {
  //     formData.append('files[]', file);
  //   });
  //   this.setState({ uploading: true });
  //   window.setTimeout(() => {
  //     console.log("uploading", fileList);
  //     this.setState({ uploading: false });
  //   }, 3000);
  // };

  render() {
    const { previewImage, previewVisible, fileList  } = this.state;
    console.log('preview Image is ', previewImage && previewImage.toString(), 'yes')
    console.log('fileList.length', fileList.length)
    const { maximumImageAllowed } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="clearfix">
        <Upload
          action="/"
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customRequest={this.customRequest}
          beforeUpload={(file) => {
            this.setState(({ fileList }) => {
              return ({
                fileList: [...fileList, file],
              })
            });
            return false;
          }}
        >
          {fileList.length >= maximumImageAllowed ? null: uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage}/>
        </Modal>
        {/*<Button*/}
          {/*className="upload-demo-start"*/}
          {/*type="primary"*/}
          {/*onClick={this.handleUpload}*/}
          {/*disabled={this.state.fileList.length === 0}*/}
          {/*loading={this.state.uploading}*/}
        {/*>*/}
          {/*{this.state.uploading ? 'Uploading' : 'Start upload'}*/}
        {/*</Button>*/}
      </div>
    );
  }
}