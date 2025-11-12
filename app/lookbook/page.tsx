import { redirect } from "next/navigation";

export const metadata = {
  title: "Lookbook",
  description: "Redirecting to Lookbooks.",
};

export default function LookbookPage() {
  redirect("/lookbooks");
}