/**
 * Controle Operacional de Docas & Dashboard Analítico
 * BBM Logística / Translovato / Diálogo
 */

// Storage Keys
const STORAGE_KEY_DATA = 'bbm_controle_docas_registros_v2';
const STORAGE_KEY_UNITS = 'bbm_controle_docas_unidades_v2';
const STORAGE_KEY_ACTIVE_UNIT = 'bbm_controle_docas_active_unit';
const STORAGE_KEY_THEME = 'bbm_controle_docas_theme';

// Default Units
const DEFAULT_UNITS = [
  "CD São Paulo",
  "CD Curitiba",
  "CD Rio de Janeiro",
  "CD Belo Horizonte",
  "CD Porto Alegre",
  "Brasília"
];

// Initial Data Seed (Exact records from user's image + additional demo units)
const SEED_DATA = [
  // CD São Paulo (Exact image replica)
  {
    id: "rec-1",
    unidade: "CD São Paulo",
    rota: "1A",
    motorista: "PATRICIA DE CARVALHO SOUZA DOS ANJOS",
    placa: "JDP0A37",
    doca: "8",
    conferente: "JOÃO",
    inicio: "08:16",
    fim: "08:42",
    isca: "5583",
    retornoIsca: "PENDENTE",
    placaLiberada: false,
    destaqueLinha: false,
    obs: ""
  },
  {
    id: "rec-2",
    unidade: "CD São Paulo",
    rota: "1A",
    motorista: "ANTONIO SOUZA NETO",
    placa: "APG3680",
    doca: "11",
    conferente: "LUANA",
    inicio: "07:00",
    fim: "07:45",
    isca: "8774",
    retornoIsca: "OK",
    placaLiberada: false,
    destaqueLinha: false,
    obs: ""
  },
  {
    id: "rec-3",
    unidade: "CD São Paulo",
    rota: "1A",
    motorista: "JOÃO GILBERTO ALVES DA SILVA",
    placa: "HDH5G43",
    doca: "8",
    conferente: "JOÃO",
    inicio: "07:40",
    fim: "08:07",
    isca: "4557",
    retornoIsca: "PENDENTE",
    placaLiberada: true,
    destaqueLinha: false,
    obs: ""
  },
  {
    id: "rec-4",
    unidade: "CD São Paulo",
    rota: "2A",
    motorista: "MAICK DE SOUSA CAVALCANTE",
    placa: "QNF6G09",
    doca: "12",
    conferente: "NELSON",
    inicio: "07:22",
    fim: "07:31",
    isca: "785",
    retornoIsca: "PENDENTE",
    placaLiberada: true,
    destaqueLinha: false,
    obs: ""
  },
  {
    id: "rec-5",
    unidade: "CD São Paulo",
    rota: "2A/B",
    motorista: "BRUNO BORGES SADDE",
    placa: "LLV1330",
    doca: "12",
    conferente: "NELSON",
    inicio: "08:29",
    fim: "08:47",
    isca: "S/ISCA",
    retornoIsca: "S/ISCA",
    placaLiberada: false,
    destaqueLinha: false,
    obs: ""
  },
  {
    id: "rec-6",
    unidade: "CD São Paulo",
    rota: "2B",
    motorista: "LUCIO FLAVIO OLIVEIRA PIRES",
    placa: "JHX5D08",
    doca: "8",
    conferente: "JOÃO",
    inicio: "07:15",
    fim: "07:24",
    isca: "1851",
    retornoIsca: "OK",
    placaLiberada: true,
    destaqueLinha: false,
    obs: ""
  },
  {
    id: "rec-7",
    unidade: "CD São Paulo",
    rota: "3A",
    motorista: "WESLEY GOMES PEREIRA",
    placa: "QIT1A48",
    doca: "12",
    conferente: "NELSON",
    inicio: "10:04",
    fim: "10:34",
    isca: "400",
    retornoIsca: "PENDENTE",
    placaLiberada: true,
    destaqueLinha: false,
    obs: ""
  },
  {
    id: "rec-8",
    unidade: "CD São Paulo",
    rota: "3B",
    motorista: "NILTON OLIVEIRA COSTA",
    placa: "JIV1456",
    doca: "10",
    conferente: "LUANA",
    inicio: "08:35",
    fim: "09:25",
    isca: "9718",
    retornoIsca: "PENDENTE",
    placaLiberada: false,
    destaqueLinha: false,
    obs: ""
  },
  {
    id: "rec-9",
    unidade: "CD São Paulo",
    rota: "3C",
    motorista: "VAGNER SOUSA OLIVEIRA",
    placa: "NLJ3A13",
    doca: "10",
    conferente: "CARLOS",
    inicio: "08:53",
    fim: "09:27",
    isca: "9167",
    retornoIsca: "PENDENTE",
    placaLiberada: false,
    destaqueLinha: true,
    obs: ""
  },
  {
    id: "rec-10",
    unidade: "CD São Paulo",
    rota: "3D",
    motorista: "JOSÉ ARAUJO FREIRE",
    placa: "JHH8E73",
    doca: "11",
    conferente: "JULIA",
    inicio: "07:00",
    fim: "07:28",
    isca: "8742",
    retornoIsca: "OK",
    placaLiberada: false,
    destaqueLinha: false,
    obs: ""
  },

  // CD Curitiba Sample Entries
  {
    id: "rec-11",
    unidade: "CD Curitiba",
    rota: "CWB-01",
    motorista: "MARCOS VINICIUS RIBEIRO",
    placa: "BCW4A21",
    doca: "3",
    conferente: "RODRIGO",
    inicio: "06:45",
    fim: "07:30",
    isca: "3312",
    retornoIsca: "OK",
    placaLiberada: true,
    destaqueLinha: false,
    obs: ""
  },
  {
    id: "rec-12",
    unidade: "CD Curitiba",
    rota: "CWB-02",
    motorista: "EDSON SILVA SANTOS",
    placa: "RHD8E99",
    doca: "4",
    conferente: "RODRIGO",
    inicio: "08:10",
    fim: "",
    isca: "7721",
    retornoIsca: "PENDENTE",
    placaLiberada: false,
    destaqueLinha: false,
    obs: "Em carregamento de paletes pesados"
  },

  // CD Rio de Janeiro Sample Entries
  {
    id: "rec-13",
    unidade: "CD Rio de Janeiro",
    rota: "RIO-NORTH",
    motorista: "CARLOS EDUARDO MARTINS",
    placa: "RIO2D19",
    doca: "6",
    conferente: "MARCELO",
    inicio: "07:10",
    fim: "08:05",
    isca: "9912",
    retornoIsca: "OK",
    placaLiberada: true,
    destaqueLinha: false,
    obs: ""
  }
];

// App State
let state = {
  unidades: [],
  registros: [],
  activeUnidade: "CD São Paulo",
  activeTab: "docas", // 'docas' ou 'dashboard'
  operationalMode: "ativos", // 'ativos', 'historico', 'todos'
  filterStatus: "todos",
  filterDoca: "",
  searchTerm: "",
  editingId: null,
  confirmingIscaId: null,
  currentUser: null
};

// Chart instances
let charts = {
  statusCarregamento: null,
  statusIscas: null,
  ocupacaoDocas: null,
  conferentes: null,
  topDemora: null
};

// Initializer
document.addEventListener('DOMContentLoaded', async () => {
  await initAuth();
  await loadStorage();
  initClock();
  initTheme();
  setupEventListeners();
  populateUnitSelects();
  renderApp();
});

// Autenticação & Verificação de Sessão
async function initAuth() {
  const isHttp = window.location.protocol.startsWith('http');
  
  if (isHttp) {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          state.currentUser = data.user;
          // Se o usuário tem unidade restrita, define sua unidade ativa
          if (data.user.unidade && data.user.unidade !== 'todas') {
            state.activeUnidade = data.user.unidade;
          }
          updateUserHeaderUI(data.user);
          return;
        }
      }
      // Não autenticado em ambiente HTTP -> Redireciona para o login
      window.location.href = '/login.html';
      return;
    } catch (err) {
      console.warn("Servidor de auth indisponível, usando fallback:", err);
    }
  }

  // Fallback para modo offline / file:///
  const cachedUser = localStorage.getItem('bbm_logged_user');
  if (cachedUser) {
    try {
      state.currentUser = JSON.parse(cachedUser);
      if (state.currentUser.unidade && state.currentUser.unidade !== 'todas') {
        state.activeUnidade = state.currentUser.unidade;
      }
      updateUserHeaderUI(state.currentUser);
    } catch (e) {
      setDefaultGuestUser();
    }
  } else {
    setDefaultGuestUser();
  }
}

function setDefaultGuestUser() {
  state.currentUser = {
    name: "Diálogo Logística (Master)",
    role: "admin",
    unidade: "todas"
  };
  updateUserHeaderUI(state.currentUser);
}

function updateUserHeaderUI(user) {
  const nameEl = document.getElementById('user-display-name');
  const roleEl = document.getElementById('user-display-role');
  const btnAdmin = document.getElementById('btn-admin-users');
  const btnAddUnit = document.getElementById('btn-gerenciar-unidades');

  if (nameEl) nameEl.textContent = user.name || 'Usuário BBM';
  if (roleEl) {
    if (user.unidade && user.unidade !== 'todas') {
      roleEl.textContent = `Operador • ${user.unidade}`;
      roleEl.style.color = '#38bdf8';
    } else {
      roleEl.textContent = user.role === 'admin' ? 'Administrador Master' : 'Operador Geral';
      roleEl.style.color = user.role === 'admin' ? '#38bdf8' : '#10b981';
    }
  }

  // Apenas Administrador Geral/Master pode ver botão de gestão de usuários e gerenciar unidades
  const isMasterAdmin = (user.role === 'admin' && (user.unidade === 'todas' || !user.unidade));
  if (btnAdmin) {
    btnAdmin.style.display = isMasterAdmin ? 'flex' : 'none';
  }
  if (btnAddUnit) {
    btnAddUnit.style.display = isMasterAdmin ? 'flex' : 'none';
  }
}

