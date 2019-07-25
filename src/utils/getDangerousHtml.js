import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

export const getDangerousHtml = (stringifiedContent) => {
    const parsedContent = JSON.parse(stringifiedContent);

    const immutableDescription = convertFromRaw(parsedContent);
    const html = stateToHTML(immutableDescription).replace('<a ', '<a target="_blank" rel="noopener noreferrer" class="RichText-link"');

    const outputHtml = {__html: html}
    return outputHtml
};