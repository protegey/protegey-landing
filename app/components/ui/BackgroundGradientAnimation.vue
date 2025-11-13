<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { cn } from '~/lib/utils';

interface Props {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  gradientBackgroundStart: 'rgb(108, 0, 162)',
  gradientBackgroundEnd: 'rgb(0, 17, 82)',
  firstColor: '18, 113, 255',
  secondColor: '221, 74, 255',
  thirdColor: '100, 220, 255',
  fourthColor: '200, 50, 50',
  fifthColor: '180, 180, 50',
  pointerColor: '140, 100, 255',
  size: '80%',
  blendingValue: 'hard-light',
  interactive: true,
});

const interactiveRef = ref<HTMLDivElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const curX = ref(0);
const curY = ref(0);
const tgX = ref(0);
const tgY = ref(0);
const mouseX = ref(0);
const mouseY = ref(0);
const isSafari = ref(false);
const mouseOffsetX = ref(0);
const mouseOffsetY = ref(0);

// Set CSS variables
onMounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.setProperty('--gradient-background-start', props.gradientBackgroundStart);
    document.body.style.setProperty('--gradient-background-end', props.gradientBackgroundEnd);
    document.body.style.setProperty('--first-color', props.firstColor);
    document.body.style.setProperty('--second-color', props.secondColor);
    document.body.style.setProperty('--third-color', props.thirdColor);
    document.body.style.setProperty('--fourth-color', props.fourthColor);
    document.body.style.setProperty('--fifth-color', props.fifthColor);
    document.body.style.setProperty('--pointer-color', props.pointerColor);
    document.body.style.setProperty('--size', props.size);
    document.body.style.setProperty('--blending-value', props.blendingValue);

    // Detect Safari
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }
});

// Watch for prop changes and update CSS variables
watch(
  () => [
    props.gradientBackgroundStart,
    props.gradientBackgroundEnd,
    props.firstColor,
    props.secondColor,
    props.thirdColor,
    props.fourthColor,
    props.fifthColor,
    props.pointerColor,
    props.size,
    props.blendingValue,
  ],
  () => {
    if (typeof document !== 'undefined') {
      document.body.style.setProperty('--gradient-background-start', props.gradientBackgroundStart);
      document.body.style.setProperty('--gradient-background-end', props.gradientBackgroundEnd);
      document.body.style.setProperty('--first-color', props.firstColor);
      document.body.style.setProperty('--second-color', props.secondColor);
      document.body.style.setProperty('--third-color', props.thirdColor);
      document.body.style.setProperty('--fourth-color', props.fourthColor);
      document.body.style.setProperty('--fifth-color', props.fifthColor);
      document.body.style.setProperty('--pointer-color', props.pointerColor);
      document.body.style.setProperty('--size', props.size);
      document.body.style.setProperty('--blending-value', props.blendingValue);
    }
  }
);

// Animate interactive pointer
let animationFrame: number | null = null;

const animatePointer = () => {
  if (interactiveRef.value) {
    curX.value = curX.value + (tgX.value - curX.value) / 20;
    curY.value = curY.value + (tgY.value - curY.value) / 20;
    interactiveRef.value.style.transform = `translate(${Math.round(curX.value)}px, ${Math.round(curY.value)}px)`;
  }
  animationFrame = requestAnimationFrame(animatePointer);
};

watch([tgX, tgY], () => {
  if (props.interactive && !animationFrame) {
    animatePointer();
  }
});

onMounted(() => {
  if (props.interactive) {
    animatePointer();
  }
});

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});

const handleMouseMove = (event: MouseEvent) => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect();
    // Calculate mouse position relative to container
    mouseX.value = ((event.clientX - rect.left) / rect.width) * 100;
    mouseY.value = ((event.clientY - rect.top) / rect.height) * 100;
    
    // Update interactive pointer position
    if (interactiveRef.value) {
      tgX.value = event.clientX - rect.left;
      tgY.value = event.clientY - rect.top;
    }
    
    // Calculate mouse offset for gradient orb reactions
    mouseOffsetX.value = (mouseX.value - 50) * 0.02; // Scale factor for subtle movement
    mouseOffsetY.value = (mouseY.value - 50) * 0.02;
  }
};

const handleMouseLeave = () => {
  // Reset to center when mouse leaves
  mouseX.value = 50;
  mouseY.value = 50;
  mouseOffsetX.value = 0;
  mouseOffsetY.value = 0;
};

const setIsSafari = (value: boolean) => {
  isSafari.value = value;
};
</script>

<template>
  <div
    ref="containerRef"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    :class="
      cn(
        'h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
        containerClassName
      )
    "
  >
    <svg class="hidden">
      <defs>
        <filter id="blurMe">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>

    <div :class="cn('', className)">
      <slot />
    </div>

    <div
      :class="
        cn(
          'gradients-container h-full w-full blur-lg',
          isSafari ? 'blur-2xl' : '[filter:url(#blurMe)_blur(40px)]'
        )
      "
    >
      <div
        :class="
          cn(
            'absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            '[transform-origin:center_center]',
            'animate-first',
            'opacity-100',
            'transition-transform duration-300 ease-out'
          )
        "
        :style="{
          transform: `translate(${mouseOffsetX * 0.5}%, ${mouseOffsetY * 0.5}%)`
        }"
      ></div>

      <div
        :class="
          cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            '[transform-origin:calc(50%-400px)]',
            'animate-second',
            'opacity-100',
            'transition-transform duration-300 ease-out'
          )
        "
        :style="{
          transform: `translate(${mouseOffsetX * -0.8}%, ${mouseOffsetY * 0.3}%)`
        }"
      ></div>

      <div
        :class="
          cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            '[transform-origin:calc(50%+400px)]',
            'animate-third',
            'opacity-100',
            'transition-transform duration-300 ease-out'
          )
        "
        :style="{
          transform: `translate(${mouseOffsetX * 0.6}%, ${mouseOffsetY * -0.4}%)`
        }"
      ></div>

      <div
        :class="
          cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            '[transform-origin:calc(50%-200px)]',
            'animate-fourth',
            'opacity-70',
            'transition-transform duration-300 ease-out'
          )
        "
        :style="{
          transform: `translate(${mouseOffsetX * -0.4}%, ${mouseOffsetY * -0.6}%)`
        }"
      ></div>

      <div
        :class="
          cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            '[transform-origin:calc(50%-800px)_calc(50%+800px)]',
            'animate-fifth',
            'opacity-100',
            'transition-transform duration-300 ease-out'
          )
        "
        :style="{
          transform: `translate(${mouseOffsetX * 0.3}%, ${mouseOffsetY * 0.7}%)`
        }"
      ></div>

      <div
        v-if="interactive"
        ref="interactiveRef"
        :class="
          cn(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2',
            'opacity-70',
            'pointer-events-none',
            'transition-opacity duration-200'
          )
        "
      ></div>
    </div>
  </div>
</template>

