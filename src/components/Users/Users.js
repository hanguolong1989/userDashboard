import React from 'react';
import {connect} from 'dva';
import * as Ant  from 'antd';
import styles from './Users.css';
import {PAGE_SIZE} from '../../constants';

function Users({list:dataSource,total,page:current}) {

	function deleteHander(id){
		console.warn(`TODO:${id}`);
	}

	function nextPageHandler(){
		alert('跳转下一页😀')
	}

	console.log(`数据源为 ${dataSource}`)

	const colums = [

		// {
		// 	title:'Name',
		// 	dataIndex:'name',
		// 	key:'name',
		// 	render: (record) => <a href="">{record.text}</a>,
		// },
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
	           <a href="">Edit</a>
	           <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)} onChange = {nextPageHandler}>
	             <a href="">Delete</a>
	           </Popconfirm>
	         </span>
	       ),
	     },


	];
  

  return (
    <div className={styles.normal}>
       <div>
       		<h2>用户表单管理系统</h2>
	       		 
       		<br />
       		 
       		<Ant.Card 
       			title = "数据暂未出现"
       			extra = "show"
       			loading = {true}

       		/>
       		<br />
       		 
       		<br />
       		<br />
       		<Ant.Pagination
       			className = "ant-table-pagination"
       			total = {total}
       			current = {current}
       			pageSize = {PAGE_SIZE}
       			onChange = {nextPageHandler}
       		/>
       	</div>	
    </div>
  );
}



function mapStateToProps(state){
	const {list,total,page} = state.users;
	return {
		list,
		total,
		page,
	};
}

export default connect(mapStateToProps)(Users);
