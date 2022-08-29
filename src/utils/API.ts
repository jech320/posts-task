class API {
  static baseURL = process.env.REACT_APP_API_BASE_URL;

  static async _fetch(path: string, options: RequestInit) {
    const result = await fetch(`${API.baseURL}/${path}`, options);

    return result.json();
  }

  static get(path: string, options: RequestInit) {
    return API._fetch(path, options);
  }
}

export { API };
