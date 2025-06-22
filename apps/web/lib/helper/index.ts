// JSON data
// const jsonData = [
//   {
//     id: 1,
//     name: "John Doe",
//     age: 30,
//     department: "Engineering",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     age: 28,
//     department: "Marketing",
//   },
// ];

// Convert JSON to CSV manually
export function jsonToCsv(jsonData: any) {
  console.log(jsonData);
  let csv = "";

  // Extract headers
  const headers = Object.keys(jsonData[0]);
  csv += headers.join(",") + "\n";

  // Extract values
  jsonData.forEach((obj: any) => {
    const values = headers.map((header) => obj[header]);
    csv += values.join(",") + "\n";
  });

  return csv;
}

// // Convert JSON to CSV
// const csvData = jsonToCsv(jsonData);

// console.log(csvData);
