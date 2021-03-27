module('加解密类库');

test('3DES加密/解密(TripleDES/ECB/Pkcs7) - Base64', 2, function () {
    
    var oriText = 'TripleDES';
    var encText = 'oBVTn98Axrr0W+ty3CA2mQ==';
    var secret  = '123456789012345678901234';

    /** 加密 */
    var encrypted = CryptoJS.TripleDES.encrypt(oriText, CryptoJS.enc.Utf8.parse(secret), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).ciphertext
    encrypted = CryptoJS.enc.Base64.stringify(encrypted);
    QUnit.equal(encrypted, encText, '3DES加密' + secret  + ' (' + oriText + ' >>>>> ' + encText + ')');

    /** 解密 */
    var decrypted = CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(encText)
    }, CryptoJS.enc.Utf8.parse(secret), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
    QUnit.equal(decrypted, oriText, '3DES解密' + secret  + ' (' + encText + ' >>>>> ' + oriText + ')');

});

test('3DES加密/解密(TripleDES/ECB/Pkcs7) - Hex', 2, function () {
    
    var oriText = 'TripleDES';
    var encText = 'a015539fdf00c6baf45beb72dc203699';
    var secret  = '123456789012345678901234';

    /** 加密 */
    var encrypted = CryptoJS.TripleDES.encrypt(oriText, CryptoJS.enc.Utf8.parse(secret), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).ciphertext
    encrypted = CryptoJS.enc.Hex.stringify(encrypted);
    QUnit.equal(encrypted, encText, '3DES加密' + secret  + ' (' + oriText + ' >>>>> ' + encText + ')');

    /** 解密 */
    var decrypted = CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Hex.parse(encText)
    }, CryptoJS.enc.Utf8.parse(secret), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
    QUnit.equal(decrypted, oriText, '3DES解密' + secret  + ' (' + encText + ' >>>>> ' + oriText + ')');

});
