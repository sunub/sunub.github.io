import { MDXComponentsRootContainer } from '@/MDXContents/shared/style';
import { ReloadButton, ReloadContents, ReloadProvider } from '@/shared/components/Reloadbutton';

export function MDXCompoRoot({ children }: { children: React.ReactNode }) {
  return (
    <ReloadProvider>
      <ReloadContents>
        <MDXComponentsRootContainer>
          <ReloadButton />
          {children}
        </MDXComponentsRootContainer>
      </ReloadContents>
    </ReloadProvider>
  );
}
