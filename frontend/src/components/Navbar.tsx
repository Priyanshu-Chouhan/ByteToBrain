"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useNavbarContext } from '../context/NavbarContext';
import { useAuth } from '../context/AuthContext';

const ChevronDown = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline ml-1">
    <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [openServices, setOpenServices] = useState(false);
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  console.log('Navbar auth:', auth);
  console.log('Navbar user:', user);

  // Add this useEffect to debug
  useEffect(() => {
    console.log('Navbar user changed:', user);
  }, [user]);

  const [showProfile, setShowProfile] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [mobileEditMode, setMobileEditMode] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editReference, setEditReference] = useState(user?.reference || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [removeSuccess, setRemoveSuccess] = useState(false);

  useEffect(() => {
    setEditName(user?.name || "");
    setEditPhone(user?.phone || "");
    setEditReference(user?.reference || "");
  }, [user]);

  const handleSave = async () => {
    setSaveError(null);
    if (user && auth?.login) {
      let newAvatar = user.avatar;
      try {
        if (avatarFile) {
          const formData = new FormData();
          formData.append('avatar', avatarFile);
          const res = await fetch(`${BACKEND_URL}/api/users/profile/avatar`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            body: formData,
          });
          const data = await res.json();
          if (res.ok && data.avatar) {
            // Fetch updated profile
            const profileRes = await fetch(`${BACKEND_URL}/api/users/profile-details`, {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            const profileData = await profileRes.json();
            if (profileRes.ok && profileData.profile) {
              newAvatar = profileData.profile.avatar;
            } else {
              newAvatar = data.avatar;
            }
          } else {
            setSaveError(data.error || 'Avatar upload failed');
            return;
          }
        }
        const res = await fetch(`${BACKEND_URL}/api/users/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            name: editName,
            phone: editPhone,
            reference: editReference,
          }),
        });
        const data = await res.json();
        // Always fetch latest profile after save
        const profileRes = await fetch(`${BACKEND_URL}/api/users/profile-details`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        const profileData = await profileRes.json();
        if (res.ok && data.user) {
          // Preserve avatar if not set in profileData
          let avatarToSet;
          if (avatarFile) {
            avatarToSet = newAvatar;
          } else if (profileData.profile && profileData.profile.avatar !== undefined && profileData.profile.avatar !== null && profileData.profile.avatar !== '' && profileData.profile.avatar !== 'null') {
            avatarToSet = profileData.profile.avatar;
          } else {
            avatarToSet = user.avatar;
          }
          auth.login({ ...user, ...data.user, avatar: avatarToSet });
          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 2000);
        } else {
          setSaveError(data.error || 'Profile update failed');
          return;
        }
      } catch (err: any) {
        setSaveError(err.message || 'Something went wrong');
        return;
      }
    }
    setEditMode(false);
    setAvatarFile(null);
    setAvatarPreview(null);
    setShowProfile(false);
  };

  // Helper for avatar validity
  const isAvatarValid = user && user.avatar && user.avatar !== 'null' && user.avatar !== '' && user.avatar !== null && user.avatar !== undefined && user.avatar !== 'profile.png';

  const handleRemoveAvatar = async () => {
    setSaveError(null);
    // Instantly update UI
    auth && auth.login({
      ...user,
      name: user?.name || '',
      email: user?.email || '',
      avatar: undefined
    });
    setAvatarPreview(null);
    setAvatarFile(null);
    setRemoveSuccess(true);
    setTimeout(() => setRemoveSuccess(false), 2000);
    // Backend call in background
    try {
      await fetch(`${BACKEND_URL}/api/users/profile/avatar`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });
      // Optionally, fetch latest profile and update again if needed
    } catch (err: any) {
      setSaveError(err.message || 'Something went wrong');
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setMobileEditMode(false);
    setEditName(user?.name || "");
    setEditPhone(user?.phone || "");
    setEditReference(user?.reference || "");
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setOpenServices(false);
        setActiveSubmenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Service categories and sub-services
  const serviceCategories = [
    {
      label: 'Development',
      key: 'development',
      services: [
        { label: 'Web & Mobile Development', href: '/services/web-development' },
      ],
    },
    {
      label: 'Designing',
      key: 'uiux-branding',
      services: [
        { label: 'UI/UX & Branding', href: '/services/uiux-branding' },
      ],
    },
    {
      label: 'Cloud & Marketing',
      key: 'cloud-marketing',
      services: [
        { label: 'Cloud, DevOps & Digital Marketing', href: '/services/cloud-marketing' },
      ],
    },
  ];


  return (
    // <nav className="sticky top-0 z-50 bg-[#1D1D1F] shadow flex items-center justify-between px-4 py-2 w-full border-b border-[#232326]">
      <nav className="sticky top-0 z-50 bg-[#1D1D1F] shadow flex items-center justify-between px-4 py-2 w-full">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2 group">
          <Image src="/byte-to-brain-logo.png" alt="ByteToBrain Logo" width={180} height={40} className="object-contain grayscale group-hover:filter-none group-hover:brightness-125 transition duration-200 ml-6" />
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-2 h-full">
        <Link href="/" className={`flex items-center h-12 px-3 font-medium transition-colors duration-200 ${pathname === '/' ? 'text-[#2997FF]' : 'text-[#A1A1A6] hover:text-[#2997FF]'}`}>Home</Link>
        <Link href="/about-us" className={`flex items-center h-12 px-3 font-medium transition-colors duration-200 ${pathname === '/about-us' ? 'text-[#2997FF]' : 'text-[#A1A1A6] hover:text-[#2997FF]'}`}>About Us</Link>
        <div className="relative flex items-center h-12 px-3 group" ref={servicesRef}>
          <button
            className="text-[#A1A1A6] hover:text-[#2997FF] font-medium flex items-center gap-1 transition-colors duration-200 h-full"
            type="button"
          >
            Services {ChevronDown}
          </button>
          <div className="absolute left-0 mt-28 bg-[#232326] border border-[#333] rounded shadow-lg min-w-[260px] flex-col z-[60] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            {serviceCategories.map((cat, idx) => (
              <div
                key={cat.key}
                className="group/item relative"
              >
                <div
                  className="w-full text-left px-4 py-2 text-[#A1A1A6] hover:bg-[#1D1D1F] hover:text-[#2997FF] font-semibold uppercase text-xs tracking-wider flex items-center justify-between transition-colors duration-200"
                >
                  {cat.label}
                  <span className="ml-2">▶</span>
                </div>
                {/* Submenu */}
                <div
                  className="absolute left-full bg-[#232326] border border-[#333] rounded shadow-lg min-w-[220px] z-[70] opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200"
                  style={{ top: '0', marginTop: '0', maxHeight: '80vh', overflowY: 'auto' }}
                >
                  {cat.services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 py-2 text-[#A1A1A6] hover:bg-[#1D1D1F] hover:text-[#2997FF] rounded transition-colors duration-200"
                      onClick={() => { setMenuOpen(false); setOpenServices(false); setActiveSubmenu(null); }}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link href="/our-work" className={`flex items-center h-12 px-3 font-medium transition-colors duration-200 ${pathname === '/our-work' ? 'text-[#2997FF]' : 'text-[#A1A1A6] hover:text-[#2997FF]'}`}>Our Work</Link>
        <Link href="/career" className={`flex items-center h-12 px-3 font-medium transition-colors duration-200 ${pathname === '/career' || pathname.startsWith('/job-details') ? 'text-[#2997FF]' : 'text-[#A1A1A6] hover:text-[#2997FF]'}`}>Career</Link>
        {user ? (
          <>
            <div ref={avatarRef} className="relative ml-2">
              <img
                src={
                  avatarPreview
                    ? avatarPreview
                    : isAvatarValid
                      ? `http://localhost:5000/avatars/${user.avatar}`
                      : '/profile.png'
                }
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-[#2997FF] object-cover cursor-pointer"
                onClick={() => setShowProfile((v) => !v)}
              />
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-[#232326] rounded-xl shadow-lg border border-[#2997FF] z-50 p-4">
                  <div className="flex flex-col items-center mb-2">
                    <div className="relative">
                      <img
                        src={
                          editMode && avatarPreview
                            ? avatarPreview
                            : isAvatarValid
                              ? `http://localhost:5000/avatars/${user.avatar}`
                              : '/profile.png'
                        }
                        alt="avatar"
                        className="w-20 h-20 rounded-full border-2 border-[#2997FF] object-cover mb-2"
                      />
                      {editMode && (
                        <>
                          <label className="absolute bottom-2 right-2 bg-[#2997FF] rounded-full p-1 cursor-pointer hover:bg-[#0071E3] transition">
                            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6" />
                            </svg>
                          </label>
                        </>
                      )}
                    </div>
                    <div className="text-white font-bold mt-2">{user.name}</div>
                    <div className="text-xs text-[#A1A1A6]">{user.email}</div>
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    <div>
                      <b>Name:</b>
                      {editMode ? (
                        <input
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="bg-[#18181b] border border-[#2997FF] rounded px-2 py-1 text-white w-full mt-1"
                          placeholder="Full Name"
                        />
                      ) : (
                        <span className="ml-1">{user.name}</span>
                      )}
                    </div>
                    <div>
                      <b>Phone:</b>
                      {editMode ? (
                        <input
                          value={editPhone}
                          onChange={e => setEditPhone(e.target.value)}
                          className="bg-[#18181b] border border-[#2997FF] rounded px-2 py-1 text-white w-full mt-1"
                          placeholder="Mobile Number"
                        />
                      ) : (
                        <span className="ml-1">{user.phone || '-'}</span>
                      )}
                    </div>
                    <div>
                      <b>Reference:</b>
                      {editMode ? (
                        <input
                          value={editReference}
                          onChange={e => setEditReference(e.target.value)}
                          className="bg-[#18181b] border border-[#2997FF] rounded px-2 py-1 text-white w-full mt-1"
                          placeholder="Reference (e.g. Instagram)"
                        />
                      ) : (
                        <span className="ml-1">{user.reference || '-'}</span>
                      )}
                    </div>
                  </div>
                  {editMode ? (
                    <div className="flex gap-2 mb-2">
                      <button onClick={handleSave} className="flex-1 bg-[#2997FF] text-white py-1 rounded-full font-semibold hover:bg-blue-600 transition">Save</button>
                      <button onClick={handleCancel} className="flex-1 bg-gray-500 text-white py-1 rounded-full font-semibold hover:bg-gray-700 transition">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditMode(true)} className="w-full bg-[#A259FF] text-white py-1 rounded-full font-semibold hover:bg-[#7c3aed] transition mb-2">Edit</button>
                  )}
                  {editMode && (isAvatarValid || avatarPreview) && (
                    <button
                      onClick={handleRemoveAvatar}
                      className="bg-red-600 text-white px-3 py-1 rounded-full mb-2 mt-2 text-xs"
                      type="button"
                    >
                      Remove Avatar
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className="w-full bg-[#FF6F91] text-white py-1 rounded-full font-semibold hover:bg-red-500 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className={`flex items-center h-12 px-3 font-medium transition-colors duration-200 ${pathname === '/login' ? 'text-[#2997FF]' : 'text-[#A1A1A6] hover:text-[#2997FF]'}`}>Login</Link>
            <Link href="/signup" className={`flex items-center h-12 px-3 font-medium transition-colors duration-200 ${pathname === '/signup' ? 'text-[#2997FF]' : 'text-[#A1A1A6] hover:text-[#2997FF]'}`}>Sign Up</Link>
          </>
        )}
        <Link href="/contact" className="ml-4 flex items-center h-10 px-6 py-2 bg-[#2997FF] text-white rounded-full font-semibold shadow-lg hover:bg-[#0071E3] transition-all duration-200 border border-[#2997FF] hover:border-[#0071E3]">Contact Us</Link>
      </div>
      {saveSuccess && (
        <div className="fixed top-20 right-6 bg-green-600 text-white px-4 py-2 rounded shadow z-[9999]">
          Saved successfully!
        </div>
      )}
      {saveError && (
        <div className="fixed top-32 right-6 bg-red-600 text-white px-4 py-2 rounded shadow z-[9999]">
          {saveError}
        </div>
      )}
      {removeSuccess && (
        <div className="fixed top-20 right-6 bg-green-600 text-white px-4 py-2 rounded shadow z-[9999]">
          Avatar removed successfully!
        </div>
      )}
      {/* Mobile menu */}
      <button className="md:hidden p-2 text-[#F5F5F7]" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="text-2xl">{menuOpen ? '✕' : '☰'}</span>
      </button>
      {menuOpen && (
        <div 
          className="absolute top-full left-0 w-full bg-[#18181b] border-t border-[#232326] md:hidden z-40"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-4 gap-2 text-[#A1A1A6]">
            <Link href="/" className="hover:text-[#2997FF] py-1" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/about-us" className="hover:text-[#2997FF] py-1" onClick={() => setMenuOpen(false)}>About Us</Link>
            
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenServices(!openServices);
                }}
                className="flex items-center justify-between w-full hover:text-[#2997FF] py-1"
              >
                Services
                <svg className={`w-4 h-4 transition-transform ${openServices ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openServices && (
                <div className="ml-4 mt-2 bg-[#232326] border border-[#333] rounded p-2">
                  <Link href="/services/web-development" className="block px-3 py-2 text-[#A1A1A6] hover:text-[#2997FF] text-sm" onClick={() => { setMenuOpen(false); setOpenServices(false); }}>Web & Mobile Development</Link>
                  <Link href="/services/uiux-branding" className="block px-3 py-2 text-[#A1A1A6] hover:text-[#2997FF] text-sm" onClick={() => { setMenuOpen(false); setOpenServices(false); }}>UI/UX & Branding</Link>
                  <Link href="/services/cloud-marketing" className="block px-3 py-2 text-[#A1A1A6] hover:text-[#2997FF] text-sm" onClick={() => { setMenuOpen(false); setOpenServices(false); }}>Cloud, DevOps & Digital Marketing</Link>
                </div>
              )}
            </div>
            
            <Link href="/our-work" className="hover:text-[#2997FF] py-1" onClick={() => setMenuOpen(false)}>Our Work</Link>
            <Link href="/career" className="hover:text-[#2997FF] py-1" onClick={() => setMenuOpen(false)}>Career</Link>
            
            {/* Auth Section */}
            <div className="border-t border-[#232326] pt-3 mt-2">
              {user ? (
                <div onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={user.avatar && user.avatar !== 'profile.png' && user.avatar !== 'null' 
                        ? `${BACKEND_URL}/avatars/${user.avatar}` 
                        : '/profile.png'}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-[#2997FF] object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">{user.name}</div>
                      <div className="text-xs text-[#A1A1A6] truncate">{user.email}</div>
                    </div>
                  </div>
                  
                  {/* Mobile Profile Edit Section */}
                  {mobileEditMode ? (
                    <div className="mb-3 space-y-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="w-full bg-[#232326] border border-[#2997FF] rounded px-3 py-2 text-white text-sm"
                        placeholder="Full Name"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <input
                        value={editPhone}
                        onChange={e => setEditPhone(e.target.value)}
                        className="w-full bg-[#232326] border border-[#2997FF] rounded px-3 py-2 text-white text-sm"
                        placeholder="Phone Number"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <input
                        value={editReference}
                        onChange={e => setEditReference(e.target.value)}
                        className="w-full bg-[#232326] border border-[#2997FF] rounded px-3 py-2 text-white text-sm"
                        placeholder="Reference"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSave();
                            setMobileEditMode(false);
                          }}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setMobileEditMode(false);
                            handleCancel();
                          }}
                          className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMobileEditMode(true);
                        setEditMode(true);
                      }}
                      className="w-full bg-[#A259FF] text-white py-2 rounded-lg font-medium hover:bg-[#7c3aed] transition-colors mb-2"
                    >
                      Edit Profile
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (logout) {
                        logout();
                      }
                      setMenuOpen(false);
                      setMobileEditMode(false);
                      setEditMode(false);
                    }}
                    className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link 
                    href="/login" 
                    className="block text-center bg-[#2997FF] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#0071E3] transition-colors" 
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup" 
                    className="block text-center border border-[#2997FF] text-[#2997FF] py-2 px-4 rounded-lg font-medium hover:bg-[#2997FF] hover:text-white transition-colors" 
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              href="/contact" 
              className="mt-2 text-center bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors" 
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// WhatsApp Sticky Button

const whatsappNumber = '918269028823'; // Updated WhatsApp number (remove spaces, add country code)
const whatsappLink = `https://wa.me/${whatsappNumber}`;

function WhatsAppStickyButton() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-[100] bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center w-14 h-14 transition-all duration-200 shadow-lg"
      aria-label="Chat on WhatsApp"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
    >
      <img src="/whatsapp.png" alt="WhatsApp" className="w-9 h-9 object-contain rounded-full" />
    </a>
  );
}

export { WhatsAppStickyButton }; 
