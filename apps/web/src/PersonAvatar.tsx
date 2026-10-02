import { Avatar } from 'antd';

const portraits: Record<string, string> = {
  'teacher-1': '/portraits/teacher.jpg',
  'student-1': '/portraits/student-1.jpg',
  'student-2': '/portraits/student-2.jpg',
  'student-3': '/portraits/student-3.jpg',
  'student-4': '/portraits/student-4.jpg',
  'student-5': '/portraits/student-5.jpg',
  'student-6': '/portraits/student-6.jpg',
};

export default function PersonAvatar({ id, initials, avatarUrl, color = 'lavender', size = 48 }: { id?: string; initials: string; avatarUrl?: string; color?: string; size?: number }) {
  return <Avatar src={portraits[id ?? ''] ?? avatarUrl} size={size} className={`person-avatar avatar-${color}`}>{initials}</Avatar>;
}
