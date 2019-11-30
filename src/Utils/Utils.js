export default class Utils {
    /**
     * @param {p5.Vector} q Vector to test
     * @param {p5.Vector} p1 Rectangle corner 1
     * @param {p5.Vector} p2 Rectangle corner 2
     * @return {boolean}
     */
    static isInside(q, p1, p2) {
        return (q.x >= p1.x && q.x < p2.x && q.y >= p1.y && q.y < p2.y);
    }
}