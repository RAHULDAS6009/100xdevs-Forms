import axios from "axios";
import { BACKEND_URL } from "../_components/pages/EditPage";
import { useEffect, useState } from "react";
import { Form } from "../../types";

export function useForms() {
  const [forms, setForms] = useState<Form[]>();

  useEffect(() => {
    async function getForms() {
      const response = await axios.get(`${BACKEND_URL}/forms`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response);
      setForms(response.data.forms);
    }
    getForms();
  }, []);
  return forms;
}
