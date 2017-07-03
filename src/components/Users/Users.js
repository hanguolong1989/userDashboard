import React from 'react';
import {connect} from 'dva';
import * as Ant  from 'antd';
import {Button} from 'antd';
import styles from './Users.css';
import {PAGE_SIZE} from '../../constants';
import {routerRedux} from 'dva/router';
import UserModal from './UserModal';


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

	function editHandler(id,values){
		dispatch({
			type:'users/patch',
			payload:{id,values},
		});
	}

	function createHandler(values){
		dispatch({
			type:'users/create',
			payload:values,
		});
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
	       render: (text,record) => (
	         <span className={styles.operation}>
	            <UserModal record = {record} onOk = {editHandler.bind(null,record.id)}>
	            	<a>Edit</a>
	            </UserModal>
	           <Ant.Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
	            	<a href="">Delete</a>
	           </Ant.Popconfirm>
	         </span>
	       ),
	     },


	];
  

  return (
    <div className={styles.normal}>
       <div>
       		 <div className = {styles.create}>
       		 	<UserModal record={{}} onOk={createHandler}>
           			 <Button type="primary">Create User</Button>
          		</UserModal>
          		
          		<br/>
          		<br/>
       		 	
       		 </div>
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
