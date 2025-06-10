import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { useEffect } from "react";

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

      useEffect(() => {
        console.log("on mount");
        console.log("from custom  input block", props.editor.isEditable);
      }, [props.editor.isEditable]);

      // Safely extract plain text from block content
      const blockText = props.block.content
        .map((inline) => ("text" in inline ? inline.text : ""))
        .join("");

      return (
        <>
          {props.editor.isEditable ? (
            <div className="w-full relative">
              {isEmpty && (
                <span className="absolute left-3 text-sm text-gray-400 pointer-events-none select-none">
                  Label text...
                </span>
              )}
              <div
                className="w-full px-3 text-sm text-gray-800 outline-none"
                ref={props.contentRef}
              />
            </div>
          ) : (
            <input
              type="text"
              className="w-full px-3 text-sm text-gray-800 border border-gray-300 rounded"
            />
          )}
        </>
      );
    },
  }
);
