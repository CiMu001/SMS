import React, { Component } from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { Link } from 'dva/router';
import { Layout, Menu, Avatar, Button, Modal  } from 'antd';
import {
  GlobalOutlined,
  HomeOutlined,
  PartitionOutlined,
  TeamOutlined,
  InsertRowLeftOutlined,
  AlertOutlined,
  UserOutlined,
  PoweroffOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import styles from './MyLayout.css';

const { Header,Content, Sider, Footer } = Layout;


class MyLayout extends Component {
    render() {
        const { children, home } = this.props
        const { username } = home;

        const confirm = () => {
            Modal.confirm({
              title: '提示',
              icon: <ExclamationCircleOutlined />,
              content: '确认退出系统',
              okText: '确认',
              cancelText: '取消',
              onOk: () => { this.props.history.push('/Login') }
            });
          }

        return (
            <div>
                <Layout>
                    <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                    >
                        <div className={styles.logo}>
                            <GlobalOutlined style={ { fontSize: 20, paddingRight: 10 } } />
                            宿舍管理系统
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" icon={<HomeOutlined />}>
                                <Link to="/">首页</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<PartitionOutlined />}>
                                <Link to="/Admin">宿管管理</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<TeamOutlined />}>
                                <Link to="/Student">学生管理</Link>
                            </Menu.Item>
                            <Menu.Item key="4" icon={<InsertRowLeftOutlined />}>
                                <Link to="/Floor">公寓管理</Link>
                            </Menu.Item>
                            <Menu.Item key="5" icon={<AlertOutlined />}>
                                <Link to="/Attendance">缺勤管理</Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className={styles.contentLayout}>
                        <Header style={{ background: '#fff' }}>
                            <div style={{ float: 'right', marginTop: 2, fontSize: 16 }} >
                                <Avatar icon={<UserOutlined />} />
                                <a style={{ marginRight:20, marginLeft: 12 }}>{username}</a>
                                <Button type="text" danger icon={<PoweroffOutlined />} onClick={confirm}>
                                    退出
                                </Button>
                            </div>
                        </Header>
                        <Content className={styles.content} >
                            {children}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>宿舍管理系统 ©2021 Created by CIMu</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default connect(({ home }) => ({
    home,
}))(withRouter(MyLayout));