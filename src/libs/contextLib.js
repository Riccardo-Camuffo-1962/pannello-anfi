import { useContext, createContext } from "react";

const initialState = sessionStorage.getItem( 'ctx' ) ? 
		JSON.parse( sessionStorage.getItem( 'ctx' ) ) : 
		{
			isAuthenticated: false,
			id: 0,
			name: '',
			type: '',
			token: ''
		};

/*
const initialState = {
	isAuthenticated: false,
	name: '',
	type: '',
	token: ''
};
*/

export var AppContext = createContext(initialState);

export function useAppContext() {
	  return useContext(AppContext);
}
