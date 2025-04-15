import { createFromRoot } from 'codama';
import { renderJavaScriptVisitor } from '@codama/renderers';
import { rootNodeFromAnchor } from '@codama/nodes-from-anchor';
import adrenaIdl from './adrena.json';
import { fetchPoolUtil, findCustodyAddress, getPoolPda, loadCustodies } from './helpers/utils';
import { JITOSOL_TOKEN_MINT } from './helpers/constants';
import { findATAAddress } from './helpers/tokenHelpers';
import { address } from '@solana/kit';


function runCodama() {
const codama = createFromRoot(rootNodeFromAnchor(adrenaIdl as any));


codama.accept(renderJavaScriptVisitor('codama-generated', {

}));
}


// function main() {
//     runCodama();

// }

// main();