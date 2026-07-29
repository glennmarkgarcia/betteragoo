/**
 * Statistics Page - Chart.js Implementation
 * Better Agoo Portal
 */

// Site branding color palette for charts
const CHART_COLORS = {
  primary: '#0032a0',
  primaryDark: '#002170',
  accent: '#F77F00',
  success: '#06A77D',
  danger: '#D62828',
  info: '#0077BE',
  secondary: '#003D82',
};

/**
 * Get chart color palette matching site branding
 * @param {number} count - Number of colors needed
 * @returns {Array} Array of color strings
 */
function getChartColors(count) {
  const palette = [
    CHART_COLORS.primary,
    CHART_COLORS.accent,
    CHART_COLORS.success,
    CHART_COLORS.info,
    CHART_COLORS.danger,
    CHART_COLORS.secondary,
    CHART_COLORS.primaryDark,
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#14B8A6', // teal
    '#F59E0B', // amber
    '#6366F1', // indigo
  ];

  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(palette[i % palette.length]);
  }
  return colors;
}

// Barangay population data (2020 Census)
const barangayData = [
  {
    name: 'San Nicolas West',
    population: 2741,
    population2015: 2710,
    change: 1.14,
    annualGrowth: 0.24,
  },
  {
    name: 'San Agustin East',
    population: 2479,
    population2015: 2387,
    change: 3.85,
    annualGrowth: 0.8,
  },
  {
    name: 'San Manuel Norte',
    population: 2384,
    population2015: 2031,
    change: 17.38,
    annualGrowth: 3.43,
  },
  {
    name: 'San Antonio',
    population: 2351,
    population2015: 2372,
    change: -0.89,
    annualGrowth: -0.19,
  },
  { name: 'San Isidro', population: 2324, population2015: 2082, change: 11.62, annualGrowth: 2.34 },
  { name: 'Nazareno', population: 2232, population2015: 2061, change: 8.3, annualGrowth: 1.69 },
  { name: 'San Marcos', population: 2191, population2015: 2072, change: 5.74, annualGrowth: 1.18 },
  {
    name: 'San Julian West',
    population: 2125,
    population2015: 1914,
    change: 11.02,
    annualGrowth: 2.23,
  },
  { name: 'Santa Ana', population: 2089, population2015: 1936, change: 7.9, annualGrowth: 1.61 },
  { name: 'Balawarte', population: 1916, population2015: 1754, change: 9.24, annualGrowth: 1.88 },
  {
    name: 'San Jose Sur',
    population: 1818,
    population2015: 1796,
    change: 1.22,
    annualGrowth: 0.26,
  },
  {
    name: 'Santa Barbara',
    population: 1745,
    population2015: 1907,
    change: -8.5,
    annualGrowth: -1.85,
  },
  { name: 'Consolacion', population: 1714, population2015: 1661, change: 3.19, annualGrowth: 0.66 },
  { name: 'Santa Rita', population: 1571, population2015: 1529, change: 2.75, annualGrowth: 0.57 },
  {
    name: 'San Roque West',
    population: 1559,
    population2015: 1455,
    change: 7.15,
    annualGrowth: 1.46,
  },
  {
    name: 'San Joaquin Sur',
    population: 1506,
    population2015: 1480,
    change: 1.76,
    annualGrowth: 0.37,
  },
  {
    name: 'San Joaquin Norte',
    population: 1497,
    population2015: 1424,
    change: 5.13,
    annualGrowth: 1.06,
  },
  {
    name: 'San Miguel',
    population: 1446,
    population2015: 1577,
    change: -8.31,
    annualGrowth: -1.81,
  },
  { name: 'Macalva Sur', population: 1433, population2015: 1429, change: 0.28, annualGrowth: 0.06 },
  {
    name: 'San Agustin Norte',
    population: 1325,
    population2015: 1319,
    change: 0.45,
    annualGrowth: 0.1,
  },
  { name: 'Santa Monica', population: 1303, population2015: 1026, change: 27, annualGrowth: 5.16 },
  {
    name: 'San Vicente Norte',
    population: 1261,
    population2015: 1092,
    change: 15.48,
    annualGrowth: 3.08,
  },
  { name: 'San Juan', population: 1248, population2015: 1131, change: 10.34, annualGrowth: 2.09 },
  {
    name: 'Macalva Norte',
    population: 1220,
    population2015: 1138,
    change: 7.21,
    annualGrowth: 1.48,
  },
  {
    name: 'San Francisco',
    population: 1191,
    population2015: 1044,
    change: 14.08,
    annualGrowth: 2.81,
  },
  {
    name: 'San Agustin Sur',
    population: 1169,
    population2015: 1186,
    change: -1.43,
    annualGrowth: -0.3,
  },
  {
    name: 'San Julian East',
    population: 1165,
    population2015: 1121,
    change: 3.93,
    annualGrowth: 0.81,
  },
  {
    name: 'San Vicente Sur',
    population: 1164,
    population2015: 1108,
    change: 5.05,
    annualGrowth: 1.04,
  },
  {
    name: 'San Antonino',
    population: 1125,
    population2015: 1009,
    change: 11.5,
    annualGrowth: 2.32,
  },
  { name: 'San Pedro', population: 1101, population2015: 1106, change: -0.45, annualGrowth: -0.1 },
  {
    name: 'Santa Rita Sur',
    population: 1096,
    population2015: 1074,
    change: 2.05,
    annualGrowth: 0.43,
  },
  {
    name: 'Santa Rita Norte',
    population: 1027,
    population2015: 1158,
    change: -11.31,
    annualGrowth: -2.5,
  },
  { name: 'Santa Maria', population: 978, population2015: 971, change: 0.72, annualGrowth: 0.15 },
  {
    name: 'San Roque East',
    population: 976,
    population2015: 787,
    change: 24.02,
    annualGrowth: 4.63,
  },
  { name: 'Ambitacay', population: 952, population2015: 806, change: 18.11, annualGrowth: 3.57 },
  {
    name: 'San Nicolas East',
    population: 939,
    population2015: 821,
    change: 14.37,
    annualGrowth: 2.87,
  },
  {
    name: 'San Manuel Sur',
    population: 930,
    population2015: 873,
    change: 6.53,
    annualGrowth: 1.34,
  },
  {
    name: 'Santa Rita West',
    population: 917,
    population2015: 844,
    change: 8.65,
    annualGrowth: 1.76,
  },
  {
    name: 'San Jose Norte',
    population: 863,
    population2015: 820,
    change: 5.24,
    annualGrowth: 1.08,
  },
  {
    name: 'San Nicolas Central',
    population: 851,
    population2015: 1177,
    change: -27.7,
    annualGrowth: -6.6,
  },
  { name: 'Capas', population: 801, population2015: 1070, change: -25.14, annualGrowth: -5.91 },
  { name: 'Purok', population: 768, population2015: 654, change: 17.43, annualGrowth: 3.44 },
  { name: 'Santa Fe', population: 767, population2015: 804, change: -4.6, annualGrowth: -0.99 },
  {
    name: 'San Julian Norte',
    population: 740,
    population2015: 744,
    change: -0.54,
    annualGrowth: -0.11,
  },
  {
    name: 'Santa Rita East',
    population: 708,
    population2015: 777,
    change: -8.88,
    annualGrowth: -1.94,
  },
  { name: 'Macalva Central', population: 662, population2015: 662, change: 0, annualGrowth: 0 },
  {
    name: 'San Julian Central',
    population: 610,
    population2015: 619,
    change: -1.45,
    annualGrowth: -0.31,
  },
  {
    name: 'San Nicolas Norte',
    population: 539,
    population2015: 689,
    change: -21.77,
    annualGrowth: -5.04,
  },
  {
    name: 'San Nicolas Sur',
    population: 511,
    population2015: 485,
    change: 5.36,
    annualGrowth: 1.11,
  },
];

