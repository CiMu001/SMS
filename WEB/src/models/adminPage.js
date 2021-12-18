const dataList = [];
for (let i = 0; i < 46; i++) {
  dataList.push({
    userid: i,
    name: `Edward King ${i}`,
    age: 20 + i,
    workssid: '桃园8栋， 桃园6栋',
    phone: '1337777777',
    worktime: '周一，周三，周五',
    });
}


export default {
    namespace: 'admin',
    state: {
      columns: [
        {
          title: '工号',
          dataIndex: 'userid',
          key: 'userid',
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '所管宿舍楼号',
          dataIndex: 'workssid',
          key: 'workssid',
        },
        {
          title: '电话',
          key: 'phone',
          dataIndex: 'phone',
        },
        {
          title: '上班时间',
          key: 'worktime',
          dataIndex: 'worktime',
        },
      ],
    data: dataList,
    },
    effects:{
      *addUser({payload}, { put, select })
      {
        const data = yield select(state => state.admin.data);
        data.push(payload.values);
        console.log('11111');
        yield put({ type: 'addUserUpate', payload: { data } });
        console.log('2222');
      }
    },
    reducers: {
      loaded(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },

      addUserUpate(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
    },
  };