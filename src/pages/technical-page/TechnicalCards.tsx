import { ReactElement, SetStateAction } from "react";
import { TechnicalData } from "../../interfaces/global.interfaces";
import Logo from "../../assets/images/card_logo.png";
import TagControl from "../../components/TagControl";

interface TechnicalSectionProps {
  filterTechnical: TechnicalData[];
  setSelectedCardId: React.Dispatch<SetStateAction<string>>;
}

/**
 * Technical Cards Component which loads list of assigned test cards.
 *
 * @returns - Technical Cards Component to render react element.
 */
function TechnicalCards(props: TechnicalSectionProps): ReactElement {
  const { filterTechnical, setSelectedCardId } = props;

  return (
    <div className="d-flex flex-wrap justify-content-between">
      {filterTechnical.map((data: TechnicalData) => {
        return (
          <div
            key={data.id}
            className="card mb-4"
            style={{ maxWidth: "34rem" }}
            onClick={() => setSelectedCardId(data.id)}
            onKeyDown={() => setSelectedCardId(data.id)}
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
                        bgTheme={"warning-light"}
                        textTheme={"white"}
                      />
                    </div>
                  </div>
                  <p className="card-text fs-7 overflow-hidden">
                    {data.description}
                  </p>
                  <p className="card-text fs-7">
                    <small className="text-muted">
                      Created by: <span>{data.created_by}</span>
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
