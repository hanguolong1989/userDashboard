import React from 'react';
import {connect} from 'dva';
import * as Ant  from 'antd';
import styles from './Users.css';
import {PAGE_SIZE} from '../../constants';
import {routerRedux} from 'dva/router';

function Users({dispatch,list:dataSource,loading,total,page:current}) {

	function deleteHandler(id){
		dispatch({
			type:'users/remove',
			payload:id,
		})
	}


	function pageChangeHandler(page){
		dispatch (routerRedux.push({
			pathname:'/users',
			query:{page},
		}));
	}

	console.log(`数据源为 ${dataSource}`)

	const colums = [

		{
			title:'Name',
			dataIndex:'name',
			key:'name',
			render: (text) => <a href="">{text}</a>,
		},
		{
			title:'Email',
			dataIndex:'email',
			key:'email',
		},
		{
			title:'Website',
			dataIndex:'website',
			key:'website',
		},
		{
	       title: 'Operation',
	       key: 'operation',
	       render: (record) => (
	         <span className={styles.operation}>
	           <a href="">Edit     </a>
	           <Ant.Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)} onChange = {pageChangeHandler}>
	             <a href="">   Delete</a>
	           </Ant.Popconfirm>
	         </span>
	       ),
	     },


	];
  

  return (
    <div className={styles.normal}>
       <div>
       		<h2>用户表单管理系统</h2> 		 
       		<br />
       		 <Ant.Table
	          columns={colums}
	          dataSource={dataSource}
	          loading = {loading}
	          rowKey={record => record.id}
	          pagination={false}
	         
        	 />
       		<br />
       		 
       		<br />
       		<br />
       		<Ant.Pagination
       			className = "ant-table-pagination"
       			total = {total}
       			current = {current}
       			pageSize = {PAGE_SIZE}
       			onChange = {pageChangeHandler}
       		/>
       	</div>	
    </div>
  );
}



function mapStateToProps(state){
	const {list,total,page} = state.users;
	return {
		loading:state.loading.models.users,
		list,
		total,
		page,
	};
}

export default connect(mapStateToProps)(Users);
