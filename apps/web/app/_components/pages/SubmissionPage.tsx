"use client";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { BACKEND_URL } from "./EditPage";

interface Submission {
  id: string;
  name: string;
  value: string;
}

export default function SubmissionPage({ formid }: { formid: string }) {
  const [submissions, setSubmissions] = useState<Submission[][]>([]);
  const [head, setHeadArr] = useState<String[]>([]);
  useEffect(() => {
    async function callAPI() {
      const res = await axios.get(`${BACKEND_URL}/form/${formid}/submission`);
      console.log();
      setSubmissions(
        res.data.submissions.submissions
          .split("\n")
          .map((item: string) => JSON.parse(item))
      );
      // setHeadArr([
      //   ...head,
      //   submissions.map((arr) => {
      //     return arr.map((item) => {
      //       return item.name;
      //     });
      //   })
      // ]);

      // const arr = submissions.map((arr) => {
      //   return arr.map((item) => {
      //     return item.name;
      //   });
      // });
      // // console.log(submissions.map((arr) => {}));
      // // console.log(submissions);
      // console.log(arr);
    }
    callAPI();
  }, [formid]);

  const newArr = useMemo(() => {
    const arr = submissions.map((arr) => {
      return arr.map((item) => {
        return item.name;
      });
    });

    console.log([...new Set(arr.flat())]); //Name and Sex feild
  }, [submissions]);

  return (
    <div>
      All submissions
      {submissions.map((arr) => {
        return arr.map((item) => {
          return item.name;
        });
      })}
    </div>
  );
}
