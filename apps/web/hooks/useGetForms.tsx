import axios from "axios";
import { BACKEND_URL } from "../components/pages/EditPage";
import { useEffect, useState } from "react";
import { Form } from "../types";
import { useAppDispatch } from "../lib/hooks";
import { setForms } from "../lib/slices/FormSlice";

export function useForms(): { allforms: Form[]; loading: boolean } {
  const [allforms, setAllForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getForms() {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/forms`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setAllForms(response.data.forms);
        dispatch(setForms(response.data.forms as Form[]));
      } catch (error) {
        console.error("Failed to fetch forms", error);
      } finally {
        setLoading(false);
      }
    }

    getForms();
  }, []);

  return { allforms, loading };
}
