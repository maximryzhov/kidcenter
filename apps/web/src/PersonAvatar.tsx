import { Avatar } from 'antd';

export default function PersonAvatar({ initials, avatarUrl, color = 'lavender', size = 48 }: { initials: string; avatarUrl?: string; color?: string; size?: number }) {
  return <Avatar src={avatarUrl} size={size} className={`person-avatar avatar-${color}`}>{initials}</Avatar>;
}
