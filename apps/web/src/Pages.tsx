import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Avatar, Button, Drawer, Input, Select, Tag } from 'antd';
import {
  ArrowLeftOutlined, ArrowRightOutlined, BellOutlined, CalendarOutlined, ClockCircleOutlined,
  EditOutlined, EnvironmentOutlined, FileTextOutlined, FolderOpenOutlined, HeartFilled, MailOutlined,
  PhoneOutlined, SearchOutlined, SendOutlined, StarOutlined, StarFilled, TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';
import { api, type Lesson, type Notification, type Role, type Student, type Teacher } from './data';

function PageHeading({ kicker, title, description, action }: { kicker: string; title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div><div className="page-kicker"><span />{kicker}</div><h1>{title}</h1><p>{description}</p></div>{action && <div className="heading-action">{action}</div>}</div>;
}

function Initials({ initials, color = 'lavender', size = 48 }: { initials: string; color?: string; size?: number }) {
  return <Avatar size={size} className={`person-avatar avatar-${color}`}>{initials}</Avatar>;
}

function ContactLines({ email, max, telegram }: { email: string; max: string; telegram: string }) {
  return <div className="contact-lines">
    <div><span className="contact-icon"><MailOutlined /></span><span><small>Электронная почта</small><strong>{email}</strong></span></div>
    <div><span className="contact-icon max-icon">М</span><span><small>MAX</small><strong>{max}</strong></span></div>
    <div><span className="contact-icon"><SendOutlined /></span><span><small>Telegram</small><strong>{telegram}</strong></span></div>
  </div>;
}

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedId, setSelectedId] = useState('student-1');
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('all');

  useEffect(() => { api<Student[]>('teacher/students/').then(setStudents); }, []);
  const selected = students.find(student => student.id === selectedId);
  const filtered = students.filter(student => student.name.toLowerCase().includes(search.toLowerCase()) && (group === 'all' || student.group === group));

  return <div className="page-enter">
    <PageHeading kicker="ВАША ГРУППА" title="Мои ученики" description="Каждый ребёнок — целый мир. Давайте знакомиться ближе." action={<div className="soft-count"><TeamOutlined /> {students.length} учеников</div>} />
    <div className="students-layout">
      <div className="student-list-area">
        <div className="list-toolbar"><Input placeholder="Найти ученика" prefix={<SearchOutlined />} value={search} onChange={event => setSearch(event.target.value)} className="student-search" /><Select value={group} onChange={setGroup} className="group-select" options={[{ value: 'all', label: 'Все группы' }, { value: 'Звёздочки', label: 'Звёздочки' }, { value: 'Исследователи', label: 'Исследователи' }]} /></div>
        <div className="student-list">
          {filtered.map(student => <button key={student.id} onClick={() => setSelectedId(student.id)} className={`student-row ${selectedId === student.id ? 'active' : ''}`}>
            <Initials initials={student.initials} color={student.color} size={52} />
            <span className="student-row-main"><strong>{student.name}</strong><small>{student.group} <span>·</span> {student.age} лет</small></span>
            <span className="student-row-end"><span className="student-row-label">Следующее занятие</span><span>{student.nextLesson}</span></span>
            <ArrowRightOutlined className="student-row-arrow" />
          </button>)}
          {filtered.length === 0 && <div className="empty-list">Здесь пока никого нет ✳</div>}
        </div>
      </div>
      {selected && <div className="student-detail">
        <div className="student-detail-banner"><span className="detail-decor one">✳</span><span className="detail-decor two">✦</span><span>КАРТОЧКА УЧЕНИКА</span></div>
        <div className="student-detail-content">
          <div className="student-identity"><Initials initials={selected.initials} color={selected.color} size={76} /><h2>{selected.name}</h2><span>{selected.age} лет · группа «{selected.group}»</span></div>
          <div className="detail-divider" />
          <div className="detail-label">НЕМНОГО О РЕБЁНКЕ</div><p className="student-about">{selected.about}</p>
          <div className="detail-label">ИНТЕРЕСЫ</div><div className="interest-tags">{selected.interests.map(interest => <Tag key={interest}>{interest}</Tag>)}</div>
          <div className="detail-divider" />
          <div className="mini-detail"><CalendarOutlined /><span><small>Следующее занятие</small><strong>{selected.nextLesson}</strong></span></div>
          <div className="mini-detail"><StarFilled /><span><small>Посещаемость</small><strong>{selected.attendance}</strong></span></div>
          <div className="detail-divider" />
          <div className="detail-label">КОНТАКТЫ РОДИТЕЛЕЙ</div>
          {selected.parentContacts.map(parent => <div className="parent-contact" key={parent.name}><div className="parent-icon"><UserOutlined /></div><div><strong>{parent.name}</strong><small>{parent.relation} · {parent.phone}</small></div></div>)}
        </div>
      </div>}
    </div>
  </div>;
}

