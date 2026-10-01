import { PageEnter } from "@/components/animations/page-transition";

/** Re-mounts on every navigation → drives the page-enter transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageEnter>{children}</PageEnter>;
}
