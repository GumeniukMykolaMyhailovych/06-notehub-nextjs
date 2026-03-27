import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const note = queryClient.getQueryData<Awaited<ReturnType<typeof fetchNoteById>>>([
    "note",
    id,
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Note Details</h1>

        <p>
          <strong>ID:</strong> {id}
        </p>

        <h2>{note?.title}</h2>
        <p>{note?.content}</p>
      </div>
    </HydrationBoundary>
  );
}