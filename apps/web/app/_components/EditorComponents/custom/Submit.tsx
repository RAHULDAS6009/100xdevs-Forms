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
    },
    content: "inline",
  },
  {
    render: (props) => {
      return (
        <>
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
            className="mt-3 text-white bg-black py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </>
      );
    },
  }
);

export default SubmitBlock;
