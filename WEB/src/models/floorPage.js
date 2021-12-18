const dataList = [];
for (let i = 1; i < 46; i++) {
    dataList.push({
        id: i,
        name: `桃园 ${i}`,
        floor: '6',
        type: '学生公寓',
        });
}


export default {
    namespace: 'apartment',
    state: {
    columns: [{
        title: '公寓号',
        dataIndex: 'id',
        key: 'id',
        }, {
        title: '公寓名',
        dataIndex: 'name',
        key: 'name',
        }, {
        title: '层数',
        dataIndex: 'floor',
        key: 'floor',
        }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        },
    ],
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