/**
 * Statistics Page - Enhanced Animations & Charts
 * Better Agoo Portal - Minimal Professional Design
 */

// Brand colors
const COLORS = {
  primary: '#0032a0',
  primaryDark: '#002170',
  secondary: '#003D82',
  accent: '#F77F00',
  success: '#06A77D',
  info: '#0077BE',
};

// Barangay population data (2020 Census)
const barangayData = [
  { name: 'San Nicolas West', pop: 2741, population2015: 2710, change: 1.14, annualGrowth: 0.24 },
  { name: 'San Agustin East', pop: 2479, population2015: 2387, change: 3.85, annualGrowth: 0.8 },
  { name: 'San Manuel Norte', pop: 2384, population2015: 2031, change: 17.38, annualGrowth: 3.43 },
  { name: 'San Antonio', pop: 2351, population2015: 2372, change: -0.89, annualGrowth: -0.19 },
  { name: 'San Isidro', pop: 2324, population2015: 2082, change: 11.62, annualGrowth: 2.34 },
  { name: 'Nazareno', pop: 2232, population2015: 2061, change: 8.3, annualGrowth: 1.69 },
  { name: 'San Marcos', pop: 2191, population2015: 2072, change: 5.74, annualGrowth: 1.18 },
  { name: 'San Julian West', pop: 2125, population2015: 1914, change: 11.02, annualGrowth: 2.23 },
  { name: 'Santa Ana', pop: 2089, population2015: 1936, change: 7.9, annualGrowth: 1.61 },
  { name: 'Balawarte', pop: 1916, population2015: 1754, change: 9.24, annualGrowth: 1.88 },
  { name: 'San Jose Sur', pop: 1818, population2015: 1796, change: 1.22, annualGrowth: 0.26 },
  { name: 'Santa Barbara', pop: 1745, population2015: 1907, change: -8.5, annualGrowth: -1.85 },
  { name: 'Consolacion', pop: 1714, population2015: 1661, change: 3.19, annualGrowth: 0.66 },
  { name: 'Santa Rita', pop: 1571, population2015: 1529, change: 2.75, annualGrowth: 0.57 },
  { name: 'San Roque West', pop: 1559, population2015: 1455, change: 7.15, annualGrowth: 1.46 },
  { name: 'San Joaquin Sur', pop: 1506, population2015: 1480, change: 1.76, annualGrowth: 0.37 },
  { name: 'San Joaquin Norte', pop: 1497, population2015: 1424, change: 5.13, annualGrowth: 1.06 },
  { name: 'San Miguel', pop: 1446, population2015: 1577, change: -8.31, annualGrowth: -1.81 },
  { name: 'Macalva Sur', pop: 1433, population2015: 1429, change: 0.28, annualGrowth: 0.06 },
  { name: 'San Agustin Norte', pop: 1325, population2015: 1319, change: 0.45, annualGrowth: 0.1 },
  { name: 'Santa Monica', pop: 1303, population2015: 1026, change: 27, annualGrowth: 5.16 },
  { name: 'San Vicente Norte', pop: 1261, population2015: 1092, change: 15.48, annualGrowth: 3.08 },
  { name: 'San Juan', pop: 1248, population2015: 1131, change: 10.34, annualGrowth: 2.09 },
  { name: 'Macalva Norte', pop: 1220, population2015: 1138, change: 7.21, annualGrowth: 1.48 },
  { name: 'San Francisco', pop: 1191, population2015: 1044, change: 14.08, annualGrowth: 2.81 },
  { name: 'San Agustin Sur', pop: 1169, population2015: 1186, change: -1.43, annualGrowth: -0.3 },
  { name: 'San Julian East', pop: 1165, population2015: 1121, change: 3.93, annualGrowth: 0.81 },
  { name: 'San Vicente Sur', pop: 1164, population2015: 1108, change: 5.05, annualGrowth: 1.04 },
  { name: 'San Antonino', pop: 1125, population2015: 1009, change: 11.5, annualGrowth: 2.32 },
  { name: 'San Pedro', pop: 1101, population2015: 1106, change: -0.45, annualGrowth: -0.1 },
  { name: 'Santa Rita Sur', pop: 1096, population2015: 1074, change: 2.05, annualGrowth: 0.43 },
  { name: 'Santa Rita Norte', pop: 1027, population2015: 1158, change: -11.31, annualGrowth: -2.5 },
  { name: 'Santa Maria', pop: 978, population2015: 971, change: 0.72, annualGrowth: 0.15 },
  { name: 'San Roque East', pop: 976, population2015: 787, change: 24.02, annualGrowth: 4.63 },
  { name: 'Ambitacay', pop: 952, population2015: 806, change: 18.11, annualGrowth: 3.57 },
  { name: 'San Nicolas East', pop: 939, population2015: 821, change: 14.37, annualGrowth: 2.87 },
  { name: 'San Manuel Sur', pop: 930, population2015: 873, change: 6.53, annualGrowth: 1.34 },
  { name: 'Santa Rita West', pop: 917, population2015: 844, change: 8.65, annualGrowth: 1.76 },
  { name: 'San Jose Norte', pop: 863, population2015: 820, change: 5.24, annualGrowth: 1.08 },
  {
    name: 'San Nicolas Central',
    pop: 851,
    population2015: 1177,
    change: -27.7,
    annualGrowth: -6.6,
  },
  { name: 'Capas', pop: 801, population2015: 1070, change: -25.14, annualGrowth: -5.91 },
  { name: 'Purok', pop: 768, population2015: 654, change: 17.43, annualGrowth: 3.44 },
  { name: 'Santa Fe', pop: 767, population2015: 804, change: -4.6, annualGrowth: -0.99 },
  { name: 'San Julian Norte', pop: 740, population2015: 744, change: -0.54, annualGrowth: -0.11 },
  { name: 'Santa Rita East', pop: 708, population2015: 777, change: -8.88, annualGrowth: -1.94 },
  { name: 'Macalva Central', pop: 662, population2015: 662, change: 0, annualGrowth: 0 },
  { name: 'San Julian Central', pop: 610, population2015: 619, change: -1.45, annualGrowth: -0.31 },
  { name: 'San Nicolas Norte', pop: 539, population2015: 689, change: -21.77, annualGrowth: -5.04 },
  { name: 'San Nicolas Sur', pop: 511, population2015: 485, change: 5.36, annualGrowth: 1.11 },
];

