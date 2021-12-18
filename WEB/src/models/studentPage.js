const dataList = [];
for (let i = 0; i < 46; i++) {
    dataList.push({
        id: i,
        name: `学生 ${i}`,
        d_id: String(600 + i),
        zhuanye: '计算机科学与技术',
        tel: '1337777777',
        state: '住校',
        });
}


export default {
    namespace: 'student',
    state: {
    columns: [{
        title: '学号',
        dataIndex: 'id',
        key: 'id',
        }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        }, {
        title: '宿舍号',
        dataIndex: 'd_id',
        key: 'd_id',
        }, {
        title: '专业',
        dataIndex: 'zhuanye',
        key: 'zhuanye',
        },{
        title: '电话',
        dataIndex: 'tel',
        key: 'tel',
        },{
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: text => <a>{text}</a>,
    }],
    data: dataList,
    },
    effects:{
    },
    reducers: {
      loaded(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },

    },
  };