// Historical population data (Census years)
const historicalData = {
  years: [1990, 1995, 2000, 2007, 2010, 2015, 2020],
  populations: [42698, 47838, 51760, 57099, 57918, 63692, 66028],
};

// Economic indicators data
const economicData = {
  registeredBusinesses: 1200,
  agriculturalLand: 8500, // hectares
  incomeClass: '1st Class',
  landArea: 52.84, // km²
};

// Chart instances storage
let chartInstances = {};

/**
 * Create population by barangay bar chart
 * @param {string} canvasId - Canvas element ID
 * @returns {Chart} Chart.js instance
 */
function createPopulationBarChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) {
    console.error(`Canvas element ${canvasId} not found`);
    return null;
  }

  // Sort by population (highest to lowest)
  const sortedData = [...barangayData].sort((a, b) => b.population - a.population);

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedData.map((d) => d.name),
      datasets: [
        {
          label: 'Population',
          data: sortedData.map((d) => d.population),
          backgroundColor: CHART_COLORS.primary,
          borderColor: CHART_COLORS.primaryDark,
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Population: ${context.raw.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return value.toLocaleString();
            },
          },
        },
      },
      onHover: (event, elements) => {
        event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
      },
    },
  });

  chartInstances[canvasId] = chart;
  return chart;
}

