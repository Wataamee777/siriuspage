// =====================
// ナビ制御
// =====================
const hamburger = document.getElementById("hamburger");
const overlay = document.getElementById("overlay");
const modalMenu = document.getElementById("modalMenu");
const logoWrap = document.getElementById("logoWrap");

// トグル（開閉）
if (hamburger) {
  hamburger.addEventListener("click", () => {
    overlay.style.display =
      overlay.style.display === "flex" ? "none" : "flex";
  });
}

// 外クリックで閉じる
if (overlay) {
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

// 内側クリック防止
if (modalMenu) {
  modalMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// ロゴクリックで戻る
if (logoWrap) {
  logoWrap.addEventListener("click", () => {
    location.href = "../";
  });
}

// =====================
// 星背景＋流れ星
// =====================
const canvas = document.getElementById("stars");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let stars = [];
  let shootingStars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  // 星生成
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: Math.random() * 0.3 + 0.1
    });
  }

  // 流れ星生成
  function createShootingStar() {
    shootingStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      len: Math.random() * 80 + 50,
      speed: Math.random() * 6 + 6,
      life: 0,
      maxLife: 80
    });
  }

  setInterval(createShootingStar, 800);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 通常の星
    for (let s of stars) {
      s.y += s.speed;

      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }

    // 流れ星
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      let s = shootingStars[i];

      let prevX = s.x;
      let prevY = s.y;

      s.x += s.speed;
      s.y += s.speed * 0.5;
      s.life++;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(s.x - s.len, s.y - s.len * 0.5);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (s.life > s.maxLife) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}
