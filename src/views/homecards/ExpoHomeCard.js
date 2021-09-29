import { Component } from "react";

class ExpoHomeCard extends Component
{
	constructor( props )
	{
		super( props );
		this.cats_in_expo = props.fact.cats_in_expo;
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
									<i className="nc-icon nc-trophy text-primary"></i>
								</div>
							</div>
							<div className="col-7 col-md-8">
								<div className="numbers">
									<p className="card-category">Gatti in expo</p>
									<p className="card-title">{this.cats_in_expo}</p>
									<p></p>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer">
					<hr />
					<div className="stats">
						Le expo sono registrate a sistema a partire dal 2018</div>
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default ExpoHomeCard;
