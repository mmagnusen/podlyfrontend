import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Button, Input } from '../'
import { Editor, EditorState, RichUtils, convertToRaw, ContentState, CompositeDecorator } from 'draft-js';
import { convertEditorFromDb } from '../../utils'
import { bool } from 'prop-types';
import './RichText.scss'

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }
  
  const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} style={styles.link}>
        {props.children}
      </a>
    );
  };

  const styles = {
    root: {
      fontFamily: '\'Georgia\', serif',
      padding: 20,
      width: 600,
    },
    buttons: {
      marginBottom: 10,
    },
    urlInputContainer: {
      marginBottom: 10,
    },
    urlInput: {
      fontFamily: '\'Georgia\', serif',
      marginRight: 10,
      padding: 3,
    },
    editor: {
      border: '1px solid #ccc',
      cursor: 'text',
      minHeight: 80,
      padding: 10,
    },
    button: {
      marginTop: 10,
      textAlign: 'center',
    },
    link: {
      color: '#3b5998',
      textDecoration: 'underline',
    },
  };
class RichText extends Component {    
    constructor(props) {
        super(props)
        const { editorState } = this.props

        const immutableContent = editorState ? convertEditorFromDb(editorState) : null
    
        //if there is editorState, it means we are editing existing text. If not, we need to create new empty state
        
        const decorator = new CompositeDecorator([
            {
              strategy: findLinkEntities,
              component: Link,
            },
          ]);

        this.state = {
            editorState: editorState ? EditorState.createWithContent(immutableContent) : EditorState.createEmpty(decorator),
            urlValue: '',
            showUrlInput: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.editorState === '') {
            const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
            this.setState({ editorState });
        }
    }

    static propTypes = {
        showMenu: bool
    }
    
    static defaultProps = {
        showMenu: true
      }
    
    richTextOnChange = (editorState) => {
        //stringified is what we send to db
        const stringifiedContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()))

        this.setState({
            editorState,
            stringifiedContent,
        }, () =>  { this.props.onChange(stringifiedContent) });

    }

    updateUrl = (event) => {
        this.setState({urlValue: event.target.value})
    }

    onUnderlineClick = (event) => {
        event.preventDefault() //stops form from submitting and closing modals
        this.richTextOnChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
  
    onBoldClick = (event) => {
        event.preventDefault()
        this.richTextOnChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')); 
    }
  
    onItalicClick = (event) => {
        event.preventDefault()
        this.richTextOnChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')); 
    }

    onAddLink = (event) => {
   
        let { editorState, urlValue } = this.state;
        editorState = RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT');
        const contentState = editorState.getCurrentContent();

        const contentStateWithEntity = contentState.createEntity(
          'LINK',
          'MUTABLE',
          {url: urlValue}
        );

        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

        this.setState({
            showUrlInput: false,
            editorState: RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
          ),
          showURLInput: false,
          urlValue: '',
        }, () => {
         ;
        });
      }
    
    handleKeyCommand = command => {
        
		const newState = RichUtils.handleKeyCommand(
			this.state.editorState,
			command
		);
		if (newState) {
			this.richTextOnChange(newState);
			return "handled";
		}
		return "not-handled";
    };
    
    toggleUrlInput = (event) => {
        event.preventDefault();
        this.setState({
            showUrlInput: !this.state.showUrlInput
        })
    }

    isSelection = (editorState) => {
        const selection = editorState.getSelection();
        const start = selection.getStartOffset();
        const end = selection.getEndOffset();
        return start !== end;
    };
    
    onChange(editorState) {
      if (!this.isSelection(editorState)) {
        return;
      }
    }

    styleMap = {
        'HIGHLIGHT': {
          backgroundColor: 'lightgreen'
         }
      };

  render() {

    const { handleEditorKeyCommand, onBlur, showMenu } = this.props;
    const { editorState, urlValue, showUrlInput } = this.state
    return (
        <section className='RichText'>
            {showMenu && (
                <section className="RichText-editorButtons">
                    <Button onClick={this.onUnderlineClick} type="button" className="RichText-editorButton"><i className="fas fa-underline"/></Button>
                    <Button onClick={this.onBoldClick} type="button" className="RichText-editorButton"><i className="fas fa-bold"/></Button>
                    <Button onClick={this.onItalicClick} type="button" className="RichText-editorButton"><i className="fas fa-italic"/></Button>
                    <Button onClick={this.toggleUrlInput} type="button" className="RichText-editorButton"><i className="fas fa-link"/></Button>
                </section>
            )}
            {showUrlInput &&
                (<div className='RichText-saveUrl'>
                    <Input value={urlValue} onChange={this.updateUrl} autoFocus={true}/>
                    <Button type="button" className="RichText-editorButton" onClick={this.onAddLink}>
                        <i className="fas fa-check-circle" onClick={this.onAddLink}/>
                    </Button>
                </div>)}
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