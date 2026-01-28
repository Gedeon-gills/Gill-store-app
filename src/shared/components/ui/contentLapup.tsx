import type { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}
export default function ContentWrapper({
  children,
  className = "",
}: ContentWrapperProps) {
  return (
    <div className="w-full flex justify-center">
      <div className={`w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}
