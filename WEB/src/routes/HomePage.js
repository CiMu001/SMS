import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Divider, Table, Select } from 'antd'
import {
    PieChartTwoTone,
  } from '@ant-design/icons'
import styles from './HomePage.css';
const { Option } = Select;

const SmallBox = props =>
    <div style={{ background: '#fff', height: props.value, borderRadius: 4, padding: 16 }} >
        <Row justify="space-around">
            <Col span={4}>
                <PieChartTwoTone style={ { fontSize: 65, padding: 6 } } />
            </Col>
            <Col offset={8}  span={12}>
                <div style={{ textAlign: 'center', overflow:'hidden', height: 92, padding:6 }} >
                    <div className={styles.titlebox}>{props.title}</div>
                    <div className={styles.valuebox}>{props.textvalue}</div>
                </div>  
            </Col>
        </Row>
    </div>;


class HomePage extends Component {
    render(){
        const { dispatch } = this.props
        const { columns, data, address_list, selectAddress } = this.props.home;

        return(
            <div>
                <Divider orientation="left" style={{ fontWeight: 'bold', fontSize: 24 }}>管理概览</Divider>
                <div className={styles.BselectBox}>
                    宿舍楼选择:
                    <Select style={{ width: 120, marginLeft: 10 }} defaultValue={selectAddress} onChange={value => dispatch({ type: 'home/changeAddress', payload: { value } })}>
                        {address_list.map((addressValue) => <Option value={addressValue} key={addressValue}>{addressValue}</Option>)}
                    </Select>
                    {/* <Button onClick={ () => dispatch({ type: 'home/test' }) }>点击</Button> */}
                </div>
                <Row justify="space-around" align="middle">
                    <Col span={4}>
                        <SmallBox value={120} title={'宿舍楼名'} textvalue={selectAddress} />
                    </Col>
                    <Col span={4}>
                        <SmallBox value={120} title={'楼层层数'} textvalue={'6层'} />
                    </Col>
                    <Col span={4}>
                        <SmallBox value={120} title={'房间数量'} textvalue={'126间'} />
                    </Col>
                    <Col span={4}>
                        <SmallBox value={120} title={'学生数量'} textvalue={'378人'} />
                    </Col>
                </Row>
                <Divider orientation="left" style={{ fontWeight: 'bold', fontSize: 24, paddingTop: 50 }}>考勤动态</Divider>
                <div style={{ padding: 12, borderRadius: 4, background: '#fff' }}>
                    <Table columns={columns} dataSource={data} size="middle" />
                </div>
            </div>
        )
    }
}

export default connect(({ home }) => ({
    home,
  }))(HomePage);