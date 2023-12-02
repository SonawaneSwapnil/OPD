import axios from "axios";
const Base_Url = "https://atopdapi.atopd.in/";
//const Base_Url = "https://localhost:7262/";
class Service {
  //login URL-
  loginReception(data) {
    return axios.post(Base_Url + "api/Receptions/Login", data);
  }
  loginDoctor(data) {
    return axios.post(Base_Url + "api/Doctors/Login", data);
  }
  loginAdmin(data) {
    return axios.post(Base_Url + "api/Admin/Login", data);
  }

  //Patient URL-
  getAllPatients(Todayrecord) {
    return axios.get(Base_Url + "api/Patients/" + Todayrecord);
  }

  getAllPatients() {
    return axios.get(Base_Url + "api/Patients");
  }
  savePatients(data) {
    return axios.post(Base_Url + "api/Patients", data);
  }
  deleteRecord(data) {
    return axios.delete(Base_Url + "api/Patients", {
      data: data,
    });
  }
  updatePatients(id, dFlag, data) {
    return axios.put(Base_Url + "api/Patients/" + id + "/" + dFlag, data);
  }

  //Specialization URL
  getAllSpecialization() {
    return axios.get(Base_Url + "api/Specializations");
  }
  saveSpecialization(data) {
    return axios.post(Base_Url + "api/Specializations", data);
  }
  deleteSpecialization(id) {
    return axios.delete(Base_Url + "api/Specializations/" + id);
  }
  updateSpecialization(id, data) {
    return axios.put(Base_Url + "api/Specializations/" + id, data);
  }

  //Doctor URL-
  getAllDoctor() {
    return axios.get(Base_Url + "api/Doctors");
  }

  getAllPatientsByDoctor(id) {
    return axios.get(Base_Url + "api/Patients/" + id);
  }

  getPatientById(id) {
    return axios.get(Base_Url + "api/Patients/single/" + id);
  }

  saveDoctor(data) {
    return axios.post(Base_Url + "api/Doctors", data);
  }

  updateDoctors(id, data) {
    return axios.put(Base_Url + "api/Doctors/" + id, data);
  }

  deleteDoctorRecord(id) {
    return axios.delete(Base_Url + "api/Doctors/" + id);
  }

  //Medicine URL-
  getAllMedicines() {
    return axios.get(Base_Url + "api/Medicines");
  }

  getReportMedicineDetails(startdt, enddt) {
    return axios.get(
      Base_Url + "api/Medicines/single/" + startdt + "/" + enddt
    );
  }

  GetMedicine(id) {
    return axios.get(Base_Url + "api/Medicines/" + id);
  }

  saveMedicines(data) {
    return axios.post(Base_Url + "api/Medicines", data);
  }

  deleteMedicineRecord(id) {
    return axios.delete(Base_Url + "api/Medicines/" + id);
  }

  //Billing Details
  saveTreatmentBillingdetails(data) {
    return axios.post(Base_Url + "api/BillingDetails", data);
  }

  updateTreatmentBillingdetails(id, data) {
    return axios.put(Base_Url + "api/BillingDetails/" + id, data);
  }

  getTreatmentBillingdetails(id) {
    return axios.get(Base_Url + "api/BillingDetails/" + id);
  }

  //treatment URL
  getTreatment() {
    return axios.get(Base_Url + "api/Treatment");
  }
  getTreatments(id) {
    return axios.get(Base_Url + "api/Treatment" + id);
  }

  getTreatmentName(TreatmentName) {
    return axios.get(Base_Url + "api/Treatment/" + TreatmentName);
  }

  saveTreatment(data) {
    return axios.post(Base_Url + "api/Treatment", data);
  }

  deleteTreatmentRecord(id) {
    return axios.delete(Base_Url + "api/Treatment/" + id);
  }
}

export default new Service();
