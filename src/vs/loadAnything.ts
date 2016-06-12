/**
 * This file allows us to load any file in the monaco sourcecode
 */
/** Throw webpack off sniffing our require */
const monacoRequire = require;

/** Editor common extension */
import * as editorCommonExtensions from "vs/editor/common/editorCommonExtensions";
export function loadEditorCommonExtensions(): typeof editorCommonExtensions {
    return monacoRequire('vs/editor/common/editorCommonExtensions');
}
