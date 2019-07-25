import { convertFromRaw } from 'draft-js';

export const convertEditorFromDb = (stringifiedContent) => {
    //for when we want to use text from db to create editorState
    const parsedContent = JSON.parse(stringifiedContent);
    return convertFromRaw(parsedContent);
};