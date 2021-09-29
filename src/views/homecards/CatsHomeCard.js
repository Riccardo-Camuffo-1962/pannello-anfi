import { Component } from "react";

class CatsHomeCard extends Component
{
	constructor( props )
	{
		super( props );
		this.cats = props.fact.cats;
	}

	render()
	{
		return(
			<>
			<div className="col-sm-6 col-md-6 col-lg-3">
				<div className="card-stats card">
					<div className="card-body">
						<div className="row">
							<div className="col-5 col-md-4">
								<div className="icon-big text-center icon-warning">
									<i className="fa fa-paw text-warning"></i>
								</div>
							</div>
							<div className="col-7 col-md-8">
								<div className="numbers">
									<p className="card-category">Gatti registrati</p>
									<p className="card-title">{this.cats}</p>
									<p></p>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer">
					<hr />
					<div className="stats">
						Soggetti che risultano registrati presso U.C.
					</div>
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default CatsHomeCard;
