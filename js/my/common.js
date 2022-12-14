var panelCommon = {
    setCorner: function (selectObj, rx, ry) {
        selectObj.set("clipTo", function (ctx) {
            panel.fabric.cornerSet(typeof selectObj == "undefined" ? this : selectObj, ctx, typeof rx == "undefined" ? null : rx, typeof ry == "undefined" ? null : ry);
        });
    }
}
var utils = {
    getWithoutPx: function (val) {
        if (utils.isEmptyObj(val)) {
            return 0;
        }
        return parseInt(val.replace("px", ""));
    },
    isEmptyStr: function (obj) {
        if (obj == null || obj == undefined || obj == "") {
            return true;
        }
        return false;
    },
    isEmptyObj: function (obj) {
        if (obj == null || obj == undefined) {
            return true;
        }
        return false;
    },
    isEmptyArray: function (obj) {
        if (obj == null || obj == undefined || obj.length == 0) {
            return true;
        }
        return false;
    },
    colorRgb: function (sColorParam) {
        var sColor = sColorParam.toLowerCase();
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return sColorChange;
    },
    getRgbStr: function (colorArray) {
        if (utils.isEmptyArray(colorArray)) {
            return "";
        }
        return "rgb(" + colorArray[0] + "," + colorArray[1] + "," + colorArray[2] + "," + colorArray[3] + ")";
    },
    getImgScale: function (src, w, h, fun) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            var wi = img.width;
            var he = img.height;
            var toHeight = he * w / wi;
            var toWidth = 0;
            //如果按宽度压缩后的高度高于理想高度,按高度压缩
            if (toHeight > h) {
                toWidth = wi * h / he;
                toHeight = h;
            } else {
                toWidth = w;
            }
            fun(toWidth, toHeight, wi, he);
        }
    },
    getImgScaleForCon: function (imgW, imgH, w, h, fun) {
        var wi = imgW;
        var he = imgH;
        var toHeight = he * w / wi;
        var toWidth = 0;
        if (toHeight > h) {
            toWidth = wi * h / he;
            toHeight = h;
        } else {
            toWidth = w;
        }
        fun(toWidth, toHeight);
    },
    dataURIToBlob: function (dataURI, type) {
        var binStr = atob(dataURI.split(',')[1]
            ),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
        }
        return new Blob([arr], {type: type});
    },
    dataToBlob: function (data, type) {
        return new Blob([data], {type: type});
    },
    compileStr: function (code) {
        var c = String.fromCharCode(code.charCodeAt(0) + code.length);
        for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
        }
        return escape(c);
    },
    uncompileStr: function (code) {
        code = unescape(code);
        var c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        return c;
    },
    checkFileExt: function (fileName, ext) {
        if (utils.isEmptyStr(fileName)) {
            return false;
        }
        var curExt = fileName.substr(fileName.lastIndexOf(".") + 1);
        if (ext != curExt) {
            return false;
        }
        return true;
    }
};
