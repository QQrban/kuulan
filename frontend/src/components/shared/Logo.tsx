import Link from 'next/link';
import Image from 'next/image';
import logo from '@/../public/logos/kuulan.svg';
import { JSX } from 'react';

interface LogoProps {
  showText?: boolean;
}

export default function Logo({ showText = true }: LogoProps): JSX.Element {
  return (
    <Link href="/">
      <div className="flex items-center gap-1">
        <div className="w-15">
          <Image width={50} height={50} src={logo} alt="logo" />
        </div>
        {showText && (
          <span className="text-2xl font-semibold tracking-tight text-(--brand-1)">
            Kuulan
          </span>
        )}
      </div>
    </Link>
  );
}
