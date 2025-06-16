import axios from "axios";
import { BACKEND_URL } from "../_components/pages/EditPage";
import { useEffect, useState } from "react";
import { Form } from "../../types";
import { useAppDispatch } from "../../lib/hooks";
import { setForms } from "../../lib/slices/FormSlice";

export function useForms() {
  const [allforms, setAllForms] = useState<Form[] | undefined>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getForms() {
      const response = await axios.get(`${BACKEND_URL}/forms`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response);
      setAllForms(response.data.forms);

      dispatch(setForms(response.data.forms as Form[]));
    }
    getForms();
  }, []);

  return allforms;
}
