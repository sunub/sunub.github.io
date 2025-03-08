import {
  ReloadButton,
  ReloadContents,
  ReloadProvider,
} from "@/shared/components/Reloadbutton";
import { MDXComponentsRootContainer } from "@/MDXComponents/shared/style";
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
