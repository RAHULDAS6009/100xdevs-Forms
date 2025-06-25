import SubmissionPage from "../../../../../components/pages/SubmissionPage";

export default async function Page({ params }: { params: { formid: string } }) {
  const formid = (await params).formid;
  return <SubmissionPage formid={formid} />;
}
