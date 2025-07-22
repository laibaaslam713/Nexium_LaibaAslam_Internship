import { redirect } from "next/navigation";

export default function SignupPage() {
  redirect("/login"); // Signup and login are same in this case
}
