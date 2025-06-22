import EditPage from "../../../../_components/pages/EditPage";

export default function Home({ params }: { params: { formid: string } }) {
  const formId = params.formid;
  return <EditPage formid={formId} />;
}
