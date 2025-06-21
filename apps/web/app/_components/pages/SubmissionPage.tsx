"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "./EditPage";
import DownloadCSV from "../../../components/DownloadCSV";
const data =
  "Name,Age,Profession\nJohn Doe,30,Developer\nJane Smith,25,Designer";

export default function SubmissionPage({ formid }: { formid: string }) {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [headArr, setHeadArr] = useState<string[]>([]);
  // Fetch data
  useEffect(() => {
    async function callAPI() {
      const res = await axios.get(`${BACKEND_URL}/form/${formid}/submission`);
      const parsed = JSON.parse(res.data.submissions.submissions);
      setSubmissions(parsed);
    }

    callAPI();
  }, [formid]);

  // After submissions are set, extract headers
  useEffect(() => {
    if (submissions.length > 0) {
      const allKeys = Array.from(
        new Set(submissions.flatMap((obj: any) => Object.keys(obj)))
      );
      setHeadArr(allKeys);
    }
  }, [submissions]);

  return (
    <div>
      <h2>All submissions</h2>
      <DownloadCSV data={data} fileName={"em"} />
      <table border={1}>
        <thead>
          <tr>
            {headArr.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, rowIndex) => (
            <tr key={rowIndex}>
              {headArr.map((field, colIndex) => (
                <td key={colIndex}>{submission[field] || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