function LessonCard({ lesson, compact = false, onClick }: { lesson: Lesson; compact?: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`lesson-card lesson-${lesson.color} ${compact ? 'compact' : ''}`}>
    <span className="lesson-time">{dayjs(lesson.start).format('HH:mm')}–{dayjs(lesson.end).format('HH:mm')}</span>
    <strong>{lesson.title}</strong>
    <span className="lesson-topic">{lesson.topic}</span>
    {!compact && <span className="lesson-group">{lesson.group}</span>}
  </button>;
}

export function LessonsPage({ role }: { role: Role }) {
  const isTeacher = role === 'teacher';
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [week, setWeek] = useState(dayjs('2026-10-05'));
  const [topic, setTopic] = useState('all');
  const [student, setStudent] = useState('all');
  const [group, setGroup] = useState('all');
  const [activeLesson, setActiveLesson] = useState<Lesson>();

  useEffect(() => {
    api<Lesson[]>(`${role}/lessons/`).then(setLessons);
    if (isTeacher) api<Student[]>('teacher/students/').then(setStudents);
  }, [role, isTeacher]);

  const days = useMemo(() => Array.from({ length: 5 }, (_, index) => week.add(index, 'day')), [week]);
  const topics = [...new Set(lessons.map(lesson => lesson.topic))];
  const visible = lessons.filter(lesson => (topic === 'all' || lesson.topic === topic) && (student === 'all' || lesson.students.includes(student)) && (group === 'all' || lesson.group === group));
  const dateLabel = `${week.format('D')}–${week.add(4, 'day').format('D MMMM YYYY')}`;

  return <div className="page-enter">
    <PageHeading kicker="ВРЕМЯ ОТКРЫТИЙ" title="Мои занятия" description={isTeacher ? 'Планируйте неделю и находите нужное занятие за пару секунд.' : 'Всё интересное, что ждёт тебя на этой неделе.'} action={<div className="soft-count"><CalendarOutlined /> Октябрь 2026</div>} />
    <div className="schedule-panel">
      <div className="schedule-toolbar">
        <div className="week-switch"><button aria-label="Предыдущая неделя" onClick={() => setWeek(week.subtract(7, 'day'))}><ArrowLeftOutlined /></button><strong>{dateLabel}</strong><button aria-label="Следующая неделя" onClick={() => setWeek(week.add(7, 'day'))}><ArrowRightOutlined /></button></div>
        {isTeacher && <div className="schedule-filters">
          <Select value={topic} onChange={setTopic} options={[{ value: 'all', label: 'Все направления' }, ...topics.map(value => ({ value, label: value }))]} />
          <Select value={group} onChange={setGroup} options={[{ value: 'all', label: 'Все группы' }, { value: 'Звёздочки', label: 'Звёздочки' }, { value: 'Исследователи', label: 'Исследователи' }]} />
          <Select value={student} onChange={setStudent} options={[{ value: 'all', label: 'Все ученики' }, ...students.map(value => ({ value: value.id, label: value.name }))]} />
        </div>}
      </div>
      <div className="schedule-week">
        {days.map((day: Dayjs) => {
          const dayLessons = visible.filter(lesson => dayjs(lesson.start).isSame(day, 'day'));
          return <div className="schedule-day" key={day.format('YYYY-MM-DD')}>
            <div className="day-heading"><span>{day.format('dd').toUpperCase()}</span><strong>{day.format('D')}</strong><small>{day.format('MMMM')}</small></div>
            <div className="day-lessons">{dayLessons.map(lesson => <LessonCard lesson={lesson} compact={!isTeacher} onClick={() => setActiveLesson(lesson)} key={lesson.id} />)}{dayLessons.length === 0 && <span className="day-empty">Свободный день <span>✳</span></span>}</div>
          </div>;
        })}
      </div>
    </div>
    <div className="schedule-bottom"><div><span className="schedule-legend-dot" /> Занятия на этой неделе: <strong>{visible.filter(lesson => days.some(day => dayjs(lesson.start).isSame(day, 'day'))).length}</strong></div><span>Нажмите на занятие, чтобы узнать подробности</span></div>
    <div className="schedule-note"><span className="schedule-note-icon"><StarOutlined /></span><div><strong>Демонстрационная версия</strong><p>Расписание содержит примерные данные. Изменения на сервере не сохраняются.</p></div></div>
    <Drawer title="О занятии" open={!!activeLesson} onClose={() => setActiveLesson(undefined)} width={400} className="lesson-drawer">
      {activeLesson && <div className="lesson-detail-body"><span className={`lesson-detail-badge lesson-${activeLesson.color}`}>{activeLesson.topic}</span><h2>{activeLesson.title}</h2><p>Немного нового каждый день — большое открытие со временем.</p><div className="detail-divider" /><div className="lesson-info-row"><CalendarOutlined /><span><small>Когда</small><strong>{dayjs(activeLesson.start).format('D MMMM, dddd')}</strong></span></div><div className="lesson-info-row"><ClockCircleOutlined /><span><small>Время</small><strong>{dayjs(activeLesson.start).format('HH:mm')}–{dayjs(activeLesson.end).format('HH:mm')}</strong></span></div><div className="lesson-info-row"><EnvironmentOutlined /><span><small>Место</small><strong>{activeLesson.room}</strong></span></div><div className="lesson-info-row"><TeamOutlined /><span><small>Группа</small><strong>{activeLesson.group}</strong></span></div><div className="lesson-info-row"><UserOutlined /><span><small>Педагог</small><strong>{activeLesson.teacher}</strong></span></div>{isTeacher && <><div className="detail-divider" /><div className="detail-label">УЧЕНИКИ</div><div className="lesson-student-tags">{students.filter(item => activeLesson.students.includes(item.id)).map(item => <Tag key={item.id}>{item.name}</Tag>)}</div></>}</div>}
    </Drawer>
  </div>;
}

type ProfileDraft = {
  name: string;
  about: string;
  email: string;
  max: string;
  telegram: string;
  specialty: string;
  experience: string;
  location: string;
  subjects: string;
  interests: string;
  parentContacts: Student['parentContacts'];
};

export function ProfilePage({ role }: { role: Role }) {
  const { profile, setProfile } = useOutletContext<{ profile?: Teacher | Student; setProfile: (value: Teacher | Student) => void }>();
  const [draft, setDraft] = useState<ProfileDraft>();
  if (!profile) return null;
  const isTeacher = role === 'teacher';
  const teacher = profile as Teacher;
  const student = profile as Student;

  function openEditor() {
    setDraft({
      name: profile!.name, about: profile!.about, email: profile!.email,
      max: profile!.max, telegram: profile!.telegram,
      specialty: isTeacher ? teacher.specialty : '',
      experience: isTeacher ? teacher.experience : '',
      location: isTeacher ? teacher.location : '',
      subjects: isTeacher ? teacher.subjects.join(', ') : '',
      interests: isTeacher ? '' : student.interests.join(', '),
      parentContacts: isTeacher ? [] : student.parentContacts.map(parent => ({ ...parent })),
    });
  }

  function update(field: Exclude<keyof ProfileDraft, 'parentContacts'>, value: string) {
    setDraft(current => current && { ...current, [field]: value });
  }

  function save() {
    if (!draft) return;
    const common = {
      name: draft.name, about: draft.about, email: draft.email,
      max: draft.max, telegram: draft.telegram,
      initials: draft.name.trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase(),
    };
    setProfile(isTeacher
      ? { ...teacher, ...common, specialty: draft.specialty, experience: draft.experience, location: draft.location, subjects: draft.subjects.split(',').map(item => item.trim()).filter(Boolean) }
      : { ...student, ...common, interests: draft.interests.split(',').map(item => item.trim()).filter(Boolean), parentContacts: draft.parentContacts });
    setDraft(undefined);
  }

  return <div className="page-enter">
    <PageHeading kicker="ВАШИ ДАННЫЕ" title="Личная страница" description="Просматривайте и редактируйте информацию о себе." />
    <div className="profile-layout">
      <div className="profile-main-card">
        <div className="profile-cover"><span className="cover-flower">✳</span><span className="cover-spark">✦</span><span className="cover-spark second">✧</span></div>
        <div className="profile-main-content"><div className="profile-avatar-wrap"><Initials initials={profile.initials} color={isTeacher ? 'teacher' : student.color} size={92} /></div><div className="profile-name-row"><div><div className="profile-role-pill">{isTeacher ? '✦ ПЕДАГОГ' : '✦ УЧЕНИК'}</div><h2>{profile.name}</h2><p>{isTeacher ? teacher.specialty : `${student.age} лет · группа «${student.group}»`}</p></div><Button icon={<EditOutlined />} onClick={openEditor}>Редактировать</Button></div><div className="detail-divider" /><div className="detail-label">ОБО МНЕ</div><p className="profile-about">{profile.about}</p><div className="detail-label">{isTeacher ? 'МОИ НАПРАВЛЕНИЯ' : 'МОИ ИНТЕРЕСЫ'}</div><div className="interest-tags">{(isTeacher ? teacher.subjects : student.interests).map(item => <Tag key={item}>{item}</Tag>)}</div></div>
      </div>
      <div className="profile-side">
        <section className="white-card contact-card"><div className="section-title"><div className="section-icon"><MailOutlined /></div><div><h3>Мои контакты</h3><p>Как со мной связаться</p></div></div><ContactLines email={profile.email} max={profile.max} telegram={profile.telegram} /></section>
        <section className="white-card profile-info-card"><div className="section-title"><div className="section-icon peach-icon">{isTeacher ? <BookIcon /> : <HeartFilled />}</div><div><h3>{isTeacher ? 'В центре' : 'Моя группа'}</h3><p>{isTeacher ? 'Немного о работе' : 'Рядом со мной'}</p></div></div>
          {isTeacher ? <div className="profile-facts"><div><small>Опыт</small><strong>{teacher.experience}</strong></div><div><small>Группы</small><strong>{teacher.groups.join(', ')}</strong></div><div><small>Кабинет</small><strong>{teacher.location}</strong></div></div> : <div className="profile-facts"><div><small>Группа</small><strong>{student.group}</strong></div><div><small>Педагог</small><strong>{student.teacher}</strong></div><div><small>Следующее занятие</small><strong>{student.nextLesson}</strong></div></div>}
        </section>
        {!isTeacher && <section className="white-card parent-profile-card"><div className="section-title"><div className="section-icon violet-icon"><TeamOutlined /></div><div><h3>Контакты родителей</h3><p>Всегда на связи</p></div></div>{student.parentContacts.map(parent => <div className="parent-contact" key={parent.name}><div className="parent-icon"><PhoneOutlined /></div><div><strong>{parent.name}</strong><small>{parent.relation} · {parent.phone}</small></div></div>)}</section>}
      </div>
    </div>
    <Drawer title="Редактирование моих данных" open={!!draft} onClose={() => setDraft(undefined)} width={480} className="profile-edit-drawer">
      {draft && <div className="profile-edit-form">
        <p className="profile-edit-hint">Изменения видны только в этой вкладке до обновления страницы. На сервер данные не отправляются.</p>
        <label>Имя и фамилия<Input value={draft.name} onChange={event => update('name', event.target.value)} /></label>
        <label>Обо мне<Input.TextArea rows={3} value={draft.about} onChange={event => update('about', event.target.value)} /></label>
        <div className="detail-label">МОИ КОНТАКТЫ</div>
        <label>Электронная почта<Input value={draft.email} onChange={event => update('email', event.target.value)} /></label>
        <label>MAX<Input value={draft.max} onChange={event => update('max', event.target.value)} /></label>
        <label>Telegram<Input value={draft.telegram} onChange={event => update('telegram', event.target.value)} /></label>
        {isTeacher ? <>
          <div className="detail-label">ИНФОРМАЦИЯ О ПЕДАГОГЕ</div>
          <label>Специализация<Input value={draft.specialty} onChange={event => update('specialty', event.target.value)} /></label>
          <label>Направления (через запятую)<Input value={draft.subjects} onChange={event => update('subjects', event.target.value)} /></label>
          <label>Опыт<Input value={draft.experience} onChange={event => update('experience', event.target.value)} /></label>
          <label>Кабинет<Input value={draft.location} onChange={event => update('location', event.target.value)} /></label>
        </> : <>
          <div className="detail-label">ИНФОРМАЦИЯ ОБ УЧЕНИКЕ</div>
          <label>Интересы (через запятую)<Input value={draft.interests} onChange={event => update('interests', event.target.value)} /></label>
          <div className="detail-label">КОНТАКТЫ РОДИТЕЛЕЙ</div>
          {draft.parentContacts.map((parent, index) => <div className="profile-edit-parent" key={index}>
            <label>Имя родителя<Input value={parent.name} onChange={event => setDraft(current => current && { ...current, parentContacts: current.parentContacts.map((item, i) => i === index ? { ...item, name: event.target.value } : item) })} /></label>
            <label>Телефон<Input value={parent.phone} onChange={event => setDraft(current => current && { ...current, parentContacts: current.parentContacts.map((item, i) => i === index ? { ...item, phone: event.target.value } : item) })} /></label>
          </div>)}
        </>}
        <div className="profile-edit-actions"><Button onClick={() => setDraft(undefined)}>Отмена</Button><Button type="primary" onClick={save}>Сохранить в этой вкладке</Button></div>
      </div>}
    </Drawer>
  </div>;
}

