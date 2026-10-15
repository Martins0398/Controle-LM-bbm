@echo off
title Controle de Docas - BBM Logistica
color 0B
echo ================================================================
echo    INICIANDO CONTROLE OPERACIONAL DE DOCAS - BBM LOGISTICA
echo ================================================================
echo.
echo Iniciando o servidor Node.js com banco de dados SQLite...
echo.

cd /d "%~dp0"
start "" http://localhost:3000
node server.js
pause
