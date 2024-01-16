import { ReactElement, memo, useMemo } from "react";
import { ButtonControlDetails } from "../interfaces/global.interfaces";

/**
 * Button Component which renders the UI based on the props.
 *
 * @param props - Button Component props.
 * @returns - Button Component HTML.
 */
function Button(props: ButtonControlDetails): ReactElement {
  const {
    name = "",
    buttonId = "",
    theme = "primary",
    buttonType = "solid",
    submitType = "button",
    size = "medium",
    icon = "",
    iconPlacement = "start",
    isLoading = false,
    disabled = false,
    fullWidth = false,
    hrefLink = "",
    extraClass = "",
    extraIconClass = "",
    onClick,
  } = props;

  /**
   * Sets the classes for the button based on the props.
   */

  const setClassName = useMemo(() => {
    const themeClassBtn = (theme: string): string => {
      switch (buttonType) {
        case "solid":
          return `btn-${theme} text-light`;
        case "outline":
          return `btn-outline-${theme}`;
        case "text":
          return `btn-text-${theme} text-primary-emphasis`;
        default:
          return "";
      }
    };

    const sizeBtn = (size: string): string => {
      switch (size) {
        case "small":
          return "btn-sm";
        case "large":
          return "btn-lg";
        default:
          return "";
      }
    };

    const baseClass = `btn ${fullWidth ? "text-centered w-100" : "text-start"}`;

    const themeClass = theme ? themeClassBtn(theme) : "";

    const sizeClass = sizeBtn(size);

    const disabledClass = hrefLink !== "" && disabled ? "disabled" : "";

    const finalClass =
      `${baseClass} ${themeClass} ${sizeClass} ${disabledClass} ${extraClass}`.trim();

    return () => finalClass;
  }, [fullWidth, theme, size, hrefLink, disabled, extraClass, buttonType]);

  /**
   * Sets the classes for the icon based on the props.
   */
  const setIconClassName = useMemo(
    () => (): string => {
      let iconClassName = `bi bi-${icon} fw-bold `;

      if (size === "small") {
        iconClassName += "h10 ";
      } else if (size === "large") {
        iconClassName += "h6 ";
      } else if (size === "medium") {
        iconClassName += "h8 ";
      }
      return `${iconClassName} ${extraIconClass}`.trim();
    },
    [extraIconClass, icon, size]
  );

  const spinStyle = (size: string): Object => {
    if (size === "small") {
      return { width: "0.85rem", height: "0.85rem" };
    } else if (size === "large") {
      return { width: "1.15rem", height: "1.15rem" };
    } else if (size === "medium") {
      return { width: "1rem", height: "1rem" };
    }
    return {};
  };

  /**
   * Function to set the loading indicator on the button.
   */
  const renderLoadingSpinner = (): ReactElement => {
    const spinnerBorder = (
      <span
        className="spinner-border spinner-border-sm"
        style={spinStyle(size)}
        role="status"
        aria-hidden="true"
      />
    );
    const spinnerGrow = (
      <span
        className="spinner-grow spinner-grow-sm"
        style={spinStyle(size)}
        role="status"
        aria-hidden="true"
      />
    );

    const text = <span className="mx-3">Loading...</span>;

    if (icon) {
      return iconPlacement === "start" ? (
        <>
          {icon && spinnerBorder}
          {text}
        </>
      ) : (
        <>
          {text}
          {icon && spinnerBorder}
        </>
      );
    } else {
      return (
        <>
          {spinnerGrow}
          {text}
        </>
      );
    }
  };

  /**
   * Function to set the loading content inside the button.
   */
  const renderButtonContent = (): ReactElement => (
    <>
      {icon && iconPlacement === "start" && (
        <i className={`${setIconClassName()} ${name ? "me-2" : "mx-1"}`} />
      )}
      {name}
      {icon && iconPlacement === "end" && (
        <i className={`${setIconClassName()} ${name ? "ms-2" : "mx-1"}`} />
      )}
    </>
  );

  if (!isLoading) {
    return hrefLink !== "" ? (
      <a
        className={setClassName()}
        href={hrefLink}
        tabIndex={disabled ? -1 : 0}
        role="button"
        id={buttonId}
        aria-disabled={disabled}
      >
        {name}
      </a>
    ) : (
      <button
        className={setClassName()}
        type={submitType === "button" ? "button" : "submit"}
        id={buttonId}
        name={name}
        disabled={disabled}
        onClick={onClick}
        aria-label={`label-for-${name}`}
      >
        {renderButtonContent()}
      </button>
    );
  }

  return (
    <button
      className={setClassName()}
      type="button"
      id={`${buttonId}-loading`}
      disabled
      name={`${name}-loading`}
    >
      {renderLoadingSpinner()}
    </button>
  );
}

export default memo(Button);
