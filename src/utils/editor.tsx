import { 
    EditorView, 
    keymap, 
    lineNumbers, 
    placeholder, 
    drawSelection,
    highlightActiveLine
} from "@codemirror/view";
import { Compartment, EditorState } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import { json } from "@codemirror/lang-json";
import { defaultHighlightStyle, HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight"

const language = new Compartment();

const Editor = (options: {
    doc?,
    placeholder?,
    id?,
    onInput?,
    readOnly?
}) => {
    const theme = EditorView.theme({
        "&": {
          color: "var(--color-white)",
          backgroundColor: "var(--color-black)",
          borderRadius: "var(--radius-sm)",
          padding: "0.5rem",
          width: "100%",
          maxHeight: "480px",
          maxWidth: "680px"
        },
        ".cm-content": {
          caretColor: "var(--color-white)",
          fontFamily: "var(--site-font)",
          fontSize: "14px",
          lineHeight: 1.75,
          letterSpacing: "0.5px",
        },
        ".cm-cursor-primary": {
            borderColor: "var(--color-white)",
        },
        ".cm-cursor-secondary": {
            borderColor: "var(--color-white)",
        },
        ".cm-gutters": {
          backgroundColor: "var(--color-black)",
          color: "var(--grey-50)",
          border: "none"
        },
        ".cm-scroller": {
            borderRadius: "var(--radius-sm)",
            minHeight: "200px"
        },
        ".cm-activeLine:has(.cm-placeholder)": {
            backgroundColor: "transparent"
        },
        ".cm-placeholder": {
            letterSpacing: "0"
        }
    });
    const lineWrapping = EditorView.lineWrapping;
    const updateListener = EditorView.updateListener.of((e) => {
        if (options.onInput) {
            let message;
            try { 
                message = JSON.parse(e.state.doc.toString());
            } catch (e) { }
            finally {
                options.onInput({
                        target: {
                            name: options.id,
                            value: message,
                            type: "",
                            checked: ""
                        }
                });
            }
        } 
    });
    const attrs = EditorView.contentAttributes.of({
        "aria-labelledby": options.id
    });

    const readonly = EditorState.readOnly.of(options.readOnly);

    const jsonHighlight = HighlightStyle.define([
        {
            tag: tags.string, 
            color: "#cd65ff"
        },
        {
            tag: tags.number, 
            color: "var(--color-yellow)"
        },
        {
            tag: tags.bool, 
            color: "var(--color-green)"
        },
        {
            tag: tags.name, 
            color: "#85abad"
        }
    ]);
    
    return new EditorView({
        doc: options.doc,
        extensions: [
            keymap.of(defaultKeymap),
            language.of(json()), 
            lineNumbers(),
            placeholder(options.placeholder || ""),
            highlightActiveLine(),
            drawSelection(),
            theme,
            // lineWrapping,
            attrs,
            updateListener,
            readonly,
            syntaxHighlighting(jsonHighlight)
        ]
    });
}

export default Editor;

// Usage: `Editor.dom` in template to render
// pass `doc` as the initial string, otherwise defaults to empty
// `Editor.state` to access state
// Additional configs required here for optimal usabilty
