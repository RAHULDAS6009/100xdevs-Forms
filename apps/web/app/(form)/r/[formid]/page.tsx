import PublishPage from "../../../_components/pages/PublishPage";

export default function Home({ params }: { params: { formid: string } }) {
  return <PublishPage formid={params.formid} />;
}
