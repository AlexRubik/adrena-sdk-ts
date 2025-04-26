import { createFromRoot } from 'codama';
import { renderJavaScriptVisitor } from '@codama/renderers';
import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import adrenaIdl from './adrena.json';


// @ts-ignore
function runCodama() {
const codama = createFromRoot(rootNodeFromAnchor(adrenaIdl as any));


codama.accept(renderJavaScriptVisitor('codama-generated', {

}));
}


// function main() {
//     runCodama();

// }

// main();