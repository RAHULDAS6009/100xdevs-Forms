import { Editor } from "@/components/DynamicEditor";

export default async function Home({ params }: { params: { formid: string } }) {
  const formId = (await params).formid;
  return <Editor formId={formId} />;
}
