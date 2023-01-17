import axios from "axios";
import apiUrl from "../config.json";

const apiEndpoint = apiUrl + "/goodStudents";

function goodStudentUrl(id) {
  return `${apiEndpoint}/${id}`;
}

function getGoodStudents() {
  return axios.get(apiEndpoint);
}

function getGoodStudent(goodStudentId) {
  return axios.get(goodStudentUrl(goodStudentId));
}

function saveGoodStudent(goodStudent) {
  if (goodStudent._id) {
    const body = { ...goodStudent };
    delete body._id;
    return axios.put(goodStudentUrl(goodStudent._id), body);
  }

  return axios.post(apiEndpoint, goodStudent);
}

function deleteGoodStudent(goodStudentId) {
  return axios.delete(goodStudentUrl(goodStudentId));
}

export{getGoodStudents, getGoodStudent, saveGoodStudent, deleteGoodStudent};
