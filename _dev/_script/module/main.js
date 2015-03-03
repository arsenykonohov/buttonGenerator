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
        newBorderColor,
        
        codeResultAreaCss = $(".css"),
        codeResultAreaHtml = $(".html");
    
    buttonGenerator = {
// ===============================================================
// INITIALIZE push project
// ===============================================================

// ===============================================================
// SetUpListener - callback function describe here
// ===============================================================


// ===================== change width ========================
        width: {
            // slider init
            btnWidthSlider: btnWidth.slider({
                range: "min",
                value: 40,
                min: 0,
                max: 200,
                step: 2,
                slide: function (event, ui) {
                    btnWidthVal.val(ui.value);
                }
            }),
            // input changed slider value
            btnWidthVal: btnWidthVal.val(btnWidth.slider("value")),
            // width of element
            currentBtnWidth: btn.css({
                "padding-left" : btnWidth.slider("value") * 0.5,
                "padding-right" : btnWidth.slider("value") * 0.5
            }),
            // event
            changeBtnWidth: btnWidth.on("slide slidechange", function (event, ui) {
                btn.css({
                    "padding-left" : btnWidth.slider("value") * 0.5,
                    "padding-right" : btnWidth.slider("value") * 0.5
                });
                buttonGenerator.changeCodeResultArea();
            })
        },
// ===================== change height ========================
        height: {
            // slider init
            btnHeightSlider: btnHeight.slider({
                range: "min",
                value: 20,
                min: 0,
                max: 100,
                step: 2,
                slide: function (event, ui) {
                    btnHeightVal.val(ui.value);
                }
            }),
            // input changed slider value
            btnHeightVal: btnHeightVal.val(btnHeight.slider("value")),
            
            // width of element
            currentBtnHeight: btn.css({
                "padding-top" : btnHeight.slider("value") * 0.5,
                "padding-bottom" : btnHeight.slider("value") * 0.5
            }),
            // event
            changeBtnHeight: btnHeight.on("slide slidechange", function (event, ui) {
                btn.css({
                    "padding-top" : btnHeight.slider("value") * 0.5,
                    "padding-bottom" : btnHeight.slider("value") * 0.5
                });
                buttonGenerator.changeCodeResultArea();
            })
        },
// ===================== change font-size ========================
        fontSize: {
            // slider init
            slider: btnFontSize.slider({
                range: "min",
                value: 24,
                min: 8,
                max: 41,
                slide: function (event, ui) {
                    btnFontSizeVal.val(ui.value);
                }
            }),
            // input changed slider value
            inputVal: btnFontSizeVal.val(btnFontSize.slider("value")),
            // width of element
            currentSize: btn.css({
                "font-size" : btnFontSize.slider("value")
            }),
            // event
            inputChange: btnFontSize.on("slide slidechange", function (event, ui) {
                btn.css({
                    "font-size" : btnFontSize.slider("value")
                });
                buttonGenerator.changeCodeResultArea();
            })
        },
// ===================== change border width ========================
        borderWidth: {
            // slider init
            slider: btnBorderWIdth.slider({
                range: "min",
                value: 5,
                min: 0,
                max: 25,
                slide: function (event, ui) {
                    btnBorderWIdthVal.val(ui.value);
                }
            }),
            // input changed slider value
            inputVal: btnBorderWIdthVal.val(btnBorderWIdth.slider("value")),
            // width of element
            currentSize: btn.css({
                "border-width" : btnBorderWIdth.slider("value")
            }),
            // event
            inputChange: btnBorderWIdth.on("slide slidechange", function (event, ui) {
                btn.css({
                    "border-width" : btnBorderWIdth.slider("value")
                });
                buttonGenerator.changeCodeResultArea();
            })
        },
// ===================== change border-radius ========================
        borderRadius: {
            // slider init
            borderRadiusSlider: btnBorderRadius.slider({
                range: "min",
                value: 4,
                min: 0,
                max: 100,
                slide: function (event, ui) {
                    btnBorderRadiusVal.val(ui.value);
                }
            }),
            // input changed slider value
            borderRadiusVal: btnBorderRadiusVal.val(btnBorderRadius.slider("value")),
            // width of element
            currentBorderRadius: btn.css({
                "-webkit-border-radius": btnBorderRadius.slider("value"),
                "-moz-border-radius":    btnBorderRadius.slider("value"),
                "-ms-border-radius":     btnBorderRadius.slider("value"),
                "-o-border-radius":      btnBorderRadius.slider("value"),
                "border-radius":         btnBorderRadius.slider("value")
            }),
            // event
            changeBorderRadius: btnBorderRadius.on("slide slidechange", function (event, ui) {
                btn.css({
                    "-webkit-border-radius": btnBorderRadius.slider("value"),
                    "-moz-border-radius":    btnBorderRadius.slider("value"),
                    "-ms-border-radius":     btnBorderRadius.slider("value"),
                    "-o-border-radius":      btnBorderRadius.slider("value"),
                    "border-radius":         btnBorderRadius.slider("value")
                });
                buttonGenerator.changeCodeResultArea();
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
                buttonGenerator.changeCodeResultArea();
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
                buttonGenerator.changeCodeResultArea();
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
                buttonGenerator.changeCodeResultArea();
            })
        },
// ===================== code result method ========================
        changeCodeResultArea: function () {
            var getBtnWidthL = btn.css("padding-left"),
                getBtnWidthR = btn.css("padding-right"),
                getBtnHeightT = btn.css("padding-top"),
                getBtnHeightB = btn.css("padding-bottom"),
                getBtnFontSize = btn.css("font-size"),
                getBtnBrdrWidth = btn.css("border-width"),
                getBtnBrdrRadius = btn.css("border-radius"),
                getColorText = btn.css("color"),
                getBackgroundColor = btn.css("background-color"),
                getBorderColor = btn.css("border-color");
                
            codeResultAreaCss.text(
                ".button {" + "\n" +
                    "    padding-left: " + getBtnWidthL + ";\n" +
                    "    padding-right: " + getBtnWidthR + ";\n" +
                    "    padding-top: " + getBtnHeightT + ";\n" +
                    "    padding-bottom: " + getBtnHeightB + ";\n" +
                    "    font-size: " + getBtnFontSize + ";\n" +
                    "    border-width: " + getBtnBrdrWidth + ";\n" +
                    "    -webkit-border-radius: " + getBtnBrdrRadius + ";\n" +
                    "    -moz-border-radius: " + getBtnBrdrRadius + ";\n" +
                    "    -ms-border-radius: " + getBtnBrdrRadius + ";\n" +
                    "    -o-border-radius: " + getBtnBrdrRadius + ";\n" +
                    "    border-radius: " + getBtnBrdrRadius + ";\n" +
                    "    color: " + getColorText + ";\n" +
                    "    background-color: " + getBackgroundColor + ";\n" +
                    "    border-color: " + getBorderColor + ";\n" +
                    "}"
            );
            codeResultAreaHtml.text('<div class="button">button</div>');
        }
    };
    buttonGenerator.changeCodeResultArea();
}(jQuery));



console.log("WORK!");

