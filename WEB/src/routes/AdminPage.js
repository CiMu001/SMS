import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Button, Table, Modal, Form, Input, InputNumber, Select } from 'antd';
import { DeleteOutlined, PlusOutlined, RedoOutlined  } from '@ant-design/icons';
const { Header, Content } = Layout;
const { Option } = Select;
const { Search } = Input;

class AdminPage extends Component {
    state = {
        selectedRowKeys: [],
        selectedRows: [],
        initiaFormValue: {},
        visible: false,
        rows: [],
        dataList: this.props.admin.data,
        selectedSearchKey: this.props.admin.columns[0].key,
        searchDataList: null,
      };

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({selectedRowKeys, selectedRows});
    };

    render(){
        const { selectedRowKeys, visible, initiaFormValue, dataList, selectedRows, selectedSearchKey, searchDataList } = this.state;
        const { admin, dispatch } = this.props;
        const { columns } = admin;

        const hasSelected = selectedRowKeys.length > 0;

        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.onSelectChange(selectedRowKeys, selectedRows)
            }
        };

        const deleteItem = () => {
            if (selectedRows.length <= 0) {
                return;
            }
            
            let newDataList = [...this.state.dataList]; 
            selectedRows.map((itme) => {
                newDataList.splice(newDataList.indexOf(itme), 1);
                return null;
            });
            dispatch({ type: 'admin/deleteUser', payload: { values: selectedRows } });
            this.setState({ dataList: newDataList, selectedRowKeys: [] });
        }

        const handleCancel = () => {
            this.setState({ visible: false });
        }

        const submitForm = (values) => {
            let newDataList = [...this.state.dataList]; 
            dispatch({ type: 'admin/addUser', payload: { values } });
            newDataList.push(values);
            this.setState({ visible: false, dataList : newDataList, });
        }

        const handleChange = (value) => {
            this.setState({ selectedSearchKey: value });
        }

        const onSearch = (value) => {
            let newSearchDataList = []; 
            dataList.map((item) => {
                let matchRow = item[selectedSearchKey];
                if (selectedSearchKey === 'userid' || selectedSearchKey === 'age') {
                    console.log(value, Number(value))
                    if (matchRow === Number(value)){
                        newSearchDataList.push(item);
                    }
                } else {
                    if (matchRow.indexOf(value) !== -1){
                        newSearchDataList.push(item);
                    }
                }

                return null;
            })
            
            this.setState({ searchDataList: newSearchDataList });
        }
        
        return(
            <Layout theme={'light'}>
                <Header style={{ background: '#f0f0f0' }}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={ () => this.setState({ visible: true }) }>
                        新增
                    </Button>
                    <Button style={{ marginLeft: 2 }} type="primary" disabled={!hasSelected} icon={<DeleteOutlined />} onClick={deleteItem}>
                        删除
                    </Button>
                    <Select style={{ width: 120, marginLeft: 120 }} defaultValue="工号" onChange={handleChange}>
                        {
                            columns.map((item, index) => { return <Option key={index} value={item.key} >{item.title}</Option> })
                        }
                    </Select>
                    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 240,  marginTop: 16 }} />
                    <Button type="primary" icon={<RedoOutlined />} style={{ marginLeft: 2 }} onClick={ () => this.setState({ searchDataList: null, selectedRowKeys: [] }) }>
                        重置
                    </Button>
                </Header>
                <Content style={{ padding: 5 }}>
                    <Modal title="新 增" visible={visible} onCancel={handleCancel} 
                        okButtonProps={{htmlType: 'submit', form: 'addForm'}} destroyOnClose okText="提交" cancelText="取消">
                        <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} 
                            id="addForm" onFinish={(values) => submitForm(values)} initialValues={initiaFormValue}
                        >
                            {
                                columns.map( item => 
                                <Form.Item label={item.title} name={item.key} key={item.key} rules={[{ required: true, message: `请输入${item.title}` }]}>
                                    {
                                        item.key === 'userid' ? <InputNumber  style={{ width: '100%' }} controls={false}/> : <Input />
                                    }
                                </Form.Item> )
                            }
                        </Form>
                    </Modal>
                    <Table rowKey={(record) => record.userid + record.name} rowSelection={rowSelection} 
                        columns={columns} dataSource={searchDataList ? searchDataList : dataList} 
                        pagination={{ defaultPageSize: 10, position: [ 'none' , 'bottomCenter'] }}  />
                </Content>
            </Layout>
        ) 
    }
}

export default connect(({ admin }) => ({
    admin,
  }))(AdminPage);