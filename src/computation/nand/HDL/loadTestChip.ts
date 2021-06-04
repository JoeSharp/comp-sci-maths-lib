import { readFileSync } from 'fs';
import Clock from '../Clock';
import { parseHdlFile } from './hdl'
import HDLChip from './HDLChip';

const loadTestChip = (filename: string): HDLChip => {
    const data = readFileSync(`src/computation/nand/NandTestScript/testData/${filename}`, 'utf8');
    const hdlFile = parseHdlFile(data);
    const clock = new Clock();
    const hdlChip = new HDLChip(hdlFile, clock);
    return hdlChip;
}

export default loadTestChip;