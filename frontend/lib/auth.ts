import Cookies from 'js-cookie';

const TOKEN_KEY = 'creativemicroink_token';
const TOKEN_EXPIRY_DAYS = 7;

/**
 * Get the authentication token from cookies
 */
export function getToken(): string | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return Cookies.get(TOKEN_KEY);
}

/**
 * Set the authentication token in cookies
 */
export function setToken(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  Cookies.set(TOKEN_KEY, token, {
    expires: TOKEN_EXPIRY_DAYS,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
}

/**
 * Remove the authentication token from cookies
 */
export function removeToken(): void {
  if (typeof window === 'undefined') {
    return;
  }
  Cookies.remove(TOKEN_KEY);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) {
    return false;
  }

  // Optionally decode JWT to check expiry
  try {
    const payload = parseJwt(token);
    if (payload && typeof payload.exp === 'number') {
      // Check if token is expired
      const expiryDate = new Date(payload.exp * 1000);
      if (expiryDate < new Date()) {
        removeToken();
        return false;
      }
    }
    return true;
  } catch {
    // If token parsing fails, consider it invalid
    removeToken();
    return false;
  }
}

/**
 * Parse JWT token payload
 */
function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Get user info from token
 */
export function getUserFromToken(): { id: string; email: string; name?: string } | null {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const payload = parseJwt(token);
    if (payload && typeof payload.sub === 'string' && typeof payload.email === 'string') {
      return {
        id: payload.sub,
        email: payload.email,
        name: typeof payload.name === 'string' ? payload.name : undefined,
      };
    }
    return null;
  } catch {
    return null;
  }
}
