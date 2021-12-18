import React, { Component } from 'react'
import { connect } from 'dva'
import { Layout, Table } from 'antd';
import ToolBar from '../components/ToolBar/ToolBar';
const { Header, Content } = Layout;


class StudentsPage extends Component {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    searchDataList: null,
    dataList: this.props.student.data,
    selectedSearchKey: this.props.student.columns[0].key,
  };

  render(){
    const { selectedRowKeys, searchDataList, dataList, selectedRows, selectedSearchKey } = this.state;
    const { columns } = this.props.student;
    const hasSelected = selectedRowKeys.length > 0;

    const handleChange = (value) => {
      this.setState({ selectedSearchKey: value });
    }

    const deleteItem = () => {
      if (selectedRows.length <= 0) {
        return;
      }
      
      let newDataList = [...this.state.dataList]; 
      selectedRows.map((itme) => {
          newDataList.splice(newDataList.indexOf(itme), 1);
          return null;
      });
      this.setState({ dataList: newDataList, selectedRowKeys: [] });
    }

    const onSearch = (value) => {
      let newSearchDataList = [];
      console.log(selectedSearchKey, 'selectedSearchKey', dataList[0], 'TF:', selectedSearchKey === 'id');
      dataList.map((item) => {
          let matchRow = item[selectedSearchKey];
          if (selectedSearchKey === 'id') {
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
    };

    const onSelectChange = (selectedRowKeys, selectedRows) => {
      this.setState({selectedRowKeys, selectedRows});
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        onSelectChange(selectedRowKeys, selectedRows)
      }
    };

    const submitForm = (values) => {
      let newDataList = [...this.state.dataList]; 
      newDataList.push(values);
      this.setState({ dataList : newDataList, });
    };

    const replaceTable = () => {
      this.setState({ searchDataList: null, selectedRowKeys: [] })
    }

    const ToolBarProps ={
      hasSelected,
      columns,
      onSearch,
      handleChange,
      deleteItem,
      replaceTable,
      submitForm,
    }
    
    return (
      <Layout theme={'light'}>
        <Header style={{ background: '#f0f0f0' }}>
          <ToolBar {...ToolBarProps} />
        </Header>
        <Content style={{ padding: 5 }}>
          <Table rowKey={(record) => record.userid + record.name} rowSelection={rowSelection} 
            columns={columns} dataSource={searchDataList ? searchDataList : dataList} 
            pagination={{ defaultPageSize: 10, position: [ 'none' , 'bottomCenter'] }}  />
        </Content>
      </Layout>
    );
  }
}

export default connect(({ student }) => ({
  student,
}))(StudentsPage);
