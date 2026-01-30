import { FaUser } from "react-icons/fa6";

interface UserAvatarProps {
  user: any;
  size?: 'sm' | 'md' | 'lg';
  showUsername?: boolean;
}

export default function UserAvatar({ user, size = 'md', showUsername = false }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 sm:w-5 sm:h-5',
    md: 'w-6 h-6 sm:w-8 sm:h-8',
    lg: 'w-8 h-8 sm:w-10 sm:h-10'
  };

  const iconSizes = {
    sm: 'text-xs sm:text-sm',
    md: 'text-lg sm:text-sm',
    lg: 'text-xl sm:text-lg'
  };

  return (
    <div className="flex items-center gap-2">
      {user?.profile ? (
        <img 
          src={user.profile} 
          alt={user.username || 'User'}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <FaUser className={iconSizes[size]} />
      )}
      {showUsername && user?.username && (
        <span className="hidden sm:inline">{user.username}</span>
      )}
    </div>
  );
}