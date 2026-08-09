// Agoo Civic Quiz Application Engine (quiz.betteragoo.org)

document.addEventListener('DOMContentLoaded', () => {

  // State
  let currentQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let timerInterval = null;
  let secondsElapsed = 0;
  let currentLeaderboardData = [];
  let currentFilter = 'all';

  let playerData = {
    name: '',
    gender: 'Female',
    dob: '',
    email: ''
  };

  // UI Elements
  const btnStartQuiz = document.getElementById('btn-start-quiz');
  const modalRegister = document.getElementById('modal-register');
  const formRegister = document.getElementById('form-register');
  const quizCard = document.getElementById('quiz-card');
  const resultCard = document.getElementById('result-card');
  const leaderboardCard = document.getElementById('leaderboard-card');
  const ctaHeroBox = document.getElementById('cta-hero-box');

  const questionTitle = document.getElementById('question-title');
  const optionsContainer = document.getElementById('options-container');
  const explanationBox = document.getElementById('explanation-box');
  const explanationText = document.getElementById('explanation-text');
  const btnNextQuestion = document.getElementById('btn-next-question');
  const categoryBadge = document.getElementById('category-badge');
  const progressText = document.getElementById('progress-text');
  const timerText = document.getElementById('timer-text');
  const formSaveScore = document.getElementById('form-save-score');

  const divisionSelect = document.getElementById('division-select');
  const btnDivisionInfo = document.getElementById('btn-division-info');
  const modalRankInfo = document.getElementById('modal-rank-info');
  const btnStartFromInfo = document.getElementById('btn-start-from-info');

  const modalBadgeLightbox = document.getElementById('modal-badge-lightbox');
  const lightboxBadgeImg = document.getElementById('lightbox-badge-img');
  const lightboxBadgeTitle = document.getElementById('lightbox-badge-title');

  // Load Leaderboard on Page Load
  loadLeaderboard();

  // Event Listeners
  if (btnStartQuiz) {
    btnStartQuiz.addEventListener('click', () => {
      if (modalRegister) modalRegister.classList.add('active');
    });
  }

  // Field Validation Helpers
  const regNameInput = document.getElementById('reg-name');
  const regNameError = document.getElementById('reg-name-error');
  const saveEmailInput = document.getElementById('save-email');
  const saveEmailError = document.getElementById('save-email-error');

  function validateHeroName(inputEl, errorEl) {
    if (!inputEl || !errorEl) return false;
    const val = inputEl.value.trim().replace(/\s+/g, ' ');

    if (!val) {
      showFieldError(inputEl, errorEl, 'Please enter thy hero name before starting.');
      return false;
    } else if (val.length < 2) {
      showFieldError(inputEl, errorEl, 'Hero name must be at least 2 characters.');
      return false;
    } else if (val.length > 50) {
      showFieldError(inputEl, errorEl, 'Hero name cannot exceed 50 characters.');
      return false;
    } else if (!/^[a-zA-Z0-9\s.\-ñÑáéíóúÁÉÍÓÚ]+$/u.test(val)) {
      showFieldError(inputEl, errorEl, 'Hero name can only contain letters, numbers, spaces, dots, and hyphens.');
      return false;
    }

    clearFieldError(inputEl, errorEl);
    return true;
  }

  function validateEmail(inputEl, errorEl) {
    if (!inputEl || !errorEl) return false;
    const val = inputEl.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!val) {
      showFieldError(inputEl, errorEl, 'Please enter thy email address to bind thy score.');
      return false;
    } else if (!emailRegex.test(val)) {
      showFieldError(inputEl, errorEl, 'Please enter a valid email address (e.g. hero@example.com).');
      return false;
    }

    clearFieldError(inputEl, errorEl);
    return true;
  }

  function showFieldError(inputEl, errorEl, msg) {
    inputEl.classList.add('is-invalid');
    errorEl.innerText = msg;
    errorEl.classList.add('active');
  }

  function clearFieldError(inputEl, errorEl) {
    inputEl.classList.remove('is-invalid');
    errorEl.classList.remove('active');
  }

  // Live Field Validation Listeners
  if (regNameInput && regNameError) {
    regNameInput.addEventListener('input', () => {
      if (regNameInput.classList.contains('is-invalid')) {
        validateHeroName(regNameInput, regNameError);
      }
    });
    regNameInput.addEventListener('blur', () => {
      validateHeroName(regNameInput, regNameError);
    });
  }

  if (saveEmailInput && saveEmailError) {
    saveEmailInput.addEventListener('input', () => {
      if (saveEmailInput.classList.contains('is-invalid')) {
        validateEmail(saveEmailInput, saveEmailError);
      }
    });
    saveEmailInput.addEventListener('blur', () => {
      validateEmail(saveEmailInput, saveEmailError);
    });
  }

  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateHeroName(regNameInput, regNameError)) {
        if (regNameInput) regNameInput.focus();
        return;
      }

      playerData.name = regNameInput.value.trim().replace(/\s+/g, ' ');
      playerData.gender = document.getElementById('reg-gender').value;
      playerData.dob = document.getElementById('reg-dob').value;

      if (modalRegister) modalRegister.classList.remove('active');
      if (ctaHeroBox) ctaHeroBox.style.display = 'none';
      
      startQuizSession();

      // Smooth scroll to top of questions container
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (quizCard) {
        quizCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  if (btnNextQuestion) {
    btnNextQuestion.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex < currentQuestions.length) {
        renderQuestion(currentIndex);
      } else {
        finishQuiz();
      }
    });
  }

  const btnRetake = document.getElementById('btn-retake-quiz');
  if (btnRetake) {
    btnRetake.addEventListener('click', () => {
      if (resultCard) resultCard.classList.remove('active');
      if (ctaHeroBox) ctaHeroBox.style.display = 'block';
      loadLeaderboard();
    });
  }

  // Division Filter Listener
  if (divisionSelect) {
    divisionSelect.addEventListener('change', (e) => {
      setDivisionFilter(e.target.value);
    });
  }

  function setDivisionFilter(filterVal) {
    currentFilter = filterVal;
    if (divisionSelect) {
      divisionSelect.value = filterVal;
    }
    renderLeaderboardRows();
  }

  // Rank Slider Carousel Logic
  function initRankSlider() {
    const track = document.getElementById('rank-slider-track');
    const btnPrev = document.getElementById('btn-rank-prev');
    const btnNext = document.getElementById('btn-rank-next');
    const dots = document.querySelectorAll('.slider-dot');
    const indicator = document.getElementById('slider-step-indicator');
    const slides = document.querySelectorAll('.rank-slide-card');

    if (!track || !slides || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSliderUI(index) {
      currentSlide = Math.max(0, Math.min(index, totalSlides - 1));

      const slideWidth = track.clientWidth;
      track.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });

      if (indicator) {
        indicator.innerText = `Tier ${currentSlide + 1} of ${totalSlides}`;
      }

      if (btnPrev) {
        btnPrev.disabled = currentSlide === 0;
        btnPrev.classList.toggle('disabled', currentSlide === 0);
      }
      if (btnNext) {
        btnNext.disabled = currentSlide === totalSlides - 1;
        btnNext.classList.toggle('disabled', currentSlide === totalSlides - 1);
      }
    }

    let isScrollingTimeout;
    track.addEventListener('scroll', () => {
      clearTimeout(isScrollingTimeout);
      isScrollingTimeout = setTimeout(() => {
        const slideWidth = track.clientWidth;
        if (slideWidth > 0) {
          const newIndex = Math.round(track.scrollLeft / slideWidth);
          if (newIndex !== currentSlide && newIndex >= 0 && newIndex < totalSlides) {
            currentSlide = newIndex;
            dots.forEach((dot, idx) => {
              dot.classList.toggle('active', idx === currentSlide);
            });
            if (indicator) {
              indicator.innerText = `Tier ${currentSlide + 1} of ${totalSlides}`;
            }
            if (btnPrev) {
              btnPrev.disabled = currentSlide === 0;
              btnPrev.classList.toggle('disabled', currentSlide === 0);
            }
            if (btnNext) {
              btnNext.disabled = currentSlide === totalSlides - 1;
              btnNext.classList.toggle('disabled', currentSlide === totalSlides - 1);
            }
          }
        }
      }, 60);
    });

    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        updateSliderUI(currentSlide - 1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        updateSliderUI(currentSlide + 1);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        updateSliderUI(idx);
      });
    });

    document.addEventListener('keydown', (e) => {
      const modalRankInfo = document.getElementById('modal-rank-info');
      if (modalRankInfo && modalRankInfo.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
          updateSliderUI(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
          updateSliderUI(currentSlide + 1);
        }
      }
    });

    updateSliderUI(0);
  }

  initRankSlider();

  // Rank Tiers Info Modal Logic
  if (btnDivisionInfo && modalRankInfo) {
    btnDivisionInfo.addEventListener('click', () => {
      modalRankInfo.classList.add('active');
      initRankSlider();
    });
  }

  if (modalRankInfo) {
    modalRankInfo.addEventListener('click', (e) => {
      if (e.target === modalRankInfo || e.target.closest('#btn-close-rank-info')) {
        modalRankInfo.classList.remove('active');
      }
    });
  }

  if (btnStartFromInfo) {
    btnStartFromInfo.addEventListener('click', () => {
      if (modalRankInfo) modalRankInfo.classList.remove('active');
      if (modalRegister) modalRegister.classList.add('active');
    });
  }

  // Badge Lightbox Modal Logic
  function openBadgeLightbox(src, title) {
    if (!modalBadgeLightbox || !lightboxBadgeImg) return;
    lightboxBadgeImg.src = src;
    const cleanTitle = (title || 'Civic Rank Badge').replace(/\s*\(\s*#\s*\d+[-–]\d+\s*\)/gi, '').trim();
    if (lightboxBadgeTitle) lightboxBadgeTitle.innerText = cleanTitle;
    modalBadgeLightbox.classList.add('active');
  }

  function closeBadgeLightbox() {
    if (modalBadgeLightbox) modalBadgeLightbox.classList.remove('active');
  }

  if (modalBadgeLightbox) {
    modalBadgeLightbox.addEventListener('click', (e) => {
      if (e.target === modalBadgeLightbox || e.target.closest('#btn-close-badge-lightbox')) {
        closeBadgeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalRankInfo && modalRankInfo.classList.contains('active')) {
        modalRankInfo.classList.remove('active');
      }
      if (modalBadgeLightbox && modalBadgeLightbox.classList.contains('active')) {
        closeBadgeLightbox();
      }
    }
  });

  // Global Event Delegation for Badge Image & Cell Clicks
  document.addEventListener('click', (e) => {
    const badgeCell = e.target.closest('.leaderboard-badge-cell');
    const badgeImg = e.target.closest('.leaderboard-badge-img') || (badgeCell ? badgeCell.querySelector('img') : null);
    
    if (badgeImg) {
      const src = badgeImg.src || badgeImg.getAttribute('src');
      const title = badgeImg.getAttribute('title') || badgeImg.getAttribute('alt') || 'Civic Rank Badge';
      if (src) {
        openBadgeLightbox(src, title);
      }
    }
  });

  // Submission Status Modal Logic
  const modalSubmissionStatus = document.getElementById('modal-submission-status');
  const statusModalIcon = document.getElementById('status-modal-icon');
  const statusModalSubtitle = document.getElementById('status-modal-subtitle');
  const statusModalTitle = document.getElementById('status-modal-title');
  const statusModalBody = document.getElementById('status-modal-body');
  const btnStatusModalAction = document.getElementById('btn-status-modal-action');
  const btnStatusViewCert = document.getElementById('btn-status-view-certificate');
  let currentStatusActionCallback = null;
  let currentCertUrl = '';

  function showSubmissionStatusModal({ isSuccess, subtitle, title, htmlBody, certUrl, actionText, onAction }) {
    if (!modalSubmissionStatus) return;

    if (statusModalIcon) {
      statusModalIcon.innerHTML = isSuccess 
        ? '<i class="bi bi-shield-check" style="color: var(--gold-bright);"></i>'
        : '<i class="bi bi-exclamation-triangle-fill" style="color: var(--color-crimson);"></i>';
    }

    if (statusModalSubtitle) {
      statusModalSubtitle.innerText = subtitle || (isSuccess ? 'PLEDGE SEALED' : 'SUBMISSION NOTICE');
      statusModalSubtitle.style.color = isSuccess ? 'var(--gold-leaf)' : '#fb7185';
    }

    if (statusModalTitle) {
      statusModalTitle.innerText = title || (isSuccess ? 'RECORD INSCRIBED!' : 'NOTICE');
    }

    if (statusModalBody) {
      statusModalBody.innerHTML = htmlBody || '';
    }

    if (btnStatusModalAction) {
      btnStatusModalAction.querySelector('span').innerText = actionText || 'CONTINUE →';
    }

    if (btnStatusViewCert) {
      if (certUrl) {
        currentCertUrl = certUrl;
        btnStatusViewCert.style.display = 'inline-flex';
      } else {
        currentCertUrl = '';
        btnStatusViewCert.style.display = 'none';
      }
    }

    currentStatusActionCallback = onAction || null;
    modalSubmissionStatus.classList.add('active');
  }

  function closeSubmissionStatusModal() {
    if (modalSubmissionStatus) modalSubmissionStatus.classList.remove('active');
    if (currentStatusActionCallback) {
      currentStatusActionCallback();
      currentStatusActionCallback = null;
    }
  }

  if (btnStatusViewCert) {
    btnStatusViewCert.addEventListener('click', () => {
      if (currentCertUrl) {
        window.open(currentCertUrl, '_blank');
      }
    });
  }

  if (modalSubmissionStatus) {
    modalSubmissionStatus.addEventListener('click', (e) => {
      if (e.target === modalSubmissionStatus || e.target.closest('#btn-close-status-modal') || e.target.closest('#btn-status-modal-action')) {
        closeSubmissionStatusModal();
      }
    });
  }

  // Save Score Form Submission
  if (formSaveScore) {
    formSaveScore.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validateEmail(saveEmailInput, saveEmailError)) {
        if (saveEmailInput) saveEmailInput.focus();
        return;
      }

      const emailInput = saveEmailInput ? saveEmailInput.value.trim() : '';
      const submitBtn = formSaveScore.querySelector('button[type="submit"]');

      if (!emailInput) return;

      submitBtn.disabled = true;
      submitBtn.innerText = 'Saving Record...';

      try {
        const res = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            sessionId: currentSessionId,
            answers: userAnswers,
            name: playerData.name,
            player_name: playerData.name,
            gender: playerData.gender,
            dob: playerData.dob,
            email: emailInput,
            score: score,
            total_items: currentQuestions.length || 10,
            time_taken_seconds: secondsElapsed
          })
        });

        const data = await res.json();
        if (data.success) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'Seal My Name in the Records →';

          let defaultDiv = 'Agoho Trailblazer';
          if (score >= 9) defaultDiv = 'Eagle Master';
          else if (score >= 8) defaultDiv = 'Basilica Scholar';
          else if (score >= 6) defaultDiv = 'Dinengdeng Explorer';

          const divisionName = data.divisionName || defaultDiv;
          const certUrl = `certificate/?name=${encodeURIComponent(playerData.name || 'Valiant Hero')}&rank=${encodeURIComponent(data.rank || 1)}&score=${encodeURIComponent(score)}&division=${encodeURIComponent(divisionName)}&time=${encodeURIComponent(secondsElapsed)}`;

          sessionStorage.setItem('cert_name', playerData.name || 'Valiant Hero');
          sessionStorage.setItem('cert_rank', String(data.rank || 1));
          sessionStorage.setItem('cert_score', String(score));
          sessionStorage.setItem('cert_division', divisionName);
          sessionStorage.setItem('cert_time', String(secondsElapsed));

          showSubmissionStatusModal({
            isSuccess: true,
            subtitle: 'PLEDGE SEALED IN D1 DATABASE',
            title: 'RECORD INSCRIBED!',
            htmlBody: `
              <div style="font-size: 1.05rem; font-weight: 700; color: var(--gold-bright); margin-bottom: 8px;">
                ${escapeHtml(data.message || 'Pledge Sealed Successfully!')}
              </div>
              <p style="font-size: 0.88rem; color: var(--color-text-parchment);">
                Thy score of <strong>${score}/10</strong> (${data.percentage}%) has been officially bound to the <strong>${escapeHtml(divisionName || 'Hall of Champions')}</strong>!
              </p>
            `,
            certUrl: certUrl,
            actionText: 'VIEW HALL OF CHAMPIONS →',
            onAction: () => {
              if (resultCard) resultCard.classList.remove('active');
              if (ctaHeroBox) ctaHeroBox.style.display = 'block';
              loadLeaderboard();
              const leaderboardEl = document.getElementById('leaderboard-card');
              if (leaderboardEl) leaderboardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        } else {
          submitBtn.disabled = false;
          submitBtn.innerText = 'Seal My Name in the Records →';

          showSubmissionStatusModal({
            isSuccess: false,
            subtitle: 'SUBMISSION ERROR',
            title: 'COULD NOT SEAL PLEDGE',
            htmlBody: `
              <p style="color: #fecdd3; font-weight: 600; margin-bottom: 8px;">
                ${escapeHtml(data.error || 'Failed to submit score record.')}
              </p>
              <p style="font-size: 0.85rem; color: var(--color-text-muted);">
                Please verify thy details and try submitting again.
              </p>
            `,
            actionText: 'RETURN TO QUIZ',
            onAction: null
          });
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Seal My Name in the Records →';

        let offlineDivision = 'Agoho Trailblazer (#76-100)';
        if (score >= 9) offlineDivision = 'Eagle Master (#1-25)';
        else if (score >= 8) offlineDivision = 'Basilica Scholar (#26-50)';
        else if (score >= 6) offlineDivision = 'Dinengdeng Explorer (#51-75)';

        const certUrl = `certificate/?name=${encodeURIComponent(playerData.name || 'Valiant Hero')}&rank=1&score=${encodeURIComponent(score)}&division=${encodeURIComponent(offlineDivision)}&time=${encodeURIComponent(secondsElapsed)}`;

        sessionStorage.setItem('cert_name', playerData.name || 'Valiant Hero');
        sessionStorage.setItem('cert_rank', '1');
        sessionStorage.setItem('cert_score', String(score));
        sessionStorage.setItem('cert_division', offlineDivision);
        sessionStorage.setItem('cert_time', String(secondsElapsed));

        showSubmissionStatusModal({
          isSuccess: false,
          subtitle: 'CONNECTION NOTICE',
          title: 'OFFLINE PREVIEW MODE',
          htmlBody: `
            <p style="color: var(--color-text-parchment); margin-bottom: 8px;">
              Could not reach D1 database endpoint. Score was recorded locally in static session.
            </p>
          `,
          certUrl: certUrl,
          actionText: 'VIEW LOCAL LEADERBOARD →',
          onAction: () => {
            if (resultCard) resultCard.classList.remove('active');
            if (ctaHeroBox) ctaHeroBox.style.display = 'block';
            loadLeaderboard();
          }
        });
      }
    });
  }

  function normalizeQuestion(q) {
    if (!q) return null;
    return {
      id: q.id ? String(q.id) : '',
      question: q.question_text || q.question || '',
      options: {
        A: q.option_a || (q.options ? q.options.A : '') || '',
        B: q.option_b || (q.options ? q.options.B : '') || '',
        C: q.option_c || (q.options ? q.options.C : '') || '',
        D: q.option_d || (q.options ? q.options.D : '') || ''
      },
      correct_option: String(q.correct_option || '').toUpperCase().trim(),
      explanation: q.explanation || '',
      category: q.category || 'CIVIC TRIAL'
    };
  }

  function shuffleAndRandomizeQuestions(rawQuestions) {
    if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) return [];

    let prevCorrectKey = null;

    return rawQuestions.map(rawQ => {
      const q = normalizeQuestion(rawQ);
      if (!q) return null;

      const origCorrectKey = q.correct_option; // 'A', 'B', 'C', or 'D'
      const origCorrectText = q.options[origCorrectKey] || '';
      
      const allKeys = ['A', 'B', 'C', 'D'];
      const distractorKeys = allKeys.filter(key => key !== origCorrectKey);
      
      // Shuffle distractors
      const distractorItems = distractorKeys.map(k => ({ origKey: k, text: q.options[k] })).filter(d => d.text !== undefined);
      for (let i = distractorItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [distractorItems[i], distractorItems[j]] = [distractorItems[j], distractorItems[i]];
      }

      let availableKeys = allKeys;
      if (prevCorrectKey && allKeys.includes(prevCorrectKey)) {
        availableKeys = allKeys.filter(k => k !== prevCorrectKey);
      }

      const newCorrectKey = origCorrectKey ? availableKeys[Math.floor(Math.random() * availableKeys.length)] : 'A';
      if (origCorrectKey) prevCorrectKey = newCorrectKey;

      const newOptions = {};
      const origLetterMap = {};
      let distractorIdx = 0;

      allKeys.forEach(displayKey => {
        if (displayKey === newCorrectKey && origCorrectKey) {
          newOptions[displayKey] = origCorrectText;
          origLetterMap[displayKey] = origCorrectKey;
        } else if (distractorItems[distractorIdx]) {
          const item = distractorItems[distractorIdx++];
          newOptions[displayKey] = item.text;
          origLetterMap[displayKey] = item.origKey;
        } else {
          newOptions[displayKey] = q.options[displayKey] || '';
          origLetterMap[displayKey] = displayKey;
        }
      });

      return {
        ...q,
        options: newOptions,
        origLetterMap,
        correct_option: newCorrectKey
      };
    }).filter(Boolean);
  }

  // Quiz Engine State & Logic
  let currentSessionId = null;
  let userAnswers = {};

  async function startQuizSession() {
    currentIndex = 0;
    score = 0;
    secondsElapsed = 0;
    currentQuestions = [];
    currentSessionId = null;
    userAnswers = {};

    if (quizCard) quizCard.classList.add('active');
    if (resultCard) resultCard.classList.remove('active');

    startTimer();

    try {
      const res = await fetch('/api/quiz/session/start', {
        method: 'POST',
        headers: { 'content-type': 'application/json' }
      });
      const data = await res.json();
      if (data.success && data.questions && data.questions.length > 0) {
        currentSessionId = data.sessionId;
        currentQuestions = shuffleAndRandomizeQuestions(data.questions);
      } else {
        throw new Error(data.error || 'Failed to start quiz session');
      }
    } catch (err) {
      console.warn('Online session start failed, falling back to local questions:', err.message);
      currentQuestions = shuffleAndRandomizeQuestions(getFallbackQuestions());
    }

    renderQuestion(0);
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      secondsElapsed++;
      const mins = Math.floor(secondsElapsed / 60);
      const secs = secondsElapsed % 60;
      if (timerText) {
        timerText.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  function renderQuestion(index) {
    if (!currentQuestions || currentQuestions.length === 0) return;
    const q = currentQuestions[index];

    if (questionTitle) questionTitle.innerText = q.question;
    const catTextEl = document.getElementById('category-badge-text');
    const catVal = (q.category || 'CIVIC TRIAL').toUpperCase();
    if (catTextEl) {
      catTextEl.innerText = catVal;
    } else if (categoryBadge) {
      categoryBadge.innerText = catVal;
    }
    if (progressText) progressText.innerText = `Trial ${index + 1} of ${currentQuestions.length}`;
    if (explanationBox) explanationBox.classList.remove('active');
    if (btnNextQuestion) btnNextQuestion.style.display = 'none';

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      const options = q.options || {};
      const keys = ['A', 'B', 'C', 'D'];

      keys.forEach(key => {
        if (options[key]) {
          const btn = document.createElement('button');
          btn.className = 'option-btn';
          btn.setAttribute('type', 'button');
          btn.innerHTML = `<strong>${key}</strong><span>${escapeHtml(options[key])}</span>`;

          btn.addEventListener('click', () => {
            const origLetter = q.origLetterMap ? q.origLetterMap[key] : key;
            if (q.id) userAnswers[q.id] = origLetter;
            handleAnswer(key, q.correct_option, q.explanation, btn);
          });

          optionsContainer.appendChild(btn);
        }
      });
    }
  }

  function handleAnswer(selectedKey, correctKey, explanation, selectedBtn) {
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true);

    const sel = String(selectedKey || '').trim().toUpperCase();
    const corr = String(correctKey || '').trim().toUpperCase();

    if (sel === corr) {
      score++;
      selectedBtn.classList.add('selected-correct');
    } else {
      selectedBtn.classList.add('selected-incorrect');
      allBtns.forEach(btn => {
        const strong = btn.querySelector('strong');
        if (strong && strong.innerText.trim().toUpperCase() === corr) {
          btn.classList.add('selected-correct');
        }
      });
    }

    if (explanationText) {
      explanationText.innerHTML = `<strong>Explanation:</strong> ${escapeHtml(explanation || 'Correct civic understanding!')}`;
    }
    if (explanationBox) explanationBox.classList.add('active');

    if (btnNextQuestion) {
      btnNextQuestion.style.display = 'inline-flex';
      if (currentIndex === currentQuestions.length - 1) {
        btnNextQuestion.innerHTML = `<span>View Final Verdict →</span>`;
      } else {
        btnNextQuestion.innerHTML = `<span>Next Trial →</span>`;
      }
    }
  }

  function finishQuiz() {
    stopTimer();
    if (quizCard) quizCard.classList.remove('active');
    if (resultCard) resultCard.classList.add('active');

    const total = currentQuestions.length || 10;
    const percentage = Math.round((score / total) * 100);

    const scoreDisplay = document.getElementById('score-big') || document.getElementById('final-score');
    const badgeText = document.getElementById('badge-awarded') || document.getElementById('final-badge');
    const resultTitle = document.getElementById('result-title');
    const rankCalloutTitle = document.getElementById('rank-callout-title');
    const rankCalloutDesc = document.getElementById('rank-callout-desc');

    if (scoreDisplay) scoreDisplay.innerText = `${score} / ${total}`;

    let badgeTitle = 'Agoho Trailblazer';
    let badgeDesc = 'Thou hast taken thy first steps on the civic path of Agoo!';

    if (percentage >= 90) {
      badgeTitle = 'Eagle Master';
      badgeDesc = 'Supreme civic mastery! Thou hast achieved near perfection across all 10 trials!';
    } else if (percentage >= 80) {
      badgeTitle = 'Basilica Scholar';
      badgeDesc = 'High civic honor! Deep knowledge of Agoo\'s heritage and governance!';
    } else if (percentage >= 60) {
      badgeTitle = 'Dinengdeng Explorer';
      badgeDesc = 'Solid civic understanding! Celebrating local culture and community traditions!';
    }

    if (badgeText) badgeText.innerText = `${badgeTitle} (${percentage}%)`;
    if (rankCalloutTitle) rankCalloutTitle.innerText = `Rank Earned: ${badgeTitle}`;
    if (rankCalloutDesc) rankCalloutDesc.innerText = badgeDesc;

    if (resultTitle) {
      if (percentage >= 80) resultTitle.innerText = 'TRIUMPH OF THE HERO!';
      else if (percentage >= 50) resultTitle.innerText = 'HONORABLE CIVIC QUEST!';
      else resultTitle.innerText = 'VALIANT TRIAL ATTEMPT!';
    }

    if (percentage >= 80 && window.confetti) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }
  }

  // Leaderboard Loader & Real-time Auto-Polling Logic
  let knownPlayerEmails = new Set();
  let pollingInterval = null;

  async function loadLeaderboard(isPolling = false) {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;

    if (!isPolling && currentLeaderboardData.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Loading Top 100 Leaderboard...</td></tr>';
    }

    try {
      const res = await fetch('/api/leaderboard?limit=100');
      const data = await res.json();

      if (data.success && Array.isArray(data.leaderboard)) {
        const newLeaderboard = data.leaderboard;

        // Detect new entries if background polling
        if (isPolling && knownPlayerEmails.size > 0) {
          newLeaderboard.forEach(item => {
            if (item.email && !knownPlayerEmails.has(item.email)) {
              item.isNewEntry = true;
            }
          });
        }

        // Update known emails set
        const updatedEmails = new Set();
        newLeaderboard.forEach(item => {
          if (item.email) updatedEmails.add(item.email);
        });
        knownPlayerEmails = updatedEmails;

        currentLeaderboardData = newLeaderboard;
        renderLeaderboardRows();
      } else {
        if (!isPolling) {
          currentLeaderboardData = getFallbackLeaderboard();
          renderLeaderboardRows();
        }
      }
    } catch (err) {
      if (!isPolling) {
        currentLeaderboardData = getFallbackLeaderboard();
        renderLeaderboardRows();
      }
    }
  }

  // Start background auto-polling every 12 seconds when tab is active
  function startLeaderboardPolling() {
    clearInterval(pollingInterval);
    pollingInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        loadLeaderboard(true);
      }
    }, 12000);
  }

  startLeaderboardPolling();

  function renderLeaderboardRows() {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;

    if (!currentLeaderboardData || currentLeaderboardData.length === 0) {
      tbody.innerHTML = renderPlaceholderRow();
      return;
    }

    let filtered = currentLeaderboardData;
    if (currentFilter && currentFilter !== 'all') {
      filtered = currentLeaderboardData.filter(item => {
        const div = (item.division_name || '').toLowerCase();
        if (currentFilter === 'eagle') return div.includes('eagle');
        if (currentFilter === 'basilica') return div.includes('basilica');
        if (currentFilter === 'dinengdeng') return div.includes('dinengdeng') || div.includes('explorer');
        if (currentFilter === 'agoho') return div.includes('agoho') || div.includes('trailblazer');
        return true;
      });
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 24px; color: var(--color-text-muted);">
            No champions in this division yet.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = '';
    filtered.forEach((item, idx) => {
      const rank = idx + 1;
      const badgeInfo = getBadgeImg(item, rank);
      const tr = document.createElement('tr');
      tr.className = 'leaderboard-row' + (item.isNewEntry ? ' row-new-entry' : '');
      tr.innerHTML = `
        <td class="rank-number">#${rank}</td>
        <td><strong>${escapeHtml(item.player_name)}</strong></td>
        <td>${escapeHtml(item.gender || 'N/A')}</td>
        <td><strong>${item.high_score} / 10</strong> (${item.percentage}%)</td>
        <td>${item.time_taken_seconds}s</td>
        <td style="text-align: center;">
          <div class="leaderboard-badge-cell">
            <img src="${badgeInfo.src}" alt="${badgeInfo.title}" title="${badgeInfo.title}" class="leaderboard-badge-img">
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function getBadgeImg(item, rank) {
    const div = (item && item.division_name ? item.division_name : '').toLowerCase();
    const score = (item && item.high_score !== undefined) ? Number(item.high_score) : null;

    if (div.includes('eagle') || (score !== null && score >= 9)) {
      return { src: 'assets/badge_eagle.png', title: 'Eagle Master' };
    }
    if (div.includes('basilica') || (score !== null && score >= 8)) {
      return { src: 'assets/badge_basilica.png', title: 'Basilica Scholar' };
    }
    if (div.includes('dinengdeng') || div.includes('explorer') || (score !== null && score >= 6)) {
      return { src: 'assets/badge_explorer.png', title: 'Dinengdeng Explorer' };
    }
    if (div.includes('agoho') || div.includes('trailblazer') || (score !== null && score < 6)) {
      return { src: 'assets/badge_aroho.png', title: 'Agoho Trailblazer' };
    }

    if (rank <= 25) return { src: 'assets/badge_eagle.png', title: 'Eagle Master' };
    if (rank <= 50) return { src: 'assets/badge_basilica.png', title: 'Basilica Scholar' };
    if (rank <= 75) return { src: 'assets/badge_explorer.png', title: 'Dinengdeng Explorer' };
    return { src: 'assets/badge_aroho.png', title: 'Agoho Trailblazer' };
  }

  function renderPlaceholderRow() {
    return `
      <tr>
        <td colspan="6" style="text-align: center; padding: 36px 20px; background: var(--card-parchment-light); border-radius: 16px; border: 1px dashed var(--gold-border);">
          <div style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--gold-bright); margin-bottom: 6px;">
            No champions on the list yet!
          </div>
          <div style="font-size: 0.95rem; color: var(--color-text-muted);">
            Be part of the Top 100, tap <strong>BEGIN CIVIC QUEST</strong> to claim your spot!
          </div>
        </td>
      </tr>
    `;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getFallbackQuestions() {
    return [
      {
        question: "What is the primary historical significance of the Basilica Minore of Our Lady of Charity in Agoo?",
        options: {
          A: "It was built in 1990 after the earthquake",
          B: "It is one of the oldest Marian shrines in Northern Luzon founded in 1578",
          C: "It serves as the municipal hall of Agoo",
          D: "It was constructed by modern artists in 2005"
        },
        correct_option: "B",
        explanation: "Founded in 1578 by Franciscan friars, the Basilica Minore of Our Lady of Charity is a historical Marian shrine and spiritual landmark of Agoo.",
        category: "History & Heritage"
      },
      {
        question: "Which annual festival in Agoo celebrates local culinary heritage and agricultural produce?",
        options: {
          A: "Panagbenga Festival",
          B: "Dinengdeng Festival",
          C: "Pahiyas Festival",
          D: "MassKara Festival"
        },
        correct_option: "B",
        explanation: "The Dinengdeng Festival is Agoo's signature cultural celebration showcasing the traditional Ilocano vegetable dish and local heritage.",
        category: "Culture & Tradition"
      },
      {
        question: "What does the Eagle Monument along MacArthur Highway in Agoo symbolize?",
        options: {
          A: "Vigilance, strength, and welcoming presence to visitors of La Union",
          B: "The town's fishing industry",
          C: "An ancient Spanish watchtower",
          D: "A tribute to local agriculture"
        },
        correct_option: "A",
        explanation: "The iconic Eagle Statue along MacArthur Highway stands as a symbol of vigilance, pride, and hospitable welcome to Agoo.",
        category: "Landmarks"
      },
      {
        question: "From which natural tree species is the name 'Agoo' historically derived?",
        options: {
          A: "Molave tree",
          B: "Narra tree",
          C: "Agoho tree (Casuarina equisetifolia)",
          D: "Banaba tree"
        },
        correct_option: "C",
        explanation: "The name Agoo originates from 'Agoho', a pine-like evergreen tree that grew abundantly along its rivers and coastal shores.",
        category: "Etymology & Origins"
      },
      {
        question: "Under Republic Act 10173 (Data Privacy Act), how must personal information submitted in civic portals be handled?",
        options: {
          A: "Publicly shared on all social media",
          B: "Collected with consent and kept strictly confidential",
          C: "Sold to third-party advertisers",
          D: "Stored indefinitely without security encryption"
        },
        correct_option: "B",
        explanation: "RA 10173 mandates data privacy, requiring user consent and strict confidentiality for personal data protection.",
        category: "Civic Literacy"
      },
      {
        question: "Which body of water borders the western coast of Agoo, La Union?",
        options: {
          A: "Pacific Ocean",
          B: "Celebes Sea",
          C: "Sulu Sea",
          D: "West Philippine Sea (Lingayen Gulf)"
        },
        correct_option: "D",
        explanation: "Agoo lies along Lingayen Gulf in the West Philippine Sea, featuring coastal communities and eco-tourism parks.",
        category: "Geography"
      },
      {
        question: "What is the primary role of a Sangguniang Bayan member in municipal governance?",
        options: {
          A: "Enforce traffic laws directly",
          B: "Enact municipal ordinances and resolutions for public welfare",
          C: "Issue business permits",
          D: "Conduct judicial trials"
        },
        correct_option: "B",
        explanation: "The Sangguniang Bayan is the legislative branch of municipal government responsible for passing ordinances and policies.",
        category: "Governance"
      },
      {
        question: "What civic duty is encouraged for citizens during local public consultations and barangay assemblies?",
        options: {
          A: "Active community participation and constructive dialogue",
          B: "Abstaining from all local affairs",
          C: "Disregarding municipal announcements",
          D: "Filing private complaints only"
        },
        correct_option: "A",
        explanation: "Active civic participation in local assemblies ensures transparent, responsive, and democratic community development.",
        category: "Civic Responsibility"
      },
      {
        question: "What ecological feature is preserved at the Agoo-Damortis Protected Landscape and Seascape?",
        options: {
          A: "Volcanic craters",
          B: "Highland pine forests",
          C: "Coastal mangroves, beach forests, and marine habitats",
          D: "Desert sand dunes"
        },
        correct_option: "C",
        explanation: "Established as a protected area, the seascape preserves vital coastal mangroves, sand dunes, and marine ecosystems.",
        category: "Environment"
      },
      {
        question: "How can citizens actively contribute to municipal waste management and cleanliness in Agoo?",
        options: {
          A: "Burning household plastic waste",
          B: "Disposing garbage in waterways",
          C: "Ignoring local sanitation guidelines",
          D: "Practicing proper waste segregation (Reduce, Reuse, Recycle)"
        },
        correct_option: "D",
        explanation: "Proper waste segregation at source promotes environmental sustainability and protects municipal waterways.",
        category: "Community Action"
      }
    ];
  }

  function getFallbackLeaderboard() {
    return [
      { email: "sofia.fontanilla1@example.com", player_name: "Sofia Fontanilla", gender: "Female", dob: "1991-02-02", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 25, division_name: "Eagle Master", attempts_count: 2 },
      { email: "liam.rivera2@example.com", player_name: "Liam Rivera", gender: "Male", dob: "1992-03-03", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 26, division_name: "Eagle Master", attempts_count: 3 },
      { email: "jasmine.garcia3@example.com", player_name: "Jasmine Garcia", gender: "Female", dob: "1993-04-04", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 27, division_name: "Eagle Master", attempts_count: 1 },
      { email: "ethan.navarro4@example.com", player_name: "Ethan Navarro", gender: "Male", dob: "1994-05-05", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 28, division_name: "Eagle Master", attempts_count: 2 },
      { email: "andrea.aquino5@example.com", player_name: "Andrea Aquino", gender: "Female", dob: "1995-06-06", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 29, division_name: "Eagle Master", attempts_count: 3 },
      { email: "mark.santos6@example.com", player_name: "Mark Santos", gender: "Male", dob: "1996-07-07", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 30, division_name: "Eagle Master", attempts_count: 1 },
      { email: "maria.delacruz7@example.com", player_name: "Maria Dela Cruz", gender: "Female", dob: "1997-08-08", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 31, division_name: "Eagle Master", attempts_count: 2 },
      { email: "mateo.eriguel8@example.com", player_name: "Mateo Eriguel", gender: "Male", dob: "1998-09-09", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 32, division_name: "Eagle Master", attempts_count: 3 },
      { email: "angela.sibuma9@example.com", player_name: "Angela Sibuma", gender: "Female", dob: "1999-10-10", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 33, division_name: "Eagle Master", attempts_count: 1 },
      { email: "carlos.eslao10@example.com", player_name: "Carlos Eslao", gender: "Male", dob: "2000-11-11", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 34, division_name: "Eagle Master", attempts_count: 2 },
      { email: "nicole.refuerzo11@example.com", player_name: "Nicole Refuerzo", gender: "Female", dob: "2001-12-12", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 35, division_name: "Eagle Master", attempts_count: 3 },
      { email: "gabriel.verceles12@example.com", player_name: "Gabriel Verceles", gender: "Male", dob: "2002-01-01", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 36, division_name: "Eagle Master", attempts_count: 1 },
      { email: "camille.dacanay13@example.com", player_name: "Camille Dacanay", gender: "Female", dob: "2003-02-02", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 37, division_name: "Eagle Master", attempts_count: 2 },
      { email: "joshua.balbin14@example.com", player_name: "Joshua Balbin", gender: "Male", dob: "2004-03-03", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 38, division_name: "Eagle Master", attempts_count: 3 },
      { email: "samantha.estacio15@example.com", player_name: "Samantha Estacio", gender: "Prefer not to say", dob: "2005-04-04", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 39, division_name: "Eagle Master", attempts_count: 1 },
      { email: "jose.asuncion16@example.com", player_name: "Jose Asuncion", gender: "Male", dob: "1990-05-05", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 40, division_name: "Eagle Master", attempts_count: 2 },
      { email: "katrina.ramos17@example.com", player_name: "Katrina Ramos", gender: "Female", dob: "1991-06-06", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 41, division_name: "Eagle Master", attempts_count: 3 },
      { email: "rafael.flores18@example.com", player_name: "Rafael Flores", gender: "Male", dob: "1992-07-07", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 42, division_name: "Eagle Master", attempts_count: 1 },
      { email: "danica.reyes19@example.com", player_name: "Danica Reyes", gender: "Female", dob: "1993-08-08", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 43, division_name: "Eagle Master", attempts_count: 2 },
      { email: "miguel.mendoza20@example.com", player_name: "Miguel Mendoza", gender: "Male", dob: "1994-09-09", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 44, division_name: "Eagle Master", attempts_count: 3 },
      { email: "patricia.pascual21@example.com", player_name: "Patricia Pascual", gender: "Female", dob: "1995-10-10", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 45, division_name: "Eagle Master", attempts_count: 1 },
      { email: "diego.deguzman22@example.com", player_name: "Diego De Guzman", gender: "Male", dob: "1996-11-11", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 46, division_name: "Eagle Master", attempts_count: 2 },
      { email: "beatrix.valdez23@example.com", player_name: "Beatrix Valdez", gender: "Female", dob: "1997-12-12", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 47, division_name: "Eagle Master", attempts_count: 3 },
      { email: "lorenzo.bautista24@example.com", player_name: "Lorenzo Bautista", gender: "Male", dob: "1998-01-01", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 48, division_name: "Eagle Master", attempts_count: 1 },
      { email: "isabelle.villamil25@example.com", player_name: "Isabelle Villamil", gender: "Female", dob: "1999-02-02", high_score: 10, total_items: 10, percentage: 100, time_taken_seconds: 49, division_name: "Eagle Master", attempts_count: 2 },
      { email: "christian.ofiana26@example.com", player_name: "Christian Ofiana", gender: "Male", dob: "2000-03-03", high_score: 9, total_items: 10, percentage: 90, time_taken_seconds: 47, division_name: "Basilica Scholar", attempts_count: 3 },
      { email: "chloe.gatchalian27@example.com", player_name: "Chloe Gatchalian", gender: "Female", dob: "2001-04-04", high_score: 9, total_items: 10, percentage: 90, time_taken_seconds: 49, division_name: "Basilica Scholar", attempts_count: 1 },
      { email: "daniel.rimando28@example.com", player_name: "Daniel Rimando", gender: "Male", dob: "2002-05-05", high_score: 9, total_items: 10, percentage: 90, time_taken_seconds: 51, division_name: "Basilica Scholar", attempts_count: 2 },
      { email: "hannah.zara29@example.com", player_name: "Hannah Zara", gender: "Female", dob: "2003-06-06", high_score: 9, total_items: 10, percentage: 90, time_taken_seconds: 53, division_name: "Basilica Scholar", attempts_count: 3 },
      { email: "benjamin.corpuz30@example.com", player_name: "Benjamin Corpuz", gender: "Male", dob: "2004-07-07", high_score: 9, total_items: 10, percentage: 90, time_taken_seconds: 55, division_name: "Basilica Scholar", attempts_count: 1 }
    ];
  }

});
