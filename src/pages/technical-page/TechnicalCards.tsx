import { ReactElement, SetStateAction, useEffect, useState } from "react";
import { GetTestResponse } from "../../interfaces/global.interfaces";
import Logo from "../../assets/images/card_logo.png";
import TagControl from "../../components/TagControl";
import { toast } from "react-toastify";
import apiService from "../../api-service/apiServices";

interface TechnicalSectionProps {
  filterValue: string;
  filterTechnical: GetTestResponse[];
  setSelectedCardId: React.Dispatch<SetStateAction<string>>;
}

/**
 * Technical Cards Component which loads list of assigned test cards.
 *
 * @returns - Technical Cards Component to render react element.
 */
function TechnicalCards(props: TechnicalSectionProps): ReactElement {
  const { filterValue, filterTechnical, setSelectedCardId } = props;

  const tagStyle = (text: string): string => {
    if (text === "CREATED") {
      return "lavender";
    } else if (text === "COMPLETED") {
      return "success";
    } else {
      return "warning";
    }
  };

  const [idEmployeeName, setIdEmployeeName] = useState<{
    [key: string]: any;
  }>([]);

  const handleGetEmployee = async () => {
    try {
      const getAllEmployees = await apiService.getEmployee();
      if (getAllEmployees?.data) {
        const idEmployeeSet: {
          [key: string]: any;
        } = {};

        getAllEmployees.data.forEach((employee) => {
          idEmployeeSet[employee.id] = employee.name;
        });

        setIdEmployeeName(idEmployeeSet);
      }
    } catch (error) {
      toast.error(`Error while getting employees: ${error}`);
    }
  };

  useEffect(() => {
    handleGetEmployee();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-between">
      {filterTechnical
        .filter((data: GetTestResponse) => {
          if (data.status === filterValue) {
            return true;
          }
        })
        .map((data: GetTestResponse) => {
          return (
            <div
              key={data.id}
              className={`card mb-4 ${
                data.status == "CREATED" ? "bg-grey-lightest" : ""
              }`}
              style={{ maxWidth: "34rem" }}
              onClick={() =>
                data.status !== "CREATED" ? setSelectedCardId(data.id) : {}
              }
              onKeyDown={() =>
                data.status !== "CREATED" ? setSelectedCardId(data.id) : {}
              }
              role="button"
              tabIndex={0}
            >
              <div className="row g-0">
                <div className="col-md-3">
                  <img
                    src={Logo}
                    className="img-fluid rounded-start"
                    alt="..."
                  ></img>
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                      <h5>{data.name}</h5>
                      <div className="fs-8">
                        <TagControl
                          text={data.status}
                          bgTheme={`${tagStyle(data.status)}-light`}
                          textTheme={"white"}
                        />
                      </div>
                    </div>
                    <p className="card-text fs-7 overflow-hidden">
                      {data.description}
                    </p>
                    <p className="card-text fs-7">
                      <small className="text-muted">
                        Created by:{" "}
                        <span>{idEmployeeName[data.created_by]}</span>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default TechnicalCards;
