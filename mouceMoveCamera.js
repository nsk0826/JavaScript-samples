let rot = 0; // 角度
let mouseX = 0; // マウス座標

// マウス座標はマウスが動いた時のみ取得できる
document.addEventListener("mousemove", (event) => {
  mouseX = event.pageX;
});

tick();

// 毎フレーム時に実行されるループイベントです
function tick() {
  // マウスの位置に応じて角度を設定
  // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
  const targetRot = (mouseX / window.innerWidth) * 360;
  // イージングの公式を用いて滑らかにする
  // 値 += (目標値 - 現在の値) * 減速値
  rot += (targetRot - rot) * 0.02;

  // ラジアンに変換する
  const radian = rot * Math.PI / 180;
  // 角度に応じてカメラの位置を設定
  camera.position.x = 1000 * Math.sin(radian);
  camera.position.z = 1000 * Math.cos(radian);
  // 原点方向を見つめる
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // レンダリング
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
}