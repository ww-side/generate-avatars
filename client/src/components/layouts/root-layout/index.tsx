import { Flex } from 'antd';
import { useAtomValue } from 'jotai';
import { Outlet } from 'react-router-dom';
import Header from '@components/common/header';
import { authorizedAtom } from '@store/user';
import st from './root-layout.styles.module.scss';

export default function RootLayout() {
  const isAuthorized = useAtomValue(authorizedAtom);

  return (
    <Flex vertical={!isAuthorized} className={st.rootLayout}>
      {isAuthorized && <Header />}
      <section className={st.rootContent}>
        <Outlet />
      </section>
    </Flex>
  );
}
