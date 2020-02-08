import React, { useCallback, useEffect, useState } from "react";
import { reduxForm } from "redux-form";
import EditorField from "./EditorField";
import { useDispatch, useSelector } from "react-redux";
import submit from './submit';

/*const handleForm = (values) => {
  //alert(`Awesome editor text value is ${values.editorText}`);
  console.log('values',values.editorText)
  return values.editorText;
};*/

const EditorForm = (props) => {
  const { handleSubmit } = props;
  const user = useSelector(state => state.user);
  const [data, setData] = useState('');
  const {draft} = useSelector(state => state.form);
  
  return (
    <form onSubmit={handleSubmit}>
      <EditorField
        key="field"
        name="editorText"
        id="inputEditorText"
        disabled={false}
        placeholder="Type here"
      />
      {/*<button style={styles.button} key="submit" type="submit">
        Submit
  </button>*/}
    </form>
  );
};
const styles = {
  button: {
    width: "100%"
  }
};

export default reduxForm({ 
  form: "draft" || {},
  onSubmit: submit
})(EditorForm);