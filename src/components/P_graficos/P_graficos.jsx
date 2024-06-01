import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { createClient } from "@supabase/supabase-js";
import "./P_graficos.css";

const supabaseUrl = "https://lelwhxghwolrpmrkeeuw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlbHdoeGdod29scnBtcmtlZXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNzYwOTQsImV4cCI6MjAyODc1MjA5NH0.4Uvxw93JsGUMigcWASudRAebz4C9WmNdiF8yCCqRkFI";
const supabase = createClient(supabaseUrl, supabaseKey);

const P_graficos = () => {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const chartRef3 = useRef(null);
    const chartInstance1 = useRef(null);
    const chartInstance2 = useRef(null);
    const chartInstance3 = useRef(null);
    const [data, setData] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);
    const [brandCounts, setBrandCounts] = useState([]);
    const [brandCountsState0, setBrandCountsState0] = useState([]);
    const [nationalityData, setNationalityData] = useState([]);
    const [uniqueNationalities, setUniqueNationalities] = useState([]);
    const [nationalityCounts, setNationalityCounts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: dbData, error } = await supabase
                .from('roupa')
                .select('*');
            if (error) {
                console.error("Error fetching data:", error);
            } else {
                setData(dbData);
            }
        };

        const fetchNationalityData = async () => {
            const { data: nationalityData, error } = await supabase
                .from('login')
                .select('*');
            if (error) {
                console.error("Error fetching nationality data:", error);
            } else {
                setNationalityData(nationalityData);
            }
        };

        fetchData();
        fetchNationalityData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const brands = [...new Set(data.map(item => item.marca))];
            setUniqueBrands(brands);
        }
    }, [data]);

    useEffect(() => {
        if (uniqueBrands.length > 0) {
            const counts = uniqueBrands.map(brand =>
                data.filter(item => item.marca === brand).length
            );
            setBrandCounts(counts);

            const countsState0 = uniqueBrands.map(brand =>
                data.filter(item => item.marca === brand && item.estado === 0).length
            );
            setBrandCountsState0(countsState0);
        }
    }, [uniqueBrands, data]);

    useEffect(() => {
        if (uniqueBrands.length > 0 && chartRef1.current) {
            if (chartInstance1.current) {
                chartInstance1.current.destroy();
            }

            const ctx1 = chartRef1.current.getContext("2d");
            chartInstance1.current = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: uniqueBrands,
                    datasets: [{
                        label: 'Quantidades',
                        data: brandCounts,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [uniqueBrands, brandCounts]);

    useEffect(() => {
        if (uniqueBrands.length > 0 && chartRef2.current) {
            if (chartInstance2.current) {
                chartInstance2.current.destroy();
            }

            const ctx2 = chartRef2.current.getContext("2d");
            chartInstance2.current = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: uniqueBrands,
                    datasets: [{
                        label: 'Vendidos',
                        data: brandCountsState0,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [uniqueBrands, brandCountsState0]);

    useEffect(() => {
        if (nationalityData.length > 0) {
            const nationalities = [...new Set(nationalityData.map(item => item.nacionalidade))];
            setUniqueNationalities(nationalities);

            const counts = nationalities.map(nationality =>
                nationalityData.filter(item => item.nacionalidade === nationality).length
            );
            setNationalityCounts(counts);
        }
    }, [nationalityData]);

    useEffect(() => {
        if (uniqueNationalities.length > 0 && chartRef3.current) {
            if (chartInstance3.current) {
                chartInstance3.current.destroy();
            }

            const ctx3 = chartRef3.current.getContext("2d");
            chartInstance3.current = new Chart(ctx3, {
                type: 'bar',
                data: {
                    labels: uniqueNationalities,
                    datasets: [{
                        label: 'Nacionalidades',
                        data: nationalityCounts,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [uniqueNationalities, nationalityCounts]);

    return (
        <div className="graf">
            <h1>Gráficos</h1>
            <div className="graf_cont">
                <canvas ref={chartRef1}></canvas>
            </div>
            <div className="graf_cont">
                <canvas ref={chartRef2}></canvas>
            </div>
            <div className="graf_cont2">
                <canvas ref={chartRef3}></canvas>
            </div>
        </div>
    );
};

export default P_graficos;
