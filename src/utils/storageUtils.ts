const AGENT_ID = "AGENT_ID";

const setAgentAccessId = (id: string) => {
  localStorage.setItem(AGENT_ID, id);
};

const getAgentAccessId = (): string | null => {
  return localStorage.getItem(AGENT_ID);
};

const storageUtils = {
  setAgentAccessId,
  getAgentAccessId,
};

export default storageUtils;
