# html-hello-world

Добавьте заголовок первого уровня на [html](index.html) станичку c текстом "Hello, World!"

Прежде всего вам нужно запустить задачу `live-server: html-hello-world`. Делается это как обычно используя `Ctrl/Command + P` затем `> Run Task` затем `live-server: html-hello-world`

![image](https://user-images.githubusercontent.com/32310771/230052067-46dc9735-8434-4bd5-a9f3-14a75b162a27.png)

Эта задача откроет файл `index.html` в браузере и будет автоматически обновлять страницу при изменении файла `index.html` для вашего удобства.

Для того, чтобы остановить задачу нажмите `Ctrl + С` в терминале:

![image](https://user-images.githubusercontent.com/32310771/230053648-c96ede04-e583-4472-832b-280f0c9466c3.png)

Для запуска тестов запустите задачу `test: html-hello-world`

После того как тесты пройдут успешно отправьте задачу используя искрипт `submit: html-hello-world`

> На данный момент вы всегда должны отсанавливать задачу `live-server: html-hello-world` перед тем как запустить задачу `test: html-hello-world`. Т.е. правило такое: в каждый момент времени должна быть запущена только одна задача. Если вы разрабатываете - у вас запущен `live-server: html-hello-world`, захотели протестировать - остановили `live-server: html-hello-world` и запустили `test: html-hello-world`. Тесты прошли успешно - отправляем с помощью `submit: html-hello-world`. Просто не забывайте стопить задачи