// Storage Management (Sincronizado com API Backend)
async function loadStorage() {
  const isHttp = window.location.protocol.startsWith('http');

  if (isHttp) {
    try {
      // Carrega Unidades da API
      const resUnits = await fetch('/api/units');
      if (resUnits.ok) {
        const units = await resUnits.json();
        if (units && units.length > 0) state.unidades = units;
      }

      // Carrega Registros de Docas do Banco Central
      const resRecords = await fetch('/api/records');
      if (resRecords.ok) {
        const records = await resRecords.json();
        if (records && records.length > 0) {
          state.registros = records;
          // Normaliza: qualquer registro com retornoIsca OK é arquivado para o Histórico
          state.registros.forEach(r => {
            if (r.retornoIsca === 'OK') {
              r.arquivado = true;
              if (!r.dataHoraBaixa) {
                r.dataHoraBaixa = `16/10/2026 às ${r.fim || '14:00'}`;
              }
            }
          });
          localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(state.registros));
          return;
        }
      }
    } catch (err) {
      console.warn("Falha ao buscar do servidor central, usando localStorage:", err);
    }
  }

  // Fallback Local
  try {
    const rawUnits = localStorage.getItem(STORAGE_KEY_UNITS);
    state.unidades = rawUnits ? JSON.parse(rawUnits) : [...DEFAULT_UNITS];

    const rawData = localStorage.getItem(STORAGE_KEY_DATA);
    state.registros = rawData ? JSON.parse(rawData) : [...SEED_DATA];

    // Normaliza: qualquer registro com retornoIsca OK é arquivado para o Histórico
    state.registros.forEach(r => {
      if (r.retornoIsca === 'OK') {
        r.arquivado = true;
        if (!r.dataHoraBaixa) {
          r.dataHoraBaixa = `16/10/2026 às ${r.fim || '14:00'}`;
        }
      }
    });

    const savedUnit = localStorage.getItem(STORAGE_KEY_ACTIVE_UNIT);
    if (savedUnit && (savedUnit === 'todas' || state.unidades.includes(savedUnit))) {
      state.activeUnidade = savedUnit;
    } else {
      state.activeUnidade = "CD São Paulo";
    }
  } catch (err) {
    console.warn("Erro ao ler localStorage, utilizando valores padrão:", err);
    state.unidades = [...DEFAULT_UNITS];
    state.registros = [...SEED_DATA];
    state.activeUnidade = "CD São Paulo";
  }
  saveData();
  saveUnits();
}

function saveData(specificRecord) {
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(state.registros));

  // Sincronização em background com a API Central
  if (window.location.protocol.startsWith('http')) {
    if (specificRecord) {
      fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(specificRecord)
      }).catch(err => console.warn("Erro ao sincronizar registro com servidor:", err));
    }
  }
}

function saveUnits() {
  localStorage.setItem(STORAGE_KEY_UNITS, JSON.stringify(state.unidades));
}

// Clock (Live Date and Digital Time)
function initClock() {
  const timeEl = document.getElementById('live-time');
  const dateEl = document.getElementById('live-date');

  function update() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString('pt-BR');
    
    // Formato executivo compacto: "15/10/2026 • QUI"
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const ano = now.getFullYear();
    const diaSemana = now.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '').toUpperCase();
    dateEl.textContent = `${dia}/${mes}/${ano} • ${diaSemana}`;
  }

  update();
  setInterval(update, 1000);
}

// Theme
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'light';
  document.body.className = `theme-${savedTheme}`;
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.className = `theme-${next}`;
  localStorage.setItem(STORAGE_KEY_THEME, next);
  updateThemeIcon(next);
  if (state.activeTab === 'dashboard') {
    renderDashboardCharts();
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('btn-toggle-theme');
  btn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// Tab Switching
window.alternarAba = function(tabName) {
  state.activeTab = tabName;

  const btnDocas = document.getElementById('tab-btn-docas');
  const btnHist = document.getElementById('tab-btn-historico');
  const btnDash = document.getElementById('tab-btn-dashboard');
  const viewDocas = document.getElementById('view-docas');
  const viewHist = document.getElementById('view-historico');
  const viewDash = document.getElementById('view-dashboard');

  if (btnDocas) btnDocas.classList.toggle('active', tabName === 'docas');
  if (btnHist) btnHist.classList.toggle('active', tabName === 'historico');
  if (btnDash) btnDash.classList.toggle('active', tabName === 'dashboard');

  if (viewDocas) viewDocas.style.display = tabName === 'docas' ? 'block' : 'none';
  if (viewHist) viewHist.style.display = tabName === 'historico' ? 'block' : 'none';
  if (viewDash) viewDash.style.display = tabName === 'dashboard' ? 'block' : 'none';

  if (tabName === 'docas') {
    renderTable();
  } else if (tabName === 'historico') {
    renderHistoricoTable();
  } else if (tabName === 'dashboard') {
    renderDashboardCharts();
  }
};

// Populate Unit Selectors
function populateUnitSelects() {
  const mainSelect = document.getElementById('select-unidade');
  const formSelect = document.getElementById('form-unidade');
  const btnAddUnit = document.getElementById('btn-gerenciar-unidades');

  const user = state.currentUser;
  const isRestricted = (user && user.unidade && user.unidade !== 'todas');

  if (isRestricted) {
    // Usuário restrito a uma filial (ex: Brasília)
    state.activeUnidade = user.unidade;
    mainSelect.innerHTML = `<option value="${user.unidade}">📍 ${user.unidade} (Acesso Restrito)</option>`;
    mainSelect.value = user.unidade;
    mainSelect.disabled = true;
    mainSelect.style.cursor = 'not-allowed';
    mainSelect.title = `Acesso restrito à unidade ${user.unidade}`;
    if (btnAddUnit) btnAddUnit.style.display = 'none';

    // Form Selector travado na unidade do usuário
    formSelect.innerHTML = `<option value="${user.unidade}">${user.unidade}</option>`;
    formSelect.value = user.unidade;
    formSelect.disabled = true;
  } else {
    // Acesso Geral / Master (todas as unidades)
    mainSelect.disabled = false;
    mainSelect.style.cursor = 'pointer';
    mainSelect.title = "Selecione a Unidade Operacional";
    if (btnAddUnit && user && user.role === 'admin') {
      btnAddUnit.style.display = 'flex';
    }

    mainSelect.innerHTML = `<option value="todas">🌐 Visão Geral (Todas as Unidades)</option>`;
    state.unidades.forEach(unit => {
      const opt = document.createElement('option');
      opt.value = unit;
      opt.textContent = `📍 ${unit}`;
      if (unit === state.activeUnidade) opt.selected = true;
      mainSelect.appendChild(opt);
    });
    if (state.activeUnidade === 'todas') mainSelect.value = 'todas';

    // Form Selector livre
    formSelect.innerHTML = '';
    state.unidades.forEach(unit => {
      const opt = document.createElement('option');
      opt.value = unit;
      opt.textContent = unit;
      if (unit === state.activeUnidade) opt.selected = true;
      formSelect.appendChild(opt);
    });
    formSelect.disabled = false;
  }

  updateUnitIndicatorText();
}

function updateUnitIndicatorText() {
  const ind = document.getElementById('top-indicator-unit');
  const dashTitle = document.getElementById('dash-active-unit-title');
  const user = state.currentUser;
  let text = state.activeUnidade === 'todas' ? 'Visão Geral (Todas as Unidades)' : state.activeUnidade;
  if (user && user.unidade && user.unidade !== 'todas') {
    text = `Unidade ${user.unidade} (Acesso Exclusivo)`;
  }
  if (ind) ind.textContent = text;
  if (dashTitle) dashTitle.textContent = text;
}

// Render Main App
function renderApp() {
  updateUnitIndicatorText();
  renderKPIs();
  renderDocaFilterOptions();
  if (state.activeTab === 'docas') {
    renderTable();
  } else if (state.activeTab === 'historico') {
    renderHistoricoTable();
  } else {
    renderDashboardCharts();
  }
}

// KPI Calculations
function renderKPIs() {
  const scopedData = getScopedData();
  // Veículos ativos na grade operacional (operações do turno que ainda não deram baixa)
  const ativos = scopedData.filter(r => !r.arquivado && r.retornoIsca !== 'OK');

  const total = ativos.length;
  const emAndamento = ativos.filter(r => !r.fim || r.fim.trim() === '').length;
  const concluidos = ativos.filter(r => r.fim && r.fim.trim() !== '').length;
  const iscasPendentes = ativos.filter(r => {
    const iscaCode = (r.isca || '').trim().toUpperCase();
    return iscaCode !== '' && iscaCode !== 'S/ISCA';
  }).length;

  let totalMinutos = 0;
  let qtdFinalizadosComTempo = 0;
  scopedData.forEach(r => {
    if (r.inicio && r.fim) {
      const min = calcDurationMinutes(r.inicio, r.fim);
      if (min >= 0) {
        totalMinutos += min;
        qtdFinalizadosComTempo++;
      }
    }
  });

  const mediaMin = qtdFinalizadosComTempo > 0 ? Math.round(totalMinutos / qtdFinalizadosComTempo) : 0;

  // UI updates
  document.getElementById('kpi-total').textContent = total;
  document.getElementById('kpi-active-unit-name').textContent = state.activeUnidade === 'todas' ? 'Todas as Unidades' : state.activeUnidade;
  document.getElementById('kpi-loading').textContent = emAndamento;
  document.getElementById('kpi-completed').textContent = concluidos;
  document.getElementById('kpi-iscas-pendentes').textContent = iscasPendentes;
  document.getElementById('kpi-tempo-medio').textContent = `${mediaMin} min`;

  // Pills counts
  document.getElementById('count-pill-todos').textContent = total;
  document.getElementById('count-pill-andamento').textContent = emAndamento;
  document.getElementById('count-pill-concluido').textContent = concluidos;
  document.getElementById('count-pill-isca').textContent = iscasPendentes;

  const alertBadge = document.getElementById('kpi-iscas-alert');
  if (iscasPendentes > 0) {
    alertBadge.style.display = 'inline-block';
    alertBadge.textContent = `${iscasPendentes} pendente(s)`;
  } else {
    alertBadge.style.display = 'none';
  }
}

// Get scoped data by unit
function getScopedData() {
  const user = state.currentUser;
  // Se o usuário tem unidade restrita, NUNCA retorna dados de outras unidades
  if (user && user.unidade && user.unidade !== 'todas') {
    return state.registros.filter(r => r.unidade === user.unidade);
  }

  if (state.activeUnidade === 'todas') {
    return state.registros;
  }
  return state.registros.filter(r => r.unidade === state.activeUnidade);
}

// Render Doca filter dropdown options
function renderDocaFilterOptions() {
  const docaSelect = document.getElementById('filter-doca');
  const currentVal = docaSelect.value;
  const scopedData = getScopedData();

  const docas = new Set();
  scopedData.forEach(r => {
    if (r.doca && r.doca.trim() !== '') {
      docas.add(r.doca.trim());
    }
  });

  const sortedDocas = Array.from(docas).sort((a, b) => {
    const numA = parseFloat(a.replace(',', '.'));
    const numB = parseFloat(b.replace(',', '.'));
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    return a.localeCompare(b);
  });

  docaSelect.innerHTML = '<option value="">Todas as Docas</option>';
  sortedDocas.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = `Doca ${d}`;
    if (d === currentVal) opt.selected = true;
    docaSelect.appendChild(opt);
  });
}

// Render Table
function renderTable() {
  const tbody = document.getElementById('tbody-registros');
  const emptyState = document.getElementById('table-empty-state');
  const tableTitle = document.getElementById('table-active-title');
  const visibleCountEl = document.getElementById('footer-count-visible');
  const totalCountEl = document.getElementById('footer-count-total');

  const unitName = state.activeUnidade === 'todas' ? 'Visão Geral (Todas as Unidades)' : state.activeUnidade;
  tableTitle.textContent = `Grade Operacional — ${unitName}`;

  const allScoped = getScopedData();
  
  // Atualiza badge de contagem de baixas na aba superior
  const baixasScoped = allScoped.filter(r => r.arquivado || r.retornoIsca === 'OK');
  const badgeHist = document.getElementById('badge-historico-count');
  if (badgeHist) badgeHist.textContent = baixasScoped.length;

  // Grade Operacional Ativa: APENAS veículos que ainda não deram baixa (se deu OK, sai imediatamente da tela)
  let items = allScoped.filter(r => !r.arquivado && r.retornoIsca !== 'OK');
  totalCountEl.textContent = items.length;

  // 2. Filtro por Status Pill
  if (state.filterStatus === 'andamento') {
    items = items.filter(r => !r.fim || r.fim.trim() === '');
  } else if (state.filterStatus === 'concluido') {
    items = items.filter(r => r.fim && r.fim.trim() !== '');
  } else if (state.filterStatus === 'pendente_isca') {
    items = items.filter(r => {
      const iscaCode = (r.isca || '').trim().toUpperCase();
      return iscaCode !== '' && iscaCode !== 'S/ISCA' && r.retornoIsca !== 'OK';
    });
  }

  // 3. Filtro por Doca
  if (state.filterDoca) {
    items = items.filter(r => (r.doca || '').trim() === state.filterDoca);
  }

  // 4. Filtro por Busca de Texto
  if (state.searchTerm) {
    const q = state.searchTerm.toLowerCase();
    items = items.filter(r => {
      return (r.motorista || '').toLowerCase().includes(q) ||
             (r.placa || '').toLowerCase().includes(q) ||
             (r.rota || '').toLowerCase().includes(q) ||
             (r.doca || '').toLowerCase().includes(q) ||
             (r.conferente || '').toLowerCase().includes(q) ||
             (r.isca || '').toLowerCase().includes(q) ||
             (r.unidade || '').toLowerCase().includes(q);
    });
  }

  visibleCountEl.textContent = items.length;

  if (items.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  tbody.innerHTML = items.map(record => createTableRowHtml(record)).join('');
}

// Helper: Create HTML for a row
function createTableRowHtml(record) {
  const initials = getInitials(record.motorista);

  const isPlateHighlighted = record.placaLiberada;
  const placaHtml = isPlateHighlighted 
    ? `<span class="placa-highlight">${escapeHtml(record.placa)}</span>`
    : escapeHtml(record.placa);

  const hasFim = record.fim && record.fim.trim() !== '';
  let fimHtml = '';
  let durationBadge = '';

  if (hasFim) {
    fimHtml = escapeHtml(record.fim);
    const durationMin = calcDurationMinutes(record.inicio, record.fim);
    let speedClass = 'duration-normal';
    if (durationMin <= 30) speedClass = 'duration-fast';
    else if (durationMin > 60) speedClass = 'duration-slow';
    durationBadge = `<span class="duration-badge ${speedClass}"><i class="fa-regular fa-clock"></i> ${durationMin} min</span>`;
  } else {
    fimHtml = `<button class="btn-quick-end" onclick="finalizarOperacao('${record.id}')" title="Clique para encerrar com a hora atual"><i class="fa-solid fa-check"></i> Finalizar</button>`;
    durationBadge = `<span class="duration-badge duration-ongoing"><i class="fa-solid fa-spinner fa-spin"></i> Em doca</span>`;
  }

  const iscaRaw = (record.isca || '').trim().toUpperCase();
  const isSemIsca = iscaRaw === '' || iscaRaw === 'S/ISCA';
  const iscaHtml = isSemIsca ? `<span class="isca-none">S/ISCA</span>` : escapeHtml(record.isca);

  let retornoBtnHtml = '';
  if (isSemIsca) {
    retornoBtnHtml = `<span class="retorno-btn-toggle status-sem-isca" title="Não aplicável">-</span>`;
  } else {
    retornoBtnHtml = `<button class="retorno-btn-toggle status-pendente" onclick="solicitarConfirmacaoIsca('${record.id}')" title="Pendente de retorno! Clique para confirmar e transferir para o Histórico de Baixas"><i class="fa-solid fa-triangle-exclamation"></i> PENDENTE</button>`;
  }

  const unitBadge = state.activeUnidade === 'todas' ? `<span style="font-size:0.7rem; color:var(--text-muted); display:block;">(${record.unidade})</span>` : '';
  const rowClass = record.destaqueLinha ? 'row-destacada' : '';

  return `
    <tr id="row-${record.id}" class="${rowClass}">
      <td class="td-rota">
        ${escapeHtml(record.rota)}
        ${unitBadge}
      </td>
      <td class="td-motorista">
        <div class="motorista-cell-inner">
          <span class="driver-initials">${initials}</span>
          <span>${escapeHtml(record.motorista)}</span>
        </div>
      </td>
      <td class="td-placa">${placaHtml}</td>
      <td class="td-doca">${escapeHtml(record.doca)}</td>
      <td class="td-conferente">${escapeHtml(record.conferente)}</td>
      <td class="td-inicio">${escapeHtml(record.inicio)}</td>
      <td class="td-fim">${fimHtml}</td>
      <td class="td-tempo">${durationBadge}</td>
      <td class="td-isca">${iscaHtml}</td>
      <td class="td-retorno">${retornoBtnHtml}</td>
      <td class="td-acoes">
        <div class="action-btns-wrap">
          <button class="btn-table-action" onclick="editarRegistro('${record.id}')" title="Editar Operação">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn-table-action btn-del" onclick="removerRegistro('${record.id}')" title="Excluir Registro">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `;
}

// Helpers
function getInitials(name) {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function calcDurationMinutes(startStr, endStr) {
  if (!startStr || !endStr) return 0;
  const [h1, m1] = startStr.replace(' ', ':').split(':').map(Number);
  const [h2, m2] = endStr.replace(' ', ':').split(':').map(Number);
  if (isNaN(h1) || isNaN(m1) || isNaN(h2) || isNaN(m2)) return 0;

  let startMin = h1 * 60 + m1;
  let endMin = h2 * 60 + m2;
  if (endMin < startMin) endMin += 24 * 60;
  return endMin - startMin;
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

// 1-Click Toggle for Isca Return
window.toggleRetornoIsca = function(id) {
  const rec = state.registros.find(r => r.id === id);
  if (!rec) return;

  const current = rec.retornoIsca;
  rec.retornoIsca = current === 'OK' ? 'PENDENTE' : 'OK';

  saveData();
  renderApp();
};

// Quick Finish Load
window.finalizarOperacao = function(id) {
  const rec = state.registros.find(r => r.id === id);
  if (!rec) return;

  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  rec.fim = `${hh}:${mm}`;

  saveData();
  renderApp();
};

// Delete Record
window.removerRegistro = function(id) {
  const rec = state.registros.find(r => r.id === id);
  if (!rec) return;

  if (confirm(`Deseja realmente remover o registro da Rota ${rec.rota} (Motorista: ${rec.motorista})?`)) {
    state.registros = state.registros.filter(r => r.id !== id);
    saveData();
    renderApp();
  }
};

// Open Modal for New Record
window.abrirModalRegistro = function() {
  state.editingId = null;
  document.getElementById('modal-title-text').textContent = 'Novo Carregamento';
  document.getElementById('form-registro').reset();
  document.getElementById('form-id').value = '';

  const unitSelect = document.getElementById('form-unidade');
  if (state.activeUnidade !== 'todas') {
    unitSelect.value = state.activeUnidade;
  }

  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('form-inicio').value = `${hh}:${mm}`;

  document.getElementById('modal-registro').style.display = 'flex';
  document.getElementById('form-rota').focus();
};

// Edit Record
window.editarRegistro = function(id) {
  const rec = state.registros.find(r => r.id === id);
  if (!rec) return;

  state.editingId = id;
  document.getElementById('modal-title-text').textContent = 'Editar Operação';
  document.getElementById('form-id').value = rec.id;
  document.getElementById('form-unidade').value = rec.unidade;
  document.getElementById('form-rota').value = rec.rota || '';
  document.getElementById('form-placa').value = rec.placa || '';
  document.getElementById('form-doca').value = rec.doca || '';
  document.getElementById('form-motorista').value = rec.motorista || '';
  document.getElementById('form-conferente').value = rec.conferente || '';
  document.getElementById('form-inicio').value = rec.inicio || '';
  document.getElementById('form-fim').value = rec.fim || '';
  document.getElementById('form-isca').value = rec.isca || '';
  document.getElementById('form-retorno-isca').value = rec.retornoIsca || 'PENDENTE';
  document.getElementById('form-placa-liberada').checked = !!rec.placaLiberada;
  document.getElementById('form-obs').value = rec.obs || '';

  document.getElementById('modal-registro').style.display = 'flex';
};

function fecharModalRegistro() {
  document.getElementById('modal-registro').style.display = 'none';
  state.editingId = null;
}

function salvarFormRegistro(e) {
  e.preventDefault();

  const id = state.editingId || 'rec-' + Date.now();
  const unidade = document.getElementById('form-unidade').value;
  const rota = document.getElementById('form-rota').value.trim().toUpperCase();
  const placa = document.getElementById('form-placa').value.trim().toUpperCase();
  const doca = document.getElementById('form-doca').value.trim();
  const motorista = document.getElementById('form-motorista').value.trim().toUpperCase();
  const conferente = document.getElementById('form-conferente').value.trim().toUpperCase();
  const inicio = document.getElementById('form-inicio').value;
  const fim = document.getElementById('form-fim').value;
  let isca = document.getElementById('form-isca').value.trim();
  let retornoIsca = document.getElementById('form-retorno-isca').value;
  const placaLiberada = document.getElementById('form-placa-liberada').checked;
  const obs = document.getElementById('form-obs').value.trim();

  if (!isca) {
    isca = 'S/ISCA';
    retornoIsca = 'S/ISCA';
  }

  const newRecord = {
    id,
    unidade,
    rota,
    placa,
    doca,
    motorista,
    conferente,
    inicio,
    fim,
    isca,
    retornoIsca,
    placaLiberada,
    destaqueLinha: false,
    obs
  };

  if (state.editingId) {
    const idx = state.registros.findIndex(r => r.id === state.editingId);
    if (idx !== -1) {
      newRecord.destaqueLinha = state.registros[idx].destaqueLinha;
      state.registros[idx] = newRecord;
    }
  } else {
    state.registros.unshift(newRecord);
  }

  saveData();
  fecharModalRegistro();
  renderApp();
}

// Manage Units
function abrirModalUnidades() {
  renderListaUnidades();
  document.getElementById('modal-unidades').style.display = 'flex';
}

function fecharModalUnidades() {
  document.getElementById('modal-unidades').style.display = 'none';
}

function renderListaUnidades() {
  const ul = document.getElementById('lista-unidades-cadastradas');
  ul.innerHTML = state.unidades.map(u => `
    <li class="unit-manage-item">
      <span><i class="fa-solid fa-location-dot" style="color:#2563eb; margin-right:8px;"></i>${escapeHtml(u)}</span>
      ${state.unidades.length > 1 ? `<button class="btn-del-unit" onclick="excluirUnidade('${escapeHtml(u)}')"><i class="fa-regular fa-trash-can"></i></button>` : ''}
    </li>
  `).join('');
}

window.excluirUnidade = function(unitName) {
  if (confirm(`Remover a unidade "${unitName}"? Os registros atribuídos a ela serão mantidos.`)) {
    state.unidades = state.unidades.filter(u => u !== unitName);
    if (state.activeUnidade === unitName) {
      state.activeUnidade = state.unidades[0] || 'todas';
    }
    saveUnits();
    populateUnitSelects();
    renderListaUnidades();
    renderApp();
  }
};

function adicionarNovaUnidade(e) {
  e.preventDefault();
  const input = document.getElementById('input-nova-unidade');
  const nome = input.value.trim();
  if (!nome) return;

  if (state.unidades.includes(nome)) {
    alert("Esta unidade já está cadastrada!");
    return;
  }

  state.unidades.push(nome);
  input.value = '';
  saveUnits();
  populateUnitSelects();
  renderListaUnidades();
}

// ============================================================
// DASHBOARD ANALYTICS & CHARTS (TAB 2 - C-LEVEL EXECUTIVE)
// ============================================================
function renderDashboardCharts() {
  const scopedData = getScopedData();
  const total = scopedData.length;
  const concluidos = scopedData.filter(r => r.fim && r.fim.trim() !== '').length;
  const emAndamento = total - concluidos;

  // Iscas metrics
  const comIsca = scopedData.filter(r => (r.isca || '').toUpperCase() !== 'S/ISCA' && (r.isca || '').trim() !== '');
  const iscasOk = comIsca.filter(r => r.retornoIsca === 'OK').length;
  const iscasPendentes = comIsca.length - iscasOk;
  const taxaIsca = comIsca.length > 0 ? Math.round((iscasOk / comIsca.length) * 100) : 100;

  // Cálculo de durações de permanência em doca
  const durations = [];
  scopedData.forEach(r => {
    if (r.inicio && r.fim) {
      const min = calcDurationMinutes(r.inicio, r.fim);
      if (min >= 0) {
        durations.push({
          id: r.id,
          placa: r.placa,
          motorista: r.motorista,
          doca: r.doca,
          rota: r.rota,
          conferente: r.conferente,
          inicio: r.inicio,
          fim: r.fim,
          minutos: min
        });
      }
    }
  });

  // Ordena do mais demorado para o menos demorado
  durations.sort((a, b) => b.minutos - a.minutos);

  const totalMinutosDoca = durations.reduce((acc, d) => acc + d.minutos, 0);
  const mediaMinDoca = durations.length > 0 ? Math.round(totalMinutosDoca / durations.length) : 0;
  const maiorDur = durations.length > 0 ? durations[0] : null;

  // Eficiência de Doca (operações finalizadas em até 45 min)
  let noPrazo = 0;
  durations.forEach(d => {
    if (d.minutos <= 45) noPrazo++;
  });
  const taxaEficiencia = concluidos > 0 ? Math.round((noPrazo / concluidos) * 100) : 100;
  const pctConcluidos = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  // Atualização dos novos cards do Top Executive Ribbon
  const elDashTempo = document.getElementById('dash-tempo-medio');
  const elDashSla = document.getElementById('dash-tempo-sla');
  const elDashMaior = document.getElementById('dash-maior-tempo');
  const elDashPlacaGargalo = document.getElementById('dash-placa-gargalo');
  const elDashGargaloSub = document.getElementById('dash-gargalo-sub');
  const elDashEfic = document.getElementById('dash-eficiencia-val');
  const elDashEficBadge = document.getElementById('dash-eficiencia-badge');
  const elDashGiroVal = document.getElementById('dash-giro-val');
  const elDashGiroPct = document.getElementById('dash-giro-pct');

  if (elDashTempo) elDashTempo.textContent = `${mediaMinDoca} min`;
  if (elDashSla) {
    if (mediaMinDoca <= 35) {
      elDashSla.textContent = `Meta: ≤ 35 min (Dentro da Meta)`;
      elDashSla.className = `dash-kpi-badge status-good`;
    } else {
      elDashSla.textContent = `Meta: ≤ 35 min (Acima do Padrão)`;
      elDashSla.className = `dash-kpi-badge badge-danger`;
    }
  }

  if (elDashMaior) elDashMaior.textContent = maiorDur ? `${maiorDur.minutos} min` : `0 min`;
  if (elDashPlacaGargalo) elDashPlacaGargalo.textContent = maiorDur ? `Placa ${maiorDur.placa}` : `-`;
  if (elDashGargaloSub) elDashGargaloSub.textContent = maiorDur ? `Doca ${maiorDur.doca} • ${maiorDur.motorista.split(' ')[0]}` : `Nenhum veículo`;
  if (elDashEfic) elDashEfic.textContent = `${taxaEficiencia}%`;
  if (elDashEficBadge) {
    elDashEficBadge.textContent = taxaEficiencia >= 80 ? 'No Prazo' : 'Gargalo';
    elDashEficBadge.className = taxaEficiencia >= 80 ? 'dash-kpi-badge status-good' : 'dash-kpi-badge badge-danger';
  }
  if (elDashGiroVal) elDashGiroVal.textContent = `${concluidos} / ${total}`;
  if (elDashGiroPct) elDashGiroPct.textContent = `${pctConcluidos}%`;

  // Docas counts
  const docaCounts = {};
  scopedData.forEach(r => {
    const d = (r.doca || 'S/D').trim();
    docaCounts[d] = (docaCounts[d] || 0) + 1;
  });
  const docaLabels = Object.keys(docaCounts).sort((a,b) => Number(a) - Number(b));
  let topDoca = '-';
  let topDocaCount = 0;
  docaLabels.forEach(d => {
    if (docaCounts[d] > topDocaCount) {
      topDocaCount = docaCounts[d];
      topDoca = d;
    }
  });
  const topDocaPct = total > 0 ? Math.round((topDocaCount / total) * 100) : 0;

  // Conferentes counts
  const confCounts = {};
  scopedData.forEach(r => {
    const c = (r.conferente || 'Outro').trim().toUpperCase();
    confCounts[c] = (confCounts[c] || 0) + 1;
  });
  const confLabels = Object.keys(confCounts).sort((a,b) => confCounts[b] - confCounts[a]);
  const topConf = confLabels[0] || 'N/A';
  const topConfCount = confCounts[topConf] || 0;

  // 1. Executive Summary Narrative (Manchete Executiva)
  const unitLabel = state.activeUnidade === 'todas' ? 'Todas as Unidades' : state.activeUnidade;
  const narrativeEl = document.getElementById('exec-narrative-text');
  if (narrativeEl) {
    if (total === 0) {
      narrativeEl.innerHTML = `Nenhuma movimentação registrada até o momento para a unidade <strong>${escapeHtml(unitLabel)}</strong>.`;
    } else {
      narrativeEl.innerHTML = `
        A operação de <strong>${escapeHtml(unitLabel)}</strong> registra <strong>${pctConcluidos}% das cargas concluídas</strong> (${concluidos} de ${total} viagens expedidas).
        O tempo médio em doca é de <strong>${mediaMinDoca} minutos</strong> (SLA de pontualidade: <strong>${taxaEficiencia}%</strong>). 
        ${iscasPendentes > 0 
          ? `O ponto de atenção executiva é o risco em <span class="highlight-alert">${iscasPendentes} isca(s) aguardando devolução</span> (${taxaIsca}% recolhidas), com maior fluxo na <strong>Doca ${escapeHtml(topDoca)}</strong>.`
          : `Excelente desempenho de segurança: <strong>100% das iscas foram recolhidas</strong> e não há pendências de rastreadores em aberto.`
        }
      `;
    }
  }

  // 2. Actionable Declarative Headings for Charts
  const titleStatus = document.getElementById('title-chart-status');
  const subStatus = document.getElementById('subtitle-chart-status');
  const donutValStatus = document.getElementById('donut-val-status');
  if (titleStatus) titleStatus.innerHTML = `<i class="fa-solid fa-circle-notch"></i> ${pctConcluidos}% dos Carregamentos Concluídos`;
  if (subStatus) subStatus.textContent = `${concluidos} expedidos | ${emAndamento} veículo(s) ainda em operação`;
  if (donutValStatus) donutValStatus.textContent = `${pctConcluidos}%`;

  const titleIscas = document.getElementById('title-chart-iscas');
  const subIscas = document.getElementById('subtitle-chart-iscas');
  const donutValIscas = document.getElementById('donut-val-iscas');
  if (titleIscas) {
    if (iscasPendentes > 0) {
      titleIscas.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-danger"></i> ${iscasPendentes} Iscas Aguardam Retorno Operacional`;
    } else {
      titleIscas.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Rastreamento 100% Conforme`;
    }
  }
  if (subIscas) subIscas.textContent = `${taxaIsca}% de devoluções validadas (${iscasOk} ok, ${iscasPendentes} pendentes)`;
  if (donutValIscas) {
    donutValIscas.textContent = iscasPendentes;
    donutValIscas.className = iscasPendentes > 0 ? 'donut-center-val text-danger' : 'donut-center-val';
  }

  const titleDocas = document.getElementById('title-chart-docas');
  const subDocas = document.getElementById('subtitle-chart-docas');
  if (titleDocas) titleDocas.innerHTML = `<i class="fa-solid fa-warehouse"></i> Doca ${escapeHtml(topDoca)} Lidera Demanda (${topDocaPct}% do Volume)`;
  if (subDocas) subDocas.textContent = `Destaque em laranja representa o ponto de maior concentração de veículos`;

  const titleConf = document.getElementById('title-chart-conferentes');
  const subConf = document.getElementById('subtitle-chart-conferentes');
  if (titleConf) titleConf.innerHTML = `<i class="fa-solid fa-users-gear"></i> ${escapeHtml(topConf)} Realizou Maior Volume de Conferências`;
  if (subConf) subConf.textContent = `${topConfCount} atendimentos efetuados | Distribuição entre ${confLabels.length} operadores`;

  // Render Mini-Table for Pending Iscas
  const tbodyPend = document.getElementById('tbody-dash-pendentes');
  const badgePend = document.getElementById('dash-badge-pendentes');
  const pendingRecords = scopedData.filter(r => {
    const code = (r.isca || '').trim().toUpperCase();
    return code !== '' && code !== 'S/ISCA' && r.retornoIsca !== 'OK';
  });

  if (badgePend) {
    badgePend.textContent = `${pendingRecords.length} pendente(s)`;
    badgePend.className = pendingRecords.length > 0 ? 'chart-badge badge-danger' : 'chart-badge badge-success';
  }

  if (tbodyPend) {
    if (pendingRecords.length === 0) {
      tbodyPend.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:1.5rem; color:#10b981; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Todas as iscas desta unidade foram retornadas com sucesso!</td></tr>`;
    } else {
      tbodyPend.innerHTML = pendingRecords.map(r => `
        <tr>
          <td><strong>${escapeHtml(r.rota)}</strong></td>
          <td>${escapeHtml(r.motorista)}</td>
          <td><span style="font-family:monospace; font-weight:bold;">${escapeHtml(r.placa)}</span></td>
          <td><span style="color:#dc2626; font-weight:bold;">Doca ${escapeHtml(r.doca)}</span></td>
          <td><span style="color:#dc2626; font-weight:bold;">#${escapeHtml(r.isca)}</span></td>
          <td>
            <button class="retorno-btn-toggle status-ok" style="padding:3px 9px; font-size:0.75rem;" onclick="solicitarConfirmacaoIsca('${r.id}')" title="Confirmar devolução da isca">
              <i class="fa-solid fa-check"></i> Baixar
            </button>
          </td>
        </tr>
      `).join('');
    }
  }


  if (typeof Chart === 'undefined') return;

  const isDark = document.body.classList.contains('theme-dark');
  const textColor = isDark ? '#94a3b8' : '#334155';

  // Plugin para desenhar números diretamente sobre/ao lado das barras
  const dataLabelsPlugin = {
    id: 'dataLabelsPlugin',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const isHorizontal = chart.options.indexAxis === 'y';
      const isDark = document.body.classList.contains('theme-dark');
      
      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((bar, index) => {
          const val = dataset.data[index];
          if (val === undefined || val === null) return;
          
          ctx.save();
          ctx.font = 'bold 13px Outfit, Inter, sans-serif';
          
          if (isHorizontal) {
            ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            const unit = dataset.unitSuffix || (chart.canvas && chart.canvas.id === 'chart-top-demora' ? ' min' : ' atend.');
            ctx.fillText(`${val}${unit}`, bar.x + 8, bar.y);
          } else {
            // Em cima da barra vertical
            ctx.fillStyle = (bar.options.backgroundColor === '#f97316') ? '#ea580c' : (isDark ? '#e2e8f0' : '#1e293b');
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(`${val}`, bar.x, bar.y - 4);
          }
          ctx.restore();
        });
      });
    }
  };

  // 1. Chart Status Donut (Limpo, com contagem na legenda e centro)
  const ctxStatus = document.getElementById('chart-status-carregamento');
  if (ctxStatus) {
    if (charts.statusCarregamento) charts.statusCarregamento.destroy();
    charts.statusCarregamento = new Chart(ctxStatus, {
      type: 'doughnut',
      data: {
        labels: [`Concluídos (${concluidos})`, `Em Doca (${emAndamento})`],
        datasets: [{
          data: [concluidos, emAndamento],
          backgroundColor: ['#10b981', '#f59e0b'],
          borderColor: isDark ? '#0f1a2e' : '#ffffff',
          borderWidth: 3,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: textColor, font: { weight: 700, size: 12 } } },
          tooltip: {
            callbacks: {
              label: (item) => ` ${item.label}: ${item.raw} (${total > 0 ? Math.round((item.raw / total)*100) : 0}%)`
            }
          }
        },
        cutout: '72%'
      }
    });
  }

  // 2. Chart Iscas Donut (Contagem visível na legenda e centro)
  const ctxIscas = document.getElementById('chart-status-iscas');
  if (ctxIscas) {
    const semIsca = total - comIsca.length;
    if (charts.statusIscas) charts.statusIscas.destroy();
    charts.statusIscas = new Chart(ctxIscas, {
      type: 'doughnut',
      data: {
        labels: [`Retornadas OK (${iscasOk})`, `Pendentes (${iscasPendentes})`, `Sem Isca (${semIsca})`],
        datasets: [{
          data: [iscasOk, iscasPendentes, semIsca],
          backgroundColor: ['#10b981', '#ef4444', '#cbd5e1'],
          borderColor: isDark ? '#0f1a2e' : '#ffffff',
          borderWidth: 3,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: textColor, font: { weight: 700, size: 12 } } }
        },
        cutout: '72%'
      }
    });
  }

  // 3. Chart Ocupação por Doca (Barra com NÚMEROS no topo)
  const ctxDocas = document.getElementById('chart-ocupacao-docas');
  if (ctxDocas) {
    const docaDataVals = docaLabels.map(l => docaCounts[l]);
    const barColors = docaLabels.map(l => (l === topDoca ? '#f97316' : (isDark ? '#334155' : '#94a3b8')));

    if (charts.ocupacaoDocas) charts.ocupacaoDocas.destroy();
    charts.ocupacaoDocas = new Chart(ctxDocas, {
      type: 'bar',
      data: {
        labels: docaLabels.map(l => `Doca ${l}`),
        datasets: [{
          label: 'Veículos Atendidos',
          data: docaDataVals,
          backgroundColor: barColors,
          borderRadius: 6,
          maxBarThickness: 46
        }]
      },
      plugins: [dataLabelsPlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 22 }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              afterLabel: (item) => item.label.includes(topDoca) ? ' (Gargalo de maior fluxo)' : ''
            }
          }
        },
        scales: {
          x: { 
            ticks: { color: textColor, font: { weight: 700, size: 12 } }, 
            grid: { display: false }, 
            border: { display: false } 
          },
          y: { 
            grace: '15%',
            ticks: { color: textColor, stepSize: 1 }, 
            grid: { display: false }, 
            border: { display: false }, 
            beginAtZero: true 
          }
        }
      }
    });
  }

  // 4. Chart Conferentes (Horizontal Bar com NÚMEROS ao lado da barra)
  const ctxConf = document.getElementById('chart-conferentes');
  if (ctxConf) {
    const confVals = confLabels.map(c => confCounts[c]);
    const confBarColors = confLabels.map((c, i) => i === 0 ? '#1e4a9e' : (isDark ? '#334155' : '#94a3b8'));

    if (charts.conferentes) charts.conferentes.destroy();
    charts.conferentes = new Chart(ctxConf, {
      type: 'bar',
      data: {
        labels: confLabels,
        datasets: [{
          label: 'Conferências',
          data: confVals,
          backgroundColor: confBarColors,
          borderRadius: 6,
          maxBarThickness: 24
        }]
      },
      plugins: [dataLabelsPlugin],
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { right: 55 }
        },
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { 
            grace: '20%',
            ticks: { color: textColor, stepSize: 1 }, 
            grid: { display: false }, 
            border: { display: false }, 
            beginAtZero: true 
          },
          y: { 
            ticks: { color: textColor }, 
            grid: { display: false }, 
            border: { display: false } 
          }
        }
      }
    });
  }

  // 5. Chart Ranking de Placas que Mais Demoraram (Horizontal Bar)
  const topPlates = durations.slice(0, 6);
  const ctxTop = document.getElementById('chart-top-demora');
  if (ctxTop) {
    if (charts.topDemora) charts.topDemora.destroy();
    
    if (topPlates.length > 0) {
      const topLabels = topPlates.map(p => `${p.placa} (Doca ${p.doca})`);
      const topDataVals = topPlates.map(p => p.minutos);
      const topBarColors = topPlates.map(p => p.minutos > 40 ? '#ef4444' : (p.minutos > 30 ? '#f97316' : '#0284c7'));

      charts.topDemora = new Chart(ctxTop, {
        type: 'bar',
        data: {
          labels: topLabels,
          datasets: [{
            label: 'Minutos em Doca',
            data: topDataVals,
            backgroundColor: topBarColors,
            borderRadius: 6,
            maxBarThickness: 24,
            unitSuffix: ' min'
          }]
        },
        plugins: [dataLabelsPlugin],
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: { right: 65 }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (item) => ` Tempo Total: ${item.raw} min`
              }
            }
          },
          scales: {
            x: { 
              grace: '20%',
              ticks: { color: textColor, stepSize: 10 }, 
              grid: { display: false }, 
              border: { display: false }, 
              beginAtZero: true 
            },
            y: { 
              ticks: { color: textColor, font: { weight: 700, size: 12 } }, 
              grid: { display: false }, 
              border: { display: false } 
            }
          }
        }
      });
    }
  }

  // Renderiza a lista textual das Top Placas Críticas ao lado do gráfico
  const listPlatesEl = document.getElementById('ranking-plates-list');
  if (listPlatesEl) {
    if (topPlates.length === 0) {
      listPlatesEl.innerHTML = `<div style="text-align:center; padding:1.5rem; color:var(--text-muted);">Nenhum veículo com tempo de doca finalizado.</div>`;
    } else {
      listPlatesEl.innerHTML = topPlates.map((p, idx) => {
        const timeClass = p.minutos > 40 ? 'time-critical' : (p.minutos > 30 ? 'time-warning' : 'time-normal');
        return `
          <div class="ranking-item-card">
            <div class="ranking-item-left">
              <span class="ranking-pos">#${idx + 1}</span>
              <div class="ranking-plate-info">
                <span class="ranking-plate-text">${escapeHtml(p.placa)}</span>
                <span class="ranking-meta-sub">Doca ${escapeHtml(p.doca)} • Rota ${escapeHtml(p.rota)} • ${escapeHtml(p.motorista.split(' ')[0])}</span>
              </div>
            </div>
            <span class="ranking-time-badge ${timeClass}">
              <i class="fa-regular fa-clock"></i> ${p.minutos} min
            </span>
          </div>
        `;
      }).join('');
    }
  }
}

// Export to Excel (.xlsx) Nativo
function exportarExcel() {
  const scopedData = getScopedData();
  const items = scopedData.filter(r => !r.arquivado && r.retornoIsca !== 'OK');

  if (items.length === 0) {
    alert("Não há dados ativos na grade operacional para exportar.");
    return;
  }

  const dateStr = new Date().toISOString().slice(0, 10);
  const unitStr = state.activeUnidade.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `Controle_Docas_BBM_${unitStr}_${dateStr}`;

  // Formatar dados para a planilha
  const dataExport = items.map(r => {
    const tempoMin = (r.inicio && r.fim) ? calcDurationMinutes(r.inicio, r.fim) : '';
    return {
      "Unidade": r.unidade || state.activeUnidade,
      "Rota": r.rota || '',
      "Motorista": r.motorista || '',
      "Placa": r.placa || '',
      "Doca": r.doca || '',
      "Conferente": r.conferente || '',
      "Início Operação": r.inicio || '',
      "Término Operação": r.fim || 'Em Doca',
      "Tempo em Doca (min)": tempoMin !== '' ? tempoMin : 'Em andamento',
      "Código Isca": r.isca || 'S/ISCA',
      "Retorno Isca": r.retornoIsca || 'PENDENTE',
      "Status Placa": r.placaLiberada ? 'LIBERADA' : 'NORMAL',
      "Observações": r.obs || ''
    };
  });

  if (typeof XLSX !== 'undefined') {
    const ws = XLSX.utils.json_to_sheet(dataExport);
    // Ajuste automático de largura de colunas
    ws['!cols'] = [
      { wch: 22 }, // Unidade
      { wch: 8 },  // Rota
      { wch: 34 }, // Motorista
      { wch: 12 }, // Placa
      { wch: 8 },  // Doca
      { wch: 16 }, // Conferente
      { wch: 16 }, // Início
      { wch: 18 }, // Término
      { wch: 22 }, // Tempo (min)
      { wch: 14 }, // Isca
      { wch: 16 }, // Retorno Isca
      { wch: 14 }, // Status Placa
      { wch: 28 }  // Observações
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Grade Operacional");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  } else {
    // Fallback CSV
    const headers = Object.keys(dataExport[0]);
    const rows = dataExport.map(row => headers.map(h => `"${String(row[h] || '').replace(/"/g, '""')}"`).join(';'));
    const csvContent = "\uFEFF" + headers.join(';') + "\r\n" + rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Fullscreen TV Mode
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn("Fullscreen não suportado ou bloqueado:", err);
    });
  } else {
    document.exitFullscreen();
  }
}

// Reset Demo Data
function resetDemoData() {
  if (confirm("Deseja restaurar os registros originais da imagem da BBM Logística? Seus lançamentos atuais serão substituídos.")) {
    state.registros = JSON.parse(JSON.stringify(SEED_DATA));
    saveData();
    renderApp();
  }
}

// Event Listeners Setup
function setupEventListeners() {
  const mainSelect = document.getElementById('select-unidade');
  mainSelect.addEventListener('change', (e) => {
    state.activeUnidade = e.target.value;
    localStorage.setItem(STORAGE_KEY_ACTIVE_UNIT, state.activeUnidade);
    state.filterDoca = '';
    const docaSelect = document.getElementById('filter-doca');
    if (docaSelect) docaSelect.value = '';
    renderApp();
  });

  document.getElementById('btn-gerenciar-unidades').addEventListener('click', abrirModalUnidades);
  document.getElementById('btn-close-modal-unidades').addEventListener('click', fecharModalUnidades);
  document.getElementById('btn-fechar-unidades').addEventListener('click', fecharModalUnidades);
  document.getElementById('form-nova-unidade').addEventListener('submit', adicionarNovaUnidade);

  document.getElementById('btn-close-modal').addEventListener('click', fecharModalRegistro);
  document.getElementById('btn-cancelar-form').addEventListener('click', fecharModalRegistro);
  document.getElementById('form-registro').addEventListener('submit', salvarFormRegistro);

  document.getElementById('btn-now-inicio').addEventListener('click', () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('form-inicio').value = `${hh}:${mm}`;
  });

  document.getElementById('btn-now-fim').addEventListener('click', () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('form-fim').value = `${hh}:${mm}`;
  });

  const pillBtns = document.querySelectorAll('.pill-btn');
  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filterStatus = btn.getAttribute('data-filter-status');
      renderTable();
    });
  });

  const docaFilter = document.getElementById('filter-doca');
  if (docaFilter) {
    docaFilter.addEventListener('change', (e) => {
      state.filterDoca = e.target.value;
      renderTable();
    });
  }

  const searchInput = document.getElementById('input-search');
  const clearBtn = document.getElementById('btn-clear-search');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchTerm = e.target.value;
      if (clearBtn) clearBtn.style.display = state.searchTerm ? 'block' : 'none';
      renderTable();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchTerm = '';
      clearBtn.style.display = 'none';
      renderTable();
    });
  }

  document.getElementById('btn-export-excel').addEventListener('click', exportarExcel);
  document.getElementById('btn-print-table').addEventListener('click', () => window.print());
  document.getElementById('btn-reset-demo').addEventListener('click', resetDemoData);
  document.getElementById('btn-toggle-theme').addEventListener('click', toggleTheme);
  document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);

  // Logout
  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', realizarLogout);
  }

  // Gestão de Usuários (Admin)
  const btnAdminUsers = document.getElementById('btn-admin-users');
  if (btnAdminUsers) {
    btnAdminUsers.addEventListener('click', abrirModalUsuarios);
  }

  const btnCloseModalUsers = document.getElementById('btn-close-modal-usuarios');
  if (btnCloseModalUsers) btnCloseModalUsers.addEventListener('click', fecharModalUsuarios);

  const btnFecharUsers = document.getElementById('btn-fechar-usuarios');
  if (btnFecharUsers) btnFecharUsers.addEventListener('click', fecharModalUsuarios);

  const formNovoUsuario = document.getElementById('form-novo-usuario');
  if (formNovoUsuario) {
    formNovoUsuario.addEventListener('submit', cadastrarNovoUsuario);
  }

  // Confirmação de Retorno de Isca (Anti-Erro)
  const btnConfirmIsca = document.getElementById('btn-confirm-isca-submit');
  if (btnConfirmIsca) {
    btnConfirmIsca.addEventListener('click', confirmarBaixaIsca);
  }

  // Histórico de Baixas: Busca e Exportação
  const searchHistInput = document.getElementById('input-search-historico');
  const clearHistBtn = document.getElementById('btn-clear-search-historico');
  if (searchHistInput) {
    searchHistInput.addEventListener('input', () => {
      if (clearHistBtn) clearHistBtn.style.display = searchHistInput.value ? 'block' : 'none';
      renderHistoricoTable();
    });
  }
  if (clearHistBtn) {
    clearHistBtn.addEventListener('click', () => {
      searchHistInput.value = '';
      clearHistBtn.style.display = 'none';
      renderHistoricoTable();
    });
  }
  const btnExportHist = document.getElementById('btn-export-historico');
  if (btnExportHist) {
    btnExportHist.addEventListener('click', exportarHistoricoExcel);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fecharModalRegistro();
      fecharModalUnidades();
      fecharModalUsuarios();
      fecharModalConfirmIsca();
    }
  });
}

