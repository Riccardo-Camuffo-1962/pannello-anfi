import { Component } from "react";

class LittersHomeCard extends Component
{
	constructor( props )
	{
		super( props );
		this.litters = props.fact.litters;
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
									<i className="fa fa-heart text-danger"></i>
								</div>
							</div>
							<div className="col-7 col-md-8">
								<div className="numbers">
									<p className="card-category">Cucciolate</p>
									<p className="card-title">{this.litters}</p>
									<p></p>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer">
					<hr />
					<div className="stats">
						Cucciolate che risultano registrate presso U.C.</div>
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default LittersHomeCard;
