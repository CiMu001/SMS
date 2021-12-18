import React, { Component } from 'react'
import { Modal, Form, Input, InputNumber } from 'antd';


class MyModal extends Component {
    state = {
        initiaFormValue: {},
    }
    render() {
        const { initiaFormValue } = this.state;
        const { submitForm, columns, visible, handleCancel } = this.props;

        return (
            <Modal title="新 增" visible={visible} onCancel={handleCancel} onOk={handleCancel}
                okButtonProps={{htmlType: 'submit', form: 'addForm'}} destroyOnClose okText="提交" cancelText="取消">
                <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} 
                    id="addForm" onFinish={(values) => {submitForm(values)}} initialValues={initiaFormValue}>
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
        )
    }
}

export default MyModal;