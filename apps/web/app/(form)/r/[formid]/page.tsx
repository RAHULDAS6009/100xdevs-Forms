import PublishPage from "../../../_components/pages/PublishPage";

export default async function Home({ params }: { params: { formid: string } }) {
  const formId = (await params).formid;

  return <PublishPage formid={formId} />;
}
