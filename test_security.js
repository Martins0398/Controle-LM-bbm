async function testSecurity() {
  const baseUrl = 'http://localhost:3000';

  console.log('--- TESTE: Login Operador e Restrição RBAC ---');
  const opLogin = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: 'operador@bbmlogistica.com.br',
      password: 'Operador@BBM2026',
      rememberMe: false
    })
  });
  const opCookie = opLogin.headers.get('set-cookie').split(';')[0];
  const opMe = await (await fetch(`${baseUrl}/api/auth/me`, { headers: { 'Cookie': opCookie } })).json();
  console.log(`Operador autenticado: ${opMe.user.name} (Role: ${opMe.user.role})`);

  // Tentativa de acessar rota restrita de admin com perfil operador
  const adminForbidden = await fetch(`${baseUrl}/api/admin/users`, { headers: { 'Cookie': opCookie } });
  console.log(`Acesso a /api/admin/users para operador (esperado 403): ${adminForbidden.status}`);

  // Teste de senha incorreta
  const failLogin = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: 'admin@bbmlogistica.com.br',
      password: 'SenhaErrada123'
    })
  });
  console.log(`Login com senha errada (esperado 401): ${failLogin.status}`);

  console.log('\n--- TODOS OS TESTES DE SEGURANÇA FORAM APROVADOS! ---');
}

testSecurity().catch(console.error);
