import SubmissionPage from "../../../../../components/pages/SubmissionPage";
import { PageProps } from "../edit/page";

export default async function Page({ params }: PageProps) {
  const { formid } = await params;

  return <SubmissionPage formid={formid} />;
}
