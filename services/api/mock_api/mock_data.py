TEACHER = {
    "id": "teacher-1",
    "name": "Анна Морозова",
    "shortName": "Анна Сергеевна",
    "role": "Педагог",
    "initials": "АМ",
    "avatarUrl": "/portraits/teacher.jpg",
    "specialty": "Развитие речи и творчество",
    "experience": "8 лет с детьми",
    "about": "Помогаю детям открывать новое через игру, творчество и маленькие ежедневные победы.",
    "email": "a.morozova@otkrytie.ru",
    "max": "Анна Морозова",
    "telegram": "@anna_otkrytie",
    "phone": "+7 (999) 123-45-67",
    "groups": ["Звёздочки", "Исследователи"],
    "subjects": ["Развитие речи", "Творческая мастерская", "Окружающий мир"],
    "location": "Кабинет 204",
}

STUDENTS = [
    {
        "id": "student-1", "name": "София Иванова", "initials": "СИ", "avatarUrl": "/portraits/student-1.jpg", "age": 7,
        "group": "Звёздочки", "color": "lavender", "attendance": "12 из 14 занятий",
        "nextLesson": "5 октября · 10:00", "interests": ["Рисование", "Чтение"],
        "about": "Любит придумывать истории и рисовать героев для них.",
        "email": "sofia.ivanova@example.ru", "max": "София Иванова",
        "telegram": "@sofia_family", "teacher": "Анна Морозова",
        "parentContacts": [
            {"name": "Мария Иванова", "relation": "Мама", "phone": "+7 (999) 211-30-40"},
            {"name": "Дмитрий Иванов", "relation": "Папа", "phone": "+7 (999) 211-30-41"},
        ],
    },
    {
        "id": "student-2", "name": "Марк Петров", "initials": "МП", "avatarUrl": "/portraits/student-2.jpg", "age": 8,
        "group": "Исследователи", "color": "peach", "attendance": "10 из 12 занятий",
        "nextLesson": "5 октября · 12:00", "interests": ["Конструирование", "Наука"],
        "about": "Любит задавать вопросы и собирать необычные конструкции.",
        "email": "mark.petrov@example.ru", "max": "Марк Петров",
        "telegram": "@petrov_family", "teacher": "Анна Морозова",
        "parentContacts": [
            {"name": "Елена Петрова", "relation": "Мама", "phone": "+7 (999) 322-40-50"},
        ],
    },
    {
        "id": "student-3", "name": "Алиса Смирнова", "initials": "АС", "avatarUrl": "/portraits/student-3.jpg", "age": 6,
        "group": "Звёздочки", "color": "mint", "attendance": "13 из 14 занятий",
        "nextLesson": "5 октября · 10:00", "interests": ["Музыка", "Лепка"],
        "about": "Всегда готова попробовать что-то новое и поддержать друзей.",
        "email": "alisa.smirnova@example.ru", "max": "Алиса Смирнова",
        "telegram": "@smirnova_family", "teacher": "Анна Морозова",
        "parentContacts": [
            {"name": "Ольга Смирнова", "relation": "Мама", "phone": "+7 (999) 433-50-60"},
        ],
    },
    {
        "id": "student-4", "name": "Лев Кузнецов", "initials": "ЛК", "avatarUrl": "/portraits/student-4.jpg", "age": 7,
        "group": "Исследователи", "color": "sky", "attendance": "11 из 12 занятий",
        "nextLesson": "5 октября · 12:00", "interests": ["Природа", "Роботы"],
        "about": "С интересом изучает мир вокруг и любит командные игры.",
        "email": "lev.kuznetsov@example.ru", "max": "Лев Кузнецов",
        "telegram": "@kuznetsov_family", "teacher": "Анна Морозова",
        "parentContacts": [
            {"name": "Наталья Кузнецова", "relation": "Мама", "phone": "+7 (999) 544-60-70"},
            {"name": "Игорь Кузнецов", "relation": "Папа", "phone": "+7 (999) 544-60-71"},
        ],
    },
    {
        "id": "student-5", "name": "Полина Орлова", "initials": "ПО", "avatarUrl": "/portraits/student-5.jpg", "age": 8,
        "group": "Звёздочки", "color": "butter", "attendance": "14 из 14 занятий",
        "nextLesson": "5 октября · 10:00", "interests": ["Театр", "Рисование"],
        "about": "Обожает выступать и делиться своими идеями.",
        "email": "polina.orlova@example.ru", "max": "Полина Орлова",
        "telegram": "@orlova_family", "teacher": "Анна Морозова",
        "parentContacts": [
            {"name": "Татьяна Орлова", "relation": "Мама", "phone": "+7 (999) 655-70-80"},
        ],
    },
    {
        "id": "student-6", "name": "Даниил Волков", "initials": "ДВ", "avatarUrl": "https://i.pravatar.cc/240?img=14", "age": 6,
        "group": "Исследователи", "color": "rose", "attendance": "9 из 12 занятий",
        "nextLesson": "5 октября · 12:00", "interests": ["Космос", "Книги"],
        "about": "Внимательный исследователь, который любит узнавать новое.",
        "email": "daniil.volkov@example.ru", "max": "Даниил Волков",
        "telegram": "@volkov_family", "teacher": "Анна Морозова",
        "parentContacts": [
            {"name": "Екатерина Волкова", "relation": "Мама", "phone": "+7 (999) 766-80-90"},
        ],
    },
]

