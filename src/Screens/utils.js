import axios from "axios";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

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
    // console.log(data.semesterData);
    // console.log("---");
    const semesterMod = data.semesterData.filter(
      (mod) => mod.semester === parseInt(semester)
    );
    // console.log(semesterMod);
    // console.log("pass");
    if (semesterMod) {
      return [data.moduleCode, semesterMod[0].examDate];
    } else {
      return [];
    }
  }
};

export const convertTime = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const appendHr = hours < 10 ? "0" : "";
  const appendMins = minutes < 10 ? "0" : "";
  return `${appendHr}${hours}:${appendMins}${minutes}`;
};

export const convertDate = (date) => {
  const extraMonthFormat = date.getMonth() + 1 < 10 ? "0" : "";
  const extraDayFormat = date.getDate() < 10 ? "0" : "";
  return `${date.getFullYear()}-${extraMonthFormat}${
    date.getMonth() + 1
  }-${extraDayFormat}${date.getDate()}`;
};

export const handleUpdate = async (
  oldData,
  obj,
  docRef,
  setupdateItem,
  updateItem
) => {
  if (Object.keys(oldData).length === 0) {
    await updateDoc(docRef, { tasks: arrayUnion(obj) });
    alert("added task successfully");
  } else {
    await updateDoc(docRef, {
      tasks: arrayRemove(oldData),
    });
    let updatedTasks = [...oldData.tasks, ...obj.tasks];
    updatedTasks.sort((a, b) => {
      return parseInt(a.startTime) - parseInt(b.startTime);
    });
    let newObj = { date: obj.date, tasks: updatedTasks };
    await updateDoc(docRef, { tasks: arrayUnion(newObj) });
    alert("added task successfully");
  }
  setupdateItem(!updateItem);
};

export const handleDelete = async (
  oldData,
  newData,
  docRef,
  setupdateItem,
  updateItem
) => {
  await updateDoc(docRef, { tasks: arrayRemove(oldData) });
  await updateDoc(docRef, { tasks: arrayUnion(newData) });
  setupdateItem(!updateItem);
};
