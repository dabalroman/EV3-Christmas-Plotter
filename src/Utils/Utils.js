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

    /**
     * By Angelos Chalaris
     * @param str Text to copy
     */
    static copyToClipboard(str) {
        const el = document.createElement('textarea');  // Create a <textarea> element
        el.value = str;                                 // Set its value to the string that you want copied
        el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
        el.style.position = 'absolute';
        el.style.left = '-9999px';                      // Move outside the screen to make it invisible
        document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
        const selected =
            document.getSelection().rangeCount > 0        // Check if there is any content selected previously
                ? document.getSelection().getRangeAt(0)     // Store selection if found
                : false;                                    // Mark as false to know no selection existed before
        el.select();                                    // Select the <textarea> content
        document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
        document.body.removeChild(el);                  // Remove the <textarea> element
        if (selected) {                                 // If a selection existed before copying
            document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
            document.getSelection().addRange(selected);   // Restore the original selection
        }
    };
}