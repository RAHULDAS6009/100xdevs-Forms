import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";

import "../globals.css";
import { PartialBlock } from "@blocknote/core";
import { schema } from "./EditorComponents/schema";
export default function EditorPreview({ blocks }: { blocks: PartialBlock[] }) {
  const editor = useCreateBlockNote({
    schema: schema,
    initialContent: blocks || [{ type: "paragraph", content: "Hello worl" }],
  });
  return <BlockNoteView editable={false} editor={editor} theme={"light"} />;
}
