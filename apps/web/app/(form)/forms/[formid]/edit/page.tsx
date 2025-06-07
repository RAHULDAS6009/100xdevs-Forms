import EditPage from "../../../../_components/pages/EditPage";

export default function Home({ params }: { params: { formid: string } }) {
  return <EditPage formid={params.formid} />;
}
