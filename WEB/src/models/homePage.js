import { notification } from 'antd';
import { login } from "../services/example";

export default {
    namespace: 'home',
    state: {
        login_status: false,
        username: '',
        columns: [{
              title: '姓名',
              dataIndex: 'name',
            }, {
              title: '学号',
              dataIndex: 'sid',
            }, {
              title: '宿舍楼',
              dataIndex: 'address',
            }, {
              title: '楼层',
              dataIndex: 'floor',
            },{
              title: '宿舍号',
              dataIndex: 'roomid',
            },{
              title: '状态',
              dataIndex: 'state',
              render: text => <a>{text}</a>,
            }],
        data: [{
              key: '1',
              name: 'John Brown',
              sid: 32,
              address: '桃园8栋',
              floor: '6楼',
              roomid: '620',
              state: '缺勤',
            }, {
              key: '2',
              name: 'Jim Green',
              sid: 32,
              address: '桃园8栋',
              floor: '6楼',
              roomid: '620',
              state: '缺勤',
            },{
              key: '3',
              name: 'Joe Black',
              sid: 32,
              address: '桃园8栋',
              floor: '6楼',
              roomid: '620',
              state: '缺勤',
            }],
          address_list:['桃园1栋','桃园2栋','桃园3栋','桃园4栋','桃园5栋','桃园6栋','桃园7栋','桃园8栋','桃园9栋','桃园10栋'],
          selectAddress: '桃园8栋',
    },
    effects:{
      *changeAddress({payload}, { put })
      {
        const selectAddress = payload.value;
        yield put({ type: 'loaded', payload: { selectAddress } });
      },
      *login({payload}, { call, put }){
        let login_statu = false;
        const userData = JSON.stringify({
          "userid": payload.values.account,
          "password": payload.values.password
        });

        const res = yield call(login, userData);
        if (res.data.code === 500) {
          notification.error({ message: res.data.msg });
        }

        if (res.data.code === 200) {
          notification.success({ message: '登录成功' });
          login_statu = true;
          yield put({ type: 'loaded', payload: { username: res.data.data.name } });
        }

        return { login_status: login_statu };
      },
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