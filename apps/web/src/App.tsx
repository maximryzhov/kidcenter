import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Drawer, Input, Popover } from 'antd';
import {
  ArrowRightOutlined, BellOutlined, BookOutlined, CalendarOutlined, CheckCircleFilled,
  FolderOpenOutlined, HomeOutlined, MenuOutlined, ReadOutlined,
  SmileOutlined, StarOutlined, TeamOutlined, UserOutlined,
} from '@ant-design/icons';
import { api, type Notification, type Role, type Student, type Teacher } from './data';
import { InboxPage, LessonsPage, ProfilePage, StudentsPage, StubPage } from './Pages';
import PersonAvatar from './PersonAvatar';

const roleHome = (role: Role) => role === 'teacher' ? '/teacher/students' : '/student/lessons';

function Brand({ light = false }: { light?: boolean }) {
  return <Link to="/" className={`brand ${light ? 'brand-light' : ''}`}>
    <span className="brand-symbol"><i /><i /><i /><i /><span /></span>
    <span className="brand-name">открытие<span className="brand-period">.</span></span>
  </Link>;
}

function LandingPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('teacher');
  const [entering, setEntering] = useState(false);

  async function enter() {
    setEntering(true);
    await api('login/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role }) });
    navigate(roleHome(role));
  }

  return <div className="landing">
    <header className="landing-header page-container">
      <Brand />
      <span className="landing-header-note"><span className="small-sun">✳</span> Система для центра развития детей</span>
    </header>

    <main className="landing-main page-container">
      <div className="landing-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> ЦИФРОВОЕ ПРОСТРАНСТВО «ОТКРЫТИЕ»</div>
        <h1>Занятия —<br /><em>под рукой</em><span className="title-star">✳</span></h1>
        <p className="landing-lead">Современная система для педагогов и учеников: календарь занятий, уведомления и личная информация в одном месте.</p>
        <div className="landing-perks">
          <span><CheckCircleFilled /> Удобный календарь</span>
          <span><CheckCircleFilled /> Важные уведомления</span>
        </div>
        <div className="landing-art" aria-hidden="true">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="art-daisy"><span /><span /><span /><span /><span /><span /><i /></div>
          <div className="art-leaf leaf-one" /><div className="art-leaf leaf-two" />
          <div className="art-note note-one">мечтай</div><div className="art-note note-two">играй</div>
          <div className="art-spark spark-one">✦</div><div className="art-spark spark-two">✳</div>
        </div>
      </div>

      <div className="login-wrap" id="entry">
        <div className="login-card">
          <div className="login-card-top"><div className="login-welcome-icon"><SmileOutlined /></div><span>ВХОД В СИСТЕМУ</span></div>
          <h2>Добро пожаловать!</h2>
          <p className="login-subtitle">Выберите роль, чтобы открыть расписание и уведомления.</p>
          <div className="login-label">Я в «Открытии» как</div>
          <div className="role-tabs">
            <button className={role === 'teacher' ? 'role-tab active' : 'role-tab'} onClick={() => setRole('teacher')}><BookOutlined /> Педагог</button>
            <button className={role === 'student' ? 'role-tab active' : 'role-tab'} onClick={() => setRole('student')}><StarOutlined /> Ученик</button>
          </div>
          <label className="field-label" htmlFor="login-name">Ваше имя</label>
          <Input id="login-name" size="large" placeholder={role === 'teacher' ? 'Например, Анна' : 'Например, София'} prefix={<UserOutlined />} />
          <label className="field-label" htmlFor="login-password">Пароль</label>
          <Input.Password id="login-password" size="large" placeholder="Введите пароль" />
          <Button className="login-submit" type="primary" size="large" loading={entering} onClick={enter}>Войти в кабинет <ArrowRightOutlined /></Button>
          <div className="login-hint"><span>✦</span> Это демонстрационная версия — просто нажмите «Войти»</div>
        </div>
        <div className="login-caption">Демонстрационный доступ к системе</div>
      </div>
    </main>
    <footer className="landing-footer page-container"><span>© 2026 «Открытие» — центр развития детей</span><span>Демонстрационная версия системы</span></footer>
  </div>;
}

function NotificationPreview({ items, to, close, markRead }: { items: Notification[]; to: string; close: () => void; markRead: (id: string) => void }) {
  const unreadCount = items.filter(item => !item.read).length;
  return <div className="notification-preview">
    <div className="preview-heading"><strong>Уведомления</strong><span>{unreadCount} новых</span></div>
    {items.map(item => <Link to={to} onClick={() => { markRead(item.id); close(); }} className={`preview-item ${item.read ? '' : 'unread'}`} key={item.id}>
      <div className="preview-icon">{item.icon === 'calendar' ? <CalendarOutlined /> : <StarOutlined />}</div>
      <div><strong>{item.title}</strong><p>{item.body}</p><small>{item.date}</small></div>
      {!item.read && <span className="unread-dot" />}
    </Link>)}
    <Link className="preview-all" to={to} onClick={close}>Все уведомления <ArrowRightOutlined /></Link>
  </div>;
}

