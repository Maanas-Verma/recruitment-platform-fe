import { ReactElement, useState } from "react";
import TechnicalCards from "./TechnicalCards";
import SearchBar from "../../components/SearchBar";
import { TechnicalData } from "../../interfaces/global.interfaces";

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

  console.log(selectedCardId);

  return (
    <div>
      <SearchBar
        controlPlaceholder="Search Assigned Test"
        controlKey="assigned-test"
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
