import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';
import logoImg from '../assets/logo1.png';
import styles from './LoginPage.css';
import waves from '../assets/waves.svg';


class LoginPage extends Component {
    render(){
        const { dispatch } = this.props;
        const onFinish = (values) => {
            dispatch({ type: 'home/login', payload: { values } }).then((res) =>{
                if (res.login_status){
                    this.props.history.push('/')
                }
            })
        };
        
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return(
            <div className={styles.loginPage} >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className={styles.body}
                    >
                    <div className={styles.user_img}>
                        <img src={logoImg} alt={"login_img"} className={styles.img}/>
                        <b>宿舍管理系统</b>
                    </div>
                    <Form.Item
                        label="工号/学号"
                        name="account"
                        rules={[{ required: true, message: 'Please input your 工号/学号!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
                <img src={waves} className={styles.svgCss} alt="logo" />
            </div>
        )
    }
}

export default connect(({ home }) => ({
    home,
  }))(LoginPage);