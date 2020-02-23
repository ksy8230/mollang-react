import React, { Component } from "react";
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);
//import Editor from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from 'draft-js-import-html';
import { backURL } from "../config/config";

function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', `${backURL}/api/post/images`);
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('image', file);
      console.log(data)
      xhr.send(data);
      
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response)
        resolve({ data : {link: `${response}`}});
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
    this.state = { };

    if (typeof window !== 'undefined') {
        console.log('we are running on the client')
        this.state = {
          editorState: EditorState.createEmpty(),
        };
        this.props.onChange(
          stateToHTML(this.state.editorState.getCurrentContent())
        );
        console.log('content',this.state.editorState)
    } else {
        console.log('we are running on the server');
    }

  }

  onEditorStateChange = editorState => {
    const { onChange, value, placeholder } = this.props;
    const contentState = editorState.getCurrentContent(); // ContentState {_map: Map, __ownerID: undefined}
    //console.log('contentState', contentState)
    const newValue = stateToHTML(contentState);
    if (value !== newValue) {
      onChange(newValue); // <p>...</p>
    }
    this.setState({
      editorState
    });
  };

  componentDidMount() {
    const { placeholder } = this.props;
    //console.log(placeholder)
    let contentState = stateFromHTML(placeholder);
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