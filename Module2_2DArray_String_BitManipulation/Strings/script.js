const QuestionsLists = [
    "Toggle the case of given String",
    "Check the given String is Pelindrom or not",
    "Given a string, find the longest pelindrom"
];

listObject('class_topic', QuestionsLists);


class Strings {
    toggleCase(str = "heLLo") {
        let n = str.length;

        const way1 = () => {
            let ans = "";
            for (let i = 0; i < n; i++) {

                let charCode = str.charCodeAt(i);
                if (str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122) {
                    ans += String.fromCharCode(charCode - 32);
                }
                if (str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90) {
                    ans += String.fromCharCode(charCode + 32);
                }
            }

            return ans;
        }

        const way2 = () => {

            return str.split('').map(char => {
                let code = char.charCodeAt(0);

                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(code + 32);
                }

                if (code >= 97 && code <= 122) {
                    return String.fromCharCode(code - 32);
                }

                return char;
            }).join('');
        }

        return { way1: way1(), way2: way2() }
    }

    pelindromCheck(str = 'madam') {
        let n = str.length;

        const bf = () => {
            let str_copy = str.split('').reverse().join('');

            return str === str_copy ? "Pelindrom" : "Not Pelindrom"
        }

        const opt = () => {
            let s = 0, e = n - 1;

            while (s <= e) {
                if (str.charAt(s) !== str.charAt(e)) {
                    return "Not a pelindrom!!!";
                }
                s++;
                e--;
            }

            return "It's a Pelindrom";
        }

        return { bf: bf(), opt: opt() }
    }

    findLongestPelindrom(str = "anamadamn") {
        let n = str.length;

        if (n == 1) return 'Pelindrom of length 1';

        console.log("str : ", str);

        // Check for each substring
        // If it's a pelindrom then track their length
        const bf = () => {
            let ans = '';
            for (let i = 1; i < n; i++) {
                (function () {
                    let s = i - 1;
                    let e = i;
                    let sbStr = '';// str[s]+str[e];
                    let len = 0;

                    while (s >= 0 && e < n) {
                        if (str[s] !== str[e]) {
                            break;
                        }

                        sbStr = str[s] + sbStr + str[e];
                        len += 2;

                        if (len > ans.length) {
                            ans = sbStr;
                        }
                        s--;
                        e++;
                    }
                })();

                (function () {
                    let s = i;
                    let e = i;
                    let sbStr = str[s];// str[s]+str[e];
                    let len = 1;
                    while (s >= 0 && e < n) {
                        if (str[s] !== str[e]) {
                            break;
                        }

                        if (s !== e) {
                            sbStr = str[s] + sbStr + str[e];
                        }
                        if (len > ans.length) {
                            ans = sbStr;
                        }
                        len += 2;
                        s--;
                        e++;
                    }
                })();


            }

            return ans;
        }

        const opt = () => {

            const checkPelindrom = (i, j, s) => {

                let ans = 0;
                let val = '';
                while ((i >= 0 && j < s.length) && (s[i] === s[j])) {
                    ans = j - i + 1;
                    val = i === j ? (s[i]) : (s[i] + val + s[j]);
                    i--;
                    j++
                }
                return { ans, val };
            }

            let ans = Number.MIN_SAFE_INTEGER;
            let str_val = '';
            for (let i = 0; i < n; i++) {
                let odd = checkPelindrom(i, i, str);
                let even = checkPelindrom(i, i + 1, str);

                ans = Math.max(ans, odd.ans);
                ans = Math.max(ans, even.ans);

                let oddString = odd.val;
                let evenString = even.val;
                if (odd.ans > even.ans && (str_val.length < oddString.length)) {
                    str_val = odd.val.toString();
                }
                if (even.ans > odd.ans && str_val.length < evenString.length) {
                    str_val = even.val.toString();
                }

            }

            return { ans, str_val };
            // return ans;
        }

        return { bf: bf(), opt: opt() }
    }
}

let str = new Strings();