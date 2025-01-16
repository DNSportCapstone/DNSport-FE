<template>
    <header>
        <div class="startClass">
            <nav class="p-2">
                <RouterLink class="m-2" to="/">Home</RouterLink>
                <RouterLink class="m-2" to="/about">About</RouterLink>
                <RouterLink class="m-2" to="/tesst">About</RouterLink>
            </nav>
        </div>
    </header>
    <div>
        <Suspense>
            <RouterView />
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router';
</script>
<style scoped>
.startClass {
    color: brown;
}
</style>
