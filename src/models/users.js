

import * as usersService from '../services/users';
 
export default {
  namespace: 'users',
  state: {
  	list:[],
  	total:null,
  	page:null,
  },
  reducers: {
  	save(state,{payload:{data:list,total,page}}){
  		return {...state,list,total,page};
  	},
  },
  effects: {
  	*fetch({payload:{page = 1}},{call,put}){
  		const {data,headers} = yield call (usersService.fetch,{page});

      console.log(`请求到的数据为${data,headers}`);
  		// yield put ({type:'save',payload:{data,total:headers['x-total-count']}});
  		yield put ({
  			type:'save',
  			payload:{
  				data,
  				total:parseInt(headers['x-total-count'],10),
  				page:parseInt(page,10),
  			},
  		});
  	},
    *remove ({payload:id},{call,put}){
      yield call (usersService.remove,id);
      /*const page = yield select (state => state.users.page);*/
      yield put ({type:'reload' });
    },
    *patch ({payload:{id,values}},{call,put}){
      yield call(usersService.patch,id,values);
      /*const page = yield select (state => state.users.page);*/
      yield put ({type:'reaload' });
    },
    *create({payload:values},{call,put}){
      yield call(usersService.create,values);
      yield put ({type:'reaload'});
    },
    *reload(action,{put,select}){
      const page = yield select(state => state.users.page);
      yield put ({type:'fetch',payload:{page}});
    },
  },
/*订阅方法*/
  subscriptions: {
  	setup({dispatch,history}){
  		return history.listen(({pathname,query}) => {
  			if (pathname === '/users') {
  				dispatch({type:'fetch',payload:query});
  			}
  		});
  	},

  },
};
