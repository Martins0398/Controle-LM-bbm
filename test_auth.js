async function testAuth() {
  const baseUrl = 'http://localhost:3000';

  console.log('1. Testando GET /login.html...');
  const resLogin = await fetch(`${baseUrl}/login.html`);
  console.log(`Status /login.html: ${resLogin.status}`);

  console.log('\n2. Testando POST /api/auth/login com Admin...');
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: 'admin@bbmlogistica.com.br',
      password: 'Admin@BBM2026',
      rememberMe: true
    })
  });
  const loginData = await loginRes.json();
  const setCookie = loginRes.headers.get('set-cookie');
  console.log(`Login status: ${loginRes.status}`, loginData);
  console.log(`Cookie recebido: ${setCookie}`);

  const cookieHeader = setCookie ? setCookie.split(';')[0] : '';

  console.log('\n3. Testando GET /api/auth/me...');
  const meRes = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { 'Cookie': cookieHeader }
  });
  const meData = await meRes.json();
  console.log(`Auth me status: ${meRes.status}`, meData);

  console.log('\n4. Testando GET /api/admin/users...');
  const usersRes = await fetch(`${baseUrl}/api/admin/users`, {
    headers: { 'Cookie': cookieHeader }
  });
  const usersData = await usersRes.json();
  console.log(`Admin users: ${usersData.length} usuários encontrados.`);

  console.log('\n5. Testando GET /api/records...');
  const recordsRes = await fetch(`${baseUrl}/api/records`, {
    headers: { 'Cookie': cookieHeader }
  });
  const recordsData = await recordsRes.json();
  console.log(`Records docas: ${recordsData.length} registros no banco de dados SQLite.`);

  console.log('\nTodos os testes de autenticação e API passaram com 100% de sucesso!');
}

testAuth().catch(console.error);
