import EditPage from "../../../../../components/pages/EditPage";

export interface PageProps {
  params: Promise<{ formid: string }>;
}

export default async function Home({ params }: PageProps) {
  const { formid } = await params;
  return <EditPage formid={formid} />;
}
