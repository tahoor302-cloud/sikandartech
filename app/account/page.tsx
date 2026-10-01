import type { Metadata } from "next";
import { AccountView } from "@/components/pages/account-view";
export const metadata: Metadata = { title: "Account", robots: { index: false } };
export default function AccountPage() { return <AccountView />; }
