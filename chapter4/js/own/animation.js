"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;
var direction = 1;
var speed = 0.08;

function changeDir(){
	direction *= -1;
}

function changeSpdSlow(){
	speed = 0.01;
}

function changeSpdFast(){
	speed = 0.15;
}

function initSpd(){
	speed = 0.08;
}

function stop(){
	speed = 0;
}

function initRotSquare(){
	canvas = document.getElementById( "rot-canvas" );
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

	var vertices = [
		-0.6,-0.3,
		-0.3,0.3,
		0,-0.3,
		0.3,0.3,
		0.3,-0.3,
		0.6,-0.3,
		0.6,-0.3,
		0.6,0.3,
		0.3,0.3
		
		// -1.0,0.0,
		// -0.5,1.0,
		// 0.0,0.0,
		// 0.0,0.0,
		// 0.0,-1.0,
		// 1.0,0.0,
		// 0.0,-1.0,
		// 1.0,0.0,
		// 1.0,-1.0
		
		// 0.0, 0.5,
		// -0.5, -0.5,
		// 0.5, -0.5,
	];

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation( program, "theta" );

	renderSquare();
}

function renderSquare(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += direction * speed;
	if( theta > 2 * Math.PI )
		theta -= (2 * Math.PI);
	else if( theta < -2 * Math.PI )
		theta += (2 * Math.PI);
	
	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLES, 0, 9 );
	// gl.drawArrays( gl.TRIANGLE_STRIP, 3, 3 );

	// update and render
	window.requestAnimFrame( renderSquare );
}