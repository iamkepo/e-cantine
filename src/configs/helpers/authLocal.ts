const authLocal = {
  async setAccessToken(accessToken: string): Promise<void> {
    localStorage.setItem("accessToken", accessToken);
  },

  async setRefreshToken(refreshToken: string): Promise<void> {
    localStorage.setItem("refreshToken", refreshToken);
  },

  async setTokens(res: { accessToken: string; refreshToken: string; }): Promise<void> {
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
  },

  async getAccessToken(): Promise<string | null> {
    return localStorage.getItem("accessToken");
  },

  async getRefreshToken(): Promise<string | null> {
    return localStorage.getItem("refreshToken");
  },

  getTokens(): { accessToken: string | null; refreshToken: string | null; } {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return { accessToken, refreshToken };
  },

  async removeTokens(reload?: boolean): Promise<void> {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    if (reload) {
      window.location.replace(window.location.origin);
    }
  }
};

export default authLocal;