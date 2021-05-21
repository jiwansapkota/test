import {React } from 'react'
import { Line } from 'react-chartjs-2';
function LineChart(props) {
    var data = props.data
    var lable=props.lable
    console.log("props in barchart")
    console.log(data);
     
   

    return (
        <div>
            LineChart
            <div>
                <Line
                    data={{
                        labels: lable,
                        datasets: [{
                            label: "Income",
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1
                        },
                        ]
                    }}
                    height={400}
                    width={600}
                    options={
                       
                        {
                            maintainAspectRatio: false
                        }
                    }
                />
            </div>
        </div>
    )
}

export default LineChart
