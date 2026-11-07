# HorseCup Android

Отдельное приложение Android 8.0+ (`kz.tomorrowschool.horsecup`) с собственной launcher-иконкой TS. Это APK, а не ярлык Chrome. Загружает только HTTPS-игру `https://horsecup-daniella.onrender.com/` внутри WebView. Внешние HTTPS-ссылки открываются в выбранном пользователем браузере.

Включены системные кнопки копирования номера и отправки ссылки на комнату. Поддерживаются ссылки-приглашения с `?room=123456`. При первом открытии с холодным сервером может потребоваться ожидание. Нужен интернет и актуальный Android System WebView.

Единственное разрешение: INTERNET. Нет интерфейса JavaScript→Java, доступа к локальным файлам или игнорирования ошибок TLS. Подпись APK проверяется `apksigner verify`.

## Сборка

Установите JDK 17 и официальные Android SDK Platform 35 / Build Tools 35.0.0. В переменной окружения `HORSECUP_SIGNING_PASSWORD` укажите пароль приватного ключа. Ключи, пароли и промежуточные файлы в репозиторий не включаются.

```sh
bash build.sh /path/to/android.jar /path/to/build-tools/35.0.0 /private/horsecup.p12
```

Псевдоним ключа: `horsecup`. Результат: `../downloads/HorseCup-1.0.apk`.

Повторные Android-обновления должны быть подписаны тем же ключом и иметь увеличенный `versionCode` в AndroidManifest.xml. Проверена сборка, подпись и содержимое APK. Установка и запуск на реальном Android-устройстве в среде сборки не выполнялись.
