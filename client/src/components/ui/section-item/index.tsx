import { type ReactNode } from 'react';
import { Flex, Typography } from 'antd';
import cx from 'classnames';
import st from './section-item.module.scss';

export default function SectionItem({
  children,
  title,
  description,
  isBorderBottom = true,
}: {
  children: ReactNode;
  title: string;
  description?: string;
  isBorderBottom?: boolean;
}) {
  return (
    <section className={cx({ [st.sectionItem]: isBorderBottom })}>
      <Flex justify="space-between" className={st.wrapper}>
        <Flex vertical>
          <Typography.Title level={4}>{title}</Typography.Title>
          {description && (
            <Typography.Paragraph>{description}</Typography.Paragraph>
          )}
        </Flex>
        {children}
      </Flex>
    </section>
  );
}
