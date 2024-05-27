export function useCookie() {
  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}`;
  };

  const getCookie = (name: string): string | undefined => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return undefined;
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return { setCookie, getCookie, deleteCookie };
}
