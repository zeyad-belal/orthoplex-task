import { useEffect } from 'react';
import { XCircle } from 'lucide-react';

export default function ErrorMessage({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Show error for 5 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
      <div className="flex items-center">
        <XCircle className="h-5 w-5 text-red-500 mr-2" />
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
}
