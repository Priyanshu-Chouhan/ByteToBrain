"use client";
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./Navbar'), { ssr: false });
const WhatsAppStickyButton = dynamic(() => import('./Navbar').then(mod => ({ default: mod.WhatsAppStickyButton })), { ssr: false });

export default Navbar;
export { WhatsAppStickyButton };