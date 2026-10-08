<script setup>
defineProps({ onResetDemo: { type: Function, required: true } })
</script>

<template>
  <header class="topbar">
    <div class="brand">
      <span class="brand-mark">BN</span>
      <div><strong>BookNest</strong><small>Library CRUD Manager</small></div>
    </div>
    <button class="ghost-btn" type="button" @click="onResetDemo">Reset Demo Data</button>
  </header>
</template>
