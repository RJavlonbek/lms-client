import {
	DashboardOutlined as DashboardIcon,
	VerifiedUserOutlined as EmployeeIcon,
	ExtensionOutlined as ExtensionIcon,
	LocalOfferOutlined as ProductIcon
} from '@material-ui/icons';

import Request, {reducer as requestReducer} from './Request';
import Dashboard, {reducer as dashboardReducer} from './Dashboard';
import Product, {reducer as productReducer} from './Product';
import Category, {reducer as categoryReducer} from './Category';

import Admin from './Admin';
import {defineModule} from '../functions';

export const SIGN_IN_REQ='Admin/SignInReq';
export const SIGN_IN_RES='Admin/SignInRes';
export const SET_TITLE='Admin/SetTitle';
export const LOG_OUT='Admin/LogOut';
export const ALERT='Admin/Alert';

const route='/admin';

const defaultState={
	title:'Dashboard',
	menuItems:[{
		text:'Dashboard',
		accessRightTitle:'Dashboard',
		link:route,
		icon:DashboardIcon
	},{
		text:'Employees',
		accessRightTitle:'Employees',
		link:route+'/employees',
		icon:EmployeeIcon
	},{
		text:'Products',
		accessRightTitle:'Products',
		link:route+'/products',
		icon:ProductIcon
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
					loginFailed:true,
					authenticating:false,
					loggedIn:false
				}
			}
		case LOG_OUT:
			return defaultUserState
		default:
			return state;
	}
}

const defaultAlertState={
	type:'success',
	text: 'asd'
}
const alertReducer=(state=defaultAlertState, action)=>{
	switch(action.type){
		case ALERT:
			return{
				...state,
				...action.payload
			}
		default:
			return state
	}
}

export const reducer=(state=defaultState, action)=>{
	return {
		...defaultState,
		Dashboard:dashboardReducer(state.Dashboard, action),
		Request:requestReducer(state.Request, action),
		Product:productReducer(state.Product, action),
		Category:categoryReducer(state.Category, action),
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
	Request,
	Dashboard,
	Product,
	Category
}

export default defineModule('Admin',route, Admin, reducer, children);