import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Button } from '../'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { convertEditorFromDb } from '../../utils'
import { bool } from 'prop-types';
import './RichText.scss'

class RichText extends Component {    
    constructor(props) {
        super(props)
        const { editorState } = this.props

        const immutableContent = editorState ? convertEditorFromDb(editorState) : null
    
        //if there is editorState, it means we are editing existing text. If not, we need to create new empty state
        
        this.state = {
            editorState: editorState ? EditorState.createWithContent(immutableContent) : EditorState.createEmpty(),
        }
    }

    static propTypes = {
        showMenu: bool
    }
    
    static defaultProps = {
        showMenu: true
      }
    
    richTextOnChange = (editorState) => {
        const { onChange } = this.props
        //stringified is what we send to db
        const stringifiedContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()))

        this.setState({
            editorState,
            stringifiedContent,
        }, () =>  onChange(stringifiedContent));

    }

    onUnderlineClick = () => {
        this.richTextOnChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
  
    onBoldClick = () => {
      this.richTextOnChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')); 
    }
  
    onItalicClick = () => {
      this.richTextOnChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')); 
    }


  render() {

    const { handleEditorKeyCommand, onBlur, showMenu } = this.props;
    const { editorState } = this.state
    return (
        <section className='RichText'>
            {showMenu && (
                <section className="RichText-editorButtons">
                    <Button onClick={this.onUnderlineClick} type="button" className="RichText-editorButton"><i className="fas fa-underline"/></Button>
                    <Button onClick={this.onBoldClick} type="button" className="RichText-editorButton"><i className="fas fa-bold"/></Button>
                    <Button onClick={this.onItalicClick} type="button" className="RichText-editorButton"><i className="fas fa-italic"/></Button>
                </section>
            )}
            <section className='RichText-editor'>
                <Editor 
                    editorState={editorState} 
                    handleKeyCommand={handleEditorKeyCommand}
                    onChange={this.richTextOnChange}
                    onBlur={() => onBlur()}
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