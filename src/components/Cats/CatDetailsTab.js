import { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { 
	Container,
	TabContent, TabPane, 
	Nav, NavItem, NavLink, 
	Row, Col 
} from 'reactstrap';

// Tabs
//
import CatDetailsTab	from	"views/cattab/CatDetailsTab.js"

import getCat from "libs/cat.js"

import classnames		 from 'classnames';

import ApplicationNavbar from "components/Navbars/ApplicationNavbar.js";
import ApplicationFooter from "components/Footers/ApplicationFooter.js";

import CatGenealogyTab	 from "views/cattab/CatGenealogyTab.js";
import CatOffspringTab	 from "views/cattab/CatOffspringTab.js";
import CatTestsTab		 from "views/cattab/CatTestsTab.js";
import CatShowResultsTab from "views/cattab/CatShowResultsTab.js";

import CatOwnerTab		 from "views/cattab/CatOwnerTab.js";
import CatBreederTab	 from "views/cattab/CatBreederTab.js";

class CatDetailsTabs extends Component
{
	constructor( props )
	{
		super( props );

		this.id = props.match.params.id;

		this.state = {
			activeTab: '1',
			cat: null,
			loaded: false
		};

		getCat( this, this.id );
	}

	toggle(tab) 
	{
		if(this.state.activeTab !== tab) 
			this.setState( {activeTab: tab } );
	}

	render()
	{
		let activeTab = this.state.activeTab;

		if( this.state.loaded === false )
			return null;

		const cat = this.state.cat;

		// console.log( cat );

		var name = cat.pretitolo ? cat.pretitolo : '';
		name += cat.prefisso ? '\u00a0'+cat.prefisso+'\u00a0'+cat.nome : 
								cat.postfisso ? cat.name+'\u00a0'+cat.postfisso:cat.nome;
		name += cat.posttitolo? cat.posttitolo : '';

		return( 
			<>
			<ApplicationNavbar />
			<div className="main">
			<div className="section section-gray first-section">
			<Container fluid>
			<Row>
				<Col>
					<h2>{name}</h2>
				</Col>
			</Row>
			<hr />
			<div className="nav-tabs-navigation" role="tablist">
				<div className="nav-tabs-wrapper-fluid">
					<Nav className="nav nav-tabs d-flex justify-content-center">
						<NavItem>
							<NavLink
								className={classnames({ active: activeTab === '1' })}
								onClick={() => { this.toggle('1'); }}>
									Dettagli
							</NavLink>
					  </NavItem>
					  <NavItem>
							<NavLink
								className={classnames({ active: activeTab === '2' })}
									onClick={() => { this.toggle('2'); }}>
									Genealogia
							</NavLink>
					  </NavItem>
					  <NavItem>
							<NavLink
								className={classnames({ active: activeTab === '3' })}
									onClick={() => { this.toggle('3'); }}>
									Discendenza
							</NavLink>
					  </NavItem>
					  <NavItem>
							<NavLink
								className={classnames({ active: activeTab === '4' })}
									onClick={() => { this.toggle('4'); }}>
									Test
							</NavLink>
					  </NavItem>
					  <NavItem>
							<NavLink
								className={classnames({ active: activeTab === '5' })}
									onClick={() => { this.toggle('5'); }}>
									Esposizioni
							</NavLink>
					  </NavItem>
					  <NavItem>
							<NavLink
								className={classnames({ active: activeTab === '6' })}
									onClick={() => { this.toggle('6'); }}>
									Allevatore
							</NavLink>
					  </NavItem>
					  <NavItem>
							<NavLink
								className={classnames({ active: activeTab === '7' })}
									onClick={() => { this.toggle('7'); }}>
									Proprietario
							</NavLink>
					  </NavItem>
					</Nav>

					<TabContent activeTab={activeTab}>
					<TabPane tabId="1">
						<CatDetailsTab cat={cat} />
					</TabPane>
					<TabPane tabId="2">
						<CatGenealogyTab cat={cat} />
					</TabPane>
					<TabPane tabId="3">
						<CatOffspringTab cat={cat} />
					</TabPane>
					<TabPane tabId="4">
						<CatTestsTab cat={cat} />
					</TabPane>
					<TabPane tabId="5">
						<CatShowResultsTab cat={cat} />
					</TabPane>
					<TabPane tabId="6">
						<CatBreederTab cat={cat} />
					</TabPane>
					<TabPane tabId="7">
						<CatOwnerTab cat={cat} />
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
}




export default withRouter(CatDetailsTabs);
