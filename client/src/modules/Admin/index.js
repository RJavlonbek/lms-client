import {
	DashboardOutlined as DashboardIcon,
	VerifiedUserOutlined as EmployeeIcon,
	ExtensionOutlined as ExtensionIcon,
	LocalOfferOutlined as ProductIcon,
	DescriptionOutlined as ArticleIcon
} from '@material-ui/icons';

import Dashboard, {reducer as dashboardReducer} from './Dashboard';
import Category, {reducer as categoryReducer} from './Category';
import Article, {reducer as articleReducer} from './Article';
import Author, {reducer as authorReducer} from './Author';

import Admin from './Admin';
import {defineModule} from '../functions';

export const SIGN_IN_REQ='Admin/SignInReq';
export const SIGN_IN_RES='Admin/SignInRes';
export const SET_TITLE='Admin/SetTitle';
export const LOG_OUT='Admin/LogOut';
export const ALERT='Admin/Alert';
export const ALERT_CLOSE='Admin/AlertClose';

const route='/admin';

const defaultState={
	title:'Dashboard',
	menuItems:[{
		text:'Dashboard',
		accessRightTitle:'Dashboard',
		link:route,
		icon:DashboardIcon
	},{
		text:'Authors',
		accessRightTitle:'Authors',
		link:route+'/authors',
		icon:EmployeeIcon
	},{
		text:'Articles',
		accessRightTitle:'Articles',
		link:route+'/articles',
		icon:ArticleIcon
	},{
		text:'Categories',
		accessRightTitle:'Categories',
		link:route+'/categories',
		icon:ExtensionIcon
	}]
};

const defaultUserState={
	loggedIn:false, 
	authenticating:false,
	loginAttempted:false
}
const userReducer=(state=defaultUserState,action)=>{
	switch(action.type){
		case SIGN_IN_REQ:
			return{
				...state,
				authenticating:true
			}
		case SIGN_IN_RES:
			var p=action.payload;
			if(p && p.username){
				return {
					...state,
					...action.payload,
					loggedIn:true,
					authenticating:false
				};
			}else{
				return {
					...state,
					...action.payload,
					loginFailed:true,
					authenticating:false,
					loggedIn:false
				}
			}
		case LOG_OUT:
			return defaultState
		default:
			return state;
	}
}

const defaultAlertState={
	type:'',
	text: 'asd',
	open:true
}
const alertReducer=(state=defaultAlertState, action)=>{
	switch(action.type){
		case ALERT:
			return{
				...state,
				...action.payload,
				open: true
			}
		case ALERT_CLOSE:
			return{
				open:false,
				type:''
			}
		default:
			return state
	}
}

export const reducer=(state=defaultState, action)=>{
	return {
		...defaultState,
		Dashboard:dashboardReducer(state.Dashboard, action),
		Category:categoryReducer(state.Category, action),
		Article: articleReducer(state.Article, action),
		Author: authorReducer(state.Author, action),
		user:userReducer(state.user,action),
		alert:alertReducer(state.alert, action),
		title:((s,a)=>{
			if(a.type===SET_TITLE){
				return a.payload;
			}else{
				return s;
			}
		})(state.title, action)
	}
}

export const children={
	Dashboard,
	Category,
	Article,
	Author
}

export default defineModule('Admin',route, Admin, reducer, children);