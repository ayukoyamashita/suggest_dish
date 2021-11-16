<template>
    <canvas id="chart" width="400" height="400"></canvas>
</template>

<script>
    import { onMounted } from 'vue';
    import Chart from 'chart.js/auto';

    export default {
        name: "Chart",
        props: {
            taste: [],
            result: []
        },
        setup(props) {
            const renderChart = () =>{
                let ctx = document.getElementById("chart");
                new Chart(ctx, {
                    type: 'radar',
                    data:{
                        labels: ['heat', 'oily', 'salty', 'solid', 'sweetness'],
                        datasets: [
                            {
                                label: 'おすすめごはん',
                                data: props.result,
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                borderColor: 'rgba(255, 255, 255, 0.8)',
                                borderWidth: 1,
                                fill: true,
                                order: 1
                            },
                            {
                                label: '今日の気分',
                                data: props.taste,
                                backgroundColor: 'rgba(249, 161, 97, .6)',
                                borderColor: 'rgba(249, 161, 97, 1)',
                                borderWidth: 1,
                                fill: true,
                                order: 0
                            }
                        ]
                    },
                    options: {
                        scales: {
                            r: {
                                min: 0,
                                max: 10,
                                ticks: {
                                    stepSize: 5,
                                    color: 'rgba(255, 255, 255, 1)',
                                    backdropColor: 'rgba(0, 0, 0, 0)'
                                },
                                backgroundColor: 'rgba(255, 255, 255, 0)',
                                grid: {
                                    color: 'rgba(255, 255, 255, .5)',
                                },
                                angleLines: {
                                    color: 'rgba(255, 255, 255, 0.1)',
                                },
                                pointLabels: {
                                    color: 'rgba(255, 255, 255, .9)',
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    color: 'rgba(255, 255, 255, 1)'
                                }
                            }
                        }
                    }
                });
            }

            onMounted(renderChart);
        }
    }
</script>

<style scoped>
</style>