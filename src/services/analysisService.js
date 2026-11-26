import api from "./api";

// Reads the saved resume text on the server and runs the AI analysis
export async function analyzeResume(resumeId) {
  const { data } = await api.post(`/resumes/${resumeId}/analyze`);
  return data.analysis;
}

export async function getAnalysis(id) {
  const { data } = await api.get(`/analyses/${id}`);
  return data.analysis;
}

export async function listAnalyses() {
  const { data } = await api.get("/analyses");
  return data.analyses;
}

export async function deleteAnalysis(id) {
  await api.delete(`/analyses/${id}`);
}