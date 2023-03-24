import Resolver from "@forge/resolver";
import { properties } from "@forge/api";

const resolver = new Resolver();
const getStorageData = async (projectKey, storageKey) =>
  await properties.onJiraProject(projectKey).get(storageKey);
const setStorageData = async (projectKey, storageKey, value) =>
  await properties.onJiraProject(projectKey).set(storageKey, value);
const deleteStorageData = async (projectKey, storageKey) =>
  await properties.onJiraProject(projectKey).delete(storageKey);

resolver.define("getProjectProgress", (req) => {
  console.log("get req", req);
  const { storageKey } = req.payload;
  const projectKey = req.context.extension.project.key;
  return getStorageData(projectKey, storageKey)
    .then((data) => {
      console.log("sucess :", data);
      return data;
    })
    .catch((err) => {
      console.log("error", err);
      return null;
    });
});
resolver.define("getMaxProjectProgress", (req) => {
  console.log("get req", req);
  const { storageKey } = req.payload;
  const projectKey = req.context.extension.project.key;
  return getStorageData(projectKey, storageKey)
    .then((data) => {
      console.log("sucess :", data);
      return data;
    })
    .catch((err) => {
      console.log("error", err);
      return null;
    });
});
resolver.define("setMaxProjectProgress", (req) => {
  console.log("set req", req);
  const { storageKey } = req.payload;
  const { value } = req.payload;
  const projectKey = req.context.extension.project.key;
  setStorageData(projectKey, storageKey, value)
    .then((data) => {
      console.log("sucess :", data);
    })
    .catch((err) => {
      console.log("error", err);
    });
});
resolver.define("deleteMaxProjectProgress", (req) => {
  console.log("delete req", req);
  const { storageKey } = req.payload;
  const projectKey = req.context.extension.project.key;
  deleteStorageData(projectKey, storageKey)
    .then((data) => {
      console.log("sucess :", data);
    })
    .catch((err) => {
      console.log("error", err);
    });
});
resolver.define("deleteProjectProgress", (req) => {
  console.log("delete req", req);
  const { storageKey } = req.payload;
  const projectKey = req.context.extension.project.key;
  deleteStorageData(projectKey, storageKey)
    .then((data) => {
      console.log("sucess :", data);
    })
    .catch((err) => {
      console.log("error", err);
    });
});

export const handler = resolver.getDefinitions();
