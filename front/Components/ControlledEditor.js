import React, { Component } from "react";
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw, ContentState } from "draft-js";
//import { Editor } from "react-draft-wysiwyg";
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
);
import draftToHtml from "draftjs-to-html";
import htmlToDraft from 'html-to-draftjs';

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', 'http://localhost:8080/api/post/images');
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('image', file);
      xhr.send(data);
      
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response)
        resolve({ data : {link: `http://localhost:8080/${response}`}});
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    },
  );
}

class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.props.onChange(
        draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  }

  onEditorStateChange = editorState => {
    const { onChange, value, placeholder } = this.props;
    const newValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    
    if (value !== newValue) {
      onChange(newValue);
    }
    this.setState({
      editorState
    });
  };

  componentDidMount() {
    const { placeholder } = this.props;
    const blocksFromHtml = htmlToDraft(placeholder);
    const { contentBlocks, entityMap } = blocksFromHtml;
    console.log(entityMap)
    console.log(blocksFromHtml)
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    this.setState({
      editorState : EditorState.createWithContent(contentState),
    });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              //uploadEnabled: true,
              uploadCallback: uploadImageCallBack,
              previewImage: false,
              alt: { 
                present: true, 
                mandatory: false 
              },
            },
          }}
        />
      </div>
    );
  }
}

export default ControlledEditor;