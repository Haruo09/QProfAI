'use client';
import React, { useState } from 'react'
import styles from './NavBar.module.css';
import Link from 'next/link';
import { Righteous } from 'next/font/google';
import SpinnerEffect from './loading/SpinnerEffect';
import { usePathname } from 'next/navigation';
import Redirecting from './loading/Redirecting';

const righteous = Righteous({ weight: '400', subsets: ["latin"] });

export default function NavBar() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const pathname = usePathname();

  return (
    <div className={styles.navbar}>
      <h1 className={`${righteous.className} text-2xl m-0`}>QprofAI</h1>
      <div className="wrapper flex items-end">
        <Link className={styles.link} href={'/qform'} onClick={() => {if (pathname != "/qform") setIsRedirecting(true)}}>QForm</Link>
        <Link className={styles.link} href={'/questoes'} onClick={() => {if (pathname != "/questoes") setIsRedirecting(true)}}>Questões</Link>
      </div>
      { isRedirecting && <Redirecting/> }
    </div>
  )
}
