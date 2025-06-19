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
      return (
        <div className=" flex justify-center items-center  ">
          <button
            onClick={async () => {
              if (props.editor.isEditable) return;

              const form = sessionStorage.getItem("form");
              const formId = JSON.parse(form as string)?.id;

              try {
                const res = await axios.put(
                  `${BACKEND_URL}/form/${formId}/submission`,
                  {
                    submissions: JSON.stringify(
                      JSON.parse(form as string).submission
                    ),
                  }
                );

                console.log(res);
                redirect("/dashboard");
              } catch (err) {
                console.error("Submission failed:", err);
              }
            }}
            disabled
            className="text-white bg-black font-medium text-sm w-35  py-2   cursor-not-allowed px-4 rounded-md"
          >
            {props.block.props.title}
          </button>
        </div>
      );
    },
  }
);

export default SubmitBlock;
