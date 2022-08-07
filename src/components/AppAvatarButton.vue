<template>
  <v-btn icon class="avatar-button" :class="{ open }">
    <div class="noavatar">
      {{ initials }}
    </div>
    <v-img :src="src" alt="Avatar" class="img" />
  </v-btn>
</template>

<script lang="ts" setup>
import md5 from 'md5'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const profile = useProfile()

const src = computed(() => profile.value ? `https://www.gravatar.com/avatar/${md5(profile.value.email)}.jpg?d=blank` : undefined)

const initials = computed(() => profile.value ? profile.value.name.split(' ').map(n => n[0]).join('') : '')

// const emit = defineEmits({});
</script>

<style lang="scss" scoped>
.avatar-button {
    overflow: hidden;
    .noavatar {
      position: absolute;
      background-color: var(--md-sys-color-secondary);
      color: var(--md-sys-color-on-primary);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      letter-spacing: 0;
    }
    .img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    &:active, &.open {
        box-shadow: 0 0 0 2px var(--md-sys-color-on-background);
    }
}
</style>
