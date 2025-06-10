import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";

const SubmitBlock = createReactBlockSpec(
  {
    type: "submit",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
    },
    content: "inline",
  },
  {
    render: (props) => {
      return (
        <>
          <button
            className="
            mt-3
            text-white
          bg-black py-2 px-4
          rounded-md"
          >
            Submit
          </button>
        </>
      );
    },
  }
);

export default SubmitBlock;
