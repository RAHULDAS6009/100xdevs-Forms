import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

export const InputBlock = createReactBlockSpec(
  {
    type: "input",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "text",
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const isEmpty = props.block.content.length === 0;

      // Safely extract plain text from block content
      const blockText = props.block.content
        .map((inline) => ("text" in inline ? inline.text : ""))
        .join("");

      return (
        <div className="w-full relative">
          {props.editor.isEditable ? (
            <>
              {isEmpty && (
                <span className="absolute left-3 text-sm text-gray-400 pointer-events-none select-none">
                  Label text...
                </span>
              )}
              <div
                className="w-full px-3 text-sm text-gray-800 outline-none"
                ref={props.contentRef}
              />
            </>
          ) : (
            <input
              type="text"
              className="w-full px-3 text-sm text-gray-800 border border-gray-300 rounded"
              placeholder={blockText}
            />
          )}
        </div>
      );
    },
  }
);
