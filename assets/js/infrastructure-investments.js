/**
 * Renders the 14 supplied Agoo flood-control and slope-protection projects.
 */
(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function formatPeso(value) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(value);
  }

  function formatDate(value) {
    return new Date(`${value}T00:00:00`).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function renderProject(project) {
    const mapUrl = `https://www.google.com/maps?q=${project.latitude},${project.longitude}`;
    return `
      <article class="infra-project-v5">
        <div class="infra-project-main">
          <div class="infra-project-tags">
            <span class="infra-tag-year">${project.fundingYear}</span>
            <span class="infra-tag-category"><i class="bi bi-water"></i>${escapeHtml(project.infrastructureType)}</span>
          </div>
          <h3>${escapeHtml(project.projectName)}</h3>
          <p class="infra-location"><i class="bi bi-geo-alt"></i>Agoo, La Union · ${escapeHtml(project.projectId)} · ${escapeHtml(project.contractId)}</p>
        </div>
        <div class="infra-project-details">
          <div class="infra-detail-row">
            <div class="infra-detail-col">
              <span class="infra-detail-label">Type of Work</span>
              <span class="infra-detail-value">${escapeHtml(project.typeOfWork)}</span>
            </div>
            <div class="infra-detail-col">
              <span class="infra-detail-label">Contractor</span>
              <span class="infra-detail-value">${escapeHtml(project.contractor)}</span>
            </div>
            <div class="infra-detail-col infra-detail-cost">
              <span class="infra-detail-label">Contract Cost</span>
              <span class="infra-detail-value">${formatPeso(project.contractCost)}</span>
            </div>
          </div>
          <div class="infra-detail-row infra-detail-row-secondary">
            <div class="infra-detail-col">
              <span class="infra-detail-label">Approved Budget</span>
              <span class="infra-detail-value">${formatPeso(project.approvedBudget)}</span>
            </div>
            <div class="infra-detail-col">
              <span class="infra-detail-label">Start Date</span>
              <span class="infra-detail-value">${formatDate(project.startDate)}</span>
            </div>
            <div class="infra-detail-col">
              <span class="infra-detail-label">Actual Completion</span>
              <span class="infra-detail-value">${formatDate(project.actualCompletionDate)}</span>
            </div>
          </div>
        </div>
        <div class="infra-project-footer">
          <span class="infra-source"><i class="bi bi-info-circle"></i>Source: Sumbong sa Pangulo</span>
          <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="infra-link"><i class="bi bi-geo-alt"></i>View coordinates</a>
        </div>
      </article>`;
  }

  async function init() {
    const container = document.getElementById('infrastructure-investments-container');
    if (!container) return;
    try {
      const response = await fetch('../data/infrastructure-investments.json');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      container.innerHTML = data.projects.map(renderProject).join('');
      container.dataset.projectCount = String(data.projects.length);
    } catch (error) {
      console.error('Failed to load infrastructure investments:', error);
      container.innerHTML =
        '<p class="data-load-error">Project data is temporarily unavailable. Please try again later.</p>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
