import { Component } from "react";

class InCatteryHomeCard extends Component
{
	constructor( props )
	{
		super( props );
		this.in_cattery = props.fact.in_cattery;
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
									<i className="fa fa-home text-success"></i>
								</div>
							</div>
							<div className="col-7 col-md-8">
								<div className="numbers">
									<p className="card-category">In allevamento</p>
									<p className="card-title">{this.in_cattery}</p>
									<p></p>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer">
					<hr />
					<div className="stats">
						Soggetti che risultano in allevamento presso U.C.</div>
					</div>
				</div>
			</div>
			</>
		);
	}
}

export default InCatteryHomeCard;
