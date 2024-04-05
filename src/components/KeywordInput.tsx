/* eslint-disable @typescript-eslint/no-unused-vars */
import { WithContext as ReactTags, Tag } from "react-tag-input";

interface KeywordInputProps {
  inputFieldPosition?: "inline" | "top" | "bottom";
  allowDragDrop: boolean;
  labelField: string;
  allowUnique: boolean;
  placeholder: string;
  id: string;
  classNames: object;
  minTags: number;
  maxTags: number;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

function KeywordInput(props: KeywordInputProps): JSX.Element {
  const { setTags } = props;

  // Method to delete tag from Array
  function handleDelete(indexToRemove: number): void {
    setTags((previousTags: Tag[]) =>
      previousTags.filter((_tag: Tag, index) => index !== indexToRemove)
    );
  }

  // Method to Add tag into Array
  function handleAddition(tag: Tag): void {
    setTags((previousTags: Tag[]) => [...previousTags, tag]);
  }

  const keyCodes = {
    enter: 13,
    comma: 188,
  };

  const delimiters = [keyCodes.enter, keyCodes.comma];

  return (
    <div id={props.id}>
      <ReactTags
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        autofocus={false}
        {...props}
      />
    </div>
  );
}

export default KeywordInput;
