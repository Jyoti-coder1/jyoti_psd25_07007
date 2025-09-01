import axios from "axios";
import { firebaseConfig } from "../firebase";

const dbUrl = `${firebaseConfig.databaseURL}`;

export const getProjects = async () => {
  const res = await axios.get(`${dbUrl}/projects.json`);
  return res.data;
};

export const getProject = async (id) => {
  const res = await axios.get(`${dbUrl}/projects/${id}.json`);
  return res.data;
};

export const addProject = async (project) => {
  await axios.post(`${dbUrl}/projects.json`, {
    ...project,
    createdAt: Date.now(),
    tasks: {}
  });
};

export const deleteProject = async (id) => {
  await axios.delete(`${dbUrl}/projects/${id}.json`);
};

export const getProjectById = async (id) => {
  const res = await axios.get(`${dbUrl}/projects/${id}.json`);
  return res;
};

export const updateProject = async (id, project) => {
  const res = await axios.put(`${dbUrl}/projects/${id}.json, project`);
  return res;
};

export const addTask = async (projectId, task) => {
  await axios.post(`${dbUrl}/projects/${projectId}/tasks.json`, task);
};

export const updateTask = async (projectId, taskId, updates) => {
  await axios.patch(`${dbUrl}/projects/${projectId}/tasks/${taskId}.json`, updates);
};

export const deleteTask = async (projectId, taskId) => {
  await axios.delete(`${dbUrl}/projects/${projectId}/tasks/${taskId}.json`);
};