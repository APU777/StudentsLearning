ВСТУП
Ідея проекту є розробка комплексного рішення для віддаленого навчання студентів. Проект складається з веб додатку та API для взаємодії з ним. 
В першому розділі представлені аналіз вимог до продукту та процеси проектування і реалізації додатку. На основі подібних продуктів та ідеї проекту були сформовані вимоги до функціоналу, а на основі обраного середовища реалізації були описані вимоги до веб додатку.
В другому розділі описані прийоми взаємодії користувачів з системою. 
ТЕХНІЧНА ДОКУМЕНТАЦІЯ
Вимоги до продукту
Ідея розробки
Розробка комплексного рішення для віддаленого навчання студентів, що складається з веб-додатку для користувачів, API для взаємодії з ним.
Дослідження ринку аналогічних продуктів
Аналогічних продуктів на локальному ринку безліч. Додаток реалізований на основі існуючих продуктів.
Задачі, які планується вирішувати
Цільова аудиторія даного продукту є молоді активні люди користувачі веб простору,  які звикли вирішувати свої питання online.
Даний сервіс дає можливість студентам вибирати та вивчати навчальні курси, адміністратор може переглядати список курсів, додавати, редагувати та видаляти курси, а також переглядати список користувачів та блокувати їх.
Функціональні вимоги до системи
В системі представлені користувачі з 2-ма можливими ролями, а саме:
Студент (Student) – має доступ до веб додатку. Може переглядати, вивчати навчальні курси, а також підписуватись на них.
Адміністратор (Admin) – адміністратор сервісу, має доступ до веб додатку. Може переглядати список студентів та курсів, додавати нові курси, редагувати існуючі куси та видаляти їх. 
Нефункціональні вимоги
Для розробки клієнтського веб сайту використовувалась бібліотека React JS.
Веб додаток написаний на мові програмування Javascript. Взаємодія з базою даних відбувається через API написане на .Net Core 2.2 .
Api та веб додаток, а також база даних розміщенні локально на ПК.
Обґрунтування вибору середовищ реалізації
Для розробки сервісу було обрано створити веб додаток. В зв’язку з тим, що таким чином охоплення ринку буде максимальним. Розробка велася з допомогою: Javascript, React JS та інших різноманітних бібліотек.
API було розроблене на технології .Net Core 2.2  для простішої взаємодії з компонентами бази даних та спільними бібліотеками класів веб сайту.
Вибір React JS як технології розробки веб сайту пояснюється тим що дана технологія є актуальною на даний момент та дозволяє будувати складні за функціональністю системи.
Модель розгортання 
Серверна частина веб сайту та API виконуються в середовищі IIS (Internet Information Services).
База даних розташовується в середовищі MS SQL Server.

Реалізація веб додатку
Під час реалізації веб додатку було використано доволі багато компактних, з певних функціоналом, офіційних бібліотек. 
Таких як:
React JS
Axios Client
Semantic UI


Запити get, post, put, delete здійснюються за допомогою axios client

Реалізація .NET Core WEB API
API solution розбитий на три проекта: API, Business Logic та Data Access.
Основними елементами є Controllers в яких по типу запросів я реалізував Get та Post запити і відповіді відповідно.

Для роутінга використав апішні атрібути для методів контроллера.
Основна логіка знаходиться в проекті Business Logic. 

Робота з веб сайтом
Процес реєстрації та авторизації
Для реєстрації та авторизації у веб-додатку вам потрібен Email і Password. Сторінка реєстрації та авторизації доступна із головної сторінки додатку
На відкритій сторінці користувач побачить форму реєстрації та авторизації
Реєстрації відбувається в два етапи. На першому етапі потрібно ввести Email і Password, після цього буде відправлено надсилання для підтвердження на Email. Перейшовши за посилання, відкриється нове вікно браузера з намим веб-додатком. Якщо підтвердження відбувалося клієнт у клієнта з’являються певні можливості, такі як: підписка на навчальний курс, пошук курсу, редагування особистого профілю.
Якщо реєстрація не буде підтверджена, користувач побачить таку сторінку
Процес авторизації
Користувач, який зареєстрований в системі але не авторизований має пройти процес авторизації. 
На відкритій сторінці користувач побачить форму авторизації
В поля на цій формі користувача вносить свою адресу електронної пошти та пароль.
На головній сторінці клієнту доступна вся основна інформація.
Редагування персональної інформації
Для доступу на сторінку профілю на головній сторінці потрібно вибрати пункт «Profile»

Для доступу редагування профілю на сторінці профілю потрібно вибрати пункт «Update Profile» в меню, що з’явиться після натиснення кнопки меню(), вона знаходиться в лівому верхньому кутку.

На сторінці ви можете відредагувати свою інформацію та вибрати фото.



Перегляд курсів за яких підписаний користувач
Для перегляду навчальних курсів користувача на сторінці профілю потрібно вибрати пункт «My Courses» в меню, що з’явиться після натиснення кнопки меню(), вона знаходиться в лівому верхньому кутку.

Перегляд деталей курсу
Для того щоб подивитись деталі навчального курсу потрібно натиснути на пункт «Watch» на картці курсу, яка знаходиться на сторінці «Home». 

Для підписки на навчальний курс потрібно натиснути на пункт «Subscribe».



Адміністратор
Для того щоб отримати можливості адміністратора та доступ до його профіля потрібно пройти авторизацію.
На цій сторінці можна переглянути курси та перейти в редагування курсу.
Щоб перейти на редагування навчального курсу потрібно натиснути на пункт «Edit».
Редагування курсу
На сторінці «Edit» адміністратор може зберігати курс після редагування та видаляти курс
Профіль адміністратора
Щоб перейти в профіль адміністратора потрібно на головній сторінці натиснути на пункт «Admin». В профілі адміністратор може переглядати список студентів, навчальних курсів, здійснювати пошук студентів та навчальних курсів, блокувати студентів, а також перейти за пунктом «Add Course» де зможе додати новий курс.
Інструкції з установки
Клієнтський сайт, API та база даних працюють на комп’ютерах під керуванням операційної системи Windows, також на комп’ютері повинна бути встановлена бібліотека .NET Core 2.2.
Для встановлення сайту та API потрібно в Visual Studio натиснути правою кнопкою миші на відповідних проектах, та натиснути пункт меню «Publish» та виконати пибліш в файлову систему вашого ПК, після цього потрібно перенести файли в веб сервер.
ВИСНОВКИ
В ході роботи над проектом було виконано аналіз подібних проектів та сервісів на ринку або їх окремих модулів. На основі цього були сформовані вимоги до функціоналу системи і можливі ролі користувачів. Було проведено проектування структури даних з урахуванням використання MS SQL бази даних та проектування функціональної складової веб-додатку. 
Веб-додаток розроблений на мові JS та з допомогою бібліотеки React JS та API розроблялись мовою C#.


