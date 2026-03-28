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

const initCanvas = () => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create nodes
    const nodeCount = 30;
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
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
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
};

const draw = () => {
    if (!ctx || !canvasRef.value) return;
    const canvas = canvasRef.value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update nodes
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

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
    draw();

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
    <section class="network-section relative py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden border-t border-neutral-200 dark:border-neutral-900">
        <!-- Canvas Background -->
        <div class="absolute inset-0 z-0 opacity-50" aria-hidden="true">
            <canvas ref="canvasRef" class="w-full h-full"></canvas>
        </div>

        <div class="container mx-auto px-4 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <div
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary-500/30 bg-secondary-500/10 text-secondary-400 text-sm font-mono tracking-wide mb-4">
                    <span class="w-2 h-2 rounded-full bg-secondary-500 animate-pulse"></span>
                    HOW IT WORKS
                </div>
                <h2 class="network-title text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                    A Shared Early-Warning Network
                </h2>
                <p class="text-neutral-500 dark:text-neutral-400 text-lg">
                    Protegey turns scattered events into actionable intelligence by aggregating signals from across the
                    ecosystem.
                </p>
            </div>

            <div class="network-steps grid md:grid-cols-3 gap-8 relative">
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
                    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">Aggregate Signals</h3>
                    <p class="text-neutral-500 dark:text-neutral-400">
                        Ingest data from fintechs, telcos, banks, and community reports in real-time.
                    </p>
                </div>

                <!-- Step 2 -->
                <div
                    class="network-step relative bg-white dark:bg-neutral-900/80 backdrop-blur border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl hover:border-secondary-500/30 transition-colors group">
                    <div
                        class="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary-500/20 transition-colors">
                        <span class="text-2xl font-mono font-bold text-secondary-500">02</span>
                    </div>
                    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">Detect Patterns</h3>
                    <p class="text-neutral-500 dark:text-neutral-400">
                        AI engine analyzes cross-institution patterns to identify emerging fraud vectors.
                    </p>
                </div>

                <!-- Step 3 -->
                <div
                    class="network-step relative bg-white dark:bg-neutral-900/80 backdrop-blur border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl hover:border-primary-500/30 transition-colors group">
                    <div
                        class="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors">
                        <span class="text-2xl font-mono font-bold text-primary-400">03</span>
                    </div>
                    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-3">Stop Fraud</h3>
                    <p class="text-neutral-500 dark:text-neutral-400">
                        Instantly block threats and share intelligence across the network to prevent spread.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
