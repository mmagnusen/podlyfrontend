import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

export const getDangerousHtml = (stringifiedContent) => {
    const parsedContent = JSON.parse(stringifiedContent);
    const immutableDescription = convertFromRaw(parsedContent);
    const html = stateToHTML(immutableDescription);
    const outputHtml = {__html: html}
    return outputHtml
}