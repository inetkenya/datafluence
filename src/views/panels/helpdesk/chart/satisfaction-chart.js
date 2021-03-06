const chartData = {
    height: 260,
    type: 'pie',
    options: {
        labels: ["Very Poor", "Satisfied", "Very Satisfied", "Poor"],
        legend: {
            show: true,
            offsetY: 50,
        },
        theme: {
            monochrome: {
                enabled: true,
                color: '#1abc9c',
            }
        },
        responsive: [{
            breakpoint: 768,
            options: {
                chart: {
                    height: 320,

                },
                legend: {
                    position: 'bottom',
                    offsetY: 0,
                }
            }
        }]
    },
    series: [66, 50, 40, 30]
}

export default chartData;