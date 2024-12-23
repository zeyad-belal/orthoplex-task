import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <Loader2 
      role="status"
      className="animate-spin h-5 w-5 text-white" 
    />
  );
}
