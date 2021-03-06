import api from "./api";

const end_point = "sections";

export default {
  create(section) {
    return api.post(end_point, section);
  },
  read(sectionId) {
    return api.get(`${end_point}${sectionId ? "/" + sectionId : ""}`);
  },
  update(id, section) {
    return api.patch(`${end_point}/${id}`, section);
  },
  delete(id) {
    return api.delete(`${end_point}/${id}`);
  },
};
