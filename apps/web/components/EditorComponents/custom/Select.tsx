"use client";

import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

export const SelectBlock = createReactBlockSpec(
  {
    type: "select",
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
      const blockId = props.block.id;
      const isEditable = props.editor.isEditable;
      const filteredSelectBlocks = props.editor.document.filter(
        (block) => block.type === "select"
      );

      const isFirstSelect = filteredSelectBlocks[0]?.id === blockId;

      const getOptionText = (block: any) =>
        block.content
          .map((inline: any) => ("text" in inline ? inline.text : ""))
          .join("");

      const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;

        const form = JSON.parse(sessionStorage.getItem("form") || "{}");

        const prevBlock = props.editor.getPrevBlock(props.block.id);
        const prevBlockType = prevBlock?.type;
        // console.log(prevBlock);
        const name =
          prevBlock && prevBlock.type === prevBlockType
            ? prevBlock.content
                .map((inline: any) => ("text" in inline ? inline.text : ""))
                .join("")
            : "untitled option";

        console.log(name);

        const updatedSubmission = [
          ...(form.submission || []).filter(
            (entry: any) => entry.id !== blockId
          ),
          { id: blockId, value: selectedValue, name: name },
        ];

        sessionStorage.setItem(
          "form",
          JSON.stringify({ ...form, submission: updatedSubmission })
        );
      };

      return (
        <div className="relative w-full">
          {isEditable ? (
            <>
              {props.block.content.length === 0 && (
                <span className="absolute left-1 text-sm text-gray-400 pointer-events-none select-none">
                  Type option...
                </span>
              )}
              <div
                ref={props.contentRef}
                className="w-full px-1 text-sm text-gray-800 outline-none"
              />
              <button
                type="button"
                className="text-green-500 mt-1 text-sm hover:bg-yellow-200 px-2 py-1 rounded"
                onClick={() =>
                  props.editor.insertBlocks(
                    [{ type: "select", content: "" }],
                    blockId,
                    "after"
                  )
                }
              >
                + Add option
              </button>
            </>
          ) : (
            isFirstSelect && (
              <select
                onChange={handleChange}
                className="border cursor-pointer text-neutral-400 font-medium border-gray-300 rounded px-1 py-3 text-sm w-72 outline-none focus:ring-2 focus:ring-blue-400/50"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Select an option
                </option>
                {filteredSelectBlocks.map((block) => {
                  const text = getOptionText(block);
                  return (
                    <option key={block.id} value={text}>
                      {text}
                    </option>
                  );
                })}
              </select>
            )
          )}
        </div>
      );
    },
  }
);
