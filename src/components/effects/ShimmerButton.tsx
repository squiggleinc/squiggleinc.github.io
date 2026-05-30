'use client'

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
}

export default function ShimmerButton({
  children = 'Book Now',
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-12 animate-[shimmer2_2.5s_infinite_linear] items-center justify-center rounded-xl border border-[#6d28d9]/60 bg-[linear-gradient(110deg,#4c1d95,45%,#7c3aed,55%,#4c1d95)] bg-[size:200%_100%] px-8 font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(76,29,149,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
