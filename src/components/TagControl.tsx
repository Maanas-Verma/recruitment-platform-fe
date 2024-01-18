import { ReactElement } from "react";

interface TagControlProps {
  text: string;
  tagType?: "tag" | "badge";
  textTheme?: string;
  bgTheme?: string;
}

/**
 * A Tab control component which provide navigation.
 *
 * @param props - Tab control props.
 * @returns - Returns a react element for tab control.
 */
function TagControl(props: TagControlProps): ReactElement {
  const { tagType = "tag", text, bgTheme, textTheme } = props;

  return (
    <>
      {tagType === "badge" ? (
        <div
          className={`badge rounded-pill px-2 py-1 ${
            bgTheme && textTheme
              ? `text-${textTheme} bg-${bgTheme} border-0`
              : "text-grey border border-grey"
          }`}
        >
          {text}
        </div>
      ) : (
        <div
          className={`px-2 rounded-pill text-center ${
            bgTheme && textTheme
              ? `text-${textTheme} bg-${bgTheme} border-0`
              : "text-grey border border-grey"
          }`}
        >
          {text}
        </div>
      )}
    </>
  );
}

export default TagControl;
