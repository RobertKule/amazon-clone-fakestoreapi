/**
 * Composant Button réutilisable
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const baseClasses =
    'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-amazon-blue text-white hover:bg-blue-700 focus:ring-amazon-blue',
    secondary:
      'bg-amazon-orange text-white hover:bg-orange-600 focus:ring-amazon-orange',
    outline:
      'border border-amazon-blue text-amazon-blue hover:bg-blue-50 focus:ring-amazon-blue',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
