import axios from "axios";

export class HttpClient {
  baseUrl;
  constructor(url) {
    this.baseUrl = url;
  }

  async get(endpoint) {
    const token = localStorage.getItem("tokenAdmin");
    const header = `Bearer ${token}`;
    return await axios.get(`${this.baseUrl}/${endpoint}`, {
      headers: { Authorization: header },
    });
  }

  async put(endpoint, body) {
    const token = localStorage.getItem("tokenAdmin");
    const header = `Bearer ${token}`;
    return await axios.put(`${this.baseUrl}/${endpoint}`, body, {
      headers: { Authorization: header },
    });
  }

  async post(endpoint, body) {
    const token = localStorage.getItem("tokenAdmin");
    const header = `Bearer ${token}`;
    return await axios.post(`${this.baseUrl}/${endpoint}`, body, {
      headers: { Authorization: header },
    });
  }

  async delete(endpoint) {
    const token = localStorage.getItem("tokenAdmin");
    const header = `Bearer ${token}`;
    return await axios.delete(`${this.baseUrl}/${endpoint}`, {
      headers: { Authorization: header },
    });
  }
}
