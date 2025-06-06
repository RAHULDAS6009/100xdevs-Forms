import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";

import "../globals.css";
import { PartialBlock } from "@blocknote/core";
export default function EditorPreview({ blocks }: { blocks: PartialBlock[] }) {
  const editor = useCreateBlockNote({
    initialContent: blocks || [{ type: "paragraph", content: "Hello worl" }],
  });
  return <BlockNoteView editable={false} editor={editor} theme={"light"} />;
}
