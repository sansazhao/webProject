import React , { Component }from 'react';
import { Upload, Icon, message, Modal , Button } from 'antd';
import { Link } from "react-router-dom";
import '../../css/Setting.css'
import $ from "jquery";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    console.log(reader.result);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class Setting extends React.Component {
    state = {
        loading: false,
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    };
    handleChange = ({ fileList }) => this.setState({ fileList })
    handleCancel = () => this.setState({ previewVisible: false })
    handleChange1 = (info) => {
       /* if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }*/
        //if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
      //  }
    }
    handlePreview = (file) => {
        console.log(file.thumbUrl);
        let t = file.thumbUrl;
        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/pic",
            crossDomain: true,
            data: {"name":"book4","bin":t},
            success: function (_data) {
             //   console.log(_data);
            }.bind(this),
            error : function() {
                console.log("failed");
            }
        });
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const imageUrl = this.state.imageUrl;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
            <div>
                <Link to="/"><Button>返回首页</Button></Link>
                <div className="clearfix">
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                        {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
                <p >可上传个人头像照片</p>
            </Upload></div>
            <div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="//jsonplaceholder.typicode.com/posts/"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange1}
                >
                    {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
                    <p >可上传你最喜爱的图书封面</p>
                </Upload>
            </div>
        </div>
        );
    }
}

export default Setting;