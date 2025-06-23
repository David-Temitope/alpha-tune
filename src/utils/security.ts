
// Security utilities for the application
export const securityConfig = {
  // Content Security Policy headers
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.gpteng.co"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://nvmjnieozvtuzxyrfbth.supabase.co"],
    frameSrc: ["'none'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"]
  },
  
  // Rate limiting configuration
  rateLimiting: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDuration: 5 * 60 * 1000 // 5 minutes
  },
  
  // Input validation patterns
  validation: {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s\-\(\)]{10,}$/,
    noScript: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    noHtml: /<[^>]*>/g
  }
};

// Sanitize user input
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(securityConfig.validation.noScript, '') // Remove script tags
    .replace(securityConfig.validation.noHtml, '') // Remove HTML tags
    .trim();
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  return securityConfig.validation.email.test(email);
};

// Generate secure session token
export const generateSecureToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Check for suspicious activity patterns
export const detectSuspiciousActivity = (userAgent: string, ip?: string): boolean => {
  const suspiciousPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /scan/i,
    /hack/i,
    /sqlmap/i,
    /nmap/i
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
};

// Secure localStorage wrapper
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      const encrypted = btoa(value); // Basic encoding (in production, use proper encryption)
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const encrypted = localStorage.getItem(key);
      return encrypted ? atob(encrypted) : null;
    } catch (error) {
      console.error('Storage retrieval error:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  }
};