// Historical data
const historicalData = {
  years: [1990, 1995, 2000, 2007, 2010, 2015, 2020],
  populations: [42698, 47838, 51760, 57099, 57918, 63692, 66028],
};

// Chart instances
let charts = {};

/**
 * Animate number counting
 */
function animateCount(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

/**
 * Intersection Observer for scroll animations
 */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');

            // Trigger count animation for metric cards
            const countEl = entry.target.querySelector('[data-count]');
            if (countEl) {
              const target = parseInt(countEl.dataset.count);
              animateCount(countEl, target);
            }

            // Animate bars
            animateBars(entry.target);
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.animate-on-scroll, .metric-card').forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Animate progress bars within an element
 */
function animateBars(container) {
  // Breakdown bars
  container.querySelectorAll('.breakdown-segment').forEach((bar) => {
    const width = bar.dataset.width;
    if (width) {
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 300);
    }
  });

  // Barangay bars
  container.querySelectorAll('.bar-wrap .bar').forEach((bar) => {
    const width = bar.dataset.width;
    if (width) {
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 100);
    }
  });

  // Sector bars
  container.querySelectorAll('.sector-bar, .sc-fill').forEach((bar) => {
    const width = bar.dataset.width;
    if (width) {
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 200);
    }
  });

  // Poverty bars
  container.querySelectorAll('.poverty-fill').forEach((bar) => {
    const width = bar.dataset.width;
    if (width) {
      setTimeout(() => {
        bar.style.width = width * 10 + '%';
      }, 300);
    }
  });
}

/**
 * Create Historical Line Chart
 */
function createHistoricalChart() {
  const ctx = document.getElementById('historicalLineChart');
  if (!ctx) return;

  const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(0, 50, 160, 0.2)');
  gradient.addColorStop(1, 'rgba(0, 50, 160, 0)');

  charts.historical = new Chart(ctx, {
    type: 'line',
    data: {
      labels: historicalData.years,
      datasets: [
        {
          label: 'Population',
          data: historicalData.populations,
          borderColor: COLORS.primary,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: COLORS.primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBorderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: 'easeOutQuart',
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0, 50, 160, 0.95)',
          titleFont: { size: 14, weight: '600' },
          bodyFont: { size: 13 },
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: (ctx) => `Population: ${ctx.raw.toLocaleString()}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 12 } },
        },
        y: {
          beginAtZero: false,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: {
            font: { size: 12 },
            callback: (v) => v / 1000 + 'K',
          },
        },
      },
    },
  });
}

/**
 * Create Distribution Pie Chart
 */
function createDistributionChart() {
  const ctx = document.getElementById('distributionPieChart');
  if (!ctx) return;

  const top10 = barangayData.slice(0, 10);
  const colors = [
    COLORS.primary,
    COLORS.accent,
    COLORS.success,
    COLORS.info,
    '#8B5CF6',
    '#EC4899',
    '#14B8A6',
    '#F59E0B',
    '#6366F1',
    COLORS.secondary,
  ];

  charts.distribution = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: top10.map((d) => d.name),
      datasets: [
        {
          data: top10.map((d) => d.pop),
          backgroundColor: colors,
          borderColor: '#fff',
          borderWidth: 3,
          hoverBorderWidth: 3,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500,
        easing: 'easeOutQuart',
      },
      cutout: '55%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 14,
            padding: 12,
            font: { size: 12 },
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 50, 160, 0.95)',
          titleFont: { size: 14, weight: '600' },
          bodyFont: { size: 13 },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
              const pct = ((ctx.raw / total) * 100).toFixed(1);
              return `${ctx.raw.toLocaleString()} (${pct}%)`;
            },
          },
        },
      },
    },
  });
}

/**
 * Create Population Bar Chart
 */
function createBarChart() {
  const ctx = document.getElementById('populationBarChart');
  if (!ctx) return;

  const sorted = [...barangayData].sort((a, b) => b.pop - a.pop);

  charts.bar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map((d) => d.name),
      datasets: [
        {
          label: 'Population',
          data: sorted.map((d) => d.pop),
          backgroundColor: sorted.map((_, i) => {
            const opacity = 1 - i * 0.03;
            return `rgba(0, 50, 160, ${opacity})`;
          }),
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
        easing: 'easeOutQuart',
        delay: (ctx) => ctx.dataIndex * 50,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0, 50, 160, 0.95)',
          titleFont: { size: 14, weight: '600' },
          bodyFont: { size: 13 },
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: (ctx) => `Population: ${ctx.raw.toLocaleString()}`,
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: {
            font: { size: 11 },
            callback: (v) => v.toLocaleString(),
          },
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } },
        },
      },
    },
  });
}

/**
 * Initialize all charts with lazy loading
 */
function initCharts() {
  const chartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const chartId = entry.target.id;

          if (chartId === 'historicalLineChart' && !charts.historical) {
            createHistoricalChart();
          } else if (chartId === 'distributionPieChart' && !charts.distribution) {
            createDistributionChart();
          } else if (chartId === 'populationBarChart' && !charts.bar) {
            createBarChart();
          }

          chartObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('canvas').forEach((canvas) => {
    chartObserver.observe(canvas);
  });
}

/**
 * Initialize economy section counters
 */
function initEconomyCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const countEl = entry.target.querySelector('[data-count]');
          if (countEl) {
            const target = parseInt(countEl.dataset.count);
            animateCount(countEl, target, 1500);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.economy-card').forEach((card) => {
    observer.observe(card);
  });
}

/**
 * CMCI (Competitive Index) Data
 */
const cmciData = {
  years: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
  pillars: {
    economicDynamism: {
      labels: [
        'Local Economy Size',
        'Economy Growth',
        'Active Establishments',
        'Safety Compliant',
        'Employment',
      ],
      data: [
        [0.4353, 0.1829, 0.1004, 0.042, 0.0328, 0.0935, 0.0344, 0.0571, 0.0259],
        [0.0847, 0.003, 0.0081, 0.0028, 0.3297, 0.0026, 0.0, 0.0005, 0.0318],
        [null, 0.1411, 0.8263, 0.3719, 0.5391, 0.5346, 0.5349, 0.5154, 0.4994],
        [null, 0.2991, 0.3683, 0.2471, 0.247, 0.2629, 0.0, 0.248, 0.2235],
        [0.3157, 0.1756, 0.1604, 0.1599, 0.1807, 0.1636, 0.1433, 0.1485, 0.3835],
      ],
    },
    governmentEfficiency: {
      labels: [
        'Cost of Living',
        'Cost of Business',
        'Financial Deepening',
        'Productivity',
        'Compliance',
      ],
      data: [
        [2.6667, 1.6216, 1.3889, 1.1508, 0.8621, 0.4063, 1.6635, 1.1905, 1.1919],
        [2.2968, 2.2431, 2.1045, 1.9988, 2.1827, 2.1901, 1.8629, 1.546, 1.5599],
        [2.2418, 1.5657, 0.2448, 0.7057, 0.8357, 0.7899, 1.1689, 1.1263, 0.8288],
        [0.0062, 0.0339, 0.0083, 0.004, 0.1654, 0.2272, 0.1243, 0.1451, 0.3297],
        [3.0994, 2.1474, 0.0, 2.45, 2.5, 2.381, 1.8929, 1.9565, 1.96],
      ],
    },
    infrastructure: {
      labels: [
        'Road Network',
        'Distance to Ports',
        'Basic Utilities',
        'Transportation',
        'IT Capacity',
      ],
      data: [
        [0.0019, 0.0003, 0.0, 0.009, 0.0021, 0.0235, 0.0015, 0.0016, 0.0016],
        [2.3543, 1.8319, 0.0, 1.6595, 2.4576, 2.4658, 1.3088, 1.562, 1.5281],
        [3.3333, 2.5, 0.0, 1.8498, 2.475, 2.4714, 0.0037, 0.6363, 0.356],
        [0.4063, 0.2816, 0.0, 0.0343, 0.0221, 0.0153, 0.023, 0.0636, 0.0959],
        [1.4638, 0.4, 0.0, 0.1278, 0.3108, 0.2727, 0.0617, 0.1674, 0.0155],
      ],
    },
    resiliency: {
      labels: ['DRR Plan', 'Disaster Drill', 'Early Warning', 'DRRMP Budget', 'Risk Assessments'],
      data: [
        [null, 2.5, 0.0, 2.4537, 2.5, 2.4474, 1.9995, 1.9583, 1.9783],
        [null, 2.5, 0.0, 2.25, 2.5, 1.2583, 1.002, 1.0016, 1.0023],
        [null, 2.5, 0.0, 2.5, 2.5, 1.2573, 1.0062, 1.0033, 1.0397],
        [null, 0.0022, 0.0, 0.2655, 0.1649, 0.0183, 0.0, 0.0699, 0.002],
        [null, 2.5, 0.0, 2.5, 2.5, 2.5, 2.0, 2.0, 2.0],
      ],
    },
    innovation: {
      labels: [
        'ICT Plan',
        'R&D Expenditures',
        'E-BPLS Software',
        'STEM Graduates',
        'Innovation Facilities',
      ],
      data: [
        [null, null, null, null, null, null, 1.3334, 2.0001, 2.0001],
        [null, null, null, null, null, null, 0.0, 0.0, 0.0006],
        [null, null, null, null, null, null, 2.0, 0.0, 2.0],
        [null, null, null, null, null, null, 0.0039, 0.0052, 0.0181],
        [null, null, null, null, null, null, 0.0392, 0.1669, 0.0227],
      ],
    },
  },
  keyIndicators: {
    labels: ['Health', 'Education', 'Social Protection', 'Peace & Order', 'LGU Investment'],
    data: [
      [0.7476, 0.5608, 0.0, 0.3946, 0.3941, 0.469, 0.3219, 0.2037, 0.2995],
      [0.0605, 0.0992, 0.0, 0.0348, 0.1006, 0.0231, 0.1263, 0.0764, 0.1341],
      [0.2988, 0.2421, 0.0, 0.2778, 0.2845, 0.4097, 0.0011, 0.2567, 0.4923],
      [0.0638, 0.408, 0.0, 0.0395, 0.0347, 0.0649, 0.0, 0.2571, 0.1031],
      [2.4381, 0.2859, 0.0, 0.2648, 0.1597, 0.0191, 0.0, 0.0016, 0.0108],
    ],
  },
};

/**
 * Create CMCI Overview Chart
 */
function createCMCIOverviewChart() {
  const ctx = document.getElementById('cmciOverviewChart');
  if (!ctx || charts.cmciOverview) return;

  const chartColors = [COLORS.primary, COLORS.accent, COLORS.success, COLORS.info, '#8B5CF6'];

  charts.cmciOverview = new Chart(ctx, {
    type: 'line',
    data: {
      labels: cmciData.years,
      datasets: cmciData.keyIndicators.labels.map((label, i) => ({
        label: label,
        data: cmciData.keyIndicators.data[i],
        borderColor: chartColors[i],
        backgroundColor: chartColors[i] + '20',
        fill: false,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1500, easing: 'easeOutQuart' },
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 12, padding: 16, font: { size: 11 }, usePointStyle: true },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 50, 160, 0.95)',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) =>
              ctx.raw !== null
                ? `${ctx.dataset.label}: ${ctx.raw.toFixed(4)}`
                : `${ctx.dataset.label}: N/A`,
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { font: { size: 11 } },
        },
      },
    },
  });
}

/**
 * Create CMCI Pillar Chart
 */
function createCMCIPillarChart(pillarKey, canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx || charts[canvasId]) return;

  const pillarData = cmciData.pillars[pillarKey];
  if (!pillarData) return;

  const chartColors = [COLORS.primary, COLORS.accent, COLORS.success, COLORS.info, '#8B5CF6'];

  charts[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: cmciData.years,
      datasets: pillarData.labels.map((label, i) => ({
        label: label,
        data: pillarData.data[i],
        borderColor: chartColors[i],
        backgroundColor: chartColors[i] + '20',
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1200, easing: 'easeOutQuart' },
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 10, padding: 12, font: { size: 10 }, usePointStyle: true },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 50, 160, 0.95)',
          padding: 10,
          cornerRadius: 6,
          callbacks: {
            label: (ctx) =>
              ctx.raw !== null
                ? `${ctx.dataset.label}: ${ctx.raw.toFixed(4)}`
                : `${ctx.dataset.label}: N/A`,
          },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { font: { size: 10 } },
        },
      },
    },
  });
}

/**
 * Initialize CMCI Tab Navigation
 */
function initCMCITabs() {
  const tabs = document.querySelectorAll('.cmci-tab');
  const panels = document.querySelectorAll('.cmci-panel');

  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const pillar = tab.dataset.pillar;

      // Update active tab
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active panel
      panels.forEach((p) => p.classList.remove('active'));
      const activePanel = document.getElementById(`panel-${pillar}`);
      if (activePanel) {
        activePanel.classList.add('active');

        // Create chart for this panel if needed
        if (pillar === 'overview') {
          createCMCIOverviewChart();
        } else if (pillar === 'economic-dynamism') {
          createCMCIPillarChart('economicDynamism', 'cmciEconomicChart');
        } else if (pillar === 'government-efficiency') {
          createCMCIPillarChart('governmentEfficiency', 'cmciGovernmentChart');
        } else if (pillar === 'infrastructure') {
          createCMCIPillarChart('infrastructure', 'cmciInfraChart');
        } else if (pillar === 'resiliency') {
          createCMCIPillarChart('resiliency', 'cmciResiliencyChart');
        } else if (pillar === 'innovation') {
          createCMCIPillarChart('innovation', 'cmciInnovationChart');
        }

        // Animate indicator bars
        animateCMCIBars(activePanel);
      }
    });
  });
}

/**
 * Animate CMCI indicator bars
 */
function animateCMCIBars(container) {
  container.querySelectorAll('.indicator-fill').forEach((bar) => {
    const value = bar.dataset.value;
    if (value) {
      setTimeout(() => {
        bar.style.setProperty('--fill-width', value + '%');
        bar.classList.add('animated');
      }, 100);
    }
  });
}

/**
 * Initialize CMCI Section
 */
function initCMCISection() {
  const cmciSection = document.getElementById('competitive-index');
  if (!cmciSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initCMCITabs();
          createCMCIOverviewChart();
          animateCMCIBars(document.getElementById('panel-overview'));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(cmciSection);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCharts();
  initEconomyCounters();
  initCMCISection();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    barangayData,
    historicalData,
    cmciData,
    COLORS,
    animateCount,
  };
}
