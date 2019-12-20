import React, {Component} from "react";
var CanvasJSReact = require('./canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {

    constructor(props){
        super(props);
    }
    
	render() {
        let dataValues = props.userData.categoryPreferences.map(({points, id}) => {
            ({
                y: points,
                label: id
            })
        });
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Your category points"
            },
			data: [{
				type: "pie",
				startAngle: 0,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: dataValues
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}