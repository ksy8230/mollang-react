import React from "react";

import EditorFieldComponent from "./EditorFieldComponent";
import { Field } from "redux-form";

const EditorField = props => {
  return <Field {...props} component={EditorFieldComponent} />;
};

export default EditorField;
