import React, { Component } from 'react';
import { Button, Input, Select } from 'antd';
import { DeleteOutlined, PlusOutlined, RedoOutlined  } from '@ant-design/icons';
import MyModal from '../MyModal/MyModal';
const { Option } = Select;
const { Search } = Input;


class ToolBar extends Component {
    state = {
        visible: false,
    }
    render() {
        const { visible } = this.state;
        const { hasSelected, deleteItem, columns, onSearch, handleChange, submitForm, replaceTable } = this.props;

        console.log(visible, 'ToolBar visible')
        const handleCancel = () => {
            this.setState({ visible: false });
        }

        const MyModalProps = {
            submitForm,
            columns,
            visible,
            handleCancel,
        }

        return (
            <div>
                <MyModal {...MyModalProps}/>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => { this.setState({ visible: true }) }}>
                    新增
                </Button>
                <Button style={{ marginLeft: 2 }} type="primary" disabled={!hasSelected} icon={<DeleteOutlined />} onClick={deleteItem}>
                    删除
                </Button>
                <Select style={{ width: 120, marginLeft: 120 }} defaultValue={columns[0].title} onChange={handleChange}>
                    {
                        columns.map((item, index) => { return <Option key={index} value={item.key} >{item.title}</Option> })
                    }
                </Select>
                <Search placeholder="input search text" onSearch={onSearch} style={{ width: 240,  marginTop: 16 }} />
                <Button type="primary" icon={<RedoOutlined />} style={{ marginLeft: 2 }} onClick={replaceTable}>
                    重置
                </Button>
            </div>
        )
    }
}

export default ToolBar;