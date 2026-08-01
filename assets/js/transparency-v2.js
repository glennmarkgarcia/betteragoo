/**
 * FY 2025 first-reporting-period financial dashboard.
 * Canonical figures are loaded from data/fiscal_transparency.json.
 */
(function () {
  'use strict';

  const DATA_URL = '../data/fiscal_transparency.json';
  let incomeChart = null;
  let expenditureChart = null;

  function formatPeso(value) {
    return `₱${Number(value).toFixed(2)} M`;
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function updateDisplay(report) {
    const { summary, income, expenditures } = report;
    setText('sre-total-income', formatPeso(summary.totalCurrentOperatingIncome));
    setText('sre-total-expense', formatPeso(summary.currentOperatingExpenditures));
    setText('sre-net-income', formatPeso(summary.netOperatingIncome));
    setText('sre-fund-balance', formatPeso(summary.endingFundBalance));

    setText('sre-income-local', formatPeso(income.localSources.total));
    setText('sre-income-local-pct', `${income.localSources.sharePercent.toFixed(1)}%`);
    setText('sre-income-external', formatPeso(income.externalSources.total));
    setText('sre-income-external-pct', `${income.externalSources.sharePercent.toFixed(1)}%`);

    const expenditureItems = [
      ['gps', expenditures.generalPublicServices],
      ['social', expenditures.socialServices],
      ['economic', expenditures.economicServices],
      ['debt', expenditures.debtServiceInterestAndCharges],
    ];
    expenditureItems.forEach(([id, item]) => {
      setText(`sre-exp-${id}`, formatPeso(item.amount));
      setText(`sre-exp-${id}-pct`, `${item.sharePercent.toFixed(1)}%`);
    });

    renderCharts(report);
  }

  function chartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(context) {
              return formatPeso(context.raw);
            },
          },
        },
      },
    };
  }

  function renderCharts(report) {
    if (typeof Chart === 'undefined') return;
    const incomeCanvas = document.getElementById('incomeChartV2');
    const expenditureCanvas = document.getElementById('expenditureChartV2');
    if (!incomeCanvas || !expenditureCanvas) return;

    incomeChart?.destroy();
    expenditureChart?.destroy();

    incomeChart = new Chart(incomeCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Local Sources', 'External Sources'],
        datasets: [
          {
            data: [report.income.localSources.total, report.income.externalSources.total],
            backgroundColor: ['#10b981', '#0ea5e9'],
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
      },
      options: chartOptions(),
    });

    const expenditure = report.expenditures;
    expenditureChart = new Chart(expenditureCanvas, {
      type: 'doughnut',
      data: {
        labels: ['General Public Services', 'Social Services', 'Economic Services', 'Debt Service'],
        datasets: [
          {
            data: [
              expenditure.generalPublicServices.amount,
              expenditure.socialServices.amount,
              expenditure.economicServices.amount,
              expenditure.debtServiceInterestAndCharges.amount,
            ],
            backgroundColor: ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
      },
      options: chartOptions(),
    });
  }

  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((element) => element.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    elements.forEach((element) => observer.observe(element));
  }

  async function init() {
    initScrollAnimations();
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      updateDisplay(data.report);
    } catch (error) {
      console.error('Failed to load fiscal transparency data:', error);
      const notice = document.getElementById('sre-data-notice');
      if (notice) notice.hidden = false;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formatPeso };
  }
})();
