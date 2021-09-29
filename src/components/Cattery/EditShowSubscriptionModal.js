import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Modal, Row } from 'reactstrap';

import ShowSubscriptionForm		  from "components/Forms/ShowSubscriptionForm.js";
import { notify }				  from "components/Notifications/Notifications.js";

class EditShowSubscriptionModal extends Component
{
	constructor( props )
	{
		super( props );

		this.toggle = this.toggle.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			live: props.live, 
			subscription: props.subscription,
			idx: props.idx,
		}
	}

	UNSAFE_componentWillReceiveProps(props) 
	{
		this.setState( { live: false } );
		this.setState( { subscription: {} });

		props.caller.setState( { live: false } );
	}

	async onSubmit(e)
	{
		// Questa viene richiamata dalla form....
		//
		console.log( 'OnSubmit in Modal' );
		console.log( this.props );

		var result = await this.refs.show_subs_form.onSubmit(e);

		switch( result.status )
		{
			case 'FatalError':
				notify( 'error', result.message+' '+result.details );
				this.toggle( false );
				return true;
			case 'FetchError':
				notify( 'error', result.message );
				this.toggle( false );
				return true;
			default:
				notify( 'success', 'Iscrizione modificata con successo' );
				this.toggle( false );

				console.log( result.details );

				var data = this.props.caller.state.data;
				data[this.state.idx] = result.details;
				await this.props.caller.setState( { data: data } );
				return true;
		}
	}

	toggle( value )
	{
		if( value === false )
		{
			this.setState( { live: false } );
			this.setState( { subscription: {} });
		}
		else
			this.setState( { live: true } );
	}

	render()
	{
		return( 
			<Modal className="modal" 
				isOpen={this.state.live} style={{ display: 'block', overflow: 'hidden' }}
												toggle={() => this.toggle(false) }>
				<div className="modal-header">
					<h5 className="modal-title">
			            Modifica iscrizione expo
					</h5>
					<button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={() => this.setState({live: false })}>
								<span aria-hidden={true}>×</span>
					</button>
				</div>
				<div className="modal-body">
					<Row>
						<ShowSubscriptionForm subscription={this.state.subscription}
											  ref='show_subs_form'
											  mode='edit' />
					</Row>
				</div>
				<div className="modal-footer">
					<div className="left-side">
						<Button
							className="btn-link"
							color="danger"
							type="button"
							onClick={() => this.toggle(false) }>
								Recedo
						</Button>
					</div>
					<div className="divider" />
					<div className="right-side">
						<Button
							className="btn-link"
							color="danger"
							type="button"
							onClick={(event) => this.onSubmit(event) }>
								Andiamo!
						</Button>
					</div>
				</div>
				</Modal>
		);
	}
}

export default withRouter(EditShowSubscriptionModal);
