
import { useEffect, useState } from 'react';
import { detectSuspiciousActivity } from '@/utils/security';
import { useToast } from '@/hooks/use-toast';

interface SecurityWrapperProps {
  children: React.ReactNode;
  requireSecure?: boolean;
}

const SecurityWrapper = ({ children, requireSecure = false }: SecurityWrapperProps) => {
  const [isSecure, setIsSecure] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for HTTPS in production
    if (requireSecure && window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      setIsSecure(false);
      toast({
        title: "Insecure Connection",
        description: "This page requires a secure HTTPS connection.",
        variant: "destructive"
      });
      return;
    }

    // Check for suspicious user agent
    if (detectSuspiciousActivity(navigator.userAgent)) {
      console.warn('Suspicious activity detected');
      // Log this for monitoring but don't block legitimate users
    }

    // Add security headers via meta tags (limited effectiveness but better than nothing)
    const metaTags = [
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { name: 'X-Content-Type-Options', content: 'nosniff' },
      { name: 'X-Frame-Options', content: 'DENY' },
      { name: 'X-XSS-Protection', content: '1; mode=block' }
    ];

    metaTags.forEach(tag => {
      const existing = document.querySelector(`meta[name="${tag.name}"]`);
      if (!existing) {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Disable right-click on admin pages for basic protection
    if (requireSecure) {
      const handleContextMenu = (e: MouseEvent) => e.preventDefault();
      const handleKeyDown = (e: KeyboardEvent) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+U
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.key === 'u')) {
          e.preventDefault();
        }
      };

      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [requireSecure, toast]);

  if (!isSecure) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Secure Connection Required</h1>
          <p>This page requires a secure HTTPS connection to protect your data.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SecurityWrapper;
