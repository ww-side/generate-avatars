import UploadZone from '@components/common/workspace/upload-zone';
import GeneratedAvatar from '@components/common/workspace/generated-avatar';
import StyleTabs from '@components/common/workspace/style-tabs';
import st from './workspace.module.scss';

export default function Workspace() {
  return (
    <section className={st.workspace}>
      <StyleTabs />
      <UploadZone />
      <GeneratedAvatar />
    </section>
  );
}
