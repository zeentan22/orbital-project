import axios from "axios";

export const fetchDataFromNusMods = async (acadYear, moduleCode) => {
  const response = await axios
    .get(`https://api.nusmods.com/v2/${acadYear}/modules/${moduleCode}.json`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return response;
};

export const getExamDate = (data, semester) => {
  if (!data) {
    return [];
  } else {
    console.log(data.semesterData);
    console.log("---");
    const semesterMod = data.semesterData.filter(
      (mod) => mod.semester === parseInt(semester)
    );
    console.log(semesterMod);
    console.log("pass");
    if (semesterMod) {
      return [data.moduleCode, semesterMod[0].examDate];
    } else {
      return [];
    }
  }
};
