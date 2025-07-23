import { motion } from "framer-motion";
import Link from "next/link";

export default function AnimatedDropdown({ open }: { open: boolean }) {
  if (!open) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute left-0 mt-2 bg-white border rounded shadow-lg min-w-[180px]"
    >
      <Link href="/services/tech" className="block px-4 py-2 hover:bg-blue-50">Web Development</Link>
      <Link href="/services/tech" className="block px-4 py-2 hover:bg-blue-50">Branding & UI/UX</Link>
      <Link href="/services/tech" className="block px-4 py-2 hover:bg-blue-50">Maintenance & Support</Link>
      <Link href="/services/tech" className="block px-4 py-2 hover:bg-blue-50">WordPress / CMS Setup</Link>
    </motion.div>
  );
}