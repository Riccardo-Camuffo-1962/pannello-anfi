import { Component } from 'react';

import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

export const notify = ( type, message ) => {
	switch (type) 
	{
	case 'info':
		NotificationManager.info(message);
		break;
	case 'success':
		NotificationManager.success(message);
		break;
	case 'warning':
		NotificationManager.warning(message);
		//NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
		break;
	case 'error':
		NotificationManager.error(message);
		// NotificationManager.error('Error message', 'Click me!', 5000, () => { alert('callback'); });
		break;
	default:
		break;
	}
}

export class Notifications extends Component
{
	render()
	{
		return ( <NotificationContainer /> );
	}
}
