var console,
    jQuery,
    $ = jQuery;

(function () {
    "use strict";
    
    var buttonGenerator,
        btn = $('.button'),
        btnWidth = $(".btnwidth__slider"),
        btnWidthVal = $(".btnwidth__val"),
        btnHeight = $(".btnheith__slider"),
        btnHeightVal = $(".btnheight__val"),
        btnFontSize = $(".fontsize__slider"),
        btnFontSizeVal = $(".fontsize__val"),
        btnBorderWIdth = $(".borderwidth__slider"),
        btnBorderWIdthVal = $(".borderwidth__val"),
        btnBorderRadius = $(".btnradius__slider"),
        btnBorderRadiusVal = $(".btnradius__val"),
        
        inputTextColor = $(".colortext__change"),
        newTextColor,
        
        inputBgColor = $(".bgcolor__change"),
        newBgColor,
        
        inputBorderColor = $(".bordercolor__change"),
        newBorderColor;
        
    buttonGenerator = {
// ===============================================================
// SetUpListener - callback function describe here
// ===============================================================

        
        
// ===================== change width ========================
        width: {
            // slider init
            btnWidthSlider: btnWidth.slider({
                range: "min",
                value: 20,
                min: 1,
                max: 100,
                slide: function (event, ui) {
                    btnWidthVal.val(ui.value);
                }
            }),
            // input changed slider value
            btnWidthVal: btnWidthVal.val(btnWidth.slider("value")),
            // width of element
            currentBtnWidth: btn.css({
                "padding-left" : btnWidth.slider("value"),
                "padding-right" : btnWidth.slider("value")
            }),
            // event
            changeBtnWidth: btnWidth.on("slide", function (event, ui) {
                btn.css({
                    "padding-left" : btnWidth.slider("value"),
                    "padding-right" : btnWidth.slider("value")
                });
            })
        },
// ===================== change height ========================
        height: {
            // slider init
            btnHeightSlider: btnHeight.slider({
                range: "min",
                value: 10,
                min: 1,
                max: 50,
                slide: function (event, ui) {
                    btnHeightVal.val(ui.value);
                }
            }),
            // input changed slider value
            btnHeightVal: btnHeightVal.val(btnHeight.slider("value")),
            
            // width of element
            currentBtnHeight: btn.css({
                "padding-top" : btnHeight.slider("value"),
                "padding-bottom" : btnHeight.slider("value")
            }),
            // event
            changeBtnHeight: btnHeight.on("slide", function (event, ui) {
                btn.css({
                    "padding-top" : btnHeight.slider("value"),
                    "padding-bottom" : btnHeight.slider("value")
                });
            })
        },
// ===================== change font-size ========================
        fontSize: {
            // slider init
            slider: btnFontSize.slider({
                range: "min",
                value: 16,
                min: 8,
                max: 41,
                slide: function (event, ui) {
                    btnFontSizeVal.val(ui.value);
                }
            }),
            // input changed slider value
            inputVal: btnFontSizeVal.val(btnFontSize.slider("value") + "px"),
            // width of element
            currentSize: btn.css({
                "font-size" : btnFontSize.slider("value")
            }),
            // event
            inputChange: btnFontSize.on("slide", function (event, ui) {
                btn.css({
                    "font-size" : btnFontSize.slider("value")
                });
            })
        },
// ===================== change border width ========================
        borderWidth: {
            // slider init
            slider: btnBorderWIdth.slider({
                range: "min",
                value: 3,
                min: 0,
                max: 30,
                slide: function (event, ui) {
                    btnBorderWIdthVal.val(ui.value);
                }
            }),
            // input changed slider value
            inputVal: btnBorderWIdthVal.val(btnBorderWIdth.slider("value") + "px"),
            // width of element
            currentSize: btn.css({
                "border-width" : btnBorderWIdth.slider("value")
            }),
            // event
            inputChange: btnBorderWIdth.on("slide", function (event, ui) {
                btn.css({
                    "border-width" : btnBorderWIdth.slider("value")
                });
            })
        },
// ===================== change border-radius ========================
        borderRadius: {
            // slider init
            borderRadiusSlider: btnBorderRadius.slider({
                range: "min",
                value: 10,
                min: 0,
                max: 100,
                slide: function (event, ui) {
                    btnBorderRadiusVal.val(ui.value);
                }
            }),
            // input changed slider value
            borderRadiusVal: btnBorderRadiusVal.val(btnBorderRadius.slider("value") + "px"),
            // width of element
            currentBorderRadius: btn.css({
                "-webkit-border-radius": btnBorderRadius.slider("value"),
                "-moz-border-radius":    btnBorderRadius.slider("value"),
                "-ms-border-radius":     btnBorderRadius.slider("value"),
                "-o-border-radius":      btnBorderRadius.slider("value"),
                "border-radius":         btnBorderRadius.slider("value")
            }),
            // event
            changeBorderRadius: btnBorderRadius.on("slide", function (event, ui) {
                btn.css({
                    "-webkit-border-radius": btnBorderRadius.slider("value"),
                    "-moz-border-radius":    btnBorderRadius.slider("value"),
                    "-ms-border-radius":     btnBorderRadius.slider("value"),
                    "-o-border-radius":      btnBorderRadius.slider("value"),
                    "border-radius":         btnBorderRadius.slider("value")
                });
            })
        },
// ===================== change text-color ========================
        colorText: {
            // Current color of element
            currentTextColor: btn.css({
                "color": "#" + inputTextColor.val()
            }),
            
            // Change text color
            textColorChange: inputTextColor.on("change", function () {
                newTextColor = $(this).val();
                btn.css({
                    "color": "#" + newTextColor
                });
            })
        },
// ===================== change background-color ========================
        bgColor: {
            // Current color of element
            currentBgColor: btn.css({
                "background-color": "#" + inputBgColor.val()
            }),
            
            // Change text color
            bgColorChange: inputBgColor.on("change", function () {
                newBgColor = $(this).val();
                btn.css({
                    "background-color": "#" + newBgColor
                });
            })
        },
// ===================== change border-color ========================
        borderColor: {
            // Current color of element
            currentBorderColor: btn.css({
                "border-color": "#" + inputBorderColor.val()
            }),
            
            // Change text color
            BorderColorChange: inputBorderColor.on("change", function () {
                newBorderColor = $(this).val();
                btn.css({
                    "border-color": "#" + newBorderColor
                });
            })
        }
    };
    
}(jQuery));



console.log("WORK!");

