import SubmissionPage from "../../../../_components/pages/SubmissionPage";

export default async function Page({ params }: { params: { formid: string } }) {
  const formid = (await params).formid;
  return <SubmissionPage formid={formid} />;
}
