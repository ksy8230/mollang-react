import React, { useCallback, useState } from "react";
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
  const { content } = useSelector(state => state.post.singlePost);

  return (
    <form onSubmit={handleSubmit}>
      <EditorField
        key="field"
        name="editorText"
        id="inputEditorText"
        disabled={false}
        placeholder={content || ''}
      />
      {/*<button style={styles.button} key="submit" type="submit">
        Submit
  </button>*/}
    </form>
  );
};

export default reduxForm({ 
  form: "draft" || {},
  onSubmit: submit
})(EditorForm);