//language_picker
var languagepicker = document.querySelector('#languagepicker');
languagepicker.parentNode.addEventListener('click',function(e){document.querySelector('#languagepicker').classList.add('opened'); },true);


//impressum
//encoding and decoding from/to Base64 from https://attacomsian.com/blog/javascript-base64-encode-decode
function encodeUnicode(str) {
  // First we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1)
    })
  )
}
function decodeUnicode(str) {
  // Going backward: from byte-stream to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

/* code by webdevtrick ( https://webdevtrick.com ) */
function encryptCodes (content,passcode) {
	var result = [];
	var passLen = passcode.length ;
	for(var i = 0  ; i < content.length ; i++) {
		var passOffset = i%passLen ;
		var calAscii = (content.charCodeAt(i)+passcode.charCodeAt(passOffset));
		result.push(calAscii);
	}
	return JSON.stringify(result) ;
}
function decryptCodes (content,passcode) {
	var result = [];
	var str = '';
	if (typeof(content) == 'string') {
		var codesArr = JSON.parse(content);
	} else {
		var codesArr = content;
	}
	var passLen = passcode.length ;
	for(var i = 0  ; i < codesArr.length ; i++) {
		var passOffset = i%passLen ;
		var calAscii = (codesArr[i]-passcode.charCodeAt(passOffset));
		result.push(calAscii) ;
	}
	for(var i = 0 ; i < result.length ; i++) {
		var ch = String.fromCharCode(result[i]); str += ch ;
	}
	return str ;
}

var myPassphrase = '67zhgfde3456zuhbgvfde3456zhbgfde456zhbgvfe456zhbgvfde3456zujklopikjmnbvfde3456zujklo';
var testdata1 = 'testdata';
var testdata2 = encodeUnicode(testdata1);
var testdata3 = encryptCodes(testdata2,myPassphrase);
//console.log(testdata3);
var AdressData = [155,176,187,207,176,169,165,204,124,119,118,157,195,184,169,201,176,227,192,212,200,161,130,101,152,231,174,214,193,185,173,155,125,160,170,226,201,181,152,204,202,151,137,158,130,189,169,201,176,185,167,203,174,118,117,156,127,189,182,211,205,179,181,234,205,178,159,213,208,185,203,207,179,206,125,128,152,163,192,233,196,195,181,216,130,122,187,207,176,169,165,204,124,119,118,157,195,184,169,201,176,185,176,208,199,138,122,165,152,189,177,152,176,211,216,205,149,141,140,173,194,183,169,237,192,189,126,165,152,172,186,203,201,169,205,217,198,138,105,162,152,243,190,221,180,175,176,215,178,174,171,212,183,165,183,205,173,168,116,155,126,164,200,165,205,216,194,219,154,126,192,211,202,211,186,223,150,173,126,108,195,225,204,206,192,227,188,221,200,122,172,157,154,194,215,201,182,169,173,216,125,120,119,225,177,165,168,221,175,168,117,156,127,189,178,217,201,169,180,148,190,138,172,159,152,172,199,214,180,214,222,217,182,229,179,160,189,182,187,207,176,168,116,155,126,121,187,220,179,174,173,214,127,122,187,207,176,211,178,213,151,124,160,159,201,222,178,175,192,205,202,208,174,156,171,156,127,189,169,201,176,169,165,204,125,120,119,225,177,208,177,226,192,151,160,171,152,227,177,152,176,225,155,183,187,172,125,168,127,189,182,209,180,175,176,215,178,174,171,212,183,207,196,220,200,188,104,100,152,164,229,222,185,212,182,180,144,143,208,152,202,152,178,212,149,123,123,171,212,184,177,213,176,185,167,203,174,118,117,156,127,189,169,201,176,169,165,204,125,162,166,226,193,207,177,226,201,210,160,160,127,228,215,203,193,189,188,149,200,101,142,165,144,172,203,223,197,179,219,177,195,194,226,217,207,149,200,223,198,151,171,167,142,142,196,165,182,216,165,232,144,176,195,207,176,169,165,204,124,119,118,157,224,198,165,159];
var DecryptedAdressData = decryptCodes(AdressData,myPassphrase);
var DecodedAdressData = decodeUnicode(DecryptedAdressData);
var finalAdressData = JSON.parse(DecodedAdressData);
//console.log(finalAdressData);

document.querySelector('.vcard').id = 'hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname;
document.querySelector('#hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname+' .fn').innerText = finalAdressData.firstname+' '+finalAdressData.lastname;
document.querySelector('#hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname+' .email').innerText = finalAdressData.email;
document.querySelector('#hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname+' .email').href = 'mailto:'+finalAdressData.email;
document.querySelector('#hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname+' .street-address').innerText = finalAdressData.streetadress;
document.querySelector('#hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname+' .postal-code').innerText = finalAdressData.postalcode;
document.querySelector('#hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname+' .locality').innerText = finalAdressData.city;
document.querySelector('#hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname+' .region').innerText = finalAdressData.region;
document.querySelector('#hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname+' .country-name').innerText = finalAdressData.country;
document.querySelector('#hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname+' .url.xmpp').innerText = finalAdressData.jabberid;
document.querySelector('#hcard-'+finalAdressData.firstname+'-'+finalAdressData.lastname+' .url.xmpp').href = 'xmpp:'+finalAdressData.jabberid;
