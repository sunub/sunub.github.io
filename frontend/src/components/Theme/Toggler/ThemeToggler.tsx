import type { Theme } from 'type';
import ThemeTogglerButton from './ThemeTogglerButton';

export async function ThemeToggler({ theme }: { theme: Theme }) {
  return <ThemeTogglerButton theme={theme} maskId="mobile-header-theme-toggler" />;
}
