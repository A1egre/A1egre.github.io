// 顶点着色器程序
var VSHADER_SOURCE =`
    attribute vec4 a_Position;
    void main() {
        //设置坐标
        gl_Position = a_Position; 
        //设置尺寸
        gl_PointSize = 10.0; 
    } 
`;

// 片元着色器
var FSHADER_SOURCE =`
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
        //设置颜色
        gl_FragColor = u_FragColor;
    }
`;

// 获取canvas元素
var canvas = document.getElementById('canvas');

// 获取绘制二维上下文
var gl = canvas.getContext('webgl');

initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

gl.clearColor(1, 1, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

var n = initVertexBuffer(gl);

var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
gl.uniform4f(u_FragColor, 0.5, 0.5, 0.5, 1.0);
gl.drawArrays(gl.POINT, 0, n);

gl.uniform4f(u_FragColor, 0, 0.8, 0.4, 0.5);
gl.drawArrays(gl.TRIANGLE_FAN, 0, n );


function initVertexBuffer(gl) {
    var sqrt2 = Math.sqrt(2) / 2;

    var vertices = new Float32Array([
        0.0, 0.0,
        0.5, 0.0,
        0.5 * sqrt2, 0.5 * sqrt2,
        0, 0.5,
        -0.5 * sqrt2, 0.5 * sqrt2,
        -0.5, 0.0,
        -0.5 * sqrt2, -0.5 * sqrt2,
        0.0, -0.5,
        0.5 * sqrt2, -0.5 * sqrt2,
        0.5, 0.0,
    ]);
    var size = 2;
    var pointCount = vertices.byteLength / size / Float32Array.BYTES_PER_ELEMENT;
    // 创建缓冲区
    var vertexBuffer = gl.createBuffer();
    // 将缓冲区绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // 向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    // 将缓冲区对象分配给a_Position
    gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0);
    // 激活attibue 是缓冲区对attribute变量分配生效
    gl.enableVertexAttribArray(a_Position);
    return pointCount;
}