// ==========================================
// FUNÇÕES DE AUTENTICAÇÃO E ADMINISTRAÇÃO
// ==========================================

async function realizarLogout() {
  localStorage.removeItem('bbm_logged_user');
  window.location.href = '/logout';
}

function abrirModalUsuarios() {
  document.getElementById('modal-usuarios').style.display = 'flex';
  carregarListaUsuarios();
}

function fecharModalUsuarios() {
  const modal = document.getElementById('modal-usuarios');
  if (modal) modal.style.display = 'none';
}

async function carregarListaUsuarios() {
  const tbody = document.getElementById('lista-usuarios-cadastrados');
  const selectUnidadeUser = document.getElementById('select-user-unidade');
  if (!tbody) return;

  // Popula dinamicamente as opções de unidades no modal
  if (selectUnidadeUser) {
    const currentVal = selectUnidadeUser.value || 'todas';
    selectUnidadeUser.innerHTML = `
      <option value="todas">🌐 Todas as Unidades (Acesso Total)</option>
      ${state.unidades.map(u => `<option value="${u}">📍 ${u}</option>`).join('')}
    `;
    selectUnidadeUser.value = currentVal;
  }

  tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 12px; color: var(--text-secondary);">Carregando usuários...</td></tr>`;

  try {
    const res = await fetch('/api/admin/users');
    if (!res.ok) throw new Error('Falha ao carregar');
    const users = await res.json();

    if (!users || users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 12px;">Nenhum usuário cadastrado.</td></tr>`;
      return;
    }

    const currentUserId = state.currentUser ? state.currentUser.id : null;

    tbody.innerHTML = users.map(u => {
      const isSelf = (currentUserId && u.id === currentUserId);
      const unitText = (u.unidade === 'todas') ? '🌐 Todas as Unidades' : `📍 ${u.unidade}`;
      const roleText = (u.role === 'admin') ? 'Administrador Master' : 'Operador';
      const roleBadge = (u.role === 'admin') ? 'status-ok' : '';

      const actionBtn = isSelf 
        ? `<span style="font-size:0.75rem; color:var(--text-secondary); font-weight:600;">(Você)</span>`
        : `<button type="button" class="btn-table-action delete" onclick="excluirUsuario('${u.id}', '${u.matricula}')" title="Excluir Login ${u.matricula}" style="color:#ef4444; border:none; background:transparent; cursor:pointer; font-size:0.9rem;">
             <i class="fa-solid fa-trash-can"></i>
           </button>`;

      return `
        <tr>
          <td><strong>${u.name}</strong></td>
          <td><code>${u.matricula}</code></td>
          <td><span class="pill-badge ${roleBadge}" style="font-size:0.75rem; padding: 2px 6px;">${roleText}</span></td>
          <td>${unitText}</td>
          <td style="text-align: center;">${actionBtn}</td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #ef4444; padding: 12px;">Erro ao carregar usuários ou permissão negada.</td></tr>`;
  }
}

async function cadastrarNovoUsuario(e) {
  e.preventDefault();
  const matricula = document.getElementById('input-user-matricula').value.trim();
  const password = document.getElementById('input-user-pass').value;
  const name = document.getElementById('input-user-name').value.trim();
  const emailInput = document.getElementById('input-user-email');
  const email = emailInput ? emailInput.value.trim() : '';
  const role = document.getElementById('select-user-role').value;
  const unidade = document.getElementById('select-user-unidade').value;

  if (!name || !matricula || !password) {
    alert("Preencha o Login, a Senha e o Nome de identificação.");
    return;
  }

  const btn = document.getElementById('btn-save-new-user');
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Criando login...`;

  try {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, matricula, password, role, unidade })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      alert(`Login "${matricula}" criado com sucesso!\nUnidade: ${unidade === 'todas' ? 'Todas as Unidades' : unidade}`);
      document.getElementById('form-novo-usuario').reset();
      carregarListaUsuarios();
    } else {
      alert(data.error || "Erro ao cadastrar usuário.");
    }
  } catch (err) {
    alert("Erro na conexão com o servidor.");
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-user-plus"></i> Criar Novo Login`;
  }
}

window.excluirUsuario = async function(id, matricula) {
  if (!confirm(`Deseja realmente excluir o login "${matricula}" do sistema?`)) {
    return;
  }

  try {
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (res.ok && data.success) {
      carregarListaUsuarios();
    } else {
      alert(data.error || "Não foi possível excluir o usuário.");
    }
  } catch (err) {
    alert("Erro de conexão ao excluir usuário.");
  }
};

// ==========================================
// FUNÇÕES DA ABA HISTÓRICO DE BAIXAS & CONFIRMAÇÃO DE ISCAS
// ==========================================

function renderHistoricoTable() {
  const tbody = document.getElementById('tbody-historico');
  const countEl = document.getElementById('historico-table-count');
  const footerCountEl = document.getElementById('hist-footer-count');
  const unitTag = document.getElementById('historico-table-unit');
  const kpiTotalEl = document.getElementById('hist-total-baixas');
  const kpiUltimaDataEl = document.getElementById('hist-ultima-data');
  const kpiUltimaInfoEl = document.getElementById('hist-ultima-info');
  const kpiIscasOkEl = document.getElementById('hist-iscas-ok-count');
  const kpiUnitTag = document.getElementById('hist-unit-tag');

  const unitName = state.activeUnidade === 'todas' ? 'Visão Geral (Todas as Unidades)' : state.activeUnidade;
  if (unitTag) unitTag.textContent = unitName;
  if (kpiUnitTag) kpiUnitTag.textContent = unitName;

  const allScoped = getScopedData();
  // Registros que foram baixados / arquivados
  let baixas = allScoped.filter(r => r.arquivado || r.retornoIsca === 'OK');

  // Garante que todo item arquivado tenha uma dataHoraBaixa amigável com a data atual
  const hojeStr = new Date().toLocaleDateString('pt-BR');
  baixas.forEach(r => {
    if (!r.dataHoraBaixa) {
      r.dataHoraBaixa = `${hojeStr} às ${r.fim || '14:00'}`;
    }
  });

  // Atualiza badge na aba superior
  const badgeHist = document.getElementById('badge-historico-count');
  if (badgeHist) badgeHist.textContent = baixas.length;

  // Atualiza KPIs
  if (kpiTotalEl) kpiTotalEl.textContent = baixas.length;
  if (kpiIscasOkEl) kpiIscasOkEl.textContent = baixas.filter(r => r.retornoIsca === 'OK').length;
  
  if (baixas.length > 0) {
    const ultima = baixas[baixas.length - 1];
    if (kpiUltimaDataEl) kpiUltimaDataEl.textContent = ultima.dataHoraBaixa || '--/--/---- --:--';
    if (kpiUltimaInfoEl) kpiUltimaInfoEl.textContent = `Placa: ${ultima.placa} • Doca ${ultima.doca} • ${ultima.motorista}`;
  } else {
    if (kpiUltimaDataEl) kpiUltimaDataEl.textContent = 'Nenhuma baixa';
    if (kpiUltimaInfoEl) kpiUltimaInfoEl.textContent = 'Aguardando baixas operacionais';
  }

  // Filtro de busca no histórico
  const searchInput = document.getElementById('input-search-historico');
  const searchTerm = (searchInput ? searchInput.value : '').toLowerCase().trim();

  let filtered = [...baixas];
  if (searchTerm) {
    filtered = filtered.filter(r => {
      return (r.motorista || '').toLowerCase().includes(searchTerm) ||
             (r.placa || '').toLowerCase().includes(searchTerm) ||
             (r.rota || '').toLowerCase().includes(searchTerm) ||
             (r.doca || '').toLowerCase().includes(searchTerm) ||
             (r.isca || '').toLowerCase().includes(searchTerm) ||
             (r.dataHoraBaixa || '').toLowerCase().includes(searchTerm);
    });
  }

  if (countEl) countEl.textContent = `Mostrando ${filtered.length} de ${baixas.length} registros baixados`;
  if (footerCountEl) footerCountEl.textContent = baixas.length;

  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="11">
          <div class="empty-history-notice">
            <i class="fa-solid fa-box-open"></i>
            <p><strong>Nenhuma baixa encontrada ${searchTerm ? 'para a busca informada' : 'nesta unidade'}.</strong></p>
            <span style="font-size:0.8rem; color:var(--text-muted);">As viagens finalizadas com confirmação de isca serão arquivadas e listadas aqui permanentemente com data e hora.</span>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(r => {
    const initials = getInitials(r.motorista);
    const durationMin = (r.inicio && r.fim) ? calcDurationMinutes(r.inicio, r.fim) : '-';
    const iscaCode = (r.isca || '').trim().toUpperCase();
    const isSemIsca = iscaCode === '' || iscaCode === 'S/ISCA';
    const iscaBadge = isSemIsca
      ? `<span class="isca-none">S/ISCA</span>`
      : `<span style="font-family:monospace; font-weight:bold; color:#10b981;"><i class="fa-solid fa-satellite-dish"></i> #${escapeHtml(r.isca)}</span> <span class="retorno-btn-toggle status-ok" style="padding:2px 6px; font-size:0.7rem; pointer-events:none;"><i class="fa-solid fa-check"></i> RETORNADA</span>`;

    return `
      <tr>
        <td>
          <span class="badge-data-baixa">
            <i class="fa-regular fa-calendar-check"></i>
            ${escapeHtml(r.dataHoraBaixa || `${hojeStr} às 14:00`)}
          </span>
        </td>
        <td class="td-rota"><strong>${escapeHtml(r.rota)}</strong></td>
        <td class="td-motorista">
          <div class="motorista-cell-inner">
            <span class="driver-initials">${initials}</span>
            <span>${escapeHtml(r.motorista)}</span>
          </div>
        </td>
        <td class="td-placa"><span style="font-family:monospace; font-weight:800; letter-spacing:0.5px;">${escapeHtml(r.placa)}</span></td>
        <td class="td-doca"><span style="font-weight:700; color:#2563eb;">Doca ${escapeHtml(r.doca)}</span></td>
        <td class="td-conferente">${escapeHtml(r.conferente || '-')}</td>
        <td class="td-inicio">${escapeHtml(r.inicio || '-')}</td>
        <td class="td-fim">${escapeHtml(r.fim || '-')}</td>
        <td class="td-tempo">
          <span class="duration-badge duration-fast"><i class="fa-regular fa-clock"></i> ${durationMin} min</span>
        </td>
        <td class="td-isca">${iscaBadge}</td>
        <td class="td-acoes" style="text-align: center;">
          <button class="btn-reverter-baixa" onclick="reverterBaixaIsca('${r.id}')" title="Restaurar para a Grade Operacional Ativa">
            <i class="fa-solid fa-arrow-rotate-left"></i> Reverter
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function exportarHistoricoExcel() {
  const allScoped = getScopedData();
  const baixas = allScoped.filter(r => r.arquivado || r.retornoIsca === 'OK');
  
  if (baixas.length === 0) {
    alert("Nenhum registro de baixa disponível para exportação nesta unidade.");
    return;
  }

  const hojeStr = new Date().toLocaleDateString('pt-BR');
  const dateStr = new Date().toISOString().slice(0, 10);
  const unitStr = state.activeUnidade.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `Historico_Baixas_BBM_${unitStr}_${dateStr}`;

  const dataExport = baixas.map(r => {
    const tempoMin = (r.inicio && r.fim) ? calcDurationMinutes(r.inicio, r.fim) : '';
    const dataBaixa = r.dataHoraBaixa || `${hojeStr} às ${r.fim || '14:00'}`;
    return {
      "Data e Horário da Baixa": dataBaixa,
      "Unidade": r.unidade || state.activeUnidade,
      "Rota": r.rota || '',
      "Motorista": r.motorista || '',
      "Placa": r.placa || '',
      "Doca": r.doca || '',
      "Conferente": r.conferente || '',
      "Início Operação": r.inicio || '',
      "Término Operação": r.fim || '',
      "Tempo Total em Doca (min)": tempoMin !== '' ? tempoMin : '-',
      "Código Isca": r.isca || 'S/ISCA',
      "Status Devolução Isca": "RETORNADA OK",
      "Status do Registro": "BAIXA CONCLUÍDA"
    };
  });

  if (typeof XLSX !== 'undefined') {
    const ws = XLSX.utils.json_to_sheet(dataExport);
    ws['!cols'] = [
      { wch: 24 }, // Data da Baixa
      { wch: 22 }, // Unidade
      { wch: 8 },  // Rota
      { wch: 34 }, // Motorista
      { wch: 12 }, // Placa
      { wch: 8 },  // Doca
      { wch: 16 }, // Conferente
      { wch: 16 }, // Início
      { wch: 18 }, // Término
      { wch: 26 }, // Tempo Total em Doca (min)
      { wch: 14 }, // Código Isca
      { wch: 22 }, // Status Devolução
      { wch: 20 }  // Status Registro
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Histórico de Baixas");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  } else {
    // Fallback CSV
    const headers = Object.keys(dataExport[0]);
    const rows = dataExport.map(row => headers.map(h => `"${String(row[h] || '').replace(/"/g, '""')}"`).join(';'));
    const csvContent = "\uFEFF" + headers.join(';') + "\r\n" + rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

window.solicitarConfirmacaoIsca = function(id) {
  const rec = state.registros.find(r => r.id === id);
  if (!rec) return;

  state.confirmingIscaId = id;
  const numEl = document.getElementById('confirm-isca-numero');
  const motEl = document.getElementById('confirm-isca-motorista');
  const plaEl = document.getElementById('confirm-isca-placa');
  const rotEl = document.getElementById('confirm-isca-rota');
  const docEl = document.getElementById('confirm-isca-doca');
  const horEl = document.getElementById('confirm-isca-hora');

  if (numEl) numEl.textContent = rec.isca || 'S/N';
  if (motEl) motEl.textContent = rec.motorista || '-';
  if (plaEl) plaEl.textContent = rec.placa || '-';
  if (rotEl) rotEl.textContent = rec.rota || '-';
  if (docEl) docEl.textContent = `Doca ${rec.doca || '-'}`;

  const now = new Date();
  const dia = String(now.getDate()).padStart(2, '0');
  const mes = String(now.getMonth() + 1).padStart(2, '0');
  const ano = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  if (horEl) horEl.textContent = `${dia}/${mes}/${ano} às ${hh}:${mm}`;

  const modal = document.getElementById('modal-confirm-isca');
  if (modal) modal.style.display = 'flex';
};

window.fecharModalConfirmIsca = function() {
  const modal = document.getElementById('modal-confirm-isca');
  if (modal) modal.style.display = 'none';
  state.confirmingIscaId = null;
};

window.confirmarBaixaIsca = function() {
  if (!state.confirmingIscaId) return;
  const rec = state.registros.find(r => r.id === state.confirmingIscaId);
  if (rec) {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, '0');
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const ano = now.getFullYear();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    
    rec.retornoIsca = 'OK';
    rec.arquivado = true;
    rec.dataHoraBaixa = `${dia}/${mes}/${ano} às ${hh}:${mm}`;

    // Se ainda não tinha hora fim registrada, preenche com a hora atual
    if (!rec.fim || rec.fim.trim() === '') {
      rec.fim = `${hh}:${mm}`;
    }

    saveData(rec);
    fecharModalConfirmIsca();
    renderApp();
  }
};

window.reverterBaixaIsca = function(id) {
  const rec = state.registros.find(r => r.id === id);
  if (!rec) return;

  if (confirm(`Deseja reverter a baixa da isca #${rec.isca} (Placa ${rec.placa}) e restaurar o veículo para a grade operacional ativa?`)) {
    rec.retornoIsca = 'PENDENTE';
    rec.arquivado = false;
    rec.dataHoraBaixa = null;
    saveData(rec);
    renderApp();
  }
};


