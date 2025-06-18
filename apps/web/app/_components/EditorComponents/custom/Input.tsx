import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { useState } from "react";

export const InputBlock = createReactBlockSpec(
  {
    type: "input",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "text",
      },
      value: {
        default: "",
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const isEmpty = props.block.content.length === 0;

      const [itemVal, setitemVal] = useState<string>("");

      // Safely extract plain text from block content
      const blockText = props.block.content
        .map((inline) => ("text" in inline ? inline.text : ""))
        .join("");

      const updateValue = (newVal: string) => {
        props.editor.updateBlock(props.block, {
          props: {
            ...props.block.props,
            value: newVal,
          },
        });

        const prevBlock = props.editor.getPrevBlock(props.block.id);
        // const nextBlock = props.editor.getNextBlock(props.block.id);
        const prevBlockLabel = prevBlock?.content
          .map((inline) => ("text" in inline ? inline.text : ""))
          .join("");
        // console.log(
        //   nextBlock?.content
        //     .map((inline) => ("text" in inline ? inline.text : ""))
        //     .join("")
        // );
        const prevBlockName =
          prevBlock?.type === undefined ? blockText : prevBlockLabel;

        const form = JSON.parse(sessionStorage.getItem("form") || "{}");
        const blockId = props.block.id;
        const updatedSubmission = [
          ...(form.submission || []).filter(
            (entry: any) => entry.id !== blockId
          ),
          { id: blockId, value: newVal, name: prevBlockName },
        ];
        sessionStorage.setItem(
          "form",
          JSON.stringify({
            ...form,
            submission: updatedSubmission,
          })
        );
      };

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
              value={props.block.props.value}
              onChange={(e) => updateValue(e.target.value)}
              placeholder={blockText}
              type="text"
              className="w-full px-3 text-sm text-gray-800 border border-gray-300 rounded"
            />
          )}
        </>
      );
    },
  }
);
