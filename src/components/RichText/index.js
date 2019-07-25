import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Input } from '../';
import { EditorState, RichUtils, convertToRaw, ContentState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import { convertEditorFromDb } from '../../utils';
import addLinkPlugin from './addLinkPlugin';
import { bool } from 'prop-types';
import './RichText.scss';

class RichText extends Component {    
    constructor(props) {
        super(props);

        const { editorState } = this.props;

        const immutableContent = editorState ? convertEditorFromDb(editorState) : null;

        //if there is editorState, it means we are editing existing text. If not, we need to create new empty state
        this.state = {
            editorState: editorState ? EditorState.createWithContent(immutableContent) : EditorState.createEmpty(),
            urlValue: '',
            showUrlInput: false,
        }

        this.plugins = [addLinkPlugin];
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
    
    onChange = (editorState) => {
        //stringified is what we send to database
        const stringifiedContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

        this.setState({
            editorState,
        }, () =>  { this.props.onChange(stringifiedContent) });

    }

    updateUrl = (event) => {
        this.setState({urlValue: event.target.value});
    }

    onUnderlineClick = (event) => {
        event.preventDefault() //stops form from submitting and closing modals

        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
  
    onBoldClick = (event) => {
        event.preventDefault();

        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')); 
    }
  
    onItalicClick = (event) => {
        event.preventDefault();

        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')); 
    }

    toggleUrlInput = (event) => {
        event.preventDefault();

        this.setState({
            showUrlInput: !this.state.showUrlInput
        })
    }

    onAddLink = () => {
        const { editorState, urlValue } = this.state;

        const selection = editorState.getSelection();

        if (!urlValue) {
			this.onChange(RichUtils.toggleLink(editorState, selection, null));
			return "handled";
        }

        const content = editorState.getCurrentContent();

        const contentWithEntity = content.createEntity(
          'LINK',
          'MUTABLE',
          {url: urlValue}
        );

        const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');

        const entityKey = contentWithEntity.getLastCreatedEntityKey();

        this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
        
        //hides link input
        this.setState({showUrlInput: false});

        return 'handled';
      }

    handleKeyCommand = command => {
        
		const newState = RichUtils.handleKeyCommand(
			this.state.editorState,
			command
		);
		if (newState) {
			this.onChange(newState);
			return "handled";
		}
		return "not-handled";
    };

  render() {

    const { handleEditorKeyCommand, onBlur, showMenu } = this.props;

    const { editorState, urlValue, showUrlInput } = this.state;

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
                    <Input value={urlValue} onChange={this.updateUrl} autoFocus={true} placeHolder='Paste full url'/>
                    <Button type="button" className="RichText-editorButton" onClick={this.onAddLink}>
                        <i className="fas fa-check-circle" onClick={this.onAddLink}/>
                    </Button>
                </div>)}
            <section className='RichText-editor'>
                <Editor 
                    editorState={editorState} 
                    handleKeyCommand={handleEditorKeyCommand}
                    onChange={this.onChange}
                    onBlur={() => onBlur()}
                    plugins={this.plugins}
                    customStyleMap={styleMap} 
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

const styleMap = {
    'HIGHLIGHT': {
      backgroundColor: 'lightgreen'
     }
  };

export default connect(mapStateToProps)(withRouter(RichText));;