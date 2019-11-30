export default class CodeGenerator {
    // static INS_START = 255;
    // static INS_DONE = 256;
    // static INS_PEN_DOWN = 0;
    // static INS_PEN_UP = 1;
    // static INS_MOV_RIGHT = 2;
    // static INS_MOV_LEFT = 3;
    // static INS_MOV_UP = 4;
    // static INS_MOV_DOWN = 5;
    // static INS_MOV_UP_RIGHT = 6;
    // static INS_MOV_DOWN_LEFT = 7;
    // static INS_MOV_UP_LEFT = 14;
    // static INS_MOV_DOWN_RIGHT = 15;
    // static INS_RST_VERTICAL = 16;
    // static INS_RST_HORIZONTAL = 17;

    static INS_START = "START";
    static INS_DONE = "DONE";
    static INS_PEN_DOWN = "PEN_DOWN";
    static INS_PEN_UP = "PEN_UP";
    static INS_MOV_RIGHT = "MOV_RIGHT";
    static INS_MOV_LEFT = "MOV_LEFT";
    static INS_MOV_UP = "MOV_UP";
    static INS_MOV_DOWN = "MOV_DOWN";
    static INS_MOV_UP_RIGHT = "MOV_UP_RIGHT";
    static INS_MOV_DOWN_LEFT = "MOV_DOWN_LEFT";
    static INS_MOV_UP_LEFT = "MOV_UP_LEFT";
    static INS_MOV_DOWN_RIGHT = "MOV_DOWN_RIGHT";
    static INS_RST_VERTICAL = "RST_VERTICAL";
    static INS_RST_HORIZONTAL = "RST_HORIZONTAL";

    /**
     * Array with numeric instructions
     * @type {[number]} code
     */
    code = [];

    constructor() {
        if (new.target === CodeGenerator) {
            throw new Error('CodeGenerator is abstract class!');
        }
    }

    /**
     * @param {Boolean[][]} plotterGrid
     */
    generateCode(plotterGrid) {
    };
}

