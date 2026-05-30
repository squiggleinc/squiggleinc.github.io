import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] py-10 text-center font-mono text-xs text-[#888888]">
      © {new Date().getFullYear()} {profile.name}. Built from scratch.
    </footer>
  );
}