function Shell({ role }: { role: Role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [profile, setProfile] = useState<Teacher | Student>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const base = `/${role}`;
  const isTeacher = role === 'teacher';

  useEffect(() => {
    api<Teacher | Student>(`${role}/profile/`).then(setProfile);
    api<Notification[]>('notifications/').then(setNotifications);
  }, [role]);
  useEffect(() => { setDrawerOpen(false); setBellOpen(false); }, [location.pathname]);

  function markNotificationRead(id: string) {
    setNotifications(current => current.map(item => item.id === id ? { ...item, read: true } : item));
  }

  const links = [
    ...(isTeacher ? [{ path: 'students', label: 'Мои ученики', icon: <TeamOutlined /> }] : []),
    { path: 'lessons', label: 'Мои занятия', icon: <CalendarOutlined /> },
    { path: 'homework', label: 'Мои задания', icon: <ReadOutlined /> },
    { path: 'files', label: 'Мои файлы', icon: <FolderOpenOutlined /> },
    { path: 'profile', label: 'Личная страница', icon: <UserOutlined /> },
  ];
  const nav = <>
    <div className="sidebar-brand"><Brand /></div>
    <div className="sidebar-section-caption">ЛИЧНЫЙ КАБИНЕТ</div>
    <nav className="side-nav">
      {links.map(link => <Link to={`${base}/${link.path}`} className={`nav-link ${location.pathname === `${base}/${link.path}` ? 'selected' : ''}`} key={link.path}>{link.icon}<span>{link.label}</span>{location.pathname === `${base}/${link.path}` && <span className="nav-selected-dot" />}</Link>)}
    </nav>
    <div className="sidebar-spacer" />
    <div className="sidebar-tip"><div className="tip-sun">✳</div><strong>Всё в одном месте</strong><span>Расписание, контакты и уведомления доступны в личном кабинете.</span></div>
    <Link to="/" className="sidebar-exit"><HomeOutlined /> На главную</Link>
  </>;

  return <div className="app-shell">
    <aside className="sidebar">{nav}</aside>
    <Drawer placement="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} width={270} closable={false} className="mobile-drawer"><div className="drawer-nav">{nav}</div></Drawer>
    <div className="shell-main">
      <header className="topbar">
        <div className="topbar-left"><button className="mobile-menu" onClick={() => setDrawerOpen(true)} aria-label="Открыть меню"><MenuOutlined /></button><span className="topbar-crumb">Личный кабинет <span>/</span> <strong>{isTeacher ? 'Педагог' : 'Ученик'}</strong></span></div>
        <div className="topbar-actions">
          <span className="topbar-today">Пятница, 2 октября</span>
          <Popover content={<NotificationPreview items={notifications} to={`${base}/inbox`} close={() => setBellOpen(false)} markRead={markNotificationRead} />} trigger="click" placement="bottomRight" open={bellOpen} onOpenChange={setBellOpen} overlayClassName="notification-popover">
            <button className="bell-button" aria-label="Уведомления"><Badge count={notifications.filter(item => !item.read).length} size="small"><BellOutlined /></Badge></button>
          </Popover>
          <span className="topbar-divider" />
          <button className="topbar-user" onClick={() => navigate(`${base}/profile`)}><PersonAvatar initials={profile?.initials ?? ''} avatarUrl={profile?.avatarUrl} color={isTeacher ? 'teacher' : (profile as Student | undefined)?.color} size={38} /><span><strong>{profile?.name}</strong><small>{isTeacher ? 'Педагог' : 'Ученик'}</small></span></button>
        </div>
      </header>
      <main className="content"><Outlet context={{ profile, setProfile, notifications, markNotificationRead }} /></main>
      <footer className="shell-footer">© 2026 «Открытие» <span>Демонстрационная версия системы</span> Разработано в <a href="7-sky.net">7SKY</a></footer>
    </div>
  </div>;
}

function AppRoutes() {
  return <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/teacher" element={<Shell role="teacher" />}>
      <Route path="students" element={<StudentsPage />} />
      <Route path="lessons" element={<LessonsPage role="teacher" />} />
      <Route path="profile" element={<ProfilePage role="teacher" />} />
      <Route path="inbox" element={<InboxPage />} />
      <Route path="homework" element={<StubPage title="Мои задания" icon="homework" />} />
      <Route path="files" element={<StubPage title="Мои файлы" icon="files" />} />
    </Route>
    <Route path="/student" element={<Shell role="student" />}>
      <Route path="lessons" element={<LessonsPage role="student" />} />
      <Route path="profile" element={<ProfilePage role="student" />} />
      <Route path="inbox" element={<InboxPage />} />
      <Route path="homework" element={<StubPage title="Мои задания" icon="homework" />} />
      <Route path="files" element={<StubPage title="Мои файлы" icon="files" />} />
    </Route>
  </Routes>;
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>;
}
