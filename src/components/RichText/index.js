import React, { Component, Fragment } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import './RichText.scss'

class RichText extends Component {    

  render() {

    const { editorState, onChange, handleEditorKeyCommand } = this.props;
    console.log('editorState', editorState)
    return (
        <section className='RichText'>
            <section className='new-company-editor'>
                <Editor 
                    editorState={editorState} 
                    handleKeyCommand={handleEditorKeyCommand}
                    onChange={onChange}
                />
            </section>
        </section>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(withRouter(RichText));