"use client ";
import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
export const LabelBlock = createReactBlockSpec(
  {
    type: "label",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "",
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      return (
        <div className="relative w-full">
          {props.block.content.length == 0 && (
            <span className="absolute left-1 text-sm   text-gray-400 pointer-events-none  select-none">
              Label text...
            </span>
          )}
          <div
            className=" w-full px-1   text-sm text-gray-800 outline-none"
            ref={props.contentRef}
          />
        </div>
      );
    },
  }
);
