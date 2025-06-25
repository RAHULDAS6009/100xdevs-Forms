"use client";
import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { useEffect } from "react";

export const LabelBlock = createReactBlockSpec(
  {
    type: "label",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      text: {
        default: "",
      },
      value: {
        default: "",
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const isEmpty =
        props.block.content.length === 0 ||
        //@ts-ignore
        props.block.content.every((item) => item.text.trim() === "");

      useEffect(() => {}, [props.editor.isEditable]);

      return (
        <div className="relative w-full">
          {isEmpty && (
            <span className="absolute font-semibold text-lg left-1 text-neutral-400 pointer-events-none select-none">
              Type a question
            </span>
          )}
          <div
            className="w-full px-1 font-semibold left-1 text-lg text-neutral-600 outline-none"
            ref={props.contentRef}
          />
        </div>
      );
    },
  }
);
