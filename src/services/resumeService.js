import api from "./api";

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("resume", file); // field name must match the backend

  // Don't set Content-Type manually, the browser adds the boundary
  const { data } = await api.post("/resumes", formData);
  return data.resume;
}