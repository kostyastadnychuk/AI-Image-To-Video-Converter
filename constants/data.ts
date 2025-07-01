import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';

export type User = {
  id: number;
  username: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: '홈',
    href: '/main',
    icon: 'dashboard',
    label: '홈'
  },
  {
    title: '나의 비디오',
    href: '/main/video',
    icon: 'video',
    label: '나의 비디오'
  },
  {
    title: '비디오 만들기',
    href: '/main/video/create',
    icon: 'media',
    label: '비디오 만들기'
  },
  {
    title: '계정관리',
    href: '/main/user',
    icon: 'user',
    label: '정액제 플랜'
  },
  {
    title: '정액제 플랜',
    href: '/main/plan',
    icon: 'billing',
    label: '정액제 플랜'
  },
  {
    title: '이력보기',
    href: '/main/history',
    icon: 'history',
    label: '이력보기'
  },
  {
    title: '메뉴설정',
    href: '/main/menu',
    icon: 'menu',
    label: '메뉴설정'
  }
];

export const adminNavItems: NavItem[] = [
  {
    title: '홈',
    href: '/admin/management',
    icon: 'dashboard',
    label: '홈'
  },
  {
    title: '입금관리',
    href: '/admin/management/deposit',
    icon: 'billing',
    label: '입금관리'
  },
  {
    title: '입금이력보기',
    href: '/admin/management/history',
    icon: 'history',
    label: '입금이력보기'
  },
  {
    title: '정산관리',
    href: '/admin/management/calc',
    icon: 'calc',
    label: '정산관리'
  },
  
];