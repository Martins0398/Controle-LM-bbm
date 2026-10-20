/**
 * Servidor Backend Corporativo — Controle Operacional de Docas & Dashboard
 * BBM Logística
 * 
 * Tecnologias nativas: Node.js 24 (node:http, node:crypto, node:sqlite)
 * Zero dependências externas
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'database.sqlite');
const PUBLIC_DIR = __dirname;

// Inicializa Banco SQLite
const db = new DatabaseSync(DB_PATH);

// Criação de Tabelas
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    matricula TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'operador',
    unidade TEXT NOT NULL DEFAULT 'CD São Paulo',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS login_attempts (
    identifier TEXT PRIMARY KEY,
    attempts INTEGER NOT NULL DEFAULT 1,
    last_attempt INTEGER NOT NULL,
    locked_until INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS dock_records (
    id TEXT PRIMARY KEY,
    unidade TEXT NOT NULL,
    rota TEXT,
    motorista TEXT,
    placa TEXT,
    doca TEXT,
    conferente TEXT,
    inicio TEXT,
    fim TEXT,
    isca TEXT,
    retornoIsca TEXT,
    placaLiberada INTEGER DEFAULT 0,
    destaqueLinha INTEGER DEFAULT 0,
    obs TEXT,
    arquivado INTEGER DEFAULT 0,
    dataHoraBaixa TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_by TEXT
  );

  CREATE TABLE IF NOT EXISTS units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
  );
`);

// Migração segura para tabelas já existentes
try { db.exec("ALTER TABLE dock_records ADD COLUMN arquivado INTEGER DEFAULT 0;"); } catch(e) {}
try { db.exec("ALTER TABLE dock_records ADD COLUMN dataHoraBaixa TEXT;"); } catch(e) {}
try {
  db.exec("UPDATE dock_records SET arquivado = 1 WHERE retornoIsca = 'OK';");
  db.exec("UPDATE dock_records SET dataHoraBaixa = '16/10/2026 às ' || COALESCE(fim, '14:00') WHERE retornoIsca = 'OK' AND (dataHoraBaixa IS NULL OR dataHoraBaixa = '');");
} catch(e) {}

// Funções Criptográficas Seguras
function hashPassword(password, salt) {
  if (!salt) salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const check = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(check, 'hex'), Buffer.from(hash, 'hex'));
}

// Seed Inicial de Usuários e Unidades
function seedInitialData() {
  // Garante a tabela de unidades com Brasília
  const defaultUnits = [
    "CD São Paulo",
    "CD Curitiba",
    "CD Rio de Janeiro",
    "CD Belo Horizonte",
    "CD Porto Alegre",
    "Brasília"
  ];
  const stmtUnit = db.prepare('INSERT OR IGNORE INTO units (name) VALUES (?)');
  defaultUnits.forEach(u => stmtUnit.run(u));

  // Migração e garantia dos logins solicitados:
  // 1. Login Master: Dialogo / 123456 (Acesso a todas as unidades)
  const masterPass = hashPassword('123456');
  db.prepare(`
    INSERT INTO users (id, name, email, matricula, password_hash, salt, role, unidade)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(matricula) DO UPDATE SET
      name = excluded.name,
      email = excluded.email,
      password_hash = excluded.password_hash,
      salt = excluded.salt,
      role = excluded.role,
      unidade = excluded.unidade
  `).run(
    'usr-master-dialogo',
    'Diálogo Logística (Master)',
    'dialogo@bbmlogistica.com.br',
    'Dialogo',
    masterPass.hash,
    masterPass.salt,
    'admin',
    'todas'
  );

  // 2. Login Unidade: Brasilia / 123456 (Acesso exclusivo à unidade Brasília)
  const bsbPass = hashPassword('123456');
  db.prepare(`
    INSERT INTO users (id, name, email, matricula, password_hash, salt, role, unidade)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(matricula) DO UPDATE SET
      name = excluded.name,
      email = excluded.email,
      password_hash = excluded.password_hash,
      salt = excluded.salt,
      role = excluded.role,
      unidade = excluded.unidade
  `).run(
    'usr-unit-brasilia',
    'Unidade Brasília',
    'brasilia@bbmlogistica.com.br',
    'Brasilia',
    bsbPass.hash,
    bsbPass.salt,
    'operador',
    'Brasília'
  );

  // Seed de Registros de Docas (Se vazio)
  const recCount = db.prepare('SELECT count(*) as count FROM dock_records').get().count;
  if (recCount === 0) {
    const defaultRecords = [
      { id: "rec-1", unidade: "CD São Paulo", rota: "1A", motorista: "PATRICIA DE CARVALHO SOUZA DOS ANJOS", placa: "JDP0A37", doca: "8", conferente: "JOÃO", inicio: "08:16", fim: "08:42", isca: "5583", retornoIsca: "PENDENTE", placaLiberada: 0, destaqueLinha: 0, obs: "" },
      { id: "rec-2", unidade: "CD São Paulo", rota: "1A", motorista: "ANTONIO SOUZA NETO", placa: "APG3680", doca: "11", conferente: "LUANA", inicio: "07:00", fim: "07:45", isca: "8774", retornoIsca: "OK", placaLiberada: 0, destaqueLinha: 0, obs: "" },
      { id: "rec-3", unidade: "CD São Paulo", rota: "1A", motorista: "JOÃO GILBERTO ALVES DA SILVA", placa: "HDH5G43", doca: "8", conferente: "JOÃO", inicio: "07:40", fim: "08:07", isca: "4557", retornoIsca: "PENDENTE", placaLiberada: 1, destaqueLinha: 0, obs: "" },
      { id: "rec-4", unidade: "CD São Paulo", rota: "2A", motorista: "MAICK DE SOUSA CAVALCANTE", placa: "QNF6G09", doca: "12", conferente: "NELSON", inicio: "07:22", fim: "07:31", isca: "785", retornoIsca: "PENDENTE", placaLiberada: 1, destaqueLinha: 0, obs: "" },
      { id: "rec-5", unidade: "CD São Paulo", rota: "2A/B", motorista: "BRUNO BORGES SADDE", placa: "LLV1330", doca: "12", conferente: "NELSON", inicio: "08:29", fim: "08:47", isca: "S/ISCA", retornoIsca: "S/ISCA", placaLiberada: 0, destaqueLinha: 0, obs: "" },
      { id: "rec-6", unidade: "CD São Paulo", rota: "2B", motorista: "LUCIO FLAVIO OLIVEIRA PIRES", placa: "JHX5D08", doca: "8", conferente: "JOÃO", inicio: "07:15", fim: "07:24", isca: "1851", retornoIsca: "OK", placaLiberada: 1, destaqueLinha: 0, obs: "" },
      { id: "rec-7", unidade: "CD São Paulo", rota: "3A", motorista: "WESLEY GOMES PEREIRA", placa: "QIT1A48", doca: "12", conferente: "NELSON", inicio: "10:04", fim: "10:34", isca: "400", retornoIsca: "PENDENTE", placaLiberada: 1, destaqueLinha: 0, obs: "" },
      { id: "rec-8", unidade: "CD São Paulo", rota: "3B", motorista: "NILTON OLIVEIRA COSTA", placa: "JIV1456", doca: "10", conferente: "LUANA", inicio: "08:35", fim: "09:25", isca: "9718", retornoIsca: "PENDENTE", placaLiberada: 0, destaqueLinha: 0, obs: "" },
      { id: "rec-9", unidade: "CD São Paulo", rota: "3C", motorista: "VAGNER SOUSA OLIVEIRA", placa: "NLJ3A13", doca: "10", conferente: "CARLOS", inicio: "08:53", fim: "09:27", isca: "9167", retornoIsca: "PENDENTE", placaLiberada: 0, destaqueLinha: 1, obs: "" },
      { id: "rec-10", unidade: "CD São Paulo", rota: "3D", motorista: "JOSÉ ARAUJO FREIRE", placa: "JHH8E73", doca: "11", conferente: "JULIA", inicio: "07:00", fim: "07:28", isca: "8742", retornoIsca: "OK", placaLiberada: 0, destaqueLinha: 0, obs: "", arquivado: 1, dataHoraBaixa: "16/10/2026 às 07:28" }
    ];

    const insertStmt = db.prepare(`
      INSERT INTO dock_records (id, unidade, rota, motorista, placa, doca, conferente, inicio, fim, isca, retornoIsca, placaLiberada, destaqueLinha, obs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    defaultRecords.forEach(r => {
      insertStmt.run(r.id, r.unidade, r.rota, r.motorista, r.placa, r.doca, r.conferente, r.inicio, r.fim, r.isca, r.retornoIsca, r.placaLiberada, r.destaqueLinha, r.obs);
    });
  }

  // Garante registros de demonstração para a filial Brasília
  const bsbCount = db.prepare('SELECT count(*) as count FROM dock_records WHERE unidade = ?').get('Brasília').count;
  if (bsbCount === 0) {
    const insertStmt = db.prepare(`
      INSERT INTO dock_records (id, unidade, rota, motorista, placa, doca, conferente, inicio, fim, isca, retornoIsca, placaLiberada, destaqueLinha, obs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const bsbRecords = [
      { id: "bsb-rec-1", unidade: "Brasília", rota: "BSB-01", motorista: "CARLOS HENRIQUE VIEIRA", placa: "JGK4E22", doca: "1", conferente: "MARCOS", inicio: "07:30", fim: "08:15", isca: "9821", retornoIsca: "PENDENTE", placaLiberada: 1, destaqueLinha: 0, obs: "Rota prioritária DF" },
      { id: "bsb-rec-2", unidade: "Brasília", rota: "BSB-02", motorista: "FERNANDO TAVARES LIMA", placa: "PAE8820", doca: "2", conferente: "LUCAS", inicio: "08:00", fim: "", isca: "3340", retornoIsca: "PENDENTE", placaLiberada: 0, destaqueLinha: 0, obs: "Em carregamento na doca 2" },
      { id: "bsb-rec-3", unidade: "Brasília", rota: "BSB-03", motorista: "RAFAEL SOUSA MENDES", placa: "RCN3B15", doca: "3", conferente: "MARCOS", inicio: "06:45", fim: "07:20", isca: "5512", retornoIsca: "OK", placaLiberada: 0, destaqueLinha: 0, obs: "Baixa realizada com sucesso" }
    ];
    bsbRecords.forEach(r => {
      insertStmt.run(r.id, r.unidade, r.rota, r.motorista, r.placa, r.doca, r.conferente, r.inicio, r.fim, r.isca, r.retornoIsca, r.placaLiberada, r.destaqueLinha, r.obs);
    });
  }
}

seedInitialData();

// Helper de Leitura do Body da Requisição
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 2 * 1024 * 1024) { // Limite 2MB
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// Helpers de Cookies e Autenticação
function getSessionToken(req) {
  const cookies = req.headers.cookie;
  if (!cookies) return null;
  const match = cookies.split(';').find(c => c.trim().startsWith('bbm_auth_token='));
  if (!match) return null;
  return match.split('=')[1].trim();
}

function getAuthenticatedUser(req) {
  const token = getSessionToken(req);
  if (!token) return null;

  const now = Date.now();
  const session = db.prepare(`
    SELECT s.token, s.expires_at, u.id, u.name, u.email, u.matricula, u.role, u.unidade
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > ?
  `).get(token, now);

  return session || null;
}

function sendJson(res, statusCode, data, headers = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers
  });
  res.end(JSON.stringify(data));
}

// MIME Types para arquivos estáticos
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

// Servidor HTTP
const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = urlObj.pathname;
  const method = req.method;

  // ROTA 1: Página Inicial (Redirecionamento Inteligente)
  if (pathname === '/' || pathname === '') {
    const user = getAuthenticatedUser(req);
    if (!user) {
      res.writeHead(302, { 'Location': '/login.html' });
      return res.end();
    } else {
      res.writeHead(302, { 'Location': '/index.html' });
      return res.end();
    }
  }

  // ROTA 2: index.html (Exige autenticação)
  if (pathname === '/index.html') {
    const user = getAuthenticatedUser(req);
    if (!user) {
      res.writeHead(302, { 'Location': '/login.html' });
      return res.end();
    }
  }

  // ROTA 3: Página de Login
  if (pathname === '/login' || pathname === '/login.html') {
    const user = getAuthenticatedUser(req);
    if (user) {
      res.writeHead(302, { 'Location': '/index.html' });
      return res.end();
    }
    const loginFilePath = path.join(PUBLIC_DIR, 'login.html');
    if (fs.existsSync(loginFilePath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(loginFilePath).pipe(res);
    }
  }

  // ==========================================
  // APIS DE AUTENTICAÇÃO
  // ==========================================

  // POST /api/auth/login
  if (pathname === '/api/auth/login' && method === 'POST') {
    try {
      const { identifier, password, rememberMe } = await parseBody(req);

      if (!identifier || !password) {
        return sendJson(res, 400, { success: false, message: 'Informe a matrícula/e-mail e a senha.' });
      }

      const idClean = identifier.trim().toLowerCase();
      const now = Date.now();

      // Verificação de Tentativas / Força Bruta
      const attempt = db.prepare('SELECT * FROM login_attempts WHERE identifier = ?').get(idClean);
      if (attempt && attempt.locked_until > now) {
        const remainingMinutes = Math.ceil((attempt.locked_until - now) / 60000);
        return sendJson(res, 429, {
          success: false,
          message: `Conta temporariamente bloqueada por segurança. Tente novamente em ${remainingMinutes} minuto(s).`
        });
      }

      // Busca Usuário por e-mail ou matrícula
      const user = db.prepare(`
        SELECT * FROM users 
        WHERE LOWER(email) = ? OR LOWER(matricula) = ?
      `).get(idClean, idClean);

      if (!user || !verifyPassword(password, user.password_hash, user.salt)) {
        // Registra falha
        const currentAttempts = attempt ? attempt.attempts + 1 : 1;
        const lockUntil = currentAttempts >= 5 ? now + (10 * 60 * 1000) : 0; // Bloqueio de 10 min após 5 falhas
        
        db.prepare(`
          INSERT INTO login_attempts (identifier, attempts, last_attempt, locked_until)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(identifier) DO UPDATE SET
            attempts = excluded.attempts,
            last_attempt = excluded.last_attempt,
            locked_until = excluded.locked_until
        `).run(idClean, currentAttempts, now, lockUntil);

        return sendJson(res, 401, {
          success: false,
          message: 'Credenciais inválidas. Verifique seu e-mail/matrícula e senha.'
        });
      }

      // Sucesso: Limpa tentativas anteriores
      db.prepare('DELETE FROM login_attempts WHERE identifier = ?').run(idClean);

      // Cria sessão (7 dias se rememberMe, senão 24h)
      const token = crypto.randomBytes(32).toString('hex');
      const duration = rememberMe ? (7 * 24 * 60 * 60 * 1000) : (24 * 60 * 60 * 1000);
      const expiresAt = now + duration;

      db.prepare(`
        INSERT INTO sessions (token, user_id, expires_at)
        VALUES (?, ?, ?)
      `).run(token, user.id, expiresAt);

      const cookieHeader = `bbm_auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${duration / 1000}`;

      return sendJson(res, 200, {
        success: true,
        message: 'Autenticação realizada com sucesso!',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          matricula: user.matricula,
          role: user.role,
          unidade: user.unidade
        }
      }, { 'Set-Cookie': cookieHeader });

    } catch (err) {
      console.error('Erro no login:', err);
      return sendJson(res, 500, { success: false, message: 'Erro interno ao processar login.' });
    }
  }

  // GET /logout (Encerramento instantâneo de sessão)
  if (pathname === '/logout') {
    const token = getSessionToken(req);
    if (token) {
      db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    }
    const expiredCookie = `bbm_auth_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
    res.writeHead(302, {
      'Location': '/login.html',
      'Set-Cookie': expiredCookie
    });
    return res.end();
  }

  // POST /api/auth/logout
  if (pathname === '/api/auth/logout' && method === 'POST') {
    const token = getSessionToken(req);
    if (token) {
      db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    }
    const expiredCookie = `bbm_auth_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
    return sendJson(res, 200, { success: true, message: 'Sessão encerrada com sucesso.' }, { 'Set-Cookie': expiredCookie });
  }

  // GET /api/auth/me
  if (pathname === '/api/auth/me' && method === 'GET') {
    const user = getAuthenticatedUser(req);
    if (!user) {
      return sendJson(res, 401, { authenticated: false, message: 'Não autenticado' });
    }
    return sendJson(res, 200, {
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        matricula: user.matricula,
        role: user.role,
        unidade: user.unidade
      }
    });
  }

  // ==========================================
  // APIS DE REGISTROS DE DOCAS (COMPARTILHADO EM TEMPO REAL)
  // ==========================================

  // GET /api/records
  if (pathname === '/api/records' && method === 'GET') {
    const user = getAuthenticatedUser(req);
    if (!user) return sendJson(res, 401, { error: 'Acesso negado' });

    const rows = db.prepare('SELECT * FROM dock_records ORDER BY id ASC').all();
    const records = rows.map(r => ({
      ...r,
      placaLiberada: Boolean(r.placaLiberada),
      destaqueLinha: Boolean(r.destaqueLinha),
      arquivado: Boolean(r.arquivado || r.retornoIsca === 'OK')
    }));

    return sendJson(res, 200, records);
  }

  // POST /api/records (Salvar / Criar / Atualizar Registro)
  if (pathname === '/api/records' && method === 'POST') {
    const user = getAuthenticatedUser(req);
    if (!user) return sendJson(res, 401, { error: 'Acesso negado' });

    try {
      const data = await parseBody(req);
      if (!data.id) data.id = 'rec-' + Date.now();

      const stmt = db.prepare(`
        INSERT INTO dock_records (
          id, unidade, rota, motorista, placa, doca, conferente, inicio, fim, isca, retornoIsca, placaLiberada, destaqueLinha, obs, arquivado, dataHoraBaixa, updated_at, updated_by
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?
        )
        ON CONFLICT(id) DO UPDATE SET
          unidade = excluded.unidade,
          rota = excluded.rota,
          motorista = excluded.motorista,
          placa = excluded.placa,
          doca = excluded.doca,
          conferente = excluded.conferente,
          inicio = excluded.inicio,
          fim = excluded.fim,
          isca = excluded.isca,
          retornoIsca = excluded.retornoIsca,
          placaLiberada = excluded.placaLiberada,
          destaqueLinha = excluded.destaqueLinha,
          obs = excluded.obs,
          arquivado = excluded.arquivado,
          dataHoraBaixa = excluded.dataHoraBaixa,
          updated_at = CURRENT_TIMESTAMP,
          updated_by = excluded.updated_by
      `);

      stmt.run(
        data.id,
        data.unidade || 'CD São Paulo',
        data.rota || '',
        data.motorista || '',
        data.placa || '',
        data.doca || '',
        data.conferente || '',
        data.inicio || '',
        data.fim || '',
        data.isca || 'S/ISCA',
        data.retornoIsca || 'S/ISCA',
        data.placaLiberada ? 1 : 0,
        data.destaqueLinha ? 1 : 0,
        data.obs || '',
        data.arquivado ? 1 : 0,
        data.dataHoraBaixa || null,
        user.name
      );

      return sendJson(res, 200, { success: true, record: data });
    } catch (err) {
      console.error('Erro ao salvar registro:', err);
      return sendJson(res, 500, { error: 'Falha ao salvar no banco de dados' });
    }
  }

  // DELETE /api/records/:id
  if (pathname.startsWith('/api/records/') && method === 'DELETE') {
    const user = getAuthenticatedUser(req);
    if (!user) return sendJson(res, 401, { error: 'Acesso negado' });

    const id = pathname.split('/').pop();
    db.prepare('DELETE FROM dock_records WHERE id = ?').run(id);
    return sendJson(res, 200, { success: true, message: 'Registro excluído' });
  }

  // GET /api/units
  if (pathname === '/api/units' && method === 'GET') {
    const units = db.prepare('SELECT name FROM units ORDER BY id ASC').all().map(u => u.name);
    return sendJson(res, 200, units);
  }

  // POST /api/units
  if (pathname === '/api/units' && method === 'POST') {
    const user = getAuthenticatedUser(req);
    if (!user) return sendJson(res, 401, { error: 'Acesso negado' });

    try {
      const { name } = await parseBody(req);
      if (!name || !name.trim()) return sendJson(res, 400, { error: 'Nome de unidade inválido' });
      db.prepare('INSERT OR IGNORE INTO units (name) VALUES (?)').run(name.trim());
      return sendJson(res, 200, { success: true });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // ==========================================
  // APIS ADMINISTRATIVAS (GESTÃO DE USUÁRIOS)
  // ==========================================

  // GET /api/admin/users
  if (pathname === '/api/admin/users' && method === 'GET') {
    const user = getAuthenticatedUser(req);
    if (!user || user.role !== 'admin') {
      return sendJson(res, 403, { error: 'Acesso restrito a administradores' });
    }
    const users = db.prepare('SELECT id, name, email, matricula, role, unidade, created_at FROM users ORDER BY created_at DESC').all();
    return sendJson(res, 200, users);
  }

  // POST /api/admin/users (Cadastrar novo usuário com senha segura)
  if (pathname === '/api/admin/users' && method === 'POST') {
    const user = getAuthenticatedUser(req);
    if (!user || user.role !== 'admin') {
      return sendJson(res, 403, { error: 'Acesso restrito a administradores' });
    }

    try {
      const { name, email, matricula, password, role, unidade } = await parseBody(req);
      if (!name || !matricula || !password) {
        return sendJson(res, 400, { error: 'Nome, Login/Matrícula e Senha são obrigatórios.' });
      }

      const loginClean = matricula.trim();
      const userEmail = (email && email.trim()) ? email.trim().toLowerCase() : `${loginClean.toLowerCase()}@bbmlogistica.com.br`;

      const { hash, salt } = hashPassword(password);
      const newId = 'usr-' + Date.now();

      db.prepare(`
        INSERT INTO users (id, name, email, matricula, password_hash, salt, role, unidade)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        newId,
        name.trim(),
        userEmail,
        loginClean,
        hash,
        salt,
        role || 'operador',
        unidade || 'todas'
      );

      return sendJson(res, 201, { success: true, message: 'Usuário cadastrado com sucesso!' });
    } catch (err) {
      if (err.message && err.message.includes('UNIQUE constraint')) {
        return sendJson(res, 409, { error: 'Login ou E-mail já cadastrado no sistema.' });
      }
      return sendJson(res, 500, { error: 'Erro ao cadastrar usuário: ' + err.message });
    }
  }

  // DELETE /api/admin/users/:id (Excluir usuário)
  if (pathname.startsWith('/api/admin/users/') && method === 'DELETE') {
    const user = getAuthenticatedUser(req);
    if (!user || user.role !== 'admin') {
      return sendJson(res, 403, { error: 'Acesso restrito a administradores' });
    }

    const targetId = pathname.split('/').pop();
    if (targetId === user.id) {
      return sendJson(res, 400, { error: 'Você não pode excluir o usuário com o qual está atualmente conectado.' });
    }

    db.prepare('DELETE FROM users WHERE id = ?').run(targetId);
    return sendJson(res, 200, { success: true, message: 'Usuário excluído com sucesso.' });
  }

  // ==========================================
  // SERVINDO ARQUIVOS ESTÁTICOS
  // ==========================================
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  // Se for diretório (como a raiz '/'), resolve para index.html
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch (e) {}

  // Protege diretório
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Acesso Negado');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Se não encontrou o arquivo, serve a tela de login como fallback seguro
      const fallback = path.join(PUBLIC_DIR, 'login.html');
      if (fs.existsSync(fallback)) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return fs.createReadStream(fallback).pipe(res);
      }
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Arquivo não encontrado');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n================================================================`);
  console.log(`Controle Operacional de Docas & Dashboard — BBM Logística`);
  console.log(`Servidor Ativo em: http://localhost:${PORT}`);
  console.log(`Acesso ao Login: http://localhost:${PORT}/login.html`);
  console.log(`================================================================\n`);
});
