import React from "react";

interface ResizableTextAreaProps {
  innerId: string;
  value: string;
  innerRef: React.RefObject<HTMLTextAreaElement>;
  onBlur: (event: any) => void;
  onKeyUp: (event: any) => void;
  onClick: (event: any) => void;
  onKeyDown: (event: any) => void;
}

const MIN_ROWS = 1;
const MAX_ROWS = 100;

export const ResizableTextArea: React.FC<ResizableTextAreaProps> = ({
  innerId,
  value: valueProp,
  innerRef,
  onBlur,
  onKeyUp,
  onClick,
  onKeyDown,
}) => {
  const [value, setValue] = React.useState(valueProp);
  const [rows, setRows] = React.useState(0);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 15;

    const previousRows = event.target.rows;
    event.target.rows = MIN_ROWS; // reset number of rows in textarea

    const currentRows = Math.ceil(
      (event.target.scrollHeight - 4) / textareaLineHeight
    );

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= MAX_ROWS) {
      event.target.rows = MAX_ROWS;
      event.target.scrollTop = event.target.scrollHeight;
    }
    setValue(event.target.value);
    setRows(currentRows);
  };
  return (
    <textarea
      id={innerId}
      style={{ resize: "none" }}
      ref={innerRef}
      cols={40}
      rows={rows}
      value={value}
      className="textarea"
      onChange={onChange}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      onClick={onClick}
      onKeyDown={onKeyDown}
    />
  );
};
