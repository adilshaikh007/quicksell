import axios from "axios";
import Card from "../components/card/card";
const data_req = "DATA_REQUEST";
const data_success = "DATA_SUCCESS";
const data_failure = "DATA_FAILURE";
const select_data_req = "SELECT_DATA_REQUEST";
const select_data_success = "SELECT_DATA_SUCCESS";
const select_data_failure = "SELECT_DATA_FAILURE";
export const fetchAllData = () => async (dispatch) => {
  try {
    dispatch({ type: data_req });
    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    dispatch({ type: data_success, payload: data });
  } catch (error) {
    dispatch({ type: data_failure });
  }
};
export const selectData =
  (group, allTickets, orderValue) => async (dispatch) => {
    try {
      dispatch({ type: select_data_req });
      let user = false;
      let mySet = new Set();
      let arr = [],
        selectedData = [];
      if (group === "status") {
        allTickets.forEach((element) => {
          mySet.add(element.status);
        });
        arr = [...mySet];
        arr.forEach((element, index) => {
          let arr = allTickets.filter((fElement) => {
            return element === fElement.status;
          });
          selectedData.push({
            [index]: {
              title: element,
              value: arr,
            },
          });
        });
      } else if (group === "user") {
        user = true;
        allTickets?.allUser?.forEach((element, index) => {
          arr = allTickets?.allTickets?.filter((Felement) => {
            return element.id === Felement.userId;
          });
          selectedData.push({
            [index]: {
              title: element.name,
              value: arr,
            },
          });
        });
      } else {
        let prior_list = ["No priority", "Urgent", "High", "Medium", "Low"];
        prior_list.forEach((element, index) => {
          arr = allTickets.filter((fElement) => {
            return index === fElement.priority;
          });

          selectedData.push({
            [index]: {
              title: element,
              value: arr,
            },
          });
        });
      }
      if (orderValue === "title") {
        selectedData.forEach((element, index) => {
          element[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
        });
      }
      if (orderValue === "priority") {
        selectedData.forEach((element, index) => {
          element[index]?.value?.sort((a, b) => b.priority - a.priority);
        });
      }
      dispatch({ type: select_data_success, payload: { selectedData, user } });
    } catch (error) {
      dispatch({ type: select_data_failure, payload: error.message });
    }
  };