function BookIcon() { return <FileTextOutlined />; }

export function InboxPage() {
  const [items, setItems] = useState<Notification[]>([]);
  useEffect(() => { api<Notification[]>('notifications/').then(setItems); }, []);
  return <div className="page-enter"><PageHeading kicker="БУДЬТЕ В КУРСЕ" title="Уведомления" description="Здесь живут новости и важные напоминания." action={<div className="soft-count"><BellOutlined /> 1 новое</div>} />
    <div className="inbox-layout"><div className="inbox-list"><div className="inbox-section-title">НОВЫЕ <span>1</span></div>{items.filter(item => !item.read).map(item => <div className="inbox-item unread" key={item.id}><div className="inbox-icon"><CalendarOutlined /></div><div className="inbox-copy"><div className="inbox-item-heading"><strong>{item.title}</strong><span className="unread-dot" /></div><p>{item.body}</p><small>{item.date}</small></div></div>)}<div className="inbox-section-title older">ПРОЧИТАННЫЕ</div>{items.filter(item => item.read).map(item => <div className="inbox-item" key={item.id}><div className="inbox-icon">{item.icon === 'calendar' ? <CalendarOutlined /> : <StarOutlined />}</div><div className="inbox-copy"><strong>{item.title}</strong><p>{item.body}</p><small>{item.date}</small></div></div>)}</div><div className="inbox-aside"><div className="inbox-aside-symbol">✳</div><strong>Всё важное — рядом</strong><p>Новости занятий, полезные напоминания и добрые слова всегда под рукой.</p></div></div>
  </div>;
}

export function StubPage({ title, icon }: { title: string; icon: 'homework' | 'files' }) {
  return <div className="page-enter"><PageHeading kicker="СКОРО ЗДЕСЬ БУДЕТ ИНТЕРЕСНО" title={title} description="Мы готовим для вас кое-что полезное." /><div className="stub-card"><div className="stub-illustration"><span className="stub-orbit" /><span className="stub-main-icon">{icon === 'files' ? <FolderOpenOutlined /> : <FileTextOutlined />}</span><span className="stub-star one">✳</span><span className="stub-star two">✦</span></div><span className="stub-eyebrow">ПОЧТИ ГОТОВО</span><h2>В разработке</h2><p>Этот раздел скоро появится. А пока загляните в расписание — там уже ждёт много интересного!</p><Button type="primary" href="lessons" icon={<CalendarOutlined />}>К моим занятиям</Button></div></div>;
}