LESSONS = [
    {"id": "lesson-1", "title": "Истории вокруг нас", "topic": "Развитие речи", "start": "2026-10-05T10:00:00", "end": "2026-10-05T11:00:00", "group": "Звёздочки", "students": ["student-1", "student-3", "student-5"], "teacher": "Анна Морозова", "room": "Кабинет 204", "status": "По расписанию", "color": "violet"},
    {"id": "lesson-2", "title": "Маленькие изобретатели", "topic": "Окружающий мир", "start": "2026-10-05T12:00:00", "end": "2026-10-05T13:00:00", "group": "Исследователи", "students": ["student-2", "student-4", "student-6"], "teacher": "Анна Морозова", "room": "Кабинет 108", "status": "По расписанию", "color": "orange"},
    {"id": "lesson-3", "title": "Цвета и формы", "topic": "Творческая мастерская", "start": "2026-10-06T10:00:00", "end": "2026-10-06T11:00:00", "group": "Звёздочки", "students": ["student-1", "student-3", "student-5"], "teacher": "Анна Морозова", "room": "Мастерская", "status": "По расписанию", "color": "pink"},
    {"id": "lesson-4", "title": "Учимся рассказывать", "topic": "Развитие речи", "start": "2026-10-06T12:00:00", "end": "2026-10-06T13:00:00", "group": "Исследователи", "students": ["student-2", "student-4", "student-6"], "teacher": "Анна Морозова", "room": "Кабинет 204", "status": "По расписанию", "color": "violet"},
    {"id": "lesson-5", "title": "Мир растений", "topic": "Окружающий мир", "start": "2026-10-07T10:00:00", "end": "2026-10-07T11:00:00", "group": "Звёздочки", "students": ["student-1", "student-3", "student-5"], "teacher": "Анна Морозова", "room": "Кабинет 108", "status": "По расписанию", "color": "green"},
    {"id": "lesson-6", "title": "Город будущего", "topic": "Творческая мастерская", "start": "2026-10-07T12:00:00", "end": "2026-10-07T13:00:00", "group": "Исследователи", "students": ["student-2", "student-4", "student-6"], "teacher": "Анна Морозова", "room": "Мастерская", "status": "По расписанию", "color": "pink"},
    {"id": "lesson-7", "title": "Слова-друзья", "topic": "Развитие речи", "start": "2026-10-08T10:00:00", "end": "2026-10-08T11:00:00", "group": "Звёздочки", "students": ["student-1", "student-3", "student-5"], "teacher": "Анна Морозова", "room": "Кабинет 204", "status": "По расписанию", "color": "violet"},
    {"id": "lesson-8", "title": "Загадки природы", "topic": "Окружающий мир", "start": "2026-10-08T12:00:00", "end": "2026-10-08T13:00:00", "group": "Исследователи", "students": ["student-2", "student-4", "student-6"], "teacher": "Анна Морозова", "room": "Кабинет 108", "status": "По расписанию", "color": "orange"},
    {"id": "lesson-9", "title": "Театр теней", "topic": "Творческая мастерская", "start": "2026-10-09T10:00:00", "end": "2026-10-09T11:00:00", "group": "Звёздочки", "students": ["student-1", "student-3", "student-5"], "teacher": "Анна Морозова", "room": "Мастерская", "status": "По расписанию", "color": "pink"},
    {"id": "lesson-10", "title": "Большое путешествие", "topic": "Развитие речи", "start": "2026-10-09T12:00:00", "end": "2026-10-09T13:00:00", "group": "Исследователи", "students": ["student-2", "student-4", "student-6"], "teacher": "Анна Морозова", "room": "Кабинет 204", "status": "По расписанию", "color": "violet"},
]

NOTIFICATIONS = [
    {"id": "notification-1", "title": "Новое занятие в расписании", "body": "На следующей неделе вас ждёт творческое занятие «Театр теней». До встречи!", "date": "2 октября · 09:30", "read": False, "icon": "calendar"},
    {"id": "notification-2", "title": "Добро пожаловать в «Открытие»", "body": "Теперь всё важное о занятиях и новостях центра собрано в одном месте.", "date": "1 октября · 12:15", "read": True, "icon": "sparkle"},
    {"id": "notification-3", "title": "Расписание на октябрь готово", "body": "Загляните в раздел занятий, чтобы посмотреть планы на ближайшую неделю.", "date": "30 сентября · 16:40", "read": True, "icon": "calendar"},
]
