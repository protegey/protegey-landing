<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '~/composables/useTheme';

gsap.registerPlugin(ScrollTrigger);

const { isDark } = useTheme();
const canvasRef = ref(null);
let ctx = null;
let animationFrameId = null;
let nodes = [];
let connections = [];
let packets = [];
let activities = [];

const createPacket = () => {
    if (nodes.length < 2) return;
    
    // Pick random connected pair
    const idx1 = Math.floor(Math.random() * nodes.length);
    let idx2 = Math.floor(Math.random() * nodes.length);
    let attempts = 0;
    while (idx2 === idx1 && attempts < 10) {
        idx2 = Math.floor(Math.random() * nodes.length);
        attempts++;
    }
    if (idx2 === idx1) return;
    
    const from = nodes[idx1];
    const to = nodes[idx2];
    
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Allow packets between any nodes within 200px
    if (dist > 200) return;
    
    packets.push({
        x: from.x,
        y: from.y,
        targetX: to.x,
        targetY: to.y,
        progress: 0,
        speed: 0.008 + Math.random() * 0.007
    });
};

const createActivity = () => {
    if (nodes.length === 0) return;
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    activities.push({
        x: node.x,
        y: node.y,
        radius: 0,
        maxRadius: 30 + Math.random() * 20,
        alpha: 1,
        type: Math.random() > 0.5 ? 'pulse' : 'alert'
    });
};

let lastPacketTime = -200;
let lastActivityTime = -800;

const initCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create nodes
    const nodeCount = 30;
    const rect = canvas.parentElement.getBoundingClientRect();
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            type: Math.random() > 0.8 ? 'hub' : 'node'
        });
    }
};

const resizeCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    // Keep nodes within bounds
    nodes.forEach(node => {
        if (node.x > width) node.x = Math.random() * width;
        if (node.y > height) node.y = Math.random() * height;
    });
};

const draw = (timestamp = 0) => {
    if (!ctx || !canvasRef.value) return;
    const canvas = canvasRef.value;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn packets
    if (timestamp - lastPacketTime >= 200) {
        createPacket();
        lastPacketTime = timestamp;
    }

    // Spawn activity
    if (timestamp - lastActivityTime >= 800) {
        createActivity();
        lastActivityTime = timestamp;
    }

    // Draw activity ripples
    activities = activities.filter(act => {
        act.radius += 0.8;
        act.alpha = 1 - act.radius / act.maxRadius;
        
        if (act.alpha <= 0) return false;
        
        ctx.beginPath();
        ctx.arc(act.x, act.y, act.radius, 0, Math.PI * 2);
        
        if (act.type === 'alert') {
            ctx.strokeStyle = `rgba(255, 107, 0, ${act.alpha * 0.6})`;
            ctx.lineWidth = 1.5;
        } else {
            ctx.strokeStyle = `rgba(12, 185, 158, ${act.alpha * 0.4})`;
            ctx.lineWidth = 1;
        }
        ctx.stroke();
        
        return true;
    });

    // Update and draw packets
    packets = packets.filter(pkt => {
        pkt.progress += pkt.speed;
        
        if (pkt.progress >= 1) return false;
        
        const x = pkt.x + (pkt.targetX - pkt.x) * pkt.progress;
        const y = pkt.y + (pkt.targetY - pkt.y) * pkt.progress;
        
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#22d3ee';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#22d3ee';
        ctx.fill();
        ctx.shadowBlur = 0;
        
        return true;
    });

    // Update nodes
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node — colors adapt to theme
        const nodeColor = isDark.value ? '#6b7ea3' : '#3a4e7a';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.type === 'hub' ? 4 : 2, 0, Math.PI * 2);
        ctx.fillStyle = node.type === 'hub' ? '#0cb99e' : nodeColor;
        ctx.fill();

        // Glow for hubs
        if (node.type === 'hub') {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#0cb99e';
        } else {
            ctx.shadowBlur = 0;
        }
    });

    // Draw connections
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                const opacity = 1 - distance / 150;
                const lineAlpha = isDark.value ? opacity * 0.2 : opacity * 0.35;
                ctx.strokeStyle = `rgba(12, 185, 158, ${lineAlpha})`;
                ctx.stroke();
            }
        }
    }

    animationFrameId = requestAnimationFrame(draw);
};

onMounted(() => {
    initCanvas();
    requestAnimationFrame((t) => draw(t));


    // Animate text elements
    gsap.from('.network-title', {
        scrollTrigger: {
            trigger: '.network-section',
            start: 'top 70%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.network-step', {
        scrollTrigger: {
            trigger: '.network-steps',
            start: 'top 80%',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
});

onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas);
    cancelAnimationFrame(animationFrameId);
});
</script>

<template>
    <section class="network-section relative py-16 md:py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden border-t border-neutral-200 dark:border-neutral-900" style="min-height: 600px;">
        <!-- Canvas Background -->
        <div class="absolute inset-0 z-0 opacity-50" aria-hidden="true">
            <div class="w-full h-full" style="min-height: 600px;">
                <canvas ref="canvasRef" class="w-full h-full block"></canvas>
            </div>
        </div>

        <div class="container mx-auto px-4 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary-500/30 bg-secondary-500/10 text-secondary-400 text-sm font-mono tracking-wide mb-4">
                    <span class="w-2 h-2 rounded-full bg-secondary-500 animate-pulse"></span>
                    {{ $t('network_map.badge') }}
                </div>
                <h2 class="network-title text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-6">
                    {{ $t('network_map.title') }}
                </h2>
                <p class="text-neutral-500 dark:text-neutral-400 text-lg">
                    {{ $t('network_map.subtitle') }}
                </p>
            </div>

            <div class="network-steps grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
                <!-- Connecting Line (Desktop) -->
                <div
                    class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent -z-10">
                </div>

                <!-- Step 1 -->
                <div
                    class="network-step relative bg-white dark:bg-neutral-900/80 backdrop-blur border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl hover:border-primary-500/30 transition-colors group">
                    <div
                        class="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors">
                        <span class="text-2xl font-mono font-bold text-primary-500">01</span>
                    </div>
                    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">{{ $t('network_map.step1.title') }}</h3>
                    <p class="text-neutral-500 dark:text-neutral-400">
                        {{ $t('network_map.step1.desc') }}
                    </p>
                </div>

                <!-- Step 2 -->
                <div
                    class="network-step relative bg-white dark:bg-neutral-900/80 backdrop-blur border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl hover:border-secondary-500/30 transition-colors group">
                    <div
                        class="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary-500/20 transition-colors">
                        <span class="text-2xl font-mono font-bold text-secondary-500">02</span>
                    </div>
                    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">{{ $t('network_map.step2.title') }}</h3>
                    <p class="text-neutral-500 dark:text-neutral-400">
                        {{ $t('network_map.step2.desc') }}
                    </p>
                </div>

                <!-- Step 3 -->
                <div
                    class="network-step relative bg-white dark:bg-neutral-900/80 backdrop-blur border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl hover:border-primary-500/30 transition-colors group">
                    <div
                        class="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors">
                        <span class="text-2xl font-mono font-bold text-primary-400">03</span>
                    </div>
                    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">{{ $t('network_map.step3.title') }}</h3>
                    <p class="text-neutral-500 dark:text-neutral-400">
                        {{ $t('network_map.step3.desc') }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
