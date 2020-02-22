import React, { useEffect } from "react";

import ControlledEditor from "./ControlledEditor";

const EditorFieldComponent = props => {
  const { placeholder, input: { onChange, value }, disabled, id } = props;
  
  useEffect(() => {
    //console.log('rduxform', value)
    console.log('rduxform', onChange)
  }, []);
  return (
    <ControlledEditor
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default EditorFieldComponent;