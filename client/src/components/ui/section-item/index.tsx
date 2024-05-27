import { type ReactNode } from 'react';
import { Flex, Typography } from 'antd';
import st from './section-item.styles.module.scss';

export default function SectionItem({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <section className={st.sectionItem}>
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
