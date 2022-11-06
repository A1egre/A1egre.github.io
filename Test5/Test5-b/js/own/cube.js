"use strict";

var canvas;
var gl;

var points = [];
var colors = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var Tx = 0;
var Ty = 1;
var Tz = 2;

var axis = 0;
var theta = [0, 0, 0];

var pxis = 0;
var pst = [0, 0, 0];

var thetaLoc;
var pstLoc;

var x = 0.5;
var y = 0.5;
var z = 0.5;

window.onload = function initCube() {
    canvas = document.getElementById("rtcb-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    makeCube();

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    // load shaders and initialize attribute buffer
    var program = initShaders(gl, "rtvshader", "rtfshader");
    gl.useProgram(program);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");
    gl.uniform3fv(thetaLoc, theta);
	
    document.getElementById("xbutton").onclick = function () {
        axis = xAxis;
    }

    document.getElementById("ybutton").onclick = function () {
        axis = yAxis;
    }

    document.getElementById("zbutton").onclick = function () {
        axis = zAxis;
    }
	
	pstLoc = gl.getUniformLocation(program, "pst");
	gl.uniform3fv(pstLoc, pst);
	
	document.getElementById("xtranslation").onclick = function () {
		pxis = Tx;
		pst[pxis] += 0.2;
	}
	
	document.getElementById("ytranslaition").onclick = function () {
		pxis = Ty;
		pst[pxis] += 0.5;
	}
	
	document.getElementById("ztranslaition").onclick = function () {
		pxis = Tz;
		pst[pxis] += 0.5;
	}
	
	document.getElementById("restore").onclick = function () {
		pst = [0,0,0];
	}
	
    render();
	
}

function makeCube() {
    var vertices = [
        glMatrix.vec4.fromValues(-x, -y, z, 1.0),
        glMatrix.vec4.fromValues(-x, y, z, 1.0),
        glMatrix.vec4.fromValues(x, y, z, 1.0),
        glMatrix.vec4.fromValues(x, -y, z, 1.0),
        glMatrix.vec4.fromValues(-x, -y, -z, 1.0),
        glMatrix.vec4.fromValues(-x, y, -z, 1.0),
        glMatrix.vec4.fromValues(x, y, -z, 1.0),
        glMatrix.vec4.fromValues(x, -y, -z, 1.0),
    ];

    var vertexColors = [
        glMatrix.vec4.fromValues(0.0, 0.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 0.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 1.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(0.0, 1.0, 0.0, 1.0),
        glMatrix.vec4.fromValues(0.0, 0.0, 1.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 0.0, 1.0, 1.0),
        glMatrix.vec4.fromValues(0.0, 1.0, 1.0, 1.0),
        glMatrix.vec4.fromValues(1.0, 1.0, 1.0, 1.0)
    ];

    var faces = [
        1, 0, 3, 1, 3, 2, //正
        2, 3, 7, 2, 7, 6, //右
        3, 0, 4, 3, 4, 7, //底
        6, 5, 1, 6, 1, 2, //顶
        4, 5, 6, 4, 6, 7, //背
        5, 4, 0, 5, 0, 1  //左
    ];

    for (var i = 0; i < faces.length; i++) {
        points.push(vertices[faces[i]][0], vertices[faces[i]][1], vertices[faces[i]][2]);

        colors.push(vertexColors[Math.floor(i / 6)][0], vertexColors[Math.floor(i / 6)][1], vertexColors[Math.floor(i / 6)][2], vertexColors[Math.floor(i / 6)][3]);
    }
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta[axis] += 0.1;
    gl.uniform3fv(thetaLoc, theta);
	gl.uniform3fv(pstLoc, pst)

    gl.drawArrays(gl.TRIANGLES, 0, points.length / 3);

    requestAnimFrame(render);
}
