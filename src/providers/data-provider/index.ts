"use client";

import { showNotification } from "@mantine/notifications";
import { DataProvider } from "@refinedev/core";
import dataProviderSimpleRest, { axiosInstance } from "@refinedev/simple-rest";
import { getSession } from "next-auth/react";
const backendUrl = "/backend-api";

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    showNotification({
      title: error.status,
      message: error.response.data,
      color: "red",
    });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  async function (config) {
    const session = await getSession();
    const token = session?.user.token as any;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Access-Control-Allow-Origin"] = "*";
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export const api = axiosInstance;
const simpleDataProvider = dataProviderSimpleRest(backendUrl, axiosInstance);

export const dataProvider: DataProvider = {
  getApiUrl: () => backendUrl,
  create(params) {
    return simpleDataProvider.create(params);
  },
  getOne(params) {
    return simpleDataProvider.getOne(params);
  },
  getList({ resource, pagination, sorters, filters, meta }) {
    if (meta?.headers) {
      if (meta.headers["x-resource-id"] && meta.headers["x-sub-resource"]) {
        return axiosInstance
          .get(
            `${backendUrl}/${resource}/${meta.headers["x-resource-id"]}/${meta.headers["x-sub-resource"]}`
          )
          .then((res) => {
            return {
              data: res.data.data,
              total: res.data.total,
            };
          });
      }
    }
    const params = new URLSearchParams();
    if (pagination?.current) {
      params.append("page", pagination.current.toFixed());
    }
    if (pagination?.pageSize) {
      params.append("size", pagination?.pageSize.toFixed());
    }
    filters?.forEach((filter, index) => {
      params.append(`filter[${index}][field]`, (filter as any).field);
      params.append(`filter[${index}][operator]`, filter.operator);
      params.append(`filter[${index}][value]`, filter.value);
    });

    return axiosInstance
      .get(`${backendUrl}/${resource}`, { params })
      .then((res) => {
        return {
          data: res.data.data,
          total: res.data.total,
        };
      });
  },
  update(params) {
    return simpleDataProvider.update(params);
  },
  deleteOne(params) {
    return simpleDataProvider.deleteOne(params);
  },
  custom({ method, url, payload }) {
    switch (method.toLocaleLowerCase()) {
      case "post":
        return axiosInstance.post(`${backendUrl}/${url}`, payload);
      case "get":
        return axiosInstance.get(`${backendUrl}/${url}`);
      case "patch":
        return axiosInstance.patch(`${backendUrl}/${url}`, payload);
      case "delete":
        return axiosInstance.delete(`${backendUrl}/${url}/${(payload as any)?.id as any}`);
      default:
        throw Error("Method: " + method + " is not supported");
    }
  },
};
