import { ReactElement } from "react";

interface TagControlProps {
  text: string;
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
  const { text, bgTheme, textTheme } = props;

  return (
    <>
      <div
        className={`px-2 rounded-pill text-center ${
          bgTheme && textTheme
            ? `text-${textTheme} bg-${bgTheme} border-0`
            : "text-grey border border-grey"
        }`}
      >
        {text}
      </div>
    </>
  );
}

export default TagControl;
