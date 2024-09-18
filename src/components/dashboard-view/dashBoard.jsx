
import { React } from "react";
import { useSelector } from "react-redux";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { DiCodeigniter } from "react-icons/di";
import { ReactComponent as BacklogIcon } from '../../assets/icons_FEtask/Backlog.svg';
import { ReactComponent as ToDoIcon } from '../../assets/icons_FEtask/To-do.svg';
import { ReactComponent as InProgressIcon } from '../../assets/icons_FEtask/in-progress.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons_FEtask/Done.svg';
import { ReactComponent as AddIcon } from '../../assets/icons_FEtask/add.svg';
import { ReactComponent as CancelledIcon } from '../../assets/icons_FEtask/Cancelled.svg';
import {
  BsCheckCircleFill,
  BsFillExclamationSquareFill,
} from "react-icons/bs";
import "./dashboard.css";
import Card from "../card/card";
const DashBoard = () => {
  const status = localStorage.getItem("group") === "status";
  const priority = localStorage.getItem("group") === "priority";
  console.log("stat", status, "prio", priority);
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );
  console.log("rere", user);
  return (
    selectedData && (
      <div
        className="dashContainer"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {selectedData.map((element, index) => {
          const cardWidthPercentage = 18.7;
          return (
            <div
              key={index}
              className="dashCardContainer"
              style={{ width: `${cardWidthPercentage}%` }}
            >
              <div className="dashCardHeading flex-sb">
                <div className="leftView">
                  {user ? (
                    <div
                      className="imageContainer relative"
                      style={{

                        width: "10px",
                        height: "15px",
                        display: "inline-block",
                      }}
                    >
                    </div>
                  ) : status ? (
                    <div
                      className="cardTitle"
                      style={{
                        width: "15px",
                        height: "15px",
                        display: "inline-block",
                        fontWeight: 200,
                      }}
                    >
                     
                       {element[index].title === "Backlog" ? (
                        <BacklogIcon style={{ width: "13px", height: "13px" }} />
                      )
                        : element[index].title === "Todo" ? (
                          
                          <ToDoIcon style={{ width: "13px", height: "13px" }} />
                        ) : element[index].title === "In progress" ? (
                          
                          <InProgressIcon style={{ width: "13px", height: "13px" }} />
                        ) : element[index].title === "Done" ? (
                          <BsCheckCircleFill />
                        ) : (
                          <IoMdCloseCircleOutline />
                        )}
                    </div>
                  ) : priority ? (
                    <div
                      className="tags color-grey"
                      style={{
                        width: "35px",
                        height: "30px",
                        display: "inline-block",
                      }}
                    >
                      {element[index].title === "Low" ||
                        element[index].title === "Medium" ||
                        element[index].title === "High" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"

                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-signal"
                          viewBox="0 0 16 16"
                        >
                          <rect x="1" y="10" width="3" height="2" />
                          <rect
                            x="5"
                            y="7"
                            width="3"
                            height="5"
                            opacity={
                              element[index].title === "Medium" ||
                                element[index].title === "High"
                                ? 1
                                : 0.25
                            }
                          />
                          <rect
                            x="9"
                            y="4"
                            width="3"
                            height="8"
                            opacity={element[index].title === "High" ? 1 : 0.25}
                          />
                        </svg>
                      ) : element[index].title === "Urgent" ? (
                        <BsFillExclamationSquareFill />
                      ) : (
                        <p></p>
                      )}
                    </div>
                  ) : (
                    <DiCodeigniter />
                  )}{" "}
                  <span>{element[index]?.title} <span style={{ color: "#8F9997" }}>{element[index].value?.length}</span></span>
                </div>
                <div className="rightView">
                  <AddIcon />{" "}
                  <span style={{ letterSpacing: "2px" }}>...</span>
                </div>
              </div>
              <div className="dashList flex-gap-10">
                {element[index]?.value?.map((element, ind) => {
                  return (
                    <Card
                      id={element.id}
                      title={element.title}
                      tag={element.tag}
                      status={element.status}
                      priority={element.priority}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
        {status && (
          <>
            <div className="dashCardHeading flex-sb">
              <div className="leftView" style={{ fontSize: "15px", marginRight: "90px", wordSpacing: "4px" }}>
                <div
                  className="cardTitle"
                  style={{
                    width: "13px",
                    height: "13px",
                    display: "inline-block",
                    fontWeight: 200,
                  }}
                >
                   <DoneIcon style={{ color: "blue", width: "13px", height: "13px" }} />
               
                </div>{" "}
                <span style={{ fontSize: "13px", fontWeight: "lighter" }}>Done</span> <span style={{ fontSize: "13px", color: "#8F9997" }}>0</span>
              </div>
              <div className="rightView">
                <AddIcon />{" "}
                <span style={{ letterSpacing: "2px" }}>...</span>
              </div>
            </div>
            <div className="dashCardHeading flex-sb">
              <div className="leftView" style={{ fontSize: "15px", marginRight: "60px", wordSpacing: "4px" }}>
                <div
                  className="cardTitle"
                  style={{
                    width: "9px",
                    height: "9px",
                    display: "inline-block",
                    fontWeight: 200,
                  }}
                >
                  <CancelledIcon style={{ color: "blue", width: "13px", height: "13px" }} />
                </div>{" "}
                <span style={{ fontSize: "13px", fontWeight: "lighter" }}>Canceled</span> <span style={{ fontSize: "13px", color: "#8F9997" }}>0</span>
              </div>
              <div className="rightView">
                <AddIcon />{" "}
                <span style={{ letterSpacing: "2px" }}>...</span>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};
export default DashBoard;
