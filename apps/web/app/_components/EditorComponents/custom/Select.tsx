"use client ";
import {
  Block,
  defaultProps,
  insertBlocks,
  insertOrUpdateBlock,
  PartialBlock,
} from "@blocknote/core";
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
      const filteredSelectBlocks = props.editor.document.filter(
        (block) => block.type == "select"
      );

      const firstSelectedBlock = filteredSelectBlocks[0]?.id === props.block.id;
      return (
        // user type option
        <div className="relative w-full">
          {props.editor.isEditable ? (
            <>
              {props.block.content.length == 0 && (
                <span className="absolute left-1 text-sm   text-gray-400 pointer-events-none  select-none">
                  Type option....
                </span>
              )}
              <div
                className=" w-full px-1    text-sm text-gray-800 outline-none"
                ref={props.contentRef}
              />
              <div
                className="text-green-500  cursor-pointer hover:bg-amber-400"
                onClick={() =>
                  props.editor.insertBlocks(
                    [{ type: "select", content: "" }],
                    props.block.id,
                    "after"
                  )
                }
              >
                {" "}
                Add option
              </div>
            </>
          ) : (
            <>
              {firstSelectedBlock && (
                <select>
                  {filteredSelectBlocks.map((block) => (
                    <option>
                      {block.content
                        .map((inline) => ("text" in inline ? inline.text : ""))
                        .join("")}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}
        </div>
      );
    },
  }
);
