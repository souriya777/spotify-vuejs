<template>
  <div class="volume-bar">
    <volume-mute-icon />
    <volume-off-icon />
    <volume-down-icon />
    <volume-up-icon />
    <div class="back">back</div>
    <div class="front">front</div>
    <button>round</button>
  </div>
</template>
<script>
import VolumeMuteIcon from '@/components/icons/VolumeMuteIcon'
import VolumeOffIcon from '@/components/icons/VolumeOffIcon'
import VolumeDownIcon from '@/components/icons/VolumeDownIcon'
import VolumeUpIcon from '@/components/icons/VolumeUpIcon'
export default {
  components: { VolumeMuteIcon, VolumeOffIcon, VolumeDownIcon, VolumeUpIcon }
}
</script>
