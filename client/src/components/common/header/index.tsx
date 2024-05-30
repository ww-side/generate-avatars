import { useAtomValue, useSetAtom } from 'jotai';
import { Link, useLocation } from 'react-router-dom';
import { Button, Flex, Typography } from 'antd';
import { useCookie } from '@hooks/useCookie';
import { authorizedAtom, usernameAtom } from '@store/user';
import { routes } from '@config/routes';
import { menuItems } from '@data/menu-items';
import st from './header.module.scss';

export default function Header() {
  const username = useAtomValue(usernameAtom);
  const setIsAuthorized = useSetAtom(authorizedAtom);
  const { deleteCookie } = useCookie();
  const location = useLocation();

  const handleLogOut = () => {
    deleteCookie('username');
    deleteCookie('token');
    setIsAuthorized(false);
  };

  return (
    <header className={st.header}>
      <Typography.Title level={2}>AI Avatar</Typography.Title>
      <Typography.Paragraph>Hi, {username}!</Typography.Paragraph>
      <Flex vertical gap="middle">
        {menuItems.map(item => (
          <Link key={item.id} to={item.route}>
            <Button
              className={st.btn}
              type={location.pathname === item.route ? 'primary' : 'default'}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </Flex>
      <Link to={routes.auth.signIn}>
        <Button className={st.logoutBtn} onClick={handleLogOut}>
          Log Out
        </Button>
      </Link>
    </header>
  );
}
