import EditPage from "../../../../_components/pages/EditPage";

export default async function Home({ params }: { params: { formid: string } }) {
  const formId = (await params).formid;
  return <EditPage formid={formId} />;
}
