import React from "react";
import { Icon } from "semantic-ui-react";

export default function Error({ errorMessage }) {
  const [showError, setShowError] = React.useState(true);
  const handleCloseError = () => {
    setShowError(false);
  };
  return (
    <div className="ui error message" id="error">
      <div>
        <h4>{errorMessage}</h4>
      </div>
      <div>
        <Icon name="close" onClick={handleCloseError} />
      </div>
    </div>
  );
}
