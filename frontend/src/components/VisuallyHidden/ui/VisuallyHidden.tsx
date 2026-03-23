import { VisuallyHiddenComponent } from "./VisuallyHidden.style";

const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
	return <VisuallyHiddenComponent>{children}</VisuallyHiddenComponent>;
};

export { VisuallyHidden };
