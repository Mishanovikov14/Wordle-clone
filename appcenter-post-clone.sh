#!/usr/bin/env bash
# Остановить выполнение при ошибке
set -e
# Включить логирование команд
set -x

# Установка зависимостей
npm install

# Сборка проекта
cd android
./gradlew assembleRelease

# Перемещение APK в директорию, где App Center ожидает его найти
mkdir -p android/app/build/outputs/apk/release/
mv app/build/outputs/apk/release/app-release.apk android/app/build/outputs/apk/release/
