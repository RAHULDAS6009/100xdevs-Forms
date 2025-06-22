export function jsonToCsv(jsonData: any) {
  console.log(jsonData);
  let csv = "";

  const headers = Object.keys(jsonData[0]);
  csv += headers.join(",") + "\n";

  jsonData.forEach((obj: any) => {
    const values = headers.map((header) => obj[header]);
    csv += values.join(",") + "\n";
  });

  return csv;
}
