/**
 * Login e Autenticação Corporativa — BBM Logística
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const inputIdentifier = document.getElementById('input-identifier');
  const inputPassword = document.getElementById('input-password');
  const checkRemember = document.getElementById('check-remember');
  const btnSubmit = document.getElementById('btn-submit');
  const btnSpinner = document.getElementById('btn-spinner');
  const authAlert = document.getElementById('auth-alert');
  const authAlertMsg = document.getElementById('auth-alert-msg');
  const btnTogglePassword = document.getElementById('btn-toggle-password');
  const pwdIcon = document.getElementById('pwd-icon');

  // Modal de Esqueci a Senha
  const linkForgot = document.getElementById('link-forgot-password');
  const modalForgot = document.getElementById('modal-forgot');
  const btnCloseForgot = document.getElementById('btn-close-forgot');
  const btnOkForgot = document.getElementById('btn-ok-forgot');

  // Verifica se o usuário já possui sessão válida ativa
  checkActiveSession();

  // Alternador de Visibilidade de Senha
  btnTogglePassword.addEventListener('click', () => {
    const isPassword = inputPassword.type === 'password';
    inputPassword.type = isPassword ? 'text' : 'password';
    pwdIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
    if (window.lucide) lucide.createIcons();
  });

  // Modal Esqueci Senha
  linkForgot.addEventListener('click', (e) => {
    e.preventDefault();
    modalForgot.style.display = 'flex';
    if (window.lucide) lucide.createIcons();
  });

  const fecharModalForgot = () => { modalForgot.style.display = 'none'; };
  btnCloseForgot.addEventListener('click', fecharModalForgot);
  btnOkForgot.addEventListener('click', fecharModalForgot);

  modalForgot.addEventListener('click', (e) => {
    if (e.target === modalForgot) fecharModalForgot();
  });

  if (window.lucide) lucide.createIcons();

  // Acesso Rápido para Demonstração / Teste
  const demoButtons = document.querySelectorAll('.btn-demo-profile');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      if (role === 'dialogo' || role === 'admin') {
        inputIdentifier.value = 'Dialogo';
        inputPassword.value = '123456';
      } else {
        inputIdentifier.value = 'Brasilia';
        inputPassword.value = '123456';
      }
      hideAlert();
      inputPassword.focus();
    });
  });

  // Envio do Formulário de Login
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const identifier = inputIdentifier.value.trim();
    const password = inputPassword.value;
    const rememberMe = checkRemember.checked;

    if (!identifier || !password) {
      showAlert('Por favor, preencha a matrícula/e-mail e a senha.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password, rememberMe })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showAlert('Autenticado com sucesso! Redirecionando...', 'success');
        
        // Guarda cache local de conveniência
        localStorage.setItem('bbm_logged_user', JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = '/index.html';
        }, 600);
      } else {
        showAlert(data.message || 'Credenciais inválidas. Verifique os dados digitados.');
      }
    } catch (err) {
      console.error('Erro na requisição de login:', err);
      showAlert('Não foi possível conectar ao servidor. Verifique se o servidor está ativo.');
    } finally {
      setLoading(false);
    }
  });

  // Helpers
  function showAlert(message, type = 'error') {
    authAlertMsg.textContent = message;
    authAlert.className = `auth-alert ${type}`;
    authAlert.style.display = 'flex';
  }

  function hideAlert() {
    authAlert.style.display = 'none';
  }

  function setLoading(loading) {
    btnSubmit.disabled = loading;
    btnSpinner.style.display = loading ? 'block' : 'none';
    const btnArrow = btnSubmit.querySelector('.btn-arrow');
    const btnText = btnSubmit.querySelector('.btn-text');
    if (btnArrow) btnArrow.style.display = loading ? 'none' : 'inline-block';
    if (btnText) btnText.textContent = loading ? 'Autenticando...' : 'Entrar no Sistema';
  }

  async function checkActiveSession() {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          window.location.href = '/index.html';
        }
      }
    } catch (e) {
      // Servidor pode estar em modo estático ou offline
    }
  }
});
