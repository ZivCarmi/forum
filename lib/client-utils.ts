"use client";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

export function validateEditor(editor: EditorState) {
  const currentEditor = editor.getCurrentContent();
  const isEditorEmpty = currentEditor.getPlainText().trim() === "";
  const data = {
    value: "",
    error: false,
  };

  if (isEditorEmpty) {
    data.error = true;
    return data;
  }

  data.value = draftToHtml(convertToRaw(currentEditor));
  data.error = false;

  return data;
}
