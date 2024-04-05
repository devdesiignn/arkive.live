import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

// Specifies which characters should terminate tags input. An array of character codes.
const keyCodes = {
  enter: 13,
  comma: 188,
};

const delimiters = [keyCodes.enter, keyCodes.comma];

interface KeywordInputProps {
  inputFieldPosition: string;
  allowDragDrop: boolean;
  labelField: string;
  allowUnique: boolean;
  placeholder: string;
  id: string;
  classNames: object;
  maxTags: number;
}

function KeywordInput(props: KeywordInputProps): JSX.Element {
  const [tags, setTags] = useState<unknown[]>([]);

  // Method to delete tag from Array
  function handleDelete(indexToRemove: number): void {
    setTags((previousTags: unknown[]) =>
      previousTags.filter((tag: unknown, index) => index !== indexToRemove)
    );
  }

  // Method to Add tag into Array
  function handleAddition(tag: unknown): void {
    setTags((previousTags: unknown[]) => [...previousTags, tag]);
  }

  return (
    <div id="tags">
      <ReactTags
        tags={tags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        {...props}
      />
    </div>
  );
}

export default KeywordInput;
