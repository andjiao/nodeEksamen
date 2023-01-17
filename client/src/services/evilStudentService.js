import axios from "axios";
import apiUrl from "../config.json";

const apiEndpoint = apiUrl + "/evilStudents";

function evilStudentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

function getEvilStudents() {
  return axios.get(apiEndpoint);
}

function getEvilStudent(evilStudentId) {
  return axios.get(evilStudentUrl(evilStudentId));
}

function saveEvilStudent(evilStudent) {
  if (evilStudent._id) {
    const body = { ...evilStudent };
    delete body._id;
    return axios.put(evilStudentUrl(evilStudent._id), body);
  }

  return axios.post(apiEndpoint, evilStudent);
}

function deleteEvilStudent(evilStudentId) {
  return axios.delete(evilStudentUrl(evilStudentId));
}

export{getEvilStudents, getEvilStudent, saveEvilStudent, deleteEvilStudent};
