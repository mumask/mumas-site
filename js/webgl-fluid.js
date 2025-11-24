(() => {
  const canvas = document.getElementById('fluid-canvas');
  const gl = canvas.getContext('webgl2');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0,0,canvas.width,canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  function render() {
    gl.clearColor(Math.sin(Date.now()/1000)*0.5+0.5, Math.cos(Date.now()/1500)*0.5+0.5, 0.5,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    requestAnimationFrame(render);
  }
  render();
})();
