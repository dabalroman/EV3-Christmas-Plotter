export default class Dimension{
    width;
    height;

    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width = 0, height = 0){
        this.width = width;
        this.height = height;
    }
}