import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import axios from "axios";
import { BACKEND_URL } from "../../pages/EditPage";
import { redirect } from "next/navigation";

const SubmitBlock = createReactBlockSpec(
  {
    type: "submit",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      title: {
        default: "Submit",
      },
    },

    content: "inline",
  },
  {
    render: (props) => {
      // props.editor.addStyles(background:"red")
      return <div className=" flex justify-center items-center  "></div>;
    },
  }
);

export default SubmitBlock;
