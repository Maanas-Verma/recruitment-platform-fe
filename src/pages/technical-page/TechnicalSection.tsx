import { ReactElement, useEffect, useState } from "react";
import TechnicalCards from "./TechnicalCards";
import SearchBar from "../../components/SearchBar";
import { GetTestResponse } from "../../interfaces/global.interfaces";
import { useNavigate } from "react-router-dom";

interface TechnicalSectionProps {
  filterValue: string;
  allTechnical: GetTestResponse[];
}

/**
 * Technical Section Component which loads section.
 *
 * @returns - Technical Section Component to render element.
 */
function TechnicalSection(props: TechnicalSectionProps): ReactElement {
  const { filterValue, allTechnical } = props;
  const [selectedCardId, setSelectedCardId] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCardId) {
      navigate(`/tech-admin/questions/${selectedCardId}`);
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
          filterValue={filterValue}
          filterTechnical={allTechnical}
          setSelectedCardId={setSelectedCardId}
        />
      </div>
    </div>
  );
}

export default TechnicalSection;
