class Auth {
  constructor(url) {
    this.url = url;
  }

  async _fetchData(endpoint, requestMethod, { email, password, token }) {
    const response = await fetch(`${this.url}${endpoint}`, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status}, ${response.message}`);

    return data;
  }

  async register({ email, password }) {
    const record = await this._fetchData("/signup", "POST", {
      email,
      password,
    });
    return record;
  }

  authorize({ email, password }) {
    return this._fetchData("/signin", "POST", { email, password });
  }

  async isValidToken(endpoint, token) {
    const response = await fetch(`${this.url}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status}`);
    return data;
  }
}

const auth = new Auth("https://se-register-api.en.tripleten-services.com/v1");

export default auth;
