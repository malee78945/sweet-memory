/**
 * 💖 SCRIPT.JS - Full Version
 * ระบบตรวจสอบวันที่, นับวันคุยกัน และเอฟเฟกต์อลังการ
 */

function openLetter() {
    const sound = document.getElementById("openSound");
    if (sound) {
        sound.volume = 0.5;
        sound.play().catch(e => console.log("Audio play start after interaction"));
    }

    // สั่นเบาๆ เมื่อเปิด (สำหรับมือถือ)
    if (navigator.vibrate) navigator.vibrate(50);

    document.getElementById("start").classList.add("hidden");
    document.getElementById("letter").classList.remove("hidden");
}

function goToLove() {
    const name = document.getElementById("nameInput").value.trim();
    const dateVal = document.getElementById("firstDate").value;

    // 1. เช็คว่ากรอกครบไหม
    if (name === "" || dateVal === "") {
        alert("กรอกชื่อและเลือกวันที่ก่อนน้าคนเก่ง 💕");
        return;
    }

    // 2. เช็ควันที่ (ต้องเป็น 7 เมษายน 2026 เท่านั้น)
    // หมายเหตุ: input type="date" จะคืนค่าเป็น YYYY-MM-DD
    if (dateVal !== "2026-04-07") {
        alert("ลืมวันที่เราคุยกันแล้วหรอ โกรธ! 😤");
        return;
    }

    // 3. คำนวณจำนวนวัน
    const startDate = new Date(dateVal);
    const today = new Date();
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // 4. เริ่มเปลี่ยนหน้า
    document.getElementById("letter").classList.add("hidden");
    document.getElementById("lovePage").classList.remove("hidden");

    // 5. แสดงชื่อ "คนเก่งของเค้า" เลื่อนมาหยุดตรงกลาง
    const loveText = document.getElementById("loveText");
    loveText.innerText = `คนเก่งของเค้า${name}💖`;
    loveText.classList.add("slide-in-center");

    // 6. รันเอฟเฟกต์พายุตัวหนังสือ (วิ่ง + ตก)
    startSlidingEffect(name);
    startFallingEffect();

    // 7. ปิดท้ายด้วยการสร้างรูปหัวใจดวงโตและแสดงวัน
    setTimeout(() => {
        createHeartText(diffDays);
    }, 7500);
}

// 🏃‍♂️ เอฟเฟกต์ตัวหนังสือวิ่งจากซ้ายไปขวา
function startSlidingEffect(name) {
    const phrases = [`I LOVE YOU ${name}💖`];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const span = document.createElement("span");
            span.innerText = phrases[Math.floor(Math.random() * phrases.length)];
            span.className = "sliding-text";
            span.style.top = Math.random() * 80 + 10 + "vh";
            span.style.animationDuration = (Math.random() * 2 + 3) + "s";
            document.body.appendChild(span);
            setTimeout(() => span.remove(), 5000);
        }, i * 400);
    }
}

// 🌧️ เอฟเฟกต์ตัวหนังสือตกจากฟ้า (ฝน I LOVE YOU)
function startFallingEffect() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const span = document.createElement("span");
            span.innerText = "I LOVE YOU 💖 ";
            span.className = "falling-text"; // ต้องตรงกับชื่อใน CSS
            span.style.left = Math.random() * 100 + "vw";
            span.style.animationDuration = (Math.random() * 3 + 2) + "s";
            document.body.appendChild(span);
            setTimeout(() => span.remove(), 5000);
        }, i * 200);
    }
}

// 💖 สร้างรูปหัวใจจากตัวอักษร
function createHeartText(days) {
    const container = document.getElementById("heartShapeContainer") || document.getElementById("lovePage");
    const loveText = document.getElementById("loveText");
    if (loveText) loveText.style.opacity = "0.2";

    const text = "I LOVE YOU";
    for (let y = 15; y >= -15; y--) {
        for (let x = -15; x <= 15; x++) {
            let a = x * 0.1;
            let b = y * 0.1;
            let formula = Math.pow(a * a + b * b - 1, 3) - a * a * b * b * b;

            if (formula <= 0) {
                let span = document.createElement("span");
                span.innerText = text;
                span.className = "heart-text";
                span.style.left = `calc(50% + ${x * 14}px)`;
                span.style.top = `calc(45% + ${y * -14}px)`;
                span.style.animationDelay = (Math.random() * 2) + "s";
                container.appendChild(span);
            }
        }
    }
    showFinalMessage(days);
}

// ✨ แสดงข้อความนับวันตอนจบ
function showFinalMessage(days) {
    const msg = document.createElement("div");
    msg.style.cssText = "position:fixed; bottom:8%; left:50%; transform:translateX(-50%); color:#ff4d88; z-index:10000; text-shadow:2px 2px 5px white; width:100%; text-align:center;";

    let dayDisplay = days < 0 ? "รอวันที่จะได้พบกันนะ" : `เรารู้จักกันมา <span id='dayCount' style='font-size:26px; font-weight:bold; color:#ff1a66;'>0</span> วันแล้วนะ`;

    msg.innerHTML = `
        <h1 style="margin:0; font-size:22px;">LOVE PECHRA 💖</h1>
        <p style="font-size:18px; color:#ff6fa5; margin-top:5px;">${dayDisplay}</p>
    `;
    document.body.appendChild(msg);

    if (days >= 0) {
        let count = 0;
        let counter = setInterval(() => {
            count++;
            const el = document.getElementById('dayCount');
            if (el) el.innerText = count;
            if (count >= days) clearInterval(counter);
        }, 20);
    }
}

// 🖱️/📱 เอฟเฟกต์จิ้มหน้าจอแล้วหัวใจกระจาย
function createSparkle(x, y) {
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('span');
        sparkle.innerHTML = '💖';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = (Math.random() * 15 + 10) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '100000';
        sparkle.style.transition = 'all 0.8s ease-out';
        document.body.appendChild(sparkle);

        const dx = (Math.random() - 0.5) * 200;
        const dy = (Math.random() - 0.5) * 200;

        setTimeout(() => {
            sparkle.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
            sparkle.style.opacity = '0';
        }, 10);
        setTimeout(() => sparkle.remove(), 800);
    }
}

document.addEventListener('touchstart', (e) => createSparkle(e.touches[0].clientX, e.touches[0].clientY));
document.addEventListener('mousedown', (e) => createSparkle(e.clientX, e.clientY));