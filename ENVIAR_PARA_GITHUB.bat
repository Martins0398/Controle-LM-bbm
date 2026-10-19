@echo off
title Enviar Controle de Docas para o GitHub
color 0A
echo ================================================================
echo       ENVIANDO ARQUIVOS PARA O GITHUB (Controle-LM-bbm)
echo ================================================================
echo.
cd /d "%~dp0"

echo 1. Verificando alteracoes...
git add .
git commit -m "Atualizacao do sistema de docas BBM" >nul 2>&1

echo 2. Enviando para https://github.com/Martins0398/Controle-LM-bbm.git...
echo (Se for a primeira vez, o Windows abrira uma janela para autorizar o GitHub)
echo.

git push -u origin main

echo.
echo ================================================================
echo Finalizado! Pressione qualquer tecla para fechar.
echo ================================================================
pause
