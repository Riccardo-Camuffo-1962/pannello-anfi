import { Component } from 'react';

import { Container, 
	Form, FormFeedback,
	Input, Label, FormGroup, Row, Col } from "reactstrap";
import Select from 'react-select';

import safeConvertDate					from "libs/safe_convert_date.js"
import getCategoriesForSubscription		from "libs/get_categories_for_subscription.js"
import saveShowSubscription				from "libs/save_show_subscription.js"
import remapClass						from "libs/remap_class.js"

class ShowSubscriptionForm extends Component
{
	constructor( props )
	{
		super( props );

		this.state = {
			subscription: props.subscription,
			mode: props.mode,
			defaultSelectedValue: null,
			errors: {
				vicinanzagabbia: { status: false, message: '' }
			}
		}

		this.onChange		  = this.onChange.bind(this);
		this.onChangeSelected = this.onChangeSelected.bind(this);
		this.onSubmit		  = this.onSubmit.bind(this);

		// Comportamento dei campi in funzione della modalità di utilizzo della form.

		/**
		 * Selettore categorie
		 */
		this.selectOptions = [];
		this.defaultSelectedValue = null;
		this.categorySelectedEnabled = false;

		if( props.mode === 'edit' )
			this.getClasses( props.subscription.esposizioni_id, 
							 props.subscription.gatti_id );
	}	

	async getClasses( expo_id, cat_id )
	{
		var result = await getCategoriesForSubscription( cat_id, cat_id );
		// console.log( result );

		var mySelf = this;
		result.forEach(function(c, i, array) {
			let cl = remapClass( String( c ) );
			mySelf.selectOptions.push( {
				value: cl.class_id,	
				label: cl.name + ((cl.title) ? ' - '+cl.title : '')
			});
		});
		
		this.selectOptions.reverse();
		let defSelOpt = this.selectOptions.find( ({ value }) => 
								value === String(this.state.subscription.category) );
		if( defSelOpt )
			await this.setState( { defaultSelectedValue: defSelOpt } );

		// console.log( this.selectOptions );
	}

	onChangeSelected(selected)
	{
		var value = selected.value;

		this.setState( { defaultSelectedValue: selected } );
		this.setState( prevState => ({
			subscription: {
				...prevState.subscription,
				category: value }
		}));
	}

	onChange(e)
	{
		// console.log( e );
		//
		const target = e.target;
		const name = target.name;
		var value = '';

		// I checkbox si prendono in altro modo.....
		//
		if( name === 'gabbiadoppia' || name === 'confermacolore' )
		{
			value = e.target.checked;
			this.setState( prevState => ({
				subscription: {
					...prevState.subscription,
					[name]: value === true ? 1 : 0 }
			}));
		}
		else
		{
			value = target.value;
			this.setState( prevState => ({
				subscription: {
					...prevState.subscription,
					[name]: value
				}
			}));
		}

		// console.log( name );
		// console.log( value );
		// e.preventDefault();
		// console.log( this.state );
	}

	validate()
	{
		/*
		this.setState( prevState => ({
			errors: {
				...prevState.subscription,
				vicinanzagabbia: { status: true, message: 'Non va' }
			}
		}));

		return false;
		*/
		return true;
	}

	async onSubmit(e)
	{
		// console.log( 'onSubmit in Form' );
		e.preventDefault();

		// La validate sistema anche le evidenze sui campi errati.
		// Si torna false per evitare di chiudere resettare la form.
		//
		if( this.validate() === false )
			return false;

		let result = await saveShowSubscription( this.state.subscription );
		return result;
	}

	render()
	{
		// console.log( 'In render form' );
		// console.log( this.state );

		const mode = this.state.mode;
		const subs = this.state.subscription;
		const birth_date = safeConvertDate( subs.gatto.data_nascita );
		const errors = this.state.errors;

		// console.log( this.state.defaultSelectedValue );

		return(
			<>
			<Container>
			<Form onSubmit={this.onSubmit}>
				<FormGroup>
				<Row>
					<Col className="col-4">
						<Label>Esposizione</Label>
					</Col>
					<Col className="col-8">
						{ mode === 'edit' ? 
							<p>{subs.esposizione.name}</p> : null
						}
					</Col>
				</Row>
				</FormGroup>
				<FormGroup>
				<Row>
					<Col className="col-4">
						<Label>Gatto iscritto</Label>
					</Col>
					<Col className="col-8">
						{ mode === 'edit' ? 
							<>
							<p>{subs.gatto.nome}</p> 
							<Row>
							<div className="col-6">
								&nbsp;{birth_date}
							</div>
							<div className="col-6">
								<Label>Neutro:</Label>
								&nbsp;{ subs.gatto.neutro === 0 ? 'No' : 'Si' } 
							</div>
							</Row>
							</> : null
						}
					</Col>
				</Row>
				</FormGroup>
				<FormGroup>
					<Label>Categoria</Label>
					<Select name="category" id="category"
						onChange={(value) => this.onChangeSelected(value)}
						className="subscriptionCategorySelect" 
						classNamePrefix="subscriptionCategorySelect" 
						options={this.selectOptions} 
						value={this.state.defaultSelectedValue}
						theme={ (theme) => ({
							...theme,
							borderRadius: 0,
							colors: {
								...theme.colors,
								primary25: 'rgba(102,97,91,0.6)',
								primary50: 'rgba(102,97,91,0.8)',
								primary: '#66615b',
							},
						})}
					/>
				</FormGroup>
				<FormGroup check inline style={{ marginTop: "10px" }}>
			        <Label check>
			          <Input type="checkbox" name="gabbiadoppia" id="gabbiadoppia" 
								onChange={(event) => this.onChange(event)}
								defaultChecked={subs.gabbiadoppia} />{' '}
			          Gabbia doppia uso singolo
			          <span className="form-check-sign">
			            <span className="check"></span>
			        </span>
			        </Label>
			    </FormGroup>
				<FormGroup check inline>
			        <Label check>
			          <Input type="checkbox" name="confermacolore" 
								onChange={(event) => this.onChange(event)}
								defaultChecked={subs.confermacolore} 
								id="confermacolore" />{' '}
			          Conferma colore
			          <span className="form-check-sign">
			            <span className="check"></span>
			        </span>
			        </Label>
				</FormGroup>
				<FormGroup style={{ marginTop: "10px" }}>
			        <Label for="exampleText">Vicinanza gabbia</Label>
			        <Input invalid={errors.vicinanzagabbia.status}
						type="textarea" name="vicinanzagabbia" id="vicinanzagabbia" 
						onChange={(event) => this.onChange(event)}
						defaultValue={subs.vicinanzagabbia} />
					<FormFeedback>{errors.vicinanzagabbia.message}</FormFeedback>
			      </FormGroup>
			</Form>
			</Container>
			</>
		);
	}
}

export default ShowSubscriptionForm;
