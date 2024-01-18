import { ReactElement, useEffect, useState } from "react";
import TechnicalCards from "./TechnicalCards";
import SearchBar from "../../components/SearchBar";
import { TechnicalData } from "../../interfaces/global.interfaces";
import { useNavigate } from "react-router-dom";

interface TechnicalSectionProps {
  allTechnical: TechnicalData[];
}

/**
 * Technical Section Component which loads section.
 *
 * @returns - Technical Section Component to render element.
 */
function TechnicalSection(props: TechnicalSectionProps): ReactElement {
  const { allTechnical } = props;
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(selectedCardId);
    if (selectedCardId) {
      navigate("/tech-admin/questions");
    }
  }, [selectedCardId]);

  return (
    <div>
      <SearchBar
        controlPlaceholder="Search Assigned Test"
        controlKey="assigned-test"
        extraClass="fs-7 p-3 rounded-5"
      />
      <div className="my-5 px-2 overflow-auto" style={{ maxHeight: "35rem" }}>
        <TechnicalCards
          filterTechnical={allTechnical}
          setSelectedCardId={setSelectedCardId}
        />
      </div>
    </div>
  );
}

export default TechnicalSection;
