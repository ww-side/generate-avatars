import { Button, Flex } from 'antd';
import { useAtom } from 'jotai';
import SectionItem from '@components/ui/section-item';
import { styleAtom } from '@store/workspace';
import { styles } from '@data/avatar-styles';

export default function StyleTabs() {
  const [selectedStyle, setSelectedStyle] = useAtom(styleAtom);

  const handleChangeStyle = (style: string) => () => {
    setSelectedStyle(style);
  };

  return (
    <SectionItem title="Style" description="Choose style for your avatar">
      <Flex gap="small">
        {styles.map(item => (
          <Button
            key={item.value}
            type={selectedStyle === item.value ? 'primary' : 'default'}
            onClick={handleChangeStyle(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </Flex>
    </SectionItem>
  );
}
