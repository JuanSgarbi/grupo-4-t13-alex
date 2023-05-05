import axios from "axios";

export const api = axios.create({
  baseURL: "https://back-kars-04.onrender.com",
});

export const fipeApi = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com",
});

export const cepApi = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});
