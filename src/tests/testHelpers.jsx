import fs from 'fs';
import path from 'path';

/**
 * Finds text from the DOM even if it is split with a <span> or other tag.
 * So for example: <div> Hello <span> world </span></div>
 * would work when queried with "Hello world"
 * @param {*} node - the node to be searched from.
 * @param {*} query - th equery to be searched.
 * @returns true if found false otherwise.
 */
export const findWithTag = (node, query) => {
  const hasText = (n) => n.textContent === query;
  const nodeHasText = hasText(node);
  const childrenDontHaveText = Array.from(node.children).every(
    (child) => !hasText(child),
  );

  return nodeHasText && childrenDontHaveText;
};

/**
 * Adds all additional css styling to the component.
 * @param {*} component - the component to be added styling for.
 */
export const addStyling = (component) => {
  const cssFile = fs.readFileSync(
    path.resolve(__dirname, '../styles/main.css'),
    'utf8',
  );
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  component.container.append(style);
};
