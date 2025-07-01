"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "./EditPage";
import { jsonToCsv } from "../../lib/helper";

export default function SubmissionPage({ formid }: { formid: string }) {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [headArr, setHeadArr] = useState<string[]>([]);
  const [csv, setCSV] = useState("");
  // Fetch data
  useEffect(() => {
    async function callAPI() {
      const res = await axios.get(`${BACKEND_URL}/form/${formid}/submission`);
      const parsed = JSON.parse(res.data.submissions.submissions) || [];
      setSubmissions(parsed);

      if (parsed.length !== 0) {
        setCSV(jsonToCsv(JSON.parse(res.data.submissions.submissions)));
      }
    }

    callAPI();
  }, [formid]);

  useEffect(() => {
    if (submissions.length > 0) {
      const allKeys = Array.from(
        new Set(submissions.flatMap((obj: any) => Object.keys(obj)))
      );
      setHeadArr(allKeys);
    }
  }, [submissions]);

  function handleDownload() {
    const blob = new Blob([csv], { type: "data:text/csv;charset=utf-8," });
    console.log(blob);
    const blobURL = window.URL.createObjectURL(blob);
    console.log(blobURL);

    const anchor = document.createElement("a");
    anchor.download = "export.csv";
    anchor.href = blobURL;
    anchor.dataset.downloadurl = [
      "text/csv",
      anchor.download,
      anchor.href,
    ].join(":");
    anchor.click();

    setTimeout(() => {
      URL.revokeObjectURL(blobURL);
    }, 100);
  }

  return (
    <div>
      <h2>All submissions</h2>

      {submissions.length !== 0 && (
        <button
          className="text-sm font-bold py-2 px-4 rounded-md cursor-pointer bg-neutral-400  mx-2"
          onClick={handleDownload}
        >
          Download CSV
        </button>
      )}
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