/**
 * Create historical population line chart
 * @param {string} canvasId - Canvas element ID
 * @returns {Chart} Chart.js instance
 */
function createHistoricalLineChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) {
    console.error(`Canvas element ${canvasId} not found`);
    return null;
  }

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: historicalData.years,
      datasets: [
        {
          label: 'Population',
          data: historicalData.populations,
          borderColor: CHART_COLORS.primary,
          backgroundColor: 'rgba(0, 50, 160, 0.1)',
          fill: true,
          tension: 0.3,
          pointBackgroundColor: CHART_COLORS.primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `Population: ${context.raw.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value) {
              return value.toLocaleString();
            },
          },
        },
      },
    },
  });

  chartInstances[canvasId] = chart;
  return chart;
}

/**
 * Create population distribution pie chart
 * @param {string} canvasId - Canvas element ID
 * @returns {Chart} Chart.js instance
 */
function createDistributionPieChart(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) {
    console.error(`Canvas element ${canvasId} not found`);
    return null;
  }

  // Get top 10 barangays by population
  const top10 = [...barangayData].sort((a, b) => b.population - a.population).slice(0, 10);

  const totalPopulation = barangayData.reduce((sum, b) => sum + b.population, 0);
  const colors = getChartColors(10);

  const chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: top10.map((d) => d.name),
      datasets: [
        {
          data: top10.map((d) => d.population),
          backgroundColor: colors,
          borderColor: '#fff',
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 12,
            padding: 10,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const percentage = ((context.raw / totalPopulation) * 100).toFixed(1);
              return `${context.label}: ${context.raw.toLocaleString()} (${percentage}%)`;
            },
          },
        },
      },
    },
  });

  chartInstances[canvasId] = chart;
  return chart;
}

/**
 * Show loading indicator for a chart container
 * @param {string} containerId - Container element ID
 */
function showChartLoading(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.classList.add('chart-loading');
  }
}

/**
 * Hide loading indicator for a chart container
 * @param {string} containerId - Container element ID
 */
function hideChartLoading(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.classList.remove('chart-loading');
  }
}

/**
 * Initialize all charts on the statistics page
 */
function initializeCharts() {
  // Population by Barangay chart
  if (document.getElementById('populationBarChart')) {
    showChartLoading('populationChartContainer');
    createPopulationBarChart('populationBarChart');
    hideChartLoading('populationChartContainer');
  }

  // Historical Population chart
  if (document.getElementById('historicalLineChart')) {
    showChartLoading('historicalChartContainer');
    createHistoricalLineChart('historicalLineChart');
    hideChartLoading('historicalChartContainer');
  }

  // Population Distribution chart
  if (document.getElementById('distributionPieChart')) {
    showChartLoading('distributionChartContainer');
    createDistributionPieChart('distributionPieChart');
    hideChartLoading('distributionChartContainer');
  }
}

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCharts);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getChartColors,
    barangayData,
    historicalData,
    economicData,
    createPopulationBarChart,
    createHistoricalLineChart,
    createDistributionPieChart,
    initializeCharts,
    CHART_COLORS,
  };
}
