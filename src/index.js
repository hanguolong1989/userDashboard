import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import message from 'antd';

// 1. Initialize
const app = dva({
	onError(e){
		message.error(e.message,/*duration*/3);
	},
});

console.log(`app顶层数据${app._store}`);

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
