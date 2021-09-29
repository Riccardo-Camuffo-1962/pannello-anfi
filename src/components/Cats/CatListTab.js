import React, { useState } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

import { 
	Container,
	TabContent, TabPane, 
	Nav, NavItem, NavLink, 
	FormGroup, Label, Input,
	Button,
	Row, Col 
} from 'reactstrap';

import Select from 'react-select';

import classnames		 from 'classnames';
import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";
import CatList			 from "views/CatList.js"

// others
const CatListTabs = (props) => {

	const [activeTab, setActiveTab] = useState('1');
	const [tabChanged, setTabChanged] = useState(0);


	const toggle = tab => {

		if(activeTab !== tab) {
			setActiveTab(tab);
			setTabChanged(1);
		}
	}

	// Mi stanno forse chiedendo una ricerca... ma anche no, ovviamente
	//
	let query = new URLSearchParams(useLocation().search);
	let search = query.get( 'search' ) ? query.get( 'search' ) : '';
	let who = query.get( 'who' ) ? query.get( 'who' ) : '';
	let tab = query.get( 'tab' ) ? query.get( 'tab' ) :  0;



	// Okkio. Questo mantiene attivo il tab cancellando nella router history
	// l'eventuale query string e rimpiazzandola con una vuota salvando comunque
	// i parametri. E' per la form di ricerca
	//
	if( tab ) {
		props.history.replace( { pathname: '/catlist-tabs' } );
		toggle( tab );
	}

	const selectOptions = [
		{ value: 'name', label: 'Nome' },
		{ value: 'owner', label: 'Proprietario' },
		{ value: 'breeder', label: 'Allevatore' },
		{ value: 'code', label: 'Codice' },
	];

	let defaultSelectedValue = selectOptions[0];
	selectOptions.forEach(function(option, index, array) {
		if( option.value === search )
			defaultSelectedValue = selectOptions[index];
	});

	React.useEffect(() => {
		var $ = require('jquery');
		if( tabChanged )
			$('#search_form')[0].reset();
	})

	return (
		<>
		<ApplicationNavbar />
		<div className="main">
		<div className="section section-gray first-section">
		<Container fluid>
		<Row>
			<Col md='6'>
				<h2>Lista Gatti</h2>
			</Col>
			<Col md='6'>
				<form className="form-inline float-right" id="search_form"> 
					<FormGroup row style={{marginTop:"30px", paddingRight:"20px"}}>
					<Label for="search">Ricerca</Label>
						<Select name="search" id="search"
							className="searchCatSelect" 
							classNamePrefix="searchCatSelect" 
							options={selectOptions} 
							defaultValue={defaultSelectedValue}
							theme={ theme => ({
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
						<Input type="text" name="who" id="who" defaultValue={who}
													style={{marginLeft:"10px"}}/>
						<Input type="hidden" name="tab" value={activeTab} />
						<Button className="btn-icon" color="secondary"
							style={{marginLeft:"10px"}}>
							<i className="fa fa-search" />
						</Button>
					</FormGroup>
				</form>
			</Col>
		</Row>
		<hr />
		<div className="nav-tabs-navigation" role="tablist">
			<div className="nav-tabs-wrapper-fluid">
				<Nav className="nav nav-tabs d-flex justify-content-center">
					<NavItem>
						<NavLink
							className={classnames({ active: activeTab === '1' })}
							onClick={() => { toggle('1'); }}>
								In allevamento
						</NavLink>
		          </NavItem>
		          <NavItem>
						<NavLink
							className={classnames({ active: activeTab === '2' })}
								onClick={() => { toggle('2'); }}>
								Di proprietà
						</NavLink>
		          </NavItem>
		          <NavItem>
						<NavLink
							className={classnames({ active: activeTab === '3' })}
								onClick={() => { toggle('3'); }}>
								Non in allevamento
						</NavLink>
		          </NavItem>
		          <NavItem>
						<NavLink
							className={classnames({ active: activeTab === '4' })}
								onClick={() => { toggle('4'); }}>
								Deceduti
						</NavLink>
		          </NavItem>
		          <NavItem>
						<NavLink
							className={classnames({ active: activeTab === '5' })}
								onClick={() => { toggle('5'); }}>
								Neutri
						</NavLink>
		          </NavItem>
		          <NavItem>
						<NavLink
							className={classnames({ active: activeTab === '6' })}
								onClick={() => { toggle('6'); }}>
								Tutti
						</NavLink>
		          </NavItem>
		        </Nav>

				<TabContent activeTab={activeTab}>
				<TabPane tabId="1">
					{ activeTab === '1' ? (
					<CatList title="Gatti (che risultano) in allevamento" 
								 what='in_cattery' search={search} who={who} />
					) : (
					<CatList title="Gatti (che risultano) in allevamento" 
								 what='in_cattery' search='' who='' />
					)}
				</TabPane>

				<TabPane tabId="2">
					{ activeTab === '2' ? (
					<CatList title="Gatti (che risultano) di proprietà" 
							what='owned' search={search} who={who} />
					) : (
					<CatList title="Gatti (che risultano) di proprietà" 
							what='owned' search='' who='' />
					)}
				</TabPane>
				<TabPane tabId="3">
					{ activeTab === '3' ? (
					<CatList title="Gatti di proprietà (che risultano) non in allevamento"
							 what='in_hosting' search={search} who={who} />
					) : (
					<CatList title="Gatti di proprietà (che risultano) non in allevamento"
							 what='in_hosting' search='' who='' />
					)}
				</TabPane>
				<TabPane tabId="4">
					{ activeTab === '4' ? (
					<CatList title="Gatti (che risultano) deceduti" 
							 what='deceased' search={search} who={who} />
					) : (
					<CatList title="Gatti (che risultano) deceduti" 
							 what='deceased' search='' who='' />
					)}
				</TabPane>
				<TabPane tabId="5">
					{ activeTab === '5' ? (
					<CatList title="Gatti neutri (che risultano) di proprietà" 
							 what='neuter' search={search} who={who} />
					) : (
					<CatList title="Gatti neutri (che risultano) di proprietà" 
							 what='neuter' search='' who='' />
					)}
				</TabPane>
				<TabPane tabId="6">
					{ activeTab === '6' ? (
					<CatList title="Tutti i tuoi gatti registrati" 
							what='full' search={search} who={who} />
					) : (
					<CatList title="Tutti i tuoi gatti registrati" 
							what='full' search='' who='' />
					)}
				</TabPane>
				</TabContent>
			</div>
		</div>
		</Container>
		</div>
		</div>
		<ApplicationFooter />
		</>
	);
}

export default withRouter(CatListTabs